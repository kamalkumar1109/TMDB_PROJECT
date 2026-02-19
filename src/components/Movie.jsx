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
      setPopup(`Movie - "${movie.title}" added to Watchlist`);
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
              fill="red"
              className="size-8"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          )}
        </button>
      </div>
      {popup && <Popup message={popup} onClose={() => setPopup(null)} />}
    </figure>
  );
};

export default Movie;
