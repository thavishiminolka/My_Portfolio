//using System.Collections.Generic;

//namespace Portfolio.Models
//{
//    public class Project
//    {
//        public int Id { get; set; }
//        public string? Name { get; set; }
//        public byte[]? Image { get; set; }
//        public string? Type { get; set; }
//        public string? Status { get; set; }
//        public string? Description { get; set; }
//        public List<ProjectTechnology> ProjectTechnologies { get; set; } = new List<ProjectTechnology>();
//    }
//}

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Portfolio.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public byte[]? Image { get; set; }
        public string? Type { get; set; }
        public string? Status { get; set; }
        public string? Description { get; set; }
        [Url]
        public string? Link { get; set; }
        public List<ProjectTechnology> ProjectTechnologies { get; set; } = new List<ProjectTechnology>();
    }
}