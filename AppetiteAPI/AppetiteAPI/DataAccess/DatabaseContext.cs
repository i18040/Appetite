using System;
using System.Collections.Generic;
using System.Linq;
using AppetiteAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AppetiteAPI.DataAccess
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Adress> Adresses { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<OrderProducts> OrderProductsSet { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("DevConnectionString"));
        }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            var splitStringConverter = new ValueConverter<List<string>, string>(v => string.Join(";", v), v => v.Split(new[] { ';' }).ToList());
            builder.Entity<Product>().Property(nameof(Product.Ingredients)).HasConversion(splitStringConverter);
            builder.Entity<Product>().Property(nameof(Product.Pictures)).HasConversion(splitStringConverter);
            builder.Entity<Review>().Property(nameof(Review.Pictures)).HasConversion(splitStringConverter);
        } 
    }
}