import { useOutletContext } from "react-router-dom";
import MediaSection from "../../components/MediaSection/MediaSection";
import { useMedia } from "../../hooks/useMedia";
import "./HomePage.css";
import MediaModal from "../../components/MediaModal/MediaModal";

const HomePage = () => {
  const { showMovies } = useOutletContext<{ showMovies: boolean }>();

  const genres = [
    { id: 10751, name: "Family" },
    { id: 35, name: "Comedy" },
    { id: 16, name: "Animation" },
    { id: 37, name: "Western" },
    { id: 80, name: "Crime" },
    { id: 9648, name: "Mystery" },
    { id: 18, name: "Drama" },
    { id: 99, name: "Documentary" },
  ];
  const filter = showMovies ? "movies" : "tv";

  // const genreMedia = Object.fromEntries(
  //   genres.map(({ id }) => [id, useMedia(`/api/${filter}/genre?genre=${id}`)])
  // );
  const trendingMedia = useMedia(`/api/${filter}/trending`);

  return (
    <div className="homePage-container">
      <MediaSection
        title={`Trending ${showMovies ? "Movies" : "TV Shows"}`}
        media={trendingMedia.media}
      />
      {/* {genres.map(({ id, name }) => (
        <MediaSection
          key={id}
          title={`${name} Movies`}
          media={genreMedia[id].media}
        />
      ))} */}
    </div>
  );
};

export default HomePage;
