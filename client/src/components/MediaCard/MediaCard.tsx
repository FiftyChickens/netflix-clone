import "./MediaCard.css";

interface MediaCardProps {
  title?: string;
  backdrop: string;
  onClick?: () => void;
}

const MediaCard = ({ title, backdrop, onClick }: MediaCardProps) => {
  return (
    <div className="mediaCard" onClick={onClick}>
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop}`}
        alt={`${title} image`}
        className="mediaCard-image"
      />
    </div>
  );
};

export default MediaCard;
