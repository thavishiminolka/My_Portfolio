using System.ComponentModel.DataAnnotations;

namespace Portfolio.Models
{
    public class Education
    {
        public int Id { get; set; }

       
        public string? Institute { get; set; }

        public string? Degree { get; set; }

        public string? Year {  get; set; }

        public string? Description { get; set; }

        public byte[]? Logo {  get; set; }

        public string? Results {  get; set; }
    }
}
