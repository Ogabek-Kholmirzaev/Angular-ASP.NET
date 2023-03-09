using ExpensesAPI.Data;
using ExpensesAPI.Dtos;
using ExpensesAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpensesAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class EntriesController : ControllerBase
{
    private readonly IEntriesService entriesService;

    public EntriesController(AppDbContext appDbContext, IEntriesService entriesService)
    {
        this.entriesService = entriesService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAllEntries()
    {
        return Ok(await this.entriesService.GetEntriesAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetEntry(int id)
    {
        return Ok(await this.entriesService.GetEntryByIdAsync(id));
    }

    [HttpPost]
    public async Task<IActionResult> CreateEntry([FromBody] CreateEntryDto createEntryDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await this.entriesService.CreateEntry(createEntryDto);
        
        return Ok("Entry was created!");
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateEntry(int id, [FromBody] UpdateEntryDto updateEntryDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await this.entriesService.UpdateEntry(id, updateEntryDto);

        return Ok("Entry updated!");
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteEntry(int id)
    {
        await this.entriesService.DeleteEntryAsync(id);
        
        return Ok("Entry deleted!");
    } 
}