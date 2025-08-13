using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
using Portfolio.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        // Get CV PDF
        [HttpGet("cv")]
        public async Task<IActionResult> GetCv()
        {
            try
            {
                var profile = await _context.Profiles.FirstOrDefaultAsync();
                if (profile == null || profile.CvPdf == null)
                {
                    Console.WriteLine("CV not found");
                    return NotFound(new { Error = "CV not found." });
                }
                return File(profile.CvPdf, "application/pdf", "Thavishi_Weerasinghe_CV.pdf");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching CV: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        // Get Profile Photo
        [HttpGet("photo")]
        public async Task<IActionResult> GetPhoto()
        {
            try
            {
                var profile = await _context.Profiles.FirstOrDefaultAsync();
                if (profile == null || profile.Photo == null)
                {
                    Console.WriteLine("Photo not found");
                    return NotFound(new { Error = "Photo not found." });
                }
                return File(profile.Photo, "image/jpeg", "profile.jpg");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching photo: {ex.Message}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        // Update Profile (CV and Photo)
        [HttpPost]
        public async Task<IActionResult> UpdateProfile([FromForm] ProfileForm profileForm)
        {
            Console.WriteLine($"Received POST request to UpdateProfile. CV: {(profileForm.CvPdf != null ? profileForm.CvPdf.FileName : "null")}, Photo: {(profileForm.Photo != null ? profileForm.Photo.FileName : "null")}");

            // Validate file types and sizes
            if (profileForm.CvPdf != null)
            {
                if (!IsValidPdf(profileForm.CvPdf))
                {
                    Console.WriteLine("Invalid CV file type");
                    return BadRequest(new { Error = "CV must be a PDF file." });
                }
                if (profileForm.CvPdf.Length > 5 * 1024 * 1024)
                {
                    Console.WriteLine("CV file too large");
                    return BadRequest(new { Error = "CV file size must be less than 5MB." });
                }
            }
            if (profileForm.Photo != null)
            {
                if (!IsValidImage(profileForm.Photo))
                {
                    Console.WriteLine("Invalid photo type");
                    return BadRequest(new { Error = "Photo must be an image (PNG, JPEG, GIF)." });
                }
                if (profileForm.Photo.Length > 5 * 1024 * 1024)
                {
                    Console.WriteLine("Photo file too large");
                    return BadRequest(new { Error = "Photo file size must be less than 5MB." });
                }
            }

            try
            {
                var profile = await _context.Profiles.FirstOrDefaultAsync();
                if (profile == null)
                {
                    profile = new Profile();
                    _context.Profiles.Add(profile);
                }

                if (profileForm.CvPdf != null)
                {
                    profile.CvPdf = await ConvertToByteArray(profileForm.CvPdf);
                }
                if (profileForm.Photo != null)
                {
                    profile.Photo = await ConvertToByteArray(profileForm.Photo);
                }

                Console.WriteLine("Saving profile to database");
                await _context.SaveChangesAsync();
                Console.WriteLine("Profile saved successfully");

                return Ok(new { Message = "Profile updated successfully." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating profile: {ex.Message}, StackTrace: {ex.StackTrace}");
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
                Console.WriteLine($"Error converting file: {ex.Message}");
                throw;
            }
        }

        private bool IsValidPdf(IFormFile file)
        {
            return file.ContentType == "application/pdf";
        }

        private bool IsValidImage(IFormFile file)
        {
            var allowedTypes = new[] { "image/png", "image/jpeg", "image/gif" };
            return allowedTypes.Contains(file.ContentType);
        }
    }
}