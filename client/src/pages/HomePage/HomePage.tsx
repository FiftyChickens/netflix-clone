import axios from "axios";
import "./HomePage.css";
import { useEffect, useState } from "react";
import type { ApiResponse } from "../../types/response";
import type { TMDBMovie } from "../../types/tmdb";
import MediaCard from "../../components/MediaCard/MediaCard";

const HomePage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const url = "http://localhost:8080";

  const fetchMovies = async () => {
    const res: ApiResponse = await axios.get(`${url}/api/movies/trending`);

    setMovies(res.data.data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div>
        <h2>Trending Movies</h2>
        {movies.map((movie: TMDBMovie) => {
          return (
            <div key={movie.id}>
              <MediaCard title={movie.title} backdrop={movie.backdrop_path} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
