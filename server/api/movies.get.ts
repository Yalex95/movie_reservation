import { findMovies } from "~/lib/db/queries/movie";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const movies = await findMovies({
    title: query.title as string | undefined,
    releaseDate: query.release_date as string | undefined,
    genreId: query.genreId ? Number(query.genreId) : undefined,
  });

  return movies ?? [];
});
