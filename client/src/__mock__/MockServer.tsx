// src/components/MockTest.tsx
import { useMedia } from "../hooks/useMedia";

const MockTest = () => {
  const { media: movies, loading: moviesLoading } = useMedia(
    "/api/trending/movies"
  );
  const { media: tvShows, loading: tvLoading } = useMedia("/api/trending/tv");
  const { error: testError } = useMedia("/api/trending/error");

  return (
    <div>
      <h2>Mock Server Test</h2>

      <section>
        <h3>Movies</h3>
        {moviesLoading ? (
          <p>Loading movies...</p>
        ) : (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>TV Shows</h3>
        {tvLoading ? (
          <p>Loading TV shows...</p>
        ) : (
          <ul>
            {tvShows.map((show) => (
              <li key={show.id}>{show.name}</li>
            ))}
          </ul>
        )}
      </section>

      {testError && (
        <div style={{ color: "red" }}>
          <h3>Error Test</h3>
          <p>{testError}</p>
        </div>
      )}
    </div>
  );
};

export default MockTest;
