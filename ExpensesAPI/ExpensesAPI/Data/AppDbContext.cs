using ExpensesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpensesAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext>  options) : base(options) { }

    public DbSet<Entry> Entries { get; set; }
    public DbSet<User> Users { get; set; }
}