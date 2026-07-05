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
        alt="Random placeholder"
      />
      <div className="image-card-body">
        <h3 className="image-card-title">Image Card</h3>
        <p className="image-card-desc">A card featuring a bold image with neo-brutalist styling.</p>
      </div>
    </div>
  );
}
