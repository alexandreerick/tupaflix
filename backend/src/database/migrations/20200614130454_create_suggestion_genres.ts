import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("suggestion_genres", (table) => {
    table.increments("id").primary();

    table
      .integer("suggestion_id")
      .notNullable()
      .references("id")
      .inTable("movie_suggestion");

    table.integer("genre_id").notNullable().references("id").inTable("genres");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("suggestion_genres");
}
