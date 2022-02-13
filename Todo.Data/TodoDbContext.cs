using Microsoft.EntityFrameworkCore;
using Todo.Data.Models;

namespace Todo.Data
{
    public class TodoDbContext: DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        { }

        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().HasData(new Item { ItemId = 1, Description = "Prepare the lunch", IsComplete = false });
            modelBuilder.Entity<Item>().HasData(new Item { ItemId = 2, Description = "Get the Car wash done", IsComplete = false });
        }
    }
}
