import "./MediaCard.css";

interface MediaCardProps {
  title: string;
  backdrop: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ title, backdrop }) => {
  return (
    <div className="media-card">
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop}`}
        alt={`${title} image`}
        className="media-card__image"
      />
      <h3 className="media-card__title">{title}</h3>
    </div>
  );
};

export default MediaCard;
