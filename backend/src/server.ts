import express from "express";
import cors from "cors";
import routes from "./routes";
import path from "path";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(PORT);
