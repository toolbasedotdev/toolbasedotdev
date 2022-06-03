namespace ToolBaseDotDev;

using Microsoft.EntityFrameworkCore;
using ToolBaseDotDev.Models;

/// <summary>
/// Main database context.
/// </summary>
public class ToolbaseContext : DbContext
{
    /// <summary>
    /// Initializes a new instance of the <see cref="ToolbaseContext"/> class.
    /// </summary>
    public ToolbaseContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        this.DbPath = Path.Join(path, "ToolBaseDotDev.db");
    }

    /// <summary>
    /// Linked Github repositories.
    /// </summary>
    public DbSet<GithubRepo> GithubRepos { get; set; } = null!;

    /// <summary>
    /// File path for the SQLite .db file.
    /// </summary>
    /// <value>Local application data.</value>
    public string DbPath { get; }

    /// <summary>
    /// Configures EF to create an SQLite to create
    /// </summary>
    protected override void OnConfiguring(
        DbContextOptionsBuilder optionsBuilder
    ) => optionsBuilder.UseSqlite($"Data Source={this.DbPath}");
}
