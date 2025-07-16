import { Outlet } from "react-router-dom";
import "./RootLayout.css";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";

const RootLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMovies, setShowMovies] = useState(true);

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
      <NavBar
        isScrolled={isScrolled}
        showMovies={showMovies}
        setShowMovies={setShowMovies}
      />
      <main className="root-main">
        <Outlet context={{ showMovies }} />
      </main>
    </div>
  );
};

export default RootLayout;
