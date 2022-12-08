import { useParams } from "react-router";
import GenreDetail from "./GenreDetail";

export default function Genre() {
  const { id } = useParams();
  return (
    <div>
      <GenreDetail id={id} />
    </div>
  );
}
