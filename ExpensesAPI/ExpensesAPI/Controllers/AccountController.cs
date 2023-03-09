using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ExpensesAPI.Data;
using ExpensesAPI.Dtos;
using ExpensesAPI.Models;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ExpensesAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly IConfiguration configuration;
    private readonly AppDbContext appDbContext;

    public AccountController(IConfiguration configuration, AppDbContext appDbContext)
    {
        this.configuration = configuration;
        this.appDbContext = appDbContext;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
    {
        if (!ModelState.IsValid)
                return BadRequest(ModelState);

        var user = await this.appDbContext.Users.FirstOrDefaultAsync(user => 
            user.UserName == loginUserDto.UserName && user.Password == loginUserDto.Password);

        if (user == null)
            return BadRequest("Wrong credentials!");
        
        return Ok(CreateToken(user));
        
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userExists =
            await this.appDbContext.Users.FirstOrDefaultAsync(user => user.UserName == registerUserDto.UserName);

        if (userExists != null)
            return BadRequest("User already exists!");

        var user = registerUserDto.Adapt<User>();

        await this.appDbContext.Users.AddAsync(user);
        await this.appDbContext.SaveChangesAsync();

        return Ok(CreateToken(user));
    }

    private JwtPackage CreateToken(User user)
    {
        var keyByte = System.Text.Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!);
        var securityKey = new SigningCredentials(new SymmetricSecurityKey(keyByte), SecurityAlgorithms.HmacSha256);
        var claims = new Claim[]
        {
            new Claim(ClaimTypes.Name, user.UserName)
        };

        var security = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            audience: configuration["Jwt:Audience"],
            claims: claims,
            signingCredentials: securityKey, 
            expires: DateTime.Now.AddMinutes(20)
        );

        var token = new JwtSecurityTokenHandler().WriteToken(security);

        return new JwtPackage()
        {
            Token = token,
            UserName = user.UserName
        };
    }
}