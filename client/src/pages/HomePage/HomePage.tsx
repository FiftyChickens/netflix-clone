import MovieSection from "../../components/MediaSection/MediaSection";
import { useMedia } from "../../hooks/useMedia";
import "./HomePage.css";

const HomePage = () => {
  const trending = useMedia("/api/movies/trending");
  const tvTrending = useMedia("/api/tv/trending");

  return (
    <div className="homePage-container">
      <MovieSection title="Trending Movies" media={trending.media} />
      <MovieSection title="Trending Shows" media={tvTrending.media} />
    </div>
  );
};

export default HomePage;
