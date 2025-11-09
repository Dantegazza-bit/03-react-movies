import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

export interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies.length) return null;

  return (
    <ul className={css.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div className={css.card} onClick={() => onSelect(m)}>
            <img
              className={css.image}
              src={m.poster_path ? `${IMG_BASE}${m.poster_path}` : ""}
              alt={m.title}
              loading="lazy"
            />
            <h2 className={css.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
