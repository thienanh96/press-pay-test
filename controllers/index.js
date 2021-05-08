const rp = require("request-promise");
const config = require("../server.json");
const { apiResponse } = require("../helpers");

async function searchMoviesByTitle(req, res) {
  try {
    const title = req.query.title;
    const page = req.query.page || 1;
    if (!title) {
      return apiResponse.sendBadRequest(res, {
        message: "title must not be empty",
      });
    }
    const url = `http://${config.movieSourceHost}/?s=${title}&apikey=${config.movieSourceAPIKey}&page=${page}`;
    const response = await rp(url);
    const jsonResponse = JSON.parse(response);
    if (jsonResponse.Response === "True") {
      return apiResponse.sendSuccess(res, {
        data: {
          payload: jsonResponse.Search,
          totalCount: jsonResponse.TotalResults || 0,
        },
      });
    }
    return apiResponse.sendNotFound(res, {
      message: `Movie not found. ${jsonResponse.Error}`,
    });
  } catch (error) {
    return apiResponse.sendUnexpected(res, {
      data: error.toString(),
    });
  }
}

async function getMovieById(req, res) {
  try {
    const movieId = req.params.id;
    if (!movieId) {
      return apiResponse.sendBadRequest(res, {
        message: "Id of movie must not be empty",
      });
    }
    const url = `http://${config.movieSourceHost}/?i=${movieId}&apikey=${config.movieSourceAPIKey}`;
    const response = await rp(url);
    const jsonResponse = JSON.parse(response);
    if (jsonResponse.Response === "True") {
      delete jsonResponse.Response;
      return apiResponse.sendSuccess(res, {
        data: jsonResponse,
      });
    }
    return apiResponse.sendNotFound(res, {
      message: `Movie not found. ${jsonResponse.Error}`,
    });
  } catch (error) {
    return apiResponse.sendUnexpected(res, {
      data: error.toString(),
    });
  }
}

module.exports = {
  searchMoviesByTitle,
  getMovieById,
};
