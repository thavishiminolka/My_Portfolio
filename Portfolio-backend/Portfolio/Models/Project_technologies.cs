namespace Portfolio.Models
{
    public class ProjectTechnology
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string? Technology { get; set; }
        public Project? Project { get; set; }
    }
}