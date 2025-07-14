import axios from "axios";
import "./HomePage.css";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const url = "http://localhost:8080";

  const fetchMovies = async () => {
    const res = await axios.get(`${url}/api/movies/trending`);
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
        {movies.map((movie) => {
          {
            console.log(movie);
          }
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
