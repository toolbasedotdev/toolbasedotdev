using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyAllowSpecificOrigins",
        policy =>
        {
            policy.WithOrigins("https://github.com", "https://localhost:44424")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

services.Configure<CookiePolicyOptions>(options =>
{
    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

// Add Cookie settings
services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
// Add Cookie settings
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    // options.LoginPath = "/account/login";
    // options.LogoutPath = "/account/logout";
    // options.SlidingExpiration = true;
})
// Add GitHub authentication
.AddGitHub("Github", options =>
{
    options.ClientId = builder.Configuration["github:clientId"];
    options.ClientSecret = builder.Configuration["github:clientSecret"];
    options.SaveTokens = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseCookiePolicy();
app.UseAuthentication();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.UseCors("MyAllowSpecificOrigins");
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();

// static Func<OAuthCreatingTicketContext, Task> OnCreatingGitHubTicket() =>
//     async context => await Task.FromResult(true);
