import rp from "request-promise";
import { Request, Response } from "express";
import config from "../server.json";
import { apiResponse } from "../helpers";

enum OMDBStatusResponse {
  True = "True",
  False = "False",
}

interface Rating {
  Source: string;
  Value: string;
}

interface Movie {
  Title: string;
  Year?: string;
  imdbID: string;
  Type: string;
  Poster?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: Rating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

interface OMDBSearchResponse {
  Response: OMDBStatusResponse;
  Error?: string;
  Search?: Movie[];
  totalResults: string;
}

interface OMDBMovieResponse extends Movie {
  Response?: OMDBStatusResponse;
  Error?: string;
}

export async function searchMoviesByTitle(req: Request, res: Response) {
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
    const jsonResponse: OMDBSearchResponse = JSON.parse(response);
    if (jsonResponse.Response === OMDBStatusResponse.True) {
      return apiResponse.sendSuccess(res, {
        data: {
          payload: jsonResponse.Search,
          totalCount: jsonResponse.totalResults
            ? parseInt(jsonResponse.totalResults)
            : 0,
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

export async function getMovieById(req: Request, res: Response) {
  try {
    const movieId = req.params.id;
    if (!movieId) {
      return apiResponse.sendBadRequest(res, {
        message: "Id of movie must not be empty",
      });
    }
    const url = `http://${config.movieSourceHost}/?i=${movieId}&apikey=${config.movieSourceAPIKey}`;
    const response = await rp(url);
    const jsonResponse: OMDBMovieResponse = JSON.parse(response);
    if (jsonResponse.Response === OMDBStatusResponse.True) {
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
