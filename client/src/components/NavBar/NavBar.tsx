import { NavLink } from "react-router-dom";
import "./NavBar.css";

interface NavBarProps {
  isScrolled: boolean;
  showMovies: boolean;
  setShowMovies: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ isScrolled, showMovies, setShowMovies }: NavBarProps) => {
  return (
    <header className={`nav-header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav-nav">
        <div className="nav-left">
          <h1 className="nav-logo">CLONEFLIX</h1>
          <NavLink
            className="nav-link"
            to="/"
            onClick={() => setShowMovies((prev) => !prev)}
          >
            {!showMovies ? "Movies" : "TV Shows"}
          </NavLink>
          <NavLink className="nav-link" to="/search">
            Search
          </NavLink>
        </div>
        <div className="nav-right"></div>
      </nav>
    </header>
  );
};

export default NavBar;
