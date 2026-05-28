import { useQuery } from "@tanstack/react-query";
import { useOSlash } from "./o-slash-provider";

export default function FloatingGenerateButton() {
  const { getSkeletons } = useOSlash();
  useQuery({
    queryKey: ["polling-data"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/skeletons", {
        method: "POST",
        body: JSON.stringify(getSkeletons()),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      return response.json();
    },
    refetchInterval: 500,
  });
  const handleClick = () => {
    console.log(getSkeletons());
  };
  return (
    <>
      <button className="floating-generate-btn" onClick={handleClick}>
        Generate skeletons
        <span className="floating-generate-btn__dot" />
      </button>
    </>
  );
}
