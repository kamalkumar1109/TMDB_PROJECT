import React, { useContext } from "react";
import WatchListContext from "../store/watchlist-context";

const WatchListItem = (props) => {
  const context = useContext(WatchListContext);
  
  const handleDelete = () => {
    if(window.confirm("This movie will be removed from Watchlist. Continue?"))
      context.removeFromWatchList(props.movie.title);
  }

  return (
    <figure className="flex border border-gray-200 bg-blue-200 rounded-lg w-[60vw] mx-auto mb-3">
      <img
        className="w-1/5"
        src={`https://image.tmdb.org/t/p/w400${props.movie.posterPath}`}
        alt=""
      />
      <div className="flex justify-between items-start flex-1 w-full px-3">
        <figcaption className="flex flex-col p-3 mt-0.5 ms-2">
          <h3 className="text-4xl mb-2">{props.movie.title}</h3>
          <h4 className="mb-1">{props.movie.releaseDate}</h4>
          <h4>{props.movie.rating}</h4>
        </figcaption>
        <button
          className="mt-3 underline hover:cursor-pointer"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </figure>
  );
};

export default WatchListItem;
