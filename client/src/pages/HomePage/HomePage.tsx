import { useOutletContext } from "react-router-dom";
import MediaSection from "../../components/MediaSection/MediaSection";
import { useMedia } from "../../hooks/useMedia";
import "./HomePage.css";
import SearchModal from "../../components/SearchModal/SearchModal";
import type { TMDBMedia } from "../../types/tmdb";

interface OutletContext {
  showMovies: boolean;
  handleCardClick: (media: TMDBMedia) => void;
}

const HomePage = () => {
  const { showMovies, handleCardClick } = useOutletContext<OutletContext>();

  const genres = [
    { id: 10751, genre: "Family" },
    { id: 35, genre: "Comedy" },
    { id: 16, genre: "Animation" },
    { id: 37, genre: "Western" },
    { id: 80, genre: "Crime" },
    { id: 9648, genre: "Mystery" },
    { id: 18, genre: "Drama" },
    { id: 99, genre: "Documentary" },
  ];
  const filter = showMovies ? "movies" : "tv";

  const genreMedia = Object.fromEntries(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    genres.map(({ id }) => [id, useMedia(`/api/${filter}/genre?genre=${id}`)])
  );
  const trendingMedia = useMedia(`/api/${filter}/trending`);

  return (
    <div className="homePage-container">
      <MediaSection
        title={`Trending ${showMovies ? "Movies" : "TV Shows"}`}
        media={trendingMedia.media}
        handleCardClick={handleCardClick}
      />
      {genres.map(({ id, genre }) => (
        <MediaSection
          key={id}
          title={`${genre}`}
          media={genreMedia[id].media}
          handleCardClick={handleCardClick}
        />
      ))}
      <SearchModal />
    </div>
  );
};

export default HomePage;
