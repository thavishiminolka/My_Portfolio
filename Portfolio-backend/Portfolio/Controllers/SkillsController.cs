using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using Portfolio.Data;
using Portfolio.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkillsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SkillsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<Skills>>> CreateSkills([FromForm] IFormCollection form)
        {
            Console.WriteLine("Received POST request to CreateSkills");
            var skills = new List<Skills>();
            try
            {
                // Parse skills from FormData
                var skillIndices = form.Keys
                    .Where(k => k.StartsWith("skills[") && k.EndsWith("[name]"))
                    .Select(k => k.Split('[')[1].Split(']')[0])
                    .Distinct();

                foreach (var index in skillIndices)
                {
                    var nameKey = $"skills[{index}][name]";
                    var logoKey = $"skills[{index}][logo]";
                    var name = form[nameKey].ToString();

                    if (string.IsNullOrEmpty(name))
                    {
                        Console.WriteLine($"Invalid skill at index {index}: Name is required.");
                        return BadRequest(new { Error = $"Skill at index {index}: Name is required." });
                    }

                    IFormFile? logo = form.Files.GetFile(logoKey);
                    if (logo != null)
                    {
                        if (!IsValidImage(logo))
                        {
                            Console.WriteLine($"Invalid logo type at index {index}");
                            return BadRequest(new { Error = $"Skill at index {index}: Logo must be an image (PNG, JPEG, GIF)." });
                        }
                        if (logo.Length > 5 * 1024 * 1024)
                        {
                            Console.WriteLine($"Logo file too large at index {index}");
                            return BadRequest(new { Error = $"Skill at index {index}: Logo file size must be less than 5MB." });
                        }
                    }

                    var skill = new Skills
                    {
                        Name = name,
                        Logo = logo != null ? await ConvertToByteArray(logo) : null
                    };
                    skills.Add(skill);
                    Console.WriteLine($"Parsed skill: Name={name}, Logo={(logo != null ? logo.FileName : "null")}");
                }

                if (!skills.Any())
                {
                    Console.WriteLine("No skills provided.");
                    return BadRequest(new { Error = "No skills provided." });
                }

                Console.WriteLine("Adding skills to DbContext");
                _context.Skills.AddRange(skills);
                Console.WriteLine("Saving changes to database");
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Rows affected: {rowsAffected}, {skills.Count} skills saved");

                var result = skills.Select(s => new
                {
                    s.Id,
                    s.Name,
                    Logo = s.Logo != null ? Convert.ToBase64String(s.Logo) : null
                }).ToList();
                return CreatedAtAction(nameof(GetSkills), result);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetSkills()
        {
            try
            {
                Console.WriteLine("Executing GetSkills");
                var skills = await _context.Skills.ToListAsync();
                Console.WriteLine($"Retrieved {skills.Count} skill records");

                var result = skills.Select(s => new
                {
                    s.Id,
                    s.Name,
                    Logo = s.Logo != null ? Convert.ToBase64String(s.Logo) : null
                }).ToList();
                Console.WriteLine($"Returning {result.Count} skills");
                return Ok(result);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error in GetSkills: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error in GetSkills: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Skills>> GetSkill(int id)
        {
            try
            {
                Console.WriteLine($"Executing GetSkill for ID: {id}");
                var skill = await _context.Skills.FindAsync(id);
                if (skill == null)
                {
                    Console.WriteLine($"Skill with ID {id} not found");
                    return NotFound(new { Error = "Skill not found." });
                }
                Console.WriteLine($"Retrieved skill with ID {id}");

                var result = new
                {
                    skill.Id,
                    skill.Name,
                    Logo = skill.Logo != null ? Convert.ToBase64String(skill.Logo) : null
                };
                return Ok(result);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Skills>> UpdateSkill(int id, [FromForm] SkillForm skillForm)
        {
            Console.WriteLine($"Received PUT request to UpdateSkill ID: {id}");
            Console.WriteLine($"Name: {skillForm.Name ?? "null"}, Logo: {(skillForm.Logo != null ? skillForm.Logo.FileName : "null")}");

            try
            {
                var skill = await _context.Skills.FindAsync(id);
                if (skill == null)
                {
                    Console.WriteLine($"Skill with ID {id} not found");
                    return NotFound(new { Error = "Skill not found." });
                }

                // Validate file type and size
                if (skillForm.Logo != null)
                {
                    if (!IsValidImage(skillForm.Logo))
                    {
                        Console.WriteLine("Invalid logo type");
                        return BadRequest(new { Error = "Logo must be an image (PNG, JPEG, GIF)." });
                    }
                    if (skillForm.Logo.Length > 5 * 1024 * 1024)
                    {
                        Console.WriteLine("Logo file too large");
                        return BadRequest(new { Error = "Logo file size must be less than 5MB." });
                    }
                }

                skill.Name = skillForm.Name;
                skill.Logo = skillForm.Logo != null
                    ? await ConvertToByteArray(skillForm.Logo)
                    : skill.Logo;

                Console.WriteLine("Updating skill in DbContext");
                _context.Skills.Update(skill);
                Console.WriteLine("Saving changes to database");
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Rows affected: {rowsAffected}, Skill updated with ID: {id}");

                var result = new
                {
                    skill.Id,
                    skill.Name,
                    Logo = skill.Logo != null ? Convert.ToBase64String(skill.Logo) : null
                };
                return Ok(result);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSkill(int id)
        {
            Console.WriteLine($"Received DELETE request for Skill ID: {id}");
            try
            {
                var skill = await _context.Skills.FindAsync(id);
                if (skill == null)
                {
                    Console.WriteLine($"Skill with ID {id} not found");
                    return NotFound(new { Error = "Skill not found." });
                }

                Console.WriteLine("Removing skill from DbContext");
                _context.Skills.Remove(skill);
                Console.WriteLine("Saving changes to database");
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Rows affected: {rowsAffected}, Skill deleted with ID: {id}");
                return NoContent();
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        private async Task<byte[]> ConvertToByteArray(IFormFile file)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }

        private bool IsValidImage(IFormFile file)
        {
            var allowedTypes = new[] { "image/png", "image/jpeg", "image/gif" };
            return allowedTypes.Contains(file.ContentType);
        }
    }

    public class SkillForm
    {
        public string? Name { get; set; }
        public IFormFile? Logo { get; set; }
    }
}