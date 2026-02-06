import { and, eq, like } from "drizzle-orm";

import db from "..";
import { genere, movie, movie_genres } from "../schema";

type FindMoviesParams = {
  title?: string;
  releaseDate?: string;
  genreId?: number;
};
export async function findMovies({
  title,
  releaseDate,
  genreId,
}: FindMoviesParams) {
  return  db.query.movie.findMany();
  // const conditions = [];

  // if (title) {
  //   conditions.push(like(movie.title, `%${title}%`));
  // }

  // if (releaseDate) {
  //   conditions.push(eq(movie.release_date, releaseDate));
  // }

  // if (genreId) {
  //   conditions.push(eq(genere.id, genreId));
  // }
  // const query = db
  //   .selectDistinct({
  //     id: movie.id,
  //     title: movie.title,
  //     release_date: movie.release_date,
  //     poster_image: movie.poster_image,
  //   })
  //   .from(movie)
  //   .leftJoin(movie_genres, eq(movie_genres.movieId, movie.id))
  //   .leftJoin(genere, eq(movie_genres.genreId, genere.id));

  // if (conditions.length) {
  //   query.where(and(...conditions));
  // }

  // const result = await query;

  // return result ?? [];
}
