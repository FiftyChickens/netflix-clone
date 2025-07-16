// Basic movie type from TMDB API
interface TMDBMedia {
  first_air_date: string;
  vote_average: number;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title?: string;
  name?: string;
  media_type?: "movie" | "tv";
}

export type { TMDBMedia };
