using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using Portfolio.Data;
using Portfolio.Models;
using System;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Portfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public ContactController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult> SendContactMessage([FromBody] Contact contact)
        {
            Console.WriteLine($"Received POST request to SendContactMessage: Name={contact.Name}, Email={contact.Email}, Message={contact.Message}");

            // Validate input
            if (string.IsNullOrEmpty(contact.Name) || string.IsNullOrEmpty(contact.Email) || string.IsNullOrEmpty(contact.Message))
            {
                Console.WriteLine("Validation failed: Name, Email, and Message are required.");
                return BadRequest(new { Error = "Name, Email, and Message are required." });
            }

            if (!new System.ComponentModel.DataAnnotations.EmailAddressAttribute().IsValid(contact.Email))
            {
                Console.WriteLine("Validation failed: Invalid email format.");
                return BadRequest(new { Error = "Invalid email format." });
            }

            try
            {
                // Save to database
                contact.SubmittedAt = DateTime.UtcNow;
                Console.WriteLine("Adding contact to DbContext");
                _context.Contacts.Add(contact);
                Console.WriteLine("Saving changes to database");
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Rows affected: {rowsAffected}, Contact saved with ID: {contact.Id}");

                // Send email
                var smtpSettings = _configuration.GetSection("SmtpSettings");
                var smtpClient = new SmtpClient
                {
                    Host = smtpSettings["Host"],
                    Port = int.Parse(smtpSettings["Port"]),
                    EnableSsl = true,
                    Credentials = new System.Net.NetworkCredential(
                        smtpSettings["Username"],
                        smtpSettings["Password"]
                    )
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(smtpSettings["Username"], "Portfolio Contact Form"),
                    Subject = "New Contact Form Submission",
                    Body = $"Name: {contact.Name}\nEmail: {contact.Email}\nMessage: {contact.Message}\nSubmitted At: {contact.SubmittedAt:yyyy-MM-dd HH:mm:ss UTC}",
                    IsBodyHtml = false
                };
                mailMessage.To.Add("thavishiminolka@gmail.com");

                Console.WriteLine("Sending email...");
                await smtpClient.SendMailAsync(mailMessage);
                Console.WriteLine("Email sent successfully.");

                return Ok(new { Message = "Message sent successfully!" });
            }
            catch (SmtpException ex)
            {
                Console.WriteLine($"SMTP Error: {ex.Message}, StatusCode: {ex.StatusCode}, StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { Error = $"Failed to send email: {ex.Message}" });
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
    }
}