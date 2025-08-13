using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Portfolio.Models;
namespace Portfolio.Data
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Education> Education { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectTechnology> ProjectTechnologies { get; set; }
        public DbSet<Blogs> Blogs { get; set; }
        public DbSet<Skills> Skills { get; set; }

        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Profile> Profiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map Projects to Project table
            modelBuilder.Entity<Project>()
                .ToTable("Project");

            // Map ProjectTechnologies to ProjectTechnology table
            modelBuilder.Entity<ProjectTechnology>()
                .ToTable("ProjectTechnology")
                .Property(pt => pt.ProjectId)
                .HasColumnName("Project_id");

            // Configure foreign key relationship
            modelBuilder.Entity<ProjectTechnology>()
                .HasOne(pt => pt.Project)
                .WithMany(p => p.ProjectTechnologies)
                .HasForeignKey(pt => pt.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Blogs>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Topic).HasMaxLength(100);
                entity.Property(e => e.Link).HasMaxLength(2048);
                entity.Property(e => e.Description).HasColumnType("TEXT");
                entity.Property(e => e.Image).HasColumnType("LONGBLOB");
            });

            modelBuilder.Entity<Contact>().ToTable("Contacts");

            modelBuilder.Entity<Profile>().ToTable("Profiles");

            base.OnModelCreating(modelBuilder);
        }

       


    }
}
