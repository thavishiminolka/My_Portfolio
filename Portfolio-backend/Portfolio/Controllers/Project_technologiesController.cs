using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using Portfolio.Data;
using Portfolio.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Project_technologiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Project_technologiesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetProjectTechnologies()
        {
            try
            {
                var technologies = await _context.ProjectTechnologies.ToListAsync();
                Console.WriteLine($"Retrieved {technologies.Count} project technologies");
                return Ok(technologies);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTechnology>> GetProjectTechnology(int id)
        {
            try
            {
                var technology = await _context.ProjectTechnologies.FindAsync(id);
                if (technology == null)
                {
                    Console.WriteLine($"Project technology with ID {id} not found");
                    return NotFound(new { Error = "Project technology not found." });
                }
                Console.WriteLine($"Retrieved project technology with ID {id}");
                return Ok(technology);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<ProjectTechnology>> CreateProjectTechnology([FromBody] ProjectTechnologyForm technologyForm)
        {
            Console.WriteLine($"Received POST request to CreateProjectTechnology, ProjectId: {technologyForm.ProjectId}, Technology: {technologyForm.Technology ?? "null"}");
            try
            {
                var technology = new ProjectTechnology
                {
                    ProjectId = technologyForm.ProjectId,
                    Technology = technologyForm.Technology
                };

                Console.WriteLine("Adding project technology to DbContext");
                _context.ProjectTechnologies.Add(technology);
                Console.WriteLine("Saving changes to database");
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Rows affected: {rowsAffected}, Project technology saved with ID: {technology.Id}");
                return CreatedAtAction(nameof(GetProjectTechnology), new { id = technology.Id }, technology);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectTechnology>> UpdateProjectTechnology(int id, [FromBody] ProjectTechnologyForm technologyForm)
        {
            Console.WriteLine($"Received PUT request to UpdateProjectTechnology ID: {id}");
            try
            {
                var technology = await _context.ProjectTechnologies.FindAsync(id);
                if (technology == null)
                {
                    Console.WriteLine($"Project technology with ID {id} not found");
                    return NotFound(new { Error = "Project technology not found." });
                }

                technology.ProjectId = technologyForm.ProjectId;
                technology.Technology = technologyForm.Technology;

                Console.WriteLine("Updating project technology in DbContext");
                _context.ProjectTechnologies.Update(technology);
                Console.WriteLine("Saving changes to database");
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Rows affected: {rowsAffected}, Project technology updated with ID: {id}");
                return Ok(technology);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProjectTechnology(int id)
        {
            Console.WriteLine($"Received DELETE request for ProjectTechnology ID: {id}");
            try
            {
                var technology = await _context.ProjectTechnologies.FindAsync(id);
                if (technology == null)
                {
                    Console.WriteLine($"Project technology with ID {id} not found");
                    return NotFound(new { Error = "Project technology not found." });
                }

                Console.WriteLine("Removing project technology from DbContext");
                _context.ProjectTechnologies.Remove(technology);
                Console.WriteLine("Saving changes to database");
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Rows affected: {rowsAffected}, Project technology deleted with ID: {id}");
                return NoContent();
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }
    }

    public class ProjectTechnologyForm
    {
        public int ProjectId { get; set; }
        public string? Technology { get; set; }
    }
}