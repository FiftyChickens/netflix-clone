import type { TMDBMovie } from "./tmdb";

interface ApiResponse {
  data: {
    success: boolean;
    timeStamp: Date;
    data: { page: number; results: [TMDBMovie]; total_pages: number };
  };
}

export type { ApiResponse };
