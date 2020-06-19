import knex from "../database/connection";
import { Request, Response } from "express";

class WatchedMovieController {
  async index(req: Request, res: Response) {
    const watchedMovies = await knex("movie_suggestion")
      .select("*")
      .where("watched", 1);

    const genres = await knex("genres").join(
      "suggestion_genres",
      "genres.id",
      "=",
      "suggestion_genres.genre_id"
    );

    watchedMovies.map((watchedMovie) => {
      const s_genres = genres.filter(
        (genre) => genre.suggestion_id === watchedMovie.id
      );
      watchedMovie.s_genres = s_genres;

      return watchedMovie;
    });

    const serializedFinal = watchedMovies.map((watchedMovie) => {
      return {
        ...watchedMovie,
        image_url: `http://localhost:3333/uploads/${watchedMovie.image}`,
      };
    });

    res.json({ serializedFinal });
  }
}

export default WatchedMovieController;
