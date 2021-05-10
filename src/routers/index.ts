import express from "express";
import { searchMoviesByTitle, getMovieById } from "../controllers";

const router = express.Router();

router.get("/movies", searchMoviesByTitle);

router.get("/movies/:id", getMovieById);

export default router;
