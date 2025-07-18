import { NavLink } from "react-router-dom";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";

interface NavBarProps {
  isScrolled: boolean;
  showMovies: boolean;
  setShowMovies: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar = ({
  isScrolled,
  showMovies,
  setShowMovies,
  searchValue,
  setSearchValue,
}: NavBarProps) => {
  return (
    <header className={`nav-header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav-nav">
        <div className="nav-left">
          <h1 className="nav-logo">CLONEFLIX</h1>
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink
            className="nav-link"
            to="/"
            onClick={() => setShowMovies((prev) => !prev)}
          >
            {!showMovies ? "Movies" : "TV Shows"}
          </NavLink>
        </div>
        <div className="nav-right">
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
