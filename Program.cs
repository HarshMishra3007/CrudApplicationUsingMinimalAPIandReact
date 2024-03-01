using Microsoft.EntityFrameworkCore;
using CRUDMinimalAPI.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
var builder = WebApplication.CreateBuilder(args : args);



builder.Services.AddCors(setupAction: options =>
{
    options.AddPolicy(name: "CORSPolicy",
        configurePolicy: builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins(origins: new[] { "http://localhost:5173", "https://appname.azurestaticapps.net" });
        });
});
var connectionString = builder.Configuration.GetConnectionString("dbcs");
builder.Services.AddDbContext<LeoContext>(x=> x.UseSqlServer(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(policyName:"CORSPolicy");

//Get all employee
app.MapGet("/CRUDMinimalAPI/Students", (LeoContext db) =>
{
    return db.Students.ToList();
});


//Get Employee with id
app.MapGet("/CRUDMinimalAPI/StudentByID", (LeoContext db, int id) =>
{
    var st = db.Students.Find(id);
    return Results.Ok(st);

});

//Adding employee records

app.MapPost("/CRUDMinimalAPI/AddStudent", (LeoContext db, [FromBody] Student student) =>
{
    db.Students.Add(student);
    db.SaveChanges();
    return Results.Created($"/CRUDMinimalAPI/StudentByID/{student.Id}", student);
});

//Updating the record

app.MapPut("/CRUDMinimalAPI/UpdateEmployee/{id}", (LeoContext db, int id, Student student) =>
{
    var st = db.Students.FirstOrDefault(x => x.Id == id);
    if (st == null)
    {
        return Results.NotFound();
    }

    st.Name = student.Name;
    st.Age = student.Age;

    db.Students.Update(st);
    db.SaveChanges();

    student.Id = st.Id;
    student.Age = st.Age;
    student.Name = st.Name;

    return Results.NoContent();
});
app.MapDelete("/CRUDMinimalAPI/DeleteEmployee/{id}", (LeoContext db, int id) =>
{
    var employee = db.Students.FirstOrDefault(x => x.Id == id);
    if (employee == null)
    {
        return Results.NotFound();
    }
    db.Students.Remove(employee);
    db.SaveChanges();

    return Results.NoContent();
});
app.Run();

