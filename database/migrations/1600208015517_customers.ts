import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Customers extends BaseSchema {
  protected tableName = "customers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email");
      table.string("phone_number").notNullable();
      table.string("gender").notNullable();
      table.string("location");
      table.index("phone_number");
      table.index("first_name");
      table.index("last_name");
      table.string("meta");
      table.integer("company_id").unsigned().notNullable();
      table.foreign("company_id").references("id").inTable("companies");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
