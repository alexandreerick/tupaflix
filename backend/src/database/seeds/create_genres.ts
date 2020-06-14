import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Inserts seed entries
  return knex("genres").insert([
    { title: "Ação", image: "acao.png" },
    { title: "Animação", image: "animacao.png" },
    { title: "Comédia", image: "comedia.png" },
    { title: "Documentário", image: "documentario.png" },
    { title: "Drama", image: "drama.png" },
    { title: "Pornô", image: "porno.png" },
    { title: "Romance", image: "romance.png" },
    { title: "Sci-fi", image: "scifi.png" },
    { title: "Suspense", image: "suspense.png" },
    { title: "Terror", image: "terror.png" },
  ]);
}
