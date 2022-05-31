using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using toolbasedotdev.Models;

namespace toolbasedotdev.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    [HttpGet]
    [Route("whoami")]
    public ActionResult<UserDetails> WhoAmI()
    {
        if (User?.Identity?.Name == null)
            return Ok(UserDetails.UserNotFound());

        return Ok(new UserDetails { Name = User.Identity.Name });
    }

    [HttpGet]
    [Route("signout")]
    [Authorize]
    public async Task<IActionResult> ManualSignOut()
    {
        await HttpContext.SignOutAsync();
        return Ok();
    }
}
