import CardCarousel from "../CardCarousel/CardCarousel";
import { smallestDivisor } from "../../utils/smallestDivisor";
import type { TMDBMedia } from "../../types/tmdb";
import "./MediaSection.css";

interface MediaSectionProps {
  title?: string;
  media: TMDBMedia[];
  handleCardClick: (medial: TMDBMedia) => void;
}

const MediaSection = ({ title, media, handleCardClick }: MediaSectionProps) => {
  return (
    <div className="mediaSection-section">
      <h2 className="mediaSection-title">{title}</h2>
      <CardCarousel
        media={media}
        indicatorPerCard={smallestDivisor(media.length)}
        handleCardClick={handleCardClick}
      />
    </div>
  );
};

export default MediaSection;
