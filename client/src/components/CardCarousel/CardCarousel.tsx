import { useRef, useState, useEffect, useMemo } from "react";
import type { TMDBMedia } from "../../types/tmdb";
import MediaCard from "../MediaCard/MediaCard";
import "./CardCarousel.css";
import MediaModal from "../MediaModal/MediaModal";

interface MovieCarouselProps {
  media: TMDBMedia[];
  indicatorPerCard: number;
}

const MovieCarousel = ({ media, indicatorPerCard }: MovieCarouselProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState<TMDBMedia | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate dimensions and visible cards
  useEffect(() => {
    const updateDimensions = () => {
      if (mediaCardRef.current && scrollerRef.current) {
        const card = mediaCardRef.current;
        const scroller = scrollerRef.current;
        const cardStyle = window.getComputedStyle(card);

        // Calculate exact card width including margins
        const currentCardWidth =
          card.offsetWidth + parseFloat(cardStyle.marginRight);
        setCardWidth(currentCardWidth);

        // Calculate how many cards are fully visible
        setVisibleCards(Math.floor(scroller.clientWidth / currentCardWidth));
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (scrollerRef.current) resizeObserver.observe(scrollerRef.current);
    if (mediaCardRef.current) resizeObserver.observe(mediaCardRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Calculate the optimal indicator count
  const indicatorCount = useMemo(() => {
    const baseCount = Math.ceil(media.length / indicatorPerCard);
    return Math.min(
      baseCount,
      Math.max(1, Math.ceil(media.length / visibleCards))
    );
  }, [media.length, indicatorPerCard, visibleCards]);

  const handleScroll = () => {
    if (scrollerRef.current && cardWidth > 0) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const scrollRatio = scrollLeft / maxScroll;
      const newIndex = Math.round(scrollRatio * (indicatorCount - 1));
      setActiveIndex(Math.min(newIndex, indicatorCount - 1));
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollerRef.current && cardWidth > 0) {
      const { scrollWidth, clientWidth } = scrollerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const scrollTo = (index / (indicatorCount - 1)) * maxScroll;
      scrollerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (mediaItem: TMDBMedia) => {
    setSelectedMedia(mediaItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
  };
  return (
    <div className="trending">
      {/* Hidden measurement card */}
      <div
        ref={mediaCardRef}
        className="mediaCard"
        style={{ position: "absolute", visibility: "hidden" }}
      >
        <div className="mediaCard-image" />
      </div>

      <div className="scroll-indicators">
        {Array.from({ length: indicatorCount }).map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === activeIndex ? "active" : ""}`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>

      <div className="media-scroller" ref={scrollerRef} onScroll={handleScroll}>
        {media.map((mediaItem) => (
          <MediaCard
            key={mediaItem.id}
            title={mediaItem.title || mediaItem.name}
            backdrop={mediaItem.poster_path}
            onClick={() => {
              handleCardClick(mediaItem);
            }}
          />
        ))}
      </div>

      {isModalOpen && selectedMedia && (
        <MediaModal media={selectedMedia} onClose={closeModal} />
      )}
    </div>
  );
};

export default MovieCarousel;
