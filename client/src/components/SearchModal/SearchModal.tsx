import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useMedia } from "../../hooks/useMedia";
import "./SearchModal.css";
import MediaCard from "../MediaCard/MediaCard";
import type { TMDBMedia } from "../../types/tmdb";

interface OutletContext {
  searchValue: string;
  handleCardClick: (media: TMDBMedia) => void;
}

const SearchModal = () => {
  const [query, setQuery] = useState("");
  const { searchValue, handleCardClick } = useOutletContext<OutletContext>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const searchResults = useMedia(
    query ? `/api/search?query=${encodeURIComponent(query)}` : ""
  );
  return (
    <div className="searchModal-container">
      {query && (
        <div className="searchModal-overlay">
          <div className="seachModal-cardlayout">
            {searchResults.media.map((mediaItem) => (
              <MediaCard
                className="searchModal-mediaCard"
                key={mediaItem.id}
                title={mediaItem.title || mediaItem.name}
                backdrop={mediaItem.poster_path}
                onClick={() => {
                  handleCardClick(mediaItem);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
