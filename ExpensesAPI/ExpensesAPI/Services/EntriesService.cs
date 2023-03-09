using ExpensesAPI.Data;
using ExpensesAPI.Dtos;
using ExpensesAPI.Exceptions;
using ExpensesAPI.Models;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace ExpensesAPI.Services;

public class EntriesService : IEntriesService
{
    private readonly AppDbContext appDbContext;

    public EntriesService(AppDbContext appDbContext)
    {
        this.appDbContext = appDbContext;
    }

    public async Task<List<EntryDto>> GetEntriesAsync()
    {
        var entries = await this.appDbContext.Entries.ToListAsync();
        var entriesDto = entries.Adapt<List<EntryDto>>();

        return entriesDto;
    }

    public async Task<EntryDto> GetEntryByIdAsync(int id)
    {
        var entry = await this.appDbContext.Entries.FirstOrDefaultAsync(entry => entry.Id == id);

        if (entry == null)
            throw new NotFoundException("Entry not found!");

        return entry.Adapt<EntryDto>();
    }

    public async Task CreateEntry(CreateEntryDto createEntryDto)
    {
        var entry = createEntryDto.Adapt<Entry>();

        await this.appDbContext.Entries.AddAsync(entry);
        await this.appDbContext.SaveChangesAsync();
    }

    public async Task UpdateEntry(int id, UpdateEntryDto updateEntryDto)
    {
        var entry = await this.appDbContext.Entries.FirstOrDefaultAsync(entry => entry.Id == id);

        if (entry == null)
            throw new NotFoundException("Entry not found!");

        entry.Description = updateEntryDto.Description!;
        entry.IsExpense = updateEntryDto.IsExpense!.Value;
        entry.Value = updateEntryDto.Value!.Value;

        await this.appDbContext.SaveChangesAsync();
    }

    public async Task DeleteEntryAsync(int id)
    {
        var entry = await this.appDbContext.Entries.FirstOrDefaultAsync(entry => entry.Id == id);

        if (entry == null)
            throw new NotFoundException("Entry not found!");

        this.appDbContext.Entries.Remove(entry);
        await this.appDbContext.SaveChangesAsync();
    }
}