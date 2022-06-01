using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using toolbasedotdev.Models;

namespace toolbasedotdev.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GithubController : ControllerBase
{
    [HttpGet]
    [Route("signin")]
    public IActionResult SignIn()
    {
        var redirect = Request.GetTypedHeaders()?.Referer?.ToString() ?? "/";
        var authProps = new AuthenticationProperties { RedirectUri = redirect };
        return Challenge(authProps, "Github");
    }

    [HttpGet]
    [Route("access")]
    [Authorize]
    public async Task<ActionResult<GithubAccessDetails>> GithubAccessTokenAsync()
    {
        var token = await HttpContext.GetTokenAsync("Github", "access_token");

        if (token == null)
            return BadRequest();

        return Ok(new GithubAccessDetails
        {
            ClientId = "e2a7678df65d6e256a7e", // TODO: Get clientId from config
            AccessToken = token
        });
    }

    [HttpGet]
    [Route("test")]
    [Authorize]
    public IActionResult Test()
    {
        return Ok();
    }
}
