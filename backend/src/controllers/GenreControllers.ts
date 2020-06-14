import { Request, Response } from "express";
import knex from "../database/connection";

class GenreController {
  async index(req: Request, res: Response) {
    const genres = await knex("genres").select("*");

    const serializedGenres = genres.map((genre) => {
      return {
        id: genre.id,
        name: genre.title,
        image_url: `http://localhost:3333/uploads/${genre.image}`,
      };
    });

    return res.json(serializedGenres);
  }
}

export default GenreController;
