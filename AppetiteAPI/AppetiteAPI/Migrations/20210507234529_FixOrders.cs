using Microsoft.EntityFrameworkCore.Migrations;

namespace AppetiteAPI.Migrations
{
    public partial class FixOrders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_OrderProductsSet_OrderProductsId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_OrderProductsId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "OrderProductsId",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "OrderProductsSet",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderProductsSet_ProductId",
                table: "OrderProductsSet",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProductsSet_Products_ProductId",
                table: "OrderProductsSet",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderProductsSet_Products_ProductId",
                table: "OrderProductsSet");

            migrationBuilder.DropIndex(
                name: "IX_OrderProductsSet_ProductId",
                table: "OrderProductsSet");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "OrderProductsSet");

            migrationBuilder.AddColumn<int>(
                name: "OrderProductsId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_OrderProductsId",
                table: "Products",
                column: "OrderProductsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_OrderProductsSet_OrderProductsId",
                table: "Products",
                column: "OrderProductsId",
                principalTable: "OrderProductsSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
