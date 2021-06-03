using Microsoft.EntityFrameworkCore.Migrations;

namespace AppetiteAPI.Migrations
{
    public partial class ManyChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Pictures",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AverageRating",
                table: "Restaurants",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Pictures",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pictures",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "AverageRating",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "Pictures",
                table: "Products");
        }
    }
}
