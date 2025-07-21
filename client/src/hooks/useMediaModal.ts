import { useState } from "react";
import type { TMDBMedia } from "../types/tmdb";

const useMediaModal = () => {
  const [selectedMedia, setSelectedMedia] = useState<TMDBMedia | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (mediaItem: TMDBMedia) => {
    setSelectedMedia(mediaItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
  };

  return {
    selectedMedia,
    isModalOpen,
    handleCardClick,
    closeModal,
  };
};

export default useMediaModal;
