using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AppetiteAPI.Migrations
{
    public partial class Restruture_orders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Orders_OrderId",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Products",
                newName: "OrderProductsId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_OrderId",
                table: "Products",
                newName: "IX_Products_OrderProductsId");

            migrationBuilder.AddColumn<double>(
                name: "DeliveryCosts",
                table: "Restaurants",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "OrderProductsId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "OrderReceivedTime",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "OrderProductsSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProductsSet", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderProductsId",
                table: "Orders",
                column: "OrderProductsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_OrderProductsSet_OrderProductsId",
                table: "Orders",
                column: "OrderProductsId",
                principalTable: "OrderProductsSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_OrderProductsSet_OrderProductsId",
                table: "Products",
                column: "OrderProductsId",
                principalTable: "OrderProductsSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_OrderProductsSet_OrderProductsId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_OrderProductsSet_OrderProductsId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "OrderProductsSet");

            migrationBuilder.DropIndex(
                name: "IX_Orders_OrderProductsId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryCosts",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "OrderProductsId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderReceivedTime",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "OrderProductsId",
                table: "Products",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_OrderProductsId",
                table: "Products",
                newName: "IX_Products_OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Orders_OrderId",
                table: "Products",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
