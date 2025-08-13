////using Microsoft.AspNetCore.Mvc;
////using Microsoft.EntityFrameworkCore;
////using MySqlConnector;
////using Portfolio.Data;
////using Portfolio.Models;

////namespace Portfolio.Controllers
////{
////    [ApiController]
////    [Route("api/[controller]")]
////    public class EducationController : Controller
////    {
////        private readonly AppDbContext _context;

////        public EducationController(AppDbContext context)
////        {
////            _context = context;
////        }

////        //[HttpPost("addEducation")]

////        //public async Task<IActionResult> addEducation([FromForm] Education education)
////        //{
////        //    try
////        //    {
////        //        _context.Education.Add(education);
////        //        int r = await _context.SaveChangesAsync();
////        //        if (r > 0)
////        //        {
////        //            return Ok(new
////        //            {
////        //                Message = "Education Added Successfully",
////        //                Education_ID = education.Id
////        //            });
////        //        }
////        //        else
////        //        {
////        //            return BadRequest(new
////        //            {
////        //                Error = "Cannot add education"
////        //            });
////        //        }
////        //    }
////        //    catch (MySqlException ex)
////        //    {
////        //        return BadRequest(new
////        //        { 
////        //            Error=ex.Message
////        //        });
////        //    }
////        //}

////        [HttpPost("CreateEducation")]
////        public async Task<ActionResult<Education>> CreateEducation([FromForm] EducationForm educationForm)
////        {
////            var education = new Education
////            {
////                Institute = educationForm.Institute,
////                Year = educationForm.Year,
////                Description = educationForm.Description,
////                Results = educationForm.Results,
////                Logo = educationForm.Logo != null
////                    ? await ConvertToByteArray(educationForm.Logo)
////                    : null
////            };

////            _context.Education.Add(education);
////            await _context.SaveChangesAsync();
////            return CreatedAtAction(nameof(GetEducation), new { id = education.Id }, education);
////        }



////        [HttpGet("GetEducation/{id}")]
////        public async Task<ActionResult<Education>> GetEducation(int id)
////        {
////            var education = await _context.Education.FindAsync(id);
////            if (education == null)
////            {
////                return NotFound();
////            }
////            return education;
////        }

////        [HttpGet("GetEducations")]

////        public async Task<IActionResult> GetEducations()
////        {
////            try
////            {
////                var educations = await _context.Education.ToListAsync();
////                return View(educations);
////            }
////            catch (MySqlException ex)
////            {
////                return BadRequest(new
////                {
////                    Error = ex.Message
////                });
////            }
////        }
////        private async Task<byte[]> ConvertToByteArray(IFormFile file)
////        {
////            using var memoryStream = new MemoryStream();
////            await file.CopyToAsync(memoryStream);
////            return memoryStream.ToArray();
////        }


////    }

////    public class EducationForm
////    {
////        public string Institute { get; set; }
////        public string Year { get; set; }
////        public string Description { get; set; }
////        public IFormFile? Logo { get; set; }
////        public string Results { get; set; }
////    }
////}



//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using MySqlConnector;
//using Portfolio.Data;
//using Portfolio.Models;
//using System;
//using System.IO;
//using System.Threading.Tasks;

//namespace Portfolio.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class EducationController : ControllerBase
//    {
//        private readonly AppDbContext _context;

//        public EducationController(AppDbContext context)
//        {
//            _context = context;
//        }

//        // POST: api/education
//        [HttpPost]
//        public async Task<ActionResult<Education>> CreateEducation([FromForm] EducationForm educationForm)
//        {
//            Console.WriteLine("Received POST request to CreateEducation");
//            Console.WriteLine($"Institute: {educationForm.Institute}, Year: {educationForm.Year}");

//            // Validate file type and size
//            if (educationForm.Logo != null)
//            {
//                if (!IsValidImage(educationForm.Logo))
//                {
//                    return BadRequest(new { Error = "Logo must be an image (PNG, JPEG, GIF)." });
//                }
//                if (educationForm.Logo.Length > 5 * 1024 * 1024)
//                {
//                    return BadRequest(new { Error = "Logo file size must be less than 5MB." });
//                }
//            }

//            try
//            {
//                var education = new Education
//                {
//                    Institute = educationForm.Institute,
//                    Year = educationForm.Year,
//                    Description = educationForm.Description,
//                    Results = educationForm.Results,
//                    Logo = educationForm.Logo != null
//                        ? await ConvertToByteArray(educationForm.Logo)
//                        : null
//                };

