using Microsoft.EntityFrameworkCore;
using ReciboFreelancer.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<DatosClienteContext>(options =>
{
    options.UseSqlServer("Server=DESKTOP-2463C46; DataBase=DatosCliente;Integrated Security=true;TrustServerCertificate=True"); // Reemplaza con tu cadena de conexión
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
