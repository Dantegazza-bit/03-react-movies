import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

export interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MODAL_ROOT = document.body; // або зроби <div id="modal-root"></div> в index.html
const IMG_BASE = "https://image.tmdb.org/t/p/original";

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  function onBackdrop(e: React.MouseEvent) {
    if (e.target === backdropRef.current) onClose();
  }

  const imgSrc = movie.backdrop_path ? `${IMG_BASE}${movie.backdrop_path}` : "";

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackdrop}
      ref={backdropRef}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        {imgSrc && <img src={imgSrc} alt={movie.title} className={css.image} />}

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date || "—"}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    MODAL_ROOT
  );
}
