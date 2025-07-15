import type { TMDBMedia } from "./tmdb";

interface ApiResponse {
  success: boolean;
  timeStamp: Date;
  data: { page: number; results: [TMDBMedia]; total_pages: number };
}

export type { ApiResponse };
