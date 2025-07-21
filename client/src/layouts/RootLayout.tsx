import { Outlet } from "react-router-dom";
import "./RootLayout.css";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import useMediaModal from "../hooks/useMediaModal";
import MediaModal from "../components/MediaModal/MediaModal";

const RootLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMovies, setShowMovies] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { selectedMedia, isModalOpen, handleCardClick, closeModal } =
    useMediaModal();

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
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <main className="root-main">
        <Outlet context={{ showMovies, searchValue, handleCardClick }} />
      </main>
      {isModalOpen && selectedMedia && (
        <MediaModal media={selectedMedia} onClose={closeModal} />
      )}
    </div>
  );
};

export default RootLayout;
