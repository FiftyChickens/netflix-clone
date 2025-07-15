import axios from "axios";
import { useState, useEffect } from "react";
import type { TMDBMedia } from "../types/tmdb";
import type { ApiResponse } from "../types/response";

export const useMedia = (endpoint: string) => {
  const [media, setMedia] = useState<TMDBMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = "http://localhost:8080";

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get<ApiResponse>(`${url}${endpoint}`);
        setMedia(res.data.data.results);
      } catch (err) {
        setError("Failed to fetch media");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [endpoint]);

  return { media, loading, error };
};
