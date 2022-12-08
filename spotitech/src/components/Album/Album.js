import { useParams } from "react-router";
import AlbumDetail from "./AlbumDetail";

export default function Album() {
  const { id } = useParams();
  return (
    <div>
      <AlbumDetail id={id} />
    </div>
  );
}
