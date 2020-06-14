import express from "express";

import SuggestionController from "./controllers/SuggestionController";
import GenreController from "./controllers/GenreControllers";

const routes = express.Router();

// Controllers
const suggestionController = new SuggestionController();
const genreController = new GenreController();

// Listar todos os gêneros
routes.get("/genres", genreController.index);
// Criar sugestão de filme
routes.post("/suggestion", suggestionController.create);
// Listar todas as sugestões de filme
routes.get("/suggestion", suggestionController.index);
// Deletar sugestão
routes.delete("/suggestion", suggestionController.delete);

export default routes;