//                Console.WriteLine("Adding education to DbContext");
//                _context.Education.Add(education);
//                Console.WriteLine("Saving changes to database");
//                await _context.SaveChangesAsync();
//                Console.WriteLine($"Education saved with ID: {education.Id}");
//                return CreatedAtAction(nameof(GetEducation), new { id = education.Id }, education);
//            }
//            catch (MySqlException ex)
//            {
//                Console.WriteLine($"MySQL Error: {ex.Message}");
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"General Error: {ex.Message}");
//                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
//            }
//        }

//        // GET: api/education
//        [HttpGet]
//        public async Task<ActionResult> GetEducations()
//        {
//            try
//            {
//                var educations = await _context.Education.ToListAsync();
//                return Ok(educations);
//            }
//            catch (MySqlException ex)
//            {
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//        }

//        // GET: api/education/{id}
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Education>> GetEducation(int id)
//        {
//            try
//            {
//                var education = await _context.Education.FindAsync(id);
//                if (education == null)
//                {
//                    return NotFound(new { Error = "Education not found." });
//                }
//                return Ok(education);
//            }
//            catch (MySqlException ex)
//            {
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//        }

//        // PUT: api/education/{id}
//        [HttpPut("{id}")]
//        public async Task<IActionResult> UpdateEducation(int id, [FromForm] EducationForm educationForm)
//        {
//            try
//            {
//                var education = await _context.Education.FindAsync(id);
//                if (education == null)
//                {
//                    return NotFound(new { Error = "Education not found." });
//                }

//                // Validate file type and size
//                if (educationForm.Logo != null)
//                {
//                    if (!IsValidImage(educationForm.Logo))
//                    {
//                        return BadRequest(new { Error = "Logo must be an image (PNG, JPEG, GIF)." });
//                    }
//                    if (educationForm.Logo.Length > 5 * 1024 * 1024)
//                    {
//                        return BadRequest(new { Error = "Logo file size must be less than 5MB." });
//                    }
//                }

//                education.Institute = educationForm.Institute;
//                education.Year = educationForm.Year;
//                education.Description = educationForm.Description;
//                education.Results = educationForm.Results;
//                if (educationForm.Logo != null)
//                {
//                    education.Logo = await ConvertToByteArray(educationForm.Logo);
//                }

//                _context.Entry(education).State = EntityState.Modified;
//                await _context.SaveChangesAsync();
//                return NoContent();
//            }
//            catch (MySqlException ex)
//            {
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!await _context.Education.AnyAsync(e => e.Id == id))
//                {
//                    return NotFound(new { Error = "Education not found." });
//                }
//                throw;
//            }
//        }

//        // DELETE: api/education/{id}
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteEducation(int id)
//        {
//            try
//            {
//                var education = await _context.Education.FindAsync(id);
//                if (education == null)
//                {
//                    return NotFound(new { Error = "Education not found." });
//                }

//                _context.Education.Remove(education);
//                await _context.SaveChangesAsync();
//                return NoContent();
//            }
//            catch (MySqlException ex)
//            {
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//        }

//        private async Task<byte[]> ConvertToByteArray(IFormFile file)
//        {
//            using var memoryStream = new MemoryStream();
//            await file.CopyToAsync(memoryStream);
//            return memoryStream.ToArray();
//        }

//        private bool IsValidImage(IFormFile file)
//        {
//            var allowedTypes = new[] { "image/png", "image/jpeg", "image/gif" };
//            return allowedTypes.Contains(file.ContentType);
//        }
//    }

