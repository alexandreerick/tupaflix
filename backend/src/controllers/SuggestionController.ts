import { Request, Response } from "express";
import knex from "../database/connection";

class SuggestionController {
  async index(req: Request, res: Response) {
    const suggestions = await knex("movie_suggestion").select("*");

    const genres = await knex("genres").join(
      "suggestion_genres",
      "genres.id",
      "=",
      "suggestion_genres.genre_id"
    );

    suggestions.map((suggestion) => {
      const s_genres = genres.filter(
        (genre) => genre.suggestion_id === suggestion.id
      );
      suggestion.s_genres = s_genres;

      return suggestion;
    });

    const serializedFinal = suggestions.map((suggestion) => {
      return {
        ...suggestion,
        image_url: `http://localhost:3333/uploads/${suggestion.image}`,
      };
    });

    res.json({ serializedFinal });
  }

  async create(req: Request, res: Response) {
    const { name, description, genres } = req.body;

    const trx = await knex.transaction();

    const suggestion = {
      image: req.file.filename,
      name,
      description,
    };

    const insertedIds = await trx("movie_suggestion").insert(suggestion);

    const suggestion_id = insertedIds[0];

    const suggestionGenre = genres
      .split(",")
      .map((genre: string) => Number(genre.trim()))
      .map((genre_id: number) => {
        return {
          genre_id,
          suggestion_id,
        };
      });

    await trx("suggestion_genres").insert(suggestionGenre);

    await trx.commit();

    return res.json({
      id: suggestion_id,
      ...suggestion,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await knex("movie_suggestion").where("id", id).delete();

    return res.status(204).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    await knex("movie_suggestion").where("id", id).update("watched", 1);

    return res.status(200).send();
  }
}

export default SuggestionController;
