

//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using MySqlConnector;
//using Portfolio.Data;
//using Portfolio.Models;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Threading.Tasks;

//namespace Portfolio.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class ProjectsController : ControllerBase
//    {
//        private readonly AppDbContext _context;

//        public ProjectsController(AppDbContext context)
//        {
//            _context = context;
//        }

//        [HttpPost]
//        public async Task<ActionResult<Project>> CreateProject([FromForm] ProjectForm projectForm)
//        {
//            Console.WriteLine("Received POST request to CreateProject");
//            Console.WriteLine($"Name: {projectForm.Name ?? "null"}, Type: {projectForm.Type ?? "null"}, Status: {projectForm.Status ?? "null"}, Description: {projectForm.Description ?? "null"}, Link: {projectForm.Link ?? "null"}, Image: {(projectForm.Image != null ? projectForm.Image.FileName : "null")}, Technologies: {(projectForm.Technologies != null ? string.Join(", ", projectForm.Technologies) : "null")}");

//            // Validate required fields
//            if (string.IsNullOrEmpty(projectForm.Name) || string.IsNullOrEmpty(projectForm.Type) || string.IsNullOrEmpty(projectForm.Status))
//            {
//                Console.WriteLine("Validation failed: Name, Type, and Status are required.");
//                return BadRequest(new { Error = "Name, Type, and Status are required." });
//            }

//            // Validate URL
//            if (!string.IsNullOrEmpty(projectForm.Link))
//            {
//                if (!Uri.TryCreate(projectForm.Link, UriKind.Absolute, out var uriResult) ||
//                    (uriResult.Scheme != Uri.UriSchemeHttp && uriResult.Scheme != Uri.UriSchemeHttps))
//                {
//                    Console.WriteLine("Validation failed: Invalid URL format.");
//                    return BadRequest(new { Error = "Link must be a valid URL (http or https)." });
//                }
//            }

//            // Validate file type and size
//            if (projectForm.Image != null)
//            {
//                if (!IsValidImage(projectForm.Image))
//                {
//                    Console.WriteLine("Invalid image type");
//                    return BadRequest(new { Error = "Image must be an image (PNG, JPEG, GIF)." });
//                }
//                if (projectForm.Image.Length > 5 * 1024 * 1024)
//                {
//                    Console.WriteLine("Image file too large");
//                    return BadRequest(new { Error = "Image file size must be less than 5MB." });
//                }
//            }

//            try
//            {
//                var project = new Project
//                {
//                    Name = projectForm.Name,
//                    Type = projectForm.Type,
//                    Status = projectForm.Status,
//                    Description = projectForm.Description,
//                    Link = projectForm.Link,
//                    Image = projectForm.Image != null
//                        ? await ConvertToByteArray(projectForm.Image)
//                        : null
//                };

//                if (projectForm.Technologies != null)
//                {
//                    project.ProjectTechnologies = projectForm.Technologies
//                        .Select(tech => new ProjectTechnology { Technology = tech })
//                        .ToList();
//                }

//                Console.WriteLine("Adding project to DbContext");
//                _context.Projects.Add(project);
//                Console.WriteLine("Saving changes to database");
//                var rowsAffected = await _context.SaveChangesAsync();
//                Console.WriteLine($"Rows affected: {rowsAffected}, Project saved with ID: {project.Id}");

//                var result = new
//                {
//                    project.Id,
//                    project.Name,
//                    project.Type,
//                    project.Status,
//                    project.Description,
//                    project.Link,
//                    Image = project.Image != null ? Convert.ToBase64String(project.Image) : null,
//                    Technologies = project.ProjectTechnologies?.Select(pt => pt.Technology)
//                        .Where(t => t != null)
//                        .Cast<string>()
//                        .ToList() ?? new List<string>()
//                };
//                return CreatedAtAction(nameof(GetProject), new { id = project.Id }, result);
//            }
//            catch (MySqlException ex)
//            {
//                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
//            }
//        }

//        [HttpGet]
//        public async Task<ActionResult> GetProjects()
//        {
//            try
//            {
//                Console.WriteLine("Executing GetProjects");
//                var projects = await _context.Projects
//                    .Include(p => p.ProjectTechnologies)
//                    .ToListAsync();
//                Console.WriteLine($"Retrieved {projects.Count} project records");

//                var result = projects.Select(p => new
//                {
//                    p.Id,
//                    p.Name,
//                    p.Type,
//                    p.Status,
//                    p.Description,
//                    p.Link,
//                    Image = p.Image != null ? Convert.ToBase64String(p.Image) : null,
//                    Technologies = p.ProjectTechnologies?.Select(pt => pt.Technology)
//                        .Where(t => t != null)
//                        .Cast<string>()
//                        .ToList() ?? new List<string>()
//                }).ToList();
//                Console.WriteLine($"Returning {result.Count} projects");
//                return Ok(result);
//            }
//            catch (MySqlException ex)
//            {
//                Console.WriteLine($"MySQL Error in GetProjects: {ex.Message}, Code: {ex.Number}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"General Error in GetProjects: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
//            }
//        }

//        [HttpGet("{id}")]
//        public async Task<ActionResult<Project>> GetProject(int id)
//        {
//            try
//            {
//                Console.WriteLine($"Executing GetProject for ID: {id}");
//                var project = await _context.Projects
//                    .Include(p => p.ProjectTechnologies)
//                    .FirstOrDefaultAsync(p => p.Id == id);
//                if (project == null)
//                {
//                    Console.WriteLine($"Project with ID {id} not found");
//                    return NotFound(new { Error = "Project not found." });
//                }
//                Console.WriteLine($"Retrieved project with ID {id}");

//                var result = new
//                {
//                    project.Id,
//                    project.Name,
//                    project.Type,
//                    project.Status,
//                    project.Description,
//                    project.Link,
//                    Image = project.Image != null ? Convert.ToBase64String(project.Image) : null,
//                    Technologies = project.ProjectTechnologies?.Select(pt => pt.Technology)
//                        .Where(t => t != null)
//                        .Cast<string>()
//                        .ToList() ?? new List<string>()
//                };
//                return Ok(result);
//            }
//            catch (MySqlException ex)
//            {
//                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
//            }
//        }

//        [HttpPut("{id}")]
//        public async Task<ActionResult<Project>> UpdateProject(int id, [FromForm] ProjectForm projectForm)
//        {
//            Console.WriteLine($"Received PUT request to UpdateProject ID: {id}");
//            Console.WriteLine($"Name: {projectForm.Name ?? "null"}, Type: {projectForm.Type ?? "null"}, Status: {projectForm.Status ?? "null"}, Description: {projectForm.Description ?? "null"}, Link: {projectForm.Link ?? "null"}, Image: {(projectForm.Image != null ? projectForm.Image.FileName : "null")}, Technologies: {(projectForm.Technologies != null ? string.Join(", ", projectForm.Technologies) : "null")}");

//            // Validate required fields
//            if (string.IsNullOrEmpty(projectForm.Name) || string.IsNullOrEmpty(projectForm.Type) || string.IsNullOrEmpty(projectForm.Status))
//            {
//                Console.WriteLine("Validation failed: Name, Type, and Status are required.");
//                return BadRequest(new { Error = "Name, Type, and Status are required." });
//            }

//            // Validate URL
//            if (!string.IsNullOrEmpty(projectForm.Link))
//            {
//                if (!Uri.TryCreate(projectForm.Link, UriKind.Absolute, out var uriResult) ||
//                    (uriResult.Scheme != Uri.UriSchemeHttp && uriResult.Scheme != Uri.UriSchemeHttps))
//                {
//                    Console.WriteLine("Validation failed: Invalid URL format.");
//                    return BadRequest(new { Error = "Link must be a valid URL (http or https)." });
//                }
//            }

//            try
//            {
//                var project = await _context.Projects
//                    .Include(p => p.ProjectTechnologies)
//                    .FirstOrDefaultAsync(p => p.Id == id);
//                if (project == null)
//                {
//                    Console.WriteLine($"Project with ID {id} not found");
//                    return NotFound(new { Error = "Project not found." });
//                }

//                // Validate file type and size
//                if (projectForm.Image != null)
//                {
//                    if (!IsValidImage(projectForm.Image))
//                    {
//                        Console.WriteLine("Invalid image type");
//                        return BadRequest(new { Error = "Image must be an image (PNG, JPEG, GIF)." });
//                    }
//                    if (projectForm.Image.Length > 5 * 1024 * 1024)
//                    {
//                        Console.WriteLine("Image file too large");
//                        return BadRequest(new { Error = "Image file size must be less than 5MB." });
//                    }
//                }

//                project.Name = projectForm.Name;
//                project.Type = projectForm.Type;
//                project.Status = projectForm.Status;
//                project.Description = projectForm.Description;
//                project.Link = projectForm.Link;
//                project.Image = projectForm.Image != null
//                    ? await ConvertToByteArray(projectForm.Image)
//                    : project.Image;

//                // Update technologies
//                if (projectForm.Technologies != null)
//                {
//                    _context.ProjectTechnologies.RemoveRange(project.ProjectTechnologies);
//                    project.ProjectTechnologies = projectForm.Technologies
//                        .Select(tech => new ProjectTechnology { Technology = tech })
//                        .ToList();
//                }

//                Console.WriteLine("Updating project in DbContext");
//                _context.Projects.Update(project);
//                Console.WriteLine("Saving changes to database");
//                var rowsAffected = await _context.SaveChangesAsync();
//                Console.WriteLine($"Rows affected: {rowsAffected}, Project updated with ID: {id}");

//                var result = new
//                {
//                    project.Id,
//                    project.Name,
//                    project.Type,
//                    project.Status,
//                    project.Description,
//                    project.Link,
//                    Image = project.Image != null ? Convert.ToBase64String(project.Image) : null,
//                    Technologies = project.ProjectTechnologies?.Select(pt => pt.Technology)
//                        .Where(t => t != null)
//                        .Cast<string>()
//                        .ToList() ?? new List<string>()
//                };
//                return Ok(result);
//            }
//            catch (MySqlException ex)
//            {
//                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
//            }
//        }

//        [HttpDelete("{id}")]
//        public async Task<ActionResult> DeleteProject(int id)
//        {
//            Console.WriteLine($"Received DELETE request for Project ID: {id}");
//            try
//            {
//                var project = await _context.Projects.FindAsync(id);
//                if (project == null)
//                {
//                    Console.WriteLine($"Project with ID {id} not found");
//                    return NotFound(new { Error = "Project not found." });
//                }

//                Console.WriteLine("Removing project from DbContext");
//                _context.Projects.Remove(project);
//                Console.WriteLine("Saving changes to database");
//                var rowsAffected = await _context.SaveChangesAsync();
//                Console.WriteLine($"Rows affected: {rowsAffected}, Project deleted with ID: {id}");
//                return NoContent();
//            }
//            catch (MySqlException ex)
//            {
//                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
//            }
//        }

//        private async Task<byte[]> ConvertToByteArray(IFormFile file)
//        {
//            try
//            {
//                Console.WriteLine($"Converting file {file.FileName} to byte array");
//                using var memoryStream = new MemoryStream();
//                await file.CopyToAsync(memoryStream);
//                return memoryStream.ToArray();
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"Error converting file to byte array: {ex.Message}");
//                throw;
//            }
//        }

//        private bool IsValidImage(IFormFile file)
//        {
//            var allowedTypes = new[] { "image/png", "image/jpeg", "image/gif" };
//            return allowedTypes.Contains(file.ContentType);
//        }
//    }

//    public class ProjectForm
//    {
//        public string? Name { get; set; }
//        public IFormFile? Image { get; set; }
//        public string? Type { get; set; }
//        public string? Status { get; set; }
//        public string? Description { get; set; }
//        public string? Link { get; set; }
//        public List<string>? Technologies { get; set; }
//    }
//}

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
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject([FromForm] ProjectForm projectForm)
        {
            Console.WriteLine("Received POST request to CreateProject");
            Console.WriteLine($"Name: {projectForm.Name ?? "null"}, Type: {projectForm.Type ?? "null"}, Status: {projectForm.Status ?? "null"}, Description: {projectForm.Description ?? "null"}, Link: {projectForm.Link ?? "null"}, Image: {(projectForm.Image != null ? projectForm.Image.FileName : "null")}, Technologies: {(projectForm.Technologies != null ? string.Join(", ", projectForm.Technologies) : "null")}");

            // Validate required fields
            if (string.IsNullOrEmpty(projectForm.Name) || string.IsNullOrEmpty(projectForm.Type) || string.IsNullOrEmpty(projectForm.Status))
            {
                Console.WriteLine("Validation failed: Name, Type, and Status are required.");
                return BadRequest(new { Error = "Name, Type, and Status are required." });
            }

            // Validate URL
            if (!string.IsNullOrEmpty(projectForm.Link))
            {
                if (!Uri.TryCreate(projectForm.Link, UriKind.Absolute, out var uriResult) ||
                    (uriResult.Scheme != Uri.UriSchemeHttp && uriResult.Scheme != Uri.UriSchemeHttps))
                {
                    Console.WriteLine("Validation failed: Invalid URL format.");
                    return BadRequest(new { Error = "Link must be a valid URL (http or https)." });
                }
            }

            // Validate file type and size
            if (projectForm.Image != null)
            {
                if (!IsValidImage(projectForm.Image))
                {
                    Console.WriteLine("Invalid image type");
                    return BadRequest(new { Error = "Image must be an image (PNG, JPEG, GIF)." });
                }
                if (projectForm.Image.Length > 5 * 1024 * 1024)
                {
                    Console.WriteLine("Image file too large");
                    return BadRequest(new { Error = "Image file size must be less than 5MB." });
                }
            }

            try
            {
                var project = new Project
                {
                    Name = projectForm.Name,
                    Type = projectForm.Type,
                    Status = projectForm.Status,
                    Description = projectForm.Description,
                    Link = projectForm.Link,
                    Image = projectForm.Image != null
                        ? await ConvertToByteArray(projectForm.Image)
                        : null
                };

                if (projectForm.Technologies != null)
                {
                    project.ProjectTechnologies = projectForm.Technologies
                        .Select(tech => new ProjectTechnology { Technology = tech })
                        .ToList();
                }

                Console.WriteLine("Adding project to DbContext");
                _context.Projects.Add(project);
                Console.WriteLine("Saving changes to database");
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Rows affected: {rowsAffected}, Project saved with ID: {project.Id}");

                var result = new
                {
                    project.Id,
                    project.Name,
                    project.Type,
                    project.Status,
                    project.Description,
                    project.Link,
                    Image = project.Image != null ? Convert.ToBase64String(project.Image) : null,
                    Technologies = project.ProjectTechnologies?.Select(pt => pt.Technology)
                        .Where(t => t != null)
                        .Cast<string>()
                        .ToList() ?? new List<string>()
                };
                return CreatedAtAction(nameof(GetProject), new { id = project.Id }, result);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetProjects()
        {
            try
            {
                Console.WriteLine("Executing GetProjects");
                var projects = await _context.Projects
                    .Include(p => p.ProjectTechnologies)
                    .OrderByDescending(p => p.Id) // Sort by Id descending
                    .ToListAsync();
                Console.WriteLine($"Retrieved {projects.Count} project records");

                var result = projects.Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Type,
                    p.Status,
                    p.Description,
                    p.Link,
                    Image = p.Image != null ? Convert.ToBase64String(p.Image) : null,
                    Technologies = p.ProjectTechnologies?.Select(pt => pt.Technology)
                        .Where(t => t != null)
                        .Cast<string>()
                        .ToList() ?? new List<string>()
                }).ToList();
                Console.WriteLine($"Returning {result.Count} projects");
                return Ok(result);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error in GetProjects: {ex.Message}, Code: {ex.Number}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error in GetProjects: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            try
            {
                Console.WriteLine($"Executing GetProject for ID: {id}");
                var project = await _context.Projects
                    .Include(p => p.ProjectTechnologies)
                    .FirstOrDefaultAsync(p => p.Id == id);
                if (project == null)
                {
                    Console.WriteLine($"Project with ID {id} not found");
                    return NotFound(new { Error = "Project not found." });
                }
                Console.WriteLine($"Retrieved project with ID {id}");

                var result = new
                {
                    project.Id,
                    project.Name,
                    project.Type,
                    project.Status,
                    project.Description,
                    project.Link,
                    Image = project.Image != null ? Convert.ToBase64String(project.Image) : null,
                    Technologies = project.ProjectTechnologies?.Select(pt => pt.Technology)
                        .Where(t => t != null)
                        .Cast<string>()
                        .ToList() ?? new List<string>()
                };
                return Ok(result);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Project>> UpdateProject(int id, [FromForm] ProjectForm projectForm)
        {
            Console.WriteLine($"Received PUT request to UpdateProject ID: {id}");
            Console.WriteLine($"Name: {projectForm.Name ?? "null"}, Type: {projectForm.Type ?? "null"}, Status: {projectForm.Status ?? "null"}, Description: {projectForm.Description ?? "null"}, Link: {projectForm.Link ?? "null"}, Image: {(projectForm.Image != null ? projectForm.Image.FileName : "null")}, Technologies: {(projectForm.Technologies != null ? string.Join(", ", projectForm.Technologies) : "null")}");

            // Validate required fields
            if (string.IsNullOrEmpty(projectForm.Name) || string.IsNullOrEmpty(projectForm.Type) || string.IsNullOrEmpty(projectForm.Status))
            {
                Console.WriteLine("Validation failed: Name, Type, and Status are required.");
                return BadRequest(new { Error = "Name, Type, and Status are required." });
            }

            // Validate URL
            if (!string.IsNullOrEmpty(projectForm.Link))
            {
                if (!Uri.TryCreate(projectForm.Link, UriKind.Absolute, out var uriResult) ||
                    (uriResult.Scheme != Uri.UriSchemeHttp && uriResult.Scheme != Uri.UriSchemeHttps))
                {
                    Console.WriteLine("Validation failed: Invalid URL format.");
                    return BadRequest(new { Error = "Link must be a valid URL (http or https)." });
                }
            }

            try
            {
                var project = await _context.Projects
                    .Include(p => p.ProjectTechnologies)
                    .FirstOrDefaultAsync(p => p.Id == id);
                if (project == null)
                {
                    Console.WriteLine($"Project with ID {id} not found");
                    return NotFound(new { Error = "Project not found." });
                }

                // Validate file type and size
                if (projectForm.Image != null)
                {
                    if (!IsValidImage(projectForm.Image))
                    {
                        Console.WriteLine("Invalid image type");
                        return BadRequest(new { Error = "Image must be an image (PNG, JPEG, GIF)." });
                    }
                    if (projectForm.Image.Length > 5 * 1024 * 1024)
                    {
                        Console.WriteLine("Image file too large");
                        return BadRequest(new { Error = "Image file size must be less than 5MB." });
                    }
                }

                project.Name = projectForm.Name;
                project.Type = projectForm.Type;
                project.Status = projectForm.Status;
                project.Description = projectForm.Description;
                project.Link = projectForm.Link;
                project.Image = projectForm.Image != null
                    ? await ConvertToByteArray(projectForm.Image)
                    : project.Image;

                // Update technologies
                if (projectForm.Technologies != null)
                {
                    _context.ProjectTechnologies.RemoveRange(project.ProjectTechnologies);
                    project.ProjectTechnologies = projectForm.Technologies
                        .Select(tech => new ProjectTechnology { Technology = tech })
                        .ToList();
                }

                Console.WriteLine("Updating project in DbContext");
                _context.Projects.Update(project);
                Console.WriteLine("Saving changes to database");
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Rows affected: {rowsAffected}, Project updated with ID: {id}");

                var result = new
                {
                    project.Id,
                    project.Name,
                    project.Type,
                    project.Status,
                    project.Description,
                    project.Link,
                    Image = project.Image != null ? Convert.ToBase64String(project.Image) : null,
                    Technologies = project.ProjectTechnologies?.Select(pt => pt.Technology)
                        .Where(t => t != null)
                        .Cast<string>()
                        .ToList() ?? new List<string>()
                };
                return Ok(result);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            Console.WriteLine($"Received DELETE request for Project ID: {id}");
            try
            {
                var project = await _context.Projects.FindAsync(id);
                if (project == null)
                {
                    Console.WriteLine($"Project with ID {id} not found");
                    return NotFound(new { Error = "Project not found." });
                }

                Console.WriteLine("Removing project from DbContext");
                _context.Projects.Remove(project);
                Console.WriteLine("Saving changes to database");
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Rows affected: {rowsAffected}, Project deleted with ID: {id}");
                return NoContent();
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}, StackTrace: {ex.StackTrace}");
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
            try
            {
                Console.WriteLine($"Converting file {file.FileName} to byte array");
                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error converting file to byte array: {ex.Message}");
                throw;
            }
        }

        private bool IsValidImage(IFormFile file)
        {
            var allowedTypes = new[] { "image/png", "image/jpeg", "image/gif" };
            return allowedTypes.Contains(file.ContentType);
        }
    }

    public class ProjectForm
    {
        public string? Name { get; set; }
        public IFormFile? Image { get; set; }
        public string? Type { get; set; }
        public string? Status { get; set; }
        public string? Description { get; set; }
        public string? Link { get; set; }
        public List<string>? Technologies { get; set; }
    }
}