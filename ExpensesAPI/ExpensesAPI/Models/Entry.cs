namespace ExpensesAPI.Models;

public class Entry
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public bool IsExpense { get; set; }
    public double Value { get; set; }
}