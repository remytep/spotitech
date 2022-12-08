import { useParams } from "react-router";
import ArtistDetail from "./ArtistDetail";

export default function Artist() {
  const { id } = useParams();
  return (
    <div>
      <ArtistDetail id={id} />
    </div>
  );
}
