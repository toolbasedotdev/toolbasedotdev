namespace ToolBaseDotDev.Models;

/// <summary>
/// Details relevant to displaying a user.
/// Does not include user data.
/// </summary>
public class UserDetails
{
    /// <summary>
    /// Specifies that the user was not found.
    /// </summary>
    public bool NotFound { get; set; }

    /// <summary>
    /// The username, which is also used as the display name.
    /// </summary>
    public string? Name { get; set; }

    /// <summary>
    /// Default value to return when an attempt to find a user fails.
    /// </summary>
    public static UserDetails UserNotFound() => new() { NotFound = true };
}
