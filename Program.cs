var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

builder.Services.AddControllersWithViews();

builder.Services.AddCors(
    options =>
        options.AddPolicy(
            name: "MyAllowSpecificOrigins",
            policy =>
                policy
                    .WithOrigins(
                        "https://github.com",
                        "https://localhost:44424"
                    )
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
        )
);

services.Configure<CookiePolicyOptions>(options =>
{
    // This lambda determines whether user consent for non-essential cookies is
    // needed for a given request.
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

// Add Cookie settings
services
    .AddAuthentication(
        options =>
            options.DefaultScheme = Microsoft
                .AspNetCore
                .Authentication
                .Cookies
                .CookieAuthenticationDefaults
                .AuthenticationScheme
    )
    .AddGitHub(
        "Github",
        options =>
        {
            options.ClientId = builder.Configuration["github:clientId"];
            options.ClientSecret = builder.Configuration["github:clientSecret"];
            options.SaveTokens = true;
        }
    );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for
    // production scenarios, see https://aka.ms/aspnetcore-hsts.
    _ = app.UseHsts();
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
