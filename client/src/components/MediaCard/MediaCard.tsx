import "./MediaCard.css";

interface MediaCardProps {
  title?: string;
  backdrop: string;
  onClick?: () => void;
  className: string;
}

const MediaCard = ({ title, backdrop, onClick, className }: MediaCardProps) => {
  return (
    <section className={`${className} mediaCard`} onClick={onClick}>
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop}`}
        alt={`${title} image`}
        className="mediaCard-image"
      />
    </section>
  );
};

export default MediaCard;
