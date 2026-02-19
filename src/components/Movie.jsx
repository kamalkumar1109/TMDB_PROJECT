import React, { useContext, useState } from "react";
import WatchListContext from "../store/watchlist-context";
import genreMapList from "../utils/genreListMap";
import Popup from "./Popup";

const Movie = (props) => {
  // Consuming the context
  const context = useContext(WatchListContext);

  const [popup, setPopup] = useState(null);

  const alreadyExists = context.watchList.some(
    (movie) => movie.title === props.title,
  );

  const addToWatchListHandler = () => {
    const movie = {
      title: props.title,
      posterPath: props.posterPath,
      releaseDate: props.releaseDate,
      rating: props.rating,
      genreId: props.genreId,
    };
    if (alreadyExists) {
      context.removeFromWatchList(movie.title);
      setPopup(`Movie - "${movie.title}" removed from Watchlist`);
    } else {
      context.addToWatchList(movie);
      setPopup(`Movie - "${movie.title}" added to Watchlist`)
    }
  };

  const genre = genreMapList.find((m) => m.id === props.genreId);
  return (
    <figure className="bg-blue-200 rounded-lg w-2xs me-5 mb-5">
      <img
        className="w-xs rounded-lg"
        src={`https://image.tmdb.org/t/p/w400${props.posterPath}`}
        alt=""
      />
      <div className="flex justify-between items-start mt-2">
      <figcaption className="flex flex-col ms-2 mb-1">
        <h3 className="font-bold">{props.title}</h3>
        <h4>{props.releaseDate}</h4>
        <h4>{genre && genre.name}</h4>
        </figcaption>
        <button
          onClick={addToWatchListHandler}
          className="mr-3 mt-1 underline hover:cursor-pointer"
        >
          {alreadyExists ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          )}
        </button>
        </div>
      {popup && (
  <Popup
    message={popup}
    onClose={() => setPopup(null)}
  />
)}

    </figure>
  );
};

export default Movie;
