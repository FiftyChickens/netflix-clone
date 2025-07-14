import { NavLink, Outlet } from "react-router-dom";
import "./RootLayout.css";
import { useEffect, useState } from "react";

const RootLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="root-layout">
      <header className={`netflix-header ${isScrolled ? "scrolled" : ""}`}>
        <nav className="netflix-nav">
          <div className="nav-left">
            <h1 className="netflix-logo">CLONEFLIX</h1>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/search">
              Search
            </NavLink>
          </div>
          <div className="nav-right">
            {/* You can add user avatar/icon here later */}
          </div>
        </nav>
      </header>

      <main className="netflix-main">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
