import { useRef, useState } from "react";
import SearchIcon from "../../../assets/SearchIcon";
import "./SearchBar.css";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchValue, setSearchValue }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const inputVisible = isFocused || searchValue?.length > 0;

  return (
    <div className="search-container">
      <button
        className={`searchBar-button ${inputVisible ? "hidden" : ""}`}
        onClick={handleClick}
        aria-label="Search"
      >
        <SearchIcon />
      </button>
      <label htmlFor="searchInput" id="searchInput-label" className="hidden">
        Search
      </label>
      <input
        id="searchInput"
        ref={inputRef}
        className={`searchBar-input ${inputVisible ? "visible" : ""}`}
        type="text"
        value={searchValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
