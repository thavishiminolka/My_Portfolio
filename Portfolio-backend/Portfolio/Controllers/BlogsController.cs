using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using Portfolio.Data;
using Portfolio.Models;
using System;
using System.Data;
using System.IO;
using System.Reflection.Metadata;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BlogsController(AppDbContext context)
        {
            _context = context;
        }

        // Add this test endpoint to check database connection
        [HttpGet("test")]
        public async Task<ActionResult> TestConnection()
        {
            try
            {
                Console.WriteLine("Testing database connection...");
                var connectionString = _context.Database.GetConnectionString();
                Console.WriteLine($"Connection String: {connectionString}");

                // Test if we can connect at all
                var canConnect = await _context.Database.CanConnectAsync();
                Console.WriteLine($"Can connect to database: {canConnect}");

                if (!canConnect)
                {
                    return StatusCode(500, new { Error = "Cannot connect to database" });
                }

                // Try to get table info without accessing Blog model
                var tableExists = await _context.Database.ExecuteSqlRawAsync("SELECT 1 FROM Blogs LIMIT 1");
                Console.WriteLine("Blogs table accessible");

                return Ok(new { Status = "Database connection successful", CanConnect = canConnect });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Test Connection Error: {ex.ToString()}");
                return StatusCode(500, new { Error = ex.Message, Details = ex.InnerException?.Message });
            }
        }

        // Add this endpoint to check raw SQL query
        [HttpGet("raw")]
        public async Task<ActionResult> GetBlogsRaw()
        {
            try
            {
                Console.WriteLine("Executing raw SQL query...");

                using var connection = new MySqlConnection(_context.Database.GetConnectionString());
                await connection.OpenAsync();

                using var command = new MySqlCommand("SELECT Id, Topic, Description, Link FROM Blogs", connection);
                using var reader = await command.ExecuteReaderAsync();

                var blogs = new List<object>();
                while (await reader.ReadAsync())
                {
                    blogs.Add(new
                    {
                        Id = reader.GetInt32("Id"),
                        Topic = reader.IsDBNull("Topic") ? null : reader.GetString("Topic"),
                        Description = reader.IsDBNull("Description") ? null : reader.GetString("Description"),
                        Link = reader.IsDBNull("Link") ? null : reader.GetString("Link")
                    });
                }

                Console.WriteLine($"Raw query returned {blogs.Count} blogs");
                return Ok(blogs);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Raw SQL Error: {ex.ToString()}");
                return StatusCode(500, new { Error = ex.Message, Details = ex.InnerException?.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetBlogs()
        {
            try
            {
                Console.WriteLine("=== Starting GetBlogs ===");
                Console.WriteLine($"DbContext type: {_context.GetType().Name}");
                Console.WriteLine($"Connection string: {_context.Database.GetConnectionString()}");

                // Test database connection first
                var canConnect = await _context.Database.CanConnectAsync();
                Console.WriteLine($"Can connect: {canConnect}");

                if (!canConnect)
                {
                    return StatusCode(500, new { Error = "Cannot connect to database" });
                }

                Console.WriteLine("Attempting to query Blogs table with EF...");

                // Try to query without including Image first
                var blogsWithoutImage = await _context.Blogs
                    .Select(b => new { b.Id, b.Topic, b.Description, b.Link })
                    .ToListAsync();

                Console.WriteLine($"Retrieved {blogsWithoutImage.Count} blog records (without images)");

                // Now try with images
                var blogs = await _context.Blogs.ToListAsync();
                Console.WriteLine($"Retrieved {blogs.Count} blog records (with images)");

                var result = blogs.Select(b => new
                {
                    b.Id,
                    b.Topic,
                    b.Description,
                    b.Link,
                    Image = b.Image != null ? Convert.ToBase64String(b.Image) : null
                }).ToList();

                Console.WriteLine($"Returning {result.Count} blogs");
                Console.WriteLine("=== GetBlogs completed successfully ===");
                return Ok(result);
            }
            catch (MySqlException ex)
            {
                Console.WriteLine($"=== MySQL Error in GetBlogs ===");
                Console.WriteLine($"Error Number: {ex.Number}");
                Console.WriteLine($"Error Message: {ex.Message}");
                Console.WriteLine($"SQL State: {ex.SqlState}");
                Console.WriteLine($"Full Exception: {ex.ToString()}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");

                return StatusCode(500, new
                {
                    Error = $"Database error: {ex.Message}",
                    ErrorNumber = ex.Number,
                    SqlState = ex.SqlState
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"=== General Error in GetBlogs ===");
                Console.WriteLine($"Exception Type: {ex.GetType().Name}");
                Console.WriteLine($"Message: {ex.Message}");
                Console.WriteLine($"Inner Exception: {ex.InnerException?.ToString()}");
                Console.WriteLine($"Full Exception: {ex.ToString()}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");

                return StatusCode(500, new
                {
                    Error = $"An error occurred: {ex.Message}",
                    ExceptionType = ex.GetType().Name,
                    InnerException = ex.InnerException?.Message
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Blogs>> GetBlog(int id)
        {
            try
            {
                Console.WriteLine($"Executing GetBlog for ID: {id}");
                var blog = await _context.Blogs.FindAsync(id);
                if (blog == null)
                {
                    Console.WriteLine($"Blog with ID {id} not found");
                    return NotFound(new { Error = "Blog not found." });
                }
                Console.WriteLine($"Retrieved blog with ID {id}");

                var result = new
                {
                    blog.Id,
                    blog.Topic,
                    blog.Description,
                    blog.Link,
                    Image = blog.Image != null ? Convert.ToBase64String(blog.Image) : null
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetBlog: {ex.ToString()}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Blogs>> CreateBlog([FromForm] BlogForm blogForm)
        {
            Console.WriteLine("Received POST request to CreateBlog");
            Console.WriteLine($"Topic: {blogForm.Topic ?? "null"}, Description: {blogForm.Description ?? "null"}, Link: {blogForm.Link ?? "null"}, Image: {(blogForm.Image != null ? blogForm.Image.FileName : "null")}");

            // Validate URL if provided
            if (!string.IsNullOrEmpty(blogForm.Link) && !Uri.TryCreate(blogForm.Link, UriKind.Absolute, out _))
            {
                Console.WriteLine("Invalid URL format");
                return BadRequest(new { Error = "Invalid URL format." });
            }

            // Validate file type and size
            if (blogForm.Image != null)
            {
                if (!IsValidImage(blogForm.Image))
                {
                    Console.WriteLine("Invalid image type");
                    return BadRequest(new { Error = "Image must be an image (PNG, JPEG, GIF)." });
                }
                if (blogForm.Image.Length > 5 * 1024 * 1024)
                {
                    Console.WriteLine("Image file too large");
                    return BadRequest(new { Error = "Image file size must be less than 5MB." });
                }
            }

            try
            {
                var blog = new Blogs
                {
                    Topic = blogForm.Topic,
                    Description = blogForm.Description,
                    Link = blogForm.Link,
                    Image = blogForm.Image != null
                        ? await ConvertToByteArray(blogForm.Image)
                        : null
                };

                Console.WriteLine("Adding blog to DbContext");
                _context.Blogs.Add(blog);
                Console.WriteLine("Saving changes to database");
                var rowsAffected = await _context.SaveChangesAsync();
                Console.WriteLine($"Rows affected: {rowsAffected}, Blog saved with ID: {blog.Id}");

                var result = new
                {
                    blog.Id,
                    blog.Topic,
                    blog.Description,
                    blog.Link,
                    Image = blog.Image != null ? Convert.ToBase64String(blog.Image) : null
                };
                return CreatedAtAction(nameof(GetBlog), new { id = blog.Id }, result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in CreateBlog: {ex.ToString()}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Blogs>> UpdateBlog(int id, [FromForm] BlogForm blogForm)
        {
            Console.WriteLine($"Received PUT request to UpdateBlog ID: {id}");

            try
            {
                var blog = await _context.Blogs.FindAsync(id);
                if (blog == null)
                {
                    return NotFound(new { Error = "Blog not found." });
                }

                // Validate URL if provided
                if (!string.IsNullOrEmpty(blogForm.Link) && !Uri.TryCreate(blogForm.Link, UriKind.Absolute, out _))
                {
                    return BadRequest(new { Error = "Invalid URL format." });
                }

                // Validate file type and size
                if (blogForm.Image != null)
                {
                    if (!IsValidImage(blogForm.Image))
                    {
                        return BadRequest(new { Error = "Image must be an image (PNG, JPEG, GIF)." });
                    }
                    if (blogForm.Image.Length > 5 * 1024 * 1024)
                    {
                        return BadRequest(new { Error = "Image file size must be less than 5MB." });
                    }
                }

                blog.Topic = blogForm.Topic;
                blog.Description = blogForm.Description;
                blog.Link = blogForm.Link;
                blog.Image = blogForm.Image != null
                    ? await ConvertToByteArray(blogForm.Image)
                    : blog.Image;

                _context.Blogs.Update(blog);
                await _context.SaveChangesAsync();

                var result = new
                {
                    blog.Id,
                    blog.Topic,
                    blog.Description,
                    blog.Link,
                    Image = blog.Image != null ? Convert.ToBase64String(blog.Image) : null
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdateBlog: {ex.ToString()}");
                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBlog(int id)
        {
            try
            {
                var blog = await _context.Blogs.FindAsync(id);
                if (blog == null)
                {
                    return NotFound(new { Error = "Blog not found." });
                }

                _context.Blogs.Remove(blog);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in DeleteBlog: {ex.ToString()}");
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

    public class BlogForm
    {
        public string? Topic { get; set; }
        public IFormFile? Image { get; set; }
        public string? Description { get; set; }
        public string? Link { get; set; }
    }
}


//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using MySqlConnector;
//using Portfolio.Data;
//using Portfolio.Models;
//using System;
//using System.IO;
//using System.Reflection.Metadata;
//using System.Threading.Tasks;

//namespace Portfolio.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class BlogsController : ControllerBase
//    {
//        private readonly AppDbContext _context;

//        public BlogsController(AppDbContext context)
//        {
//            _context = context;
//        }

//        [HttpPost]
//        public async Task<ActionResult<Blogs>> CreateBlog([FromForm] BlogForm blogForm)
//        {
//            Console.WriteLine("Received POST request to CreateBlog");
//            Console.WriteLine($"Topic: {blogForm.Topic ?? "null"}, Description: {blogForm.Description ?? "null"}, Image: {(blogForm.Image != null ? blogForm.Image.FileName : "null")}");

//            // Validate file type and size
//            if (blogForm.Image != null)
//            {
//                if (!IsValidImage(blogForm.Image))
//                {
//                    Console.WriteLine("Invalid image type");
//                    return BadRequest(new { Error = "Image must be an image (PNG, JPEG, GIF)." });
//                }
//                if (blogForm.Image.Length > 5 * 1024 * 1024)
//                {
//                    Console.WriteLine("Image file too large");
//                    return BadRequest(new { Error = "Image file size must be less than 5MB." });
//                }
//            }

//            try
//            {
//                var blog = new Blogs
//                {
//                    Topic = blogForm.Topic,
//                    Description = blogForm.Description,
//                    Image = blogForm.Image != null
//                        ? await ConvertToByteArray(blogForm.Image)
//                        : null
//                };

//                Console.WriteLine("Adding blog to DbContext");
//                _context.Blogs.Add(blog);
//                Console.WriteLine("Saving changes to database");
//                var rowsAffected = await _context.SaveChangesAsync();
//                Console.WriteLine($"Rows affected: {rowsAffected}, Blog saved with ID: {blog.Id}");

//                var result = new
//                {
//                    blog.Id,
//                    blog.Topic,
//                    blog.Description,
//                    Image = blog.Image != null ? Convert.ToBase64String(blog.Image) : null
//                };
//                return CreatedAtAction(nameof(GetBlog), new { id = blog.Id }, result);
//            }
//            catch (MySqlException ex)
//            {
//                Console.WriteLine($"MySQL Error: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
//            }
//        }

//        [HttpGet]
//        public async Task<ActionResult> GetBlogs()
//        {
//            try
//            {
//                Console.WriteLine("Executing GetBlogs");
//                var blogs = await _context.Blogs.ToListAsync();
//                Console.WriteLine($"Retrieved {blogs.Count} blog records");

//                var result = blogs.Select(b => new
//                {
//                    b.Id,
//                    b.Topic,
//                    b.Description,
//                    Image = b.Image != null ? Convert.ToBase64String(b.Image) : null
//                }).ToList();
//                Console.WriteLine($"Returning {result.Count} blogs");
//                return Ok(result);
//            }
//            catch (MySqlException ex)
//            {
//                Console.WriteLine($"MySQL Error in GetBlogs: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"General Error in GetBlogs: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
//            }
//        }

//        [HttpGet("{id}")]
//        public async Task<ActionResult<Blogs>> GetBlog(int id)
//        {
//            try
//            {
//                Console.WriteLine($"Executing GetBlog for ID: {id}");
//                var blog = await _context.Blogs.FindAsync(id);
//                if (blog == null)
//                {
//                    Console.WriteLine($"Blog with ID {id} not found");
//                    return NotFound(new { Error = "Blog not found." });
//                }
//                Console.WriteLine($"Retrieved blog with ID {id}");

//                var result = new
//                {
//                    blog.Id,
//                    blog.Topic,
//                    blog.Description,
//                    Image = blog.Image != null ? Convert.ToBase64String(blog.Image) : null
//                };
//                return Ok(result);
//            }
//            catch (MySqlException ex)
//            {
//                Console.WriteLine($"MySQL Error: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
//            }
//        }

//        [HttpPut("{id}")]
//        public async Task<ActionResult<Blogs>> UpdateBlog(int id, [FromForm] BlogForm blogForm)
//        {
//            Console.WriteLine($"Received PUT request to UpdateBlog ID: {id}");
//            Console.WriteLine($"Topic: {blogForm.Topic ?? "null"}, Description: {blogForm.Description ?? "null"}, Image: {(blogForm.Image != null ? blogForm.Image.FileName : "null")}");

//            try
//            {
//                var blog = await _context.Blogs.FindAsync(id);
//                if (blog == null)
//                {
//                    Console.WriteLine($"Blog with ID {id} not found");
//                    return NotFound(new { Error = "Blog not found." });
//                }

//                // Validate file type and size
//                if (blogForm.Image != null)
//                {
//                    if (!IsValidImage(blogForm.Image))
//                    {
//                        Console.WriteLine("Invalid image type");
//                        return BadRequest(new { Error = "Image must be an image (PNG, JPEG, GIF)." });
//                    }
//                    if (blogForm.Image.Length > 5 * 1024 * 1024)
//                    {
//                        Console.WriteLine("Image file too large");
//                        return BadRequest(new { Error = "Image file size must be less than 5MB." });
//                    }
//                }

//                blog.Topic = blogForm.Topic;
//                blog.Description = blogForm.Description;
//                blog.Image = blogForm.Image != null
//                    ? await ConvertToByteArray(blogForm.Image)
//                    : blog.Image;

//                Console.WriteLine("Updating blog in DbContext");
//                _context.Blogs.Update(blog);
//                Console.WriteLine("Saving changes to database");
//                var rowsAffected = await _context.SaveChangesAsync();
//                Console.WriteLine($"Rows affected: {rowsAffected}, Blog updated with ID: {id}");

//                var result = new
//                {
//                    blog.Id,
//                    blog.Topic,
//                    blog.Description,
//                    Image = blog.Image != null ? Convert.ToBase64String(blog.Image) : null
//                };
//                return Ok(result);
//            }
//            catch (MySqlException ex)
//            {
//                Console.WriteLine($"MySQL Error: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"Database error: {ex.Message}" });
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"General Error: {ex.Message}, StackTrace: {ex.StackTrace}");
//                return StatusCode(500, new { Error = $"An error occurred: {ex.Message}" });
//            }
//        }

//        [HttpDelete("{id}")]
//        public async Task<ActionResult> DeleteBlog(int id)
//        {
//            Console.WriteLine($"Received DELETE request for Blog ID: {id}");
//            try
//            {
//                var blog = await _context.Blogs.FindAsync(id);
//                if (blog == null)
//                {
//                    Console.WriteLine($"Blog with ID {id} not found");
//                    return NotFound(new { Error = "Blog not found." });
//                }

//                Console.WriteLine("Removing blog from DbContext");
//                _context.Blogs.Remove(blog);
//                Console.WriteLine("Saving changes to database");
//                var rowsAffected = await _context.SaveChangesAsync();
//                Console.WriteLine($"Rows affected: {rowsAffected}, Blog deleted with ID: {id}");
//                return NoContent();
//            }
//            catch (MySqlException ex)
//            {
//                Console.WriteLine($"MySQL Error: {ex.Message}, StackTrace: {ex.StackTrace}");
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

//    public class BlogForm
//    {
//        public string? Topic { get; set; }
//        public IFormFile? Image { get; set; }
//        public string? Description { get; set; }
//    }
//}

