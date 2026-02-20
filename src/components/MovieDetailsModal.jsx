import React from "react";

const MovieDetailsModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[70vw] p-6 flex relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Left Image */}
        <img
          className="w-1/3 rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
        />

        {/* Right Details */}
        <div className="ml-6">
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          <p className="mb-2">Release: {movie.release_date}</p>
          <p className="mb-2">Rating: {movie.vote_average}</p>
          <p className="mb-4">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
