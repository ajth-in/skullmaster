import { useLoading } from "../../context/LoadingContext";
import Skeleton from "../../skeletons/registry";

export function ImageCard() {
  const { isLoading } = useLoading();
  if (isLoading) return <Skeleton name="ImageCard" />;
  return (
    <div data-skullmaster="ImageCard" className="card image-card">
      <img
        className="image-card-img"
        src="https://picsum.photos/seed/skullmaster/400/300"
        alt="Random placeholder photo"
      />
      <div className="image-card-body">
        <h3 className="image-card-title">Sample Image Card</h3>
        <p className="image-card-desc">
          A random placeholder photo inside a card, for demo purposes.
        </p>
      </div>
    </div>
  );
}
