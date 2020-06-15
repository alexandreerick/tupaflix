import { Request, Response } from "express";
import knex from "../database/connection";

class SuggestionController {
  async index(req: Request, res: Response) {
    // const { id } = req.params;

    const suggestions = await knex("movie_suggestion").select("*");

    const genres = await knex("genres").join(
      "suggestion_genres",
      "genres.id",
      "=",
      "suggestion_genres.genre_id"
    );
    // .where("suggestion_genres.genre_id", id);

    res.json({ suggestions, genres });
  }

  async create(req: Request, res: Response) {
    const { name, description, genres } = req.body;

    const trx = await knex.transaction();

    const suggestion = {
      image: "image-fake",
      name,
      description,
    };

    const insertedIds = await trx("movie_suggestion").insert(suggestion);

    const suggestion_id = insertedIds[0];

    const suggestionGenre = genres.map((genre_id: number) => {
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
    const { id } = req.body;

    await knex("movie_suggestion").where("id", id).delete();

    return res.status(204).send();
  }
}

export default SuggestionController;
