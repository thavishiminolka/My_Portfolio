using System.ComponentModel.DataAnnotations;

namespace Portfolio.Models
{
    public class Profile
    {
        [Key]
        public int Id { get; set; } // Single record, e.g., Id = 1
        public byte[]? CvPdf { get; set; } // CV PDF as LONGBLOB/BYTEA
        public byte[]? Photo { get; set; } // Profile photo as LONGBLOB/BYTEA
    }

    public class ProfileForm
    {
        public IFormFile? CvPdf { get; set; } // Form file for CV PDF
        public IFormFile? Photo { get; set; } // Form file for profile photo
    }
}