// Basic movie type from TMDB API
interface TMDBMovie {
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string | null;
  release_date: string;
  title: string;
  media_type?: "movie" | "tv";
}

export type { TMDBMovie, TMDBMovieDetails, TMDBTVShow, TMDBMedia };
