import { useOutletContext } from "react-router-dom";
import MediaSection from "../../components/MediaSection/MediaSection";
import { useMedia } from "../../hooks/useMedia";
import "./HomePage.css";
import SearchModal from "../../components/SearchBar/SearchModal/SearchModal";

const HomePage = () => {
  const { showMovies } = useOutletContext<{ showMovies: boolean }>();

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
    genres.map(({ id }) => [id, useMedia(`/api/${filter}/genre?genre=${id}`)])
  );
  const trendingMedia = useMedia(`/api/${filter}/trending`);

  return (
    <div className="homePage-container">
      <MediaSection
        title={`Trending ${showMovies ? "Movies" : "TV Shows"}`}
        media={trendingMedia.media}
      />
      {genres.map(({ id, genre }) => (
        <MediaSection
          key={id}
          title={`${genre}`}
          media={genreMedia[id].media}
        />
      ))}
      <SearchModal />
    </div>
  );
};

export default HomePage;
