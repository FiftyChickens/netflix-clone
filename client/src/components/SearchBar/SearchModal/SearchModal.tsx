import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import MediaSection from "../../MediaSection/MediaSection";
import { useMedia } from "../../../hooks/useMedia";
import "./SearchModal.css";

interface OutletContext {
  searchValue: string;
}

const SearchModal = () => {
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { searchValue } = useOutletContext<OutletContext>();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Fetch search results
  const searchResults = useMedia(
    debouncedQuery
      ? `/api/search?query=${encodeURIComponent(debouncedQuery)}`
      : ""
  );
  return (
    <div className="" style={{ backgroundColor: "black" }}>
      <div className="searchModal-container">
        {debouncedQuery && <MediaSection media={searchResults.media || []} />}
      </div>
    </div>
  );
};

export default SearchModal;
