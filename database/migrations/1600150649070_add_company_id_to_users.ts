import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class User extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer("company_id").unsigned().notNullable();
      table.foreign("company_id").references("id").inTable("companies");
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign(["company_id"]);
      table.dropColumn("company_id");
    });
  }
}
