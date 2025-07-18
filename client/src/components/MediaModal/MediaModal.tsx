import type { TMDBMedia } from "../../types/tmdb";
import "./MediaModal.css";

type MediaModalProps = {
  media: TMDBMedia;
  onClose: () => void;
};

const MediaModal = ({ media, onClose }: MediaModalProps) => {
  const genres = [
    { id: 28, name: "Action" },
    { id: 10759, name: "Action & Adventure" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10762, name: "Kids" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10749, name: "Romance" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 878, name: "Science Fiction" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" },
  ];

  const genreMap = new Map(genres.map((genre) => [genre.id, genre.name]));

  const mediaGenres = media.genre_ids
    .map((id) => genreMap.get(id))
    .filter(Boolean)
    .join(", ");

  return (
    <div className="overlay" onClick={onClose}>
      <div className="mediaModal-content" onClick={(e) => e.stopPropagation()}>
        <button className="mediaModal-close" onClick={onClose}>
          &times;
        </button>

        <div className="mediaModal-body">
          <img
            src={`https://image.tmdb.org/t/p/w780${media.backdrop_path}`}
            alt={media.title || media.name}
            className="mediaModal-image"
          />

          <div className="mediaModal-details">
            <h2>{media.title || media.name}</h2>
            <p>{media.overview}</p>
            <div className="mediaModal-meta">
              <span>{media.first_air_date || media.release_date}</span>
              {media.vote_average && (
                <span>Rating: {media.vote_average.toFixed(1)}/10</span>
              )}
              {mediaGenres && <span>Genres: {mediaGenres}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
