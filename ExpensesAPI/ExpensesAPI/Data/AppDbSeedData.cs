using ExpensesAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace ExpensesAPI.Data;

public static class AppDbSeedData
{
    public static void Seed(IApplicationBuilder applicationBuilder)
    {
        using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
        {
            var context = serviceScope.ServiceProvider.GetService<AppDbContext>();

            context!.Database.EnsureCreated();

            if (!context.Entries.Any())
            {
                context.Entries.AddRange(new List<Entry>()
                {
                    new Entry
                    {
                        Id = 1,
                        Description = "Iphone",
                        IsExpense = false,
                        Value = 10.99
                    },
                    new Entry
                    {
                        Id = 2,
                        Description = "Salary",
                        IsExpense = true,
                        Value = 99.99
                    },
                    new Entry
                    {
                        Id = 3,
                        Description = "Vegetable",
                        IsExpense = false,
                        Value = 20
                    }
                });

                context.SaveChanges();
            }
        }
    }
}