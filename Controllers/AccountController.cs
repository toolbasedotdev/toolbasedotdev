namespace ToolBaseDotDev.Controllers;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToolBaseDotDev.Models;

/// <summary>
/// Controls actions related to accounts.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    /// <summary>
    /// Used by client to obtain local user details.
    /// </summary>
    /// <returns>
    /// The caller's own <see cref="UserDetails" />.
    /// </returns>
    [HttpGet]
    [Route("whoami")]
    public ActionResult<UserDetails> WhoAmI()
    {
        if (this.User?.Identity?.Name == null)
        {
            return this.Ok(UserDetails.UserNotFound());
        }

        return this.Ok(new UserDetails { Name = this.User.Identity.Name });
    }

    /// <summary>
    /// Signs out the caller.
    /// </summary>
    [HttpGet]
    [Route("signout")]
    [Authorize]
    public IActionResult ManualSignOut()
    {
        _ = this.HttpContext.SignOutAsync();
        return this.Ok();
    }
}
