namespace ToolBaseDotDev.Models;

public class UserDetails
{
    public bool NotFound { get; set; }
    public string? Name { get; set; }

    public static UserDetails UserNotFound() => new UserDetails
    {
        NotFound = true,
        Name = null
    };
}
