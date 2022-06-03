namespace ToolBaseDotDev.Models;
using System.ComponentModel.DataAnnotations;

/// <summary>
/// A remote Github repository.
/// </summary>
public class GithubRepo
{
    /// <summary>
    /// Initializes a new instance of the <see cref="GithubRepo"/> class.
    /// </summary>
    public GithubRepo()
    {
        this.Id = string.Empty;
        this.Name = string.Empty;
    }

    /// <summary>
    /// Must be identical to the id from Github API.
    /// </summary>
    [Key]
    public string Id { get; set; }

    /// <summary>
    /// Name of the repository.
    /// i.e. github.com/{author}/{name}
    /// </summary>
    public string Name { get; set; }
}
