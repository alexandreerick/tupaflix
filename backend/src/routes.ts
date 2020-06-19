import express from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import SuggestionController from "./controllers/SuggestionController";
import GenreController from "./controllers/GenreController";
import WatchedMovieController from "./controllers/WatchedMovieController";

const routes = express.Router();
const upload = multer(multerConfig);

// Controllers
const suggestionController = new SuggestionController();
const genreController = new GenreController();
const watchedMovieController = new WatchedMovieController();

// Listar todos os gêneros
routes.get("/genres", genreController.index);
// Criar sugestão de filme
routes.post("/suggestion", upload.single("image"), suggestionController.create);
// Listar todas as sugestões de filme
routes.get("/suggestion", suggestionController.index);
// Deletar sugestão
routes.delete("/suggestion/:id", suggestionController.delete);
// Alterar sugestão
routes.put("/suggestion/:id", suggestionController.update);
// Listar filmes assistidos
routes.get("/watched-movie", watchedMovieController.index);

export default routes;
