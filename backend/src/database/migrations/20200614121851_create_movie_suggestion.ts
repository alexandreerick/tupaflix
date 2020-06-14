import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("movie_suggestion", (table) => {
    table.increments("id").primary();
    table.string("image").notNullable();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.boolean("watched").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("movie_suggestion");
}
