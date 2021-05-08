const express = require("express");
const router = express.Router();
const { searchMoviesByTitle, getMovieById } = require("../controllers");


router.get("/movies", searchMoviesByTitle);

router.get("/movies/:id", getMovieById);

module.exports = router;
