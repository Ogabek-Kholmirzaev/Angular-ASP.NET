using System.ComponentModel.DataAnnotations;

namespace ExpensesAPI.Dtos;

public class RegisterUserDto
{
    [Required]
    public string? UserName { get; set; }
    
    [Required]
    public string? Password { get; set; }
    
    //[Required]
    //[Compare(nameof(Password), ErrorMessage = "Password doesn't equal to confirm password")]
    //public string? ConfirmPassword { get; set; }
}