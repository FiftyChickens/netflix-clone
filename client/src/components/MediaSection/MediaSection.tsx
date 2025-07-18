import CardCarousel from "../CardCarousel/CardCarousel";
import { smallestDivisor } from "../../utils/smallestDivisor";
import type { TMDBMedia } from "../../types/tmdb";
import "./MediaSection.css";

interface MovieSectionProps {
  title?: string;
  media: TMDBMedia[];
}

const MovieSection = ({ title, media }: MovieSectionProps) => {
  return (
    <div className="mediaSection-section">
      <h2 className="mediaSection-title">{title}</h2>
      <CardCarousel
        media={media}
        indicatorPerCard={smallestDivisor(media.length)}
      />
    </div>
  );
};

export default MovieSection;
