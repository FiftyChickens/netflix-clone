import "./MediaCard.css";

interface MediaCardProps {
  title?: string;
  backdrop: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ title, backdrop }) => {
  return (
    <div className="mediaCard">
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop}`}
        alt={`${title} image`}
        className="mediaCard-image"
      />
      <h3 className="mediaCard-title">{title}</h3>
    </div>
  );
};

export default MediaCard;
