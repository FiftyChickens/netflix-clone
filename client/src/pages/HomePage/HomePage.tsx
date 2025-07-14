import axios from "axios";
import "./HomePage.css";
import { useEffect, useState } from "react";
import type { ApiResponse } from "../../types/response";
import type { TMDBMovie } from "../../types/tmdb";

const HomePage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const url = "http://localhost:8080";
  const imageBase = "https://image.tmdb.org/t/p/w500";

  const fetchMovies = async () => {
    const res: ApiResponse = await axios.get(`${url}/api/movies/trending`);

    setMovies(res.data.data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log(movies);
  return (
    <>
      <div>
        <h2>Trending Movies</h2>
        {movies.map((movie: TMDBMovie) => {
          {
            console.log(movie);
          }
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <img src={`${imageBase}${movie.poster_path}`} alt="poster" />
              <p>{movie.overview}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
