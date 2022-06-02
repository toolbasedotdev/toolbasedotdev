namespace ToolBaseDotDev.Models;

/// <summary>
/// Contains details required for client-side Github GraphQL API access.
/// </summary>
public struct GithubAccessDetails
{
    /// <summary>
    /// ClientId of the Github OAuth app.
    /// </summary>
    public string ClientId { get; set; }

    /// <summary>
    /// Access token granted by Github OAuth.
    /// </summary>
    public string AccessToken { get; set; }
}
