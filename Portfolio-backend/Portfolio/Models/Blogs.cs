
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Models
{
    [Table("Blogs")]  // Explicitly specify table name
    public class Blogs
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Topic")]
        public string? Topic { get; set; }

        [Column("Image")]
        public byte[]? Image { get; set; }

        [Column("Description")]
        public string? Description { get; set; }

        [Url]
        [Column("link")]  // This explicitly maps to the "Link" column in database
        public string? Link { get; set; }
    }
}