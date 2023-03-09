using ExpensesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpensesAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext>  options) : base(options) { }

    public DbSet<Entry> Entries { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var entries = new List<Entry>()
        {
            new Entry
            {
                Id = 1,
                Description = "Description1",
                IsExpense = false,
                Value = 10.99
            },
            new Entry
            {
                Id = 2,
                Description = "Description2",
                IsExpense = true,
                Value = 99.99
            },
            new Entry
            {
                Id = 3,
                Description = "Description3",
                IsExpense = false,
                Value = 20
            }
        };

        modelBuilder.Entity<Entry>().HasData(entries);

        base.OnModelCreating(modelBuilder);
    }
}