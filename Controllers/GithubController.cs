namespace ToolBaseDotDev.Controllers;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToolBaseDotDev.Models;

/// <summary>
/// Controls OAuth and API interaction with Github.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class GithubController : ControllerBase
{
    /// <summary>
    /// Signs in the caller using OAuth.
    /// </summary>
    [HttpGet]
    [Route("signin")]
    public ChallengeResult SignIn()
    {
        var redirect =
            this.Request.GetTypedHeaders()?.Referer?.ToString() ?? "/";
        var authProps = new AuthenticationProperties { RedirectUri = redirect };
        return this.Challenge(authProps, "Github");
    }

    /// <summary>
    /// Used by client to obtain their Github OAuth details.
    /// These details are required to make client-side Github GraphQL API requests
    /// </summary>
    [HttpGet]
    [Route("access")]
    [Authorize]
    public async Task<
        ActionResult<GithubAccessDetails>
    > GithubAccessTokenAsync()
    {
        var token = await this.HttpContext.GetTokenAsync(
            "Github",
            "access_token"
        );

        if (token == null)
        {
            return this.BadRequest();
        }

        return this.Ok(
            new GithubAccessDetails
            {
                // TODO: Get clientId from config
                ClientId = "e2a7678df65d6e256a7e",
                AccessToken = token,
            }
        );
    }
}
