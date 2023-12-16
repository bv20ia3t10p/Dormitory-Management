using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStatusAccountStudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Accounts_accountId",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Students",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "accountId",
                table: "Students",
                newName: "AccountId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_accountId",
                table: "Students",
                newName: "IX_Students_AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Accounts_AccountId",
                table: "Students",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Accounts_AccountId",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Students",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "AccountId",
                table: "Students",
                newName: "accountId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_AccountId",
                table: "Students",
                newName: "IX_Students_accountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Accounts_accountId",
                table: "Students",
                column: "accountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
