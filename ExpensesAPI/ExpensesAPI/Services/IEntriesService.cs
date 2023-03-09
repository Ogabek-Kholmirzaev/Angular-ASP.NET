using ExpensesAPI.Dtos;

namespace ExpensesAPI.Services;

public interface IEntriesService
{
    Task<List<EntryDto>> GetEntriesAsync();
    Task<EntryDto> GetEntryByIdAsync(int id);
    Task CreateEntry(CreateEntryDto createEntryDto);
    Task UpdateEntry(int id, UpdateEntryDto updateEntryDto);
    Task DeleteEntryAsync(int id);
}