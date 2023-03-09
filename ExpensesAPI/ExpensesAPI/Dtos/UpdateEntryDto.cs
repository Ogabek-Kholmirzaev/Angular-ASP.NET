using System.ComponentModel.DataAnnotations;

namespace ExpensesAPI.Dtos;

public class UpdateEntryDto
{
    [Required]
    public string? Description { get; set; }
    [Required]
    public bool? IsExpense { get; set; }
    [Required]
    public double? Value { get; set; }
}