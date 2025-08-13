using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
//using System;

var builder = WebApplication.CreateBuilder(args);

//Add CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:5173","http://localhost:5174").AllowAnyMethod().AllowAnyHeader();
    }
    );
}
);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//MySQL Database context service registration
//builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql("server = 127.0.0.1;port=3306;database=portfolio_db;user=root;password=Shelly@2002;", new MySqlServerVersion(new Version(8, 0, 36)), options => options.EnableRetryOnFailure()));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseHttpsRedirection();
//Enable CORS middleware
//app.UseCors("AllowReactAPP");
app.UseCors(builder =>
    builder.WithOrigins("*")
           .AllowAnyMethod()
           .AllowAnyHeader());
//app.UseHttpsRedirection();

app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

app.Run();
