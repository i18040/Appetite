using Microsoft.EntityFrameworkCore.Migrations;

namespace AppetiteAPI.Migrations
{
    public partial class TryManyToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_OrderProductsSet_OrderProductsId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "OrderProductsSet");

            migrationBuilder.DropIndex(
                name: "IX_Orders_OrderProductsId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderProductsId",
                table: "Orders");

            migrationBuilder.CreateTable(
                name: "OrderProduct",
                columns: table => new
                {
                    OrdersId = table.Column<int>(type: "int", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProduct", x => new { x.OrdersId, x.TypeId });
                    table.ForeignKey(
                        name: "FK_OrderProduct_Orders_OrdersId",
                        column: x => x.OrdersId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProduct_Products_TypeId",
                        column: x => x.TypeId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderProduct_TypeId",
                table: "OrderProduct",
                column: "TypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderProduct");

            migrationBuilder.AddColumn<int>(
                name: "OrderProductsId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OrderProductsSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProductsSet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderProductsSet_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderProductsId",
                table: "Orders",
                column: "OrderProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProductsSet_ProductId",
                table: "OrderProductsSet",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_OrderProductsSet_OrderProductsId",
                table: "Orders",
                column: "OrderProductsId",
                principalTable: "OrderProductsSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