//    public class EducationForm
//    {
//        public string? Institute { get; set; }
//        public string? Year { get; set; }
//        public string? Description { get; set; }
//        public IFormFile? Logo { get; set; }
//        public string? Results { get; set; }
//    }
//}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using Portfolio.Data;
using Portfolio.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EducationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EducationController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/education
        [HttpPost]
        public async Task<ActionResult<Education>> CreateEducation([FromForm] EducationForm educationForm)
        {
            Console.WriteLine("Received POST request to CreateEducation");
            Console.WriteLine($"Institute: {educationForm.Institute}, Year: {educationForm.Year}, Degree: {educationForm.Degree}, Description: {educationForm.Description}, Results: {educationForm.Results}, Logo: {(educationForm.Logo != null ? educationForm.Logo.FileName : "null")}");

            // Validate input
            if (string.IsNullOrEmpty(educationForm.Institute) || string.IsNullOrEmpty(educationForm.Year) || string.IsNullOrEmpty(educationForm.Degree))
            {
                Console.WriteLine("Validation failed: Institute, Year, and Degree are required.");
                return BadRequest(new { Error = "Institute, Year, and Degree are required." });
            }

            // Validate file type and size
            if (educationForm.Logo != null)
            {
                Console.WriteLine($"Logo Content-Type: {educationForm.Logo.ContentType}, Size: {educationForm.Logo.Length} bytes");
                if (!IsValidImage(educationForm.Logo))
                {
                    Console.WriteLine("Validation failed: Invalid image type.");
                    return BadRequest(new { Error = "Logo must be an image (PNG, JPEG, GIF)." });
                }
                if (educationForm.Logo.Length > 5 * 1024 * 1024)
                {
                    Console.WriteLine("Validation failed: Logo size exceeds 5MB.");
                    return BadRequest(new { Error = "Logo file size must be less than 5MB." });
                }
            }

            try
            {
                var education = new Education
                {
                    Institute = educationForm.Institute,
                    Year = educationForm.Year,
                    Degree = educationForm.Degree,
                    Description = educationForm.Description,
                    Results = educationForm.Results,
                    Logo = educationForm.Logo != null
                        ? await ConvertToByteArray(educationForm.Logo)
                        : null
                };

                Console.WriteLine("Adding education to DbContext");
                _context.Education.Add(education);
                Console.WriteLine("Saving changes to database");
                await _context.SaveChangesAsync();
                Console.WriteLine($"Education saved with ID: {education.Id}");
                return CreatedAtAction(nameof(GetEducation), new { id = education.Id }, education);
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

        // GET: api/education
        [HttpGet]
        public async Task<ActionResult> GetEducations()
        {
            try
            {
                var educations = await _context.Education
                    .Select(e => new
                    {
                        e.Id,
                        e.Degree,
                        e.Institute,
                        e.Year,
                        e.Description,
                        e.Results,
                        Logo = e.Logo != null ? Convert.ToBase64String(e.Logo) : null
                    })
                    .ToListAsync();
                Console.WriteLine($"Fetched {educations.Count} education entries");
                return Ok(educations);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
        }

        // GET: api/education/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult> GetEducation(int id)
        {
            try
            {
                var education = await _context.Education
                    .Where(e => e.Id == id)
                    .Select(e => new
                    {
                        e.Id,
                        e.Degree,
                        e.Institute,
                        e.Year,
                        e.Description,
                        e.Results,
                        Logo = e.Logo != null ? Convert.ToBase64String(e.Logo) : null
                    })
                    .FirstOrDefaultAsync();
                if (education == null)
                {
                    Console.WriteLine($"Education with ID {id} not found");
                    return NotFound(new { Error = "Education not found." });
                }
                Console.WriteLine($"Fetched education with ID {id}");
                return Ok(education);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
        }

        // PUT: api/education/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEducation(int id, [FromForm] EducationForm educationForm)
        {
            try
            {
                var education = await _context.Education.FindAsync(id);
                if (education == null)
                {
                    Console.WriteLine($"Education with ID {id} not found");
                    return NotFound(new { Error = "Education not found." });
                }

                // Validate file type and size
                if (educationForm.Logo != null)
                {
                    if (!IsValidImage(educationForm.Logo))
                    {
                        Console.WriteLine("Validation failed: Invalid image type.");
                        return BadRequest(new { Error = "Logo must be an image (PNG, JPEG, GIF)." });
                    }
                    if (educationForm.Logo.Length > 5 * 1024 * 1024)
                    {
                        Console.WriteLine("Validation failed: Logo size exceeds 5MB.");
                        return BadRequest(new { Error = "Logo file size must be less than 5MB." });
                    }
                }

                education.Institute = educationForm.Institute;
                education.Year = educationForm.Year;
                education.Degree = educationForm.Degree;
                education.Description = educationForm.Description;
                education.Results = educationForm.Results;
                if (educationForm.Logo != null)
                {
                    education.Logo = await ConvertToByteArray(educationForm.Logo);
                }

                Console.WriteLine($"Updating education with ID {id}");
                _context.Entry(education).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                Console.WriteLine($"Education with ID {id} updated");
                return NoContent();
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Education.AnyAsync(e => e.Id == id))
                {
                    Console.WriteLine($"Education with ID {id} not found during update");
                    return NotFound(new { Error = "Education not found." });
                }
                throw;
            }
        }

        // DELETE: api/education/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEducation(int id)
        {
            try
            {
                var education = await _context.Education.FindAsync(id);
                if (education == null)
                {
                    Console.WriteLine($"Education with ID {id} not found");
                    return NotFound(new { Error = "Education not found." });
                }

                Console.WriteLine($"Deleting education with ID {id}");
                _context.Education.Remove(education);
                await _context.SaveChangesAsync();
                Console.WriteLine($"Education with ID {id} deleted");
                return NoContent();
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"MySQL Error: {ex.Message}, Code: {ex.Number}");
                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
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

    public class EducationForm
    {
        public string? Institute { get; set; }
        public string? Year { get; set; }
        public string? Degree { get; set; }
        public string? Description { get; set; }
        public IFormFile? Logo { get; set; }
        public string? Results { get; set; }
    }
}