import React, { useContext } from "react";
import WatchListContext from "../store/watchlist-context";
import genreMapList from "../utils/genreListMap";

const Movie = (props) => {
  // Consuming the context
  const context = useContext(WatchListContext);

  const addToWatchListHandler = () => {
    const alreadyExists = context.watchList.some(
      (movie) => movie.title === props.title,
    );
    if (!alreadyExists) {
      const movie = {
        title: props.title,
        posterPath: props.posterPath,
        releaseDate: props.releaseDate,
        rating: props.rating,
        genreId: props.genreId,
      };
      context.addToWatchList(movie);
    } else {
      alert("Movie already added to Watchlist");
    }
  };

  const genre = genreMapList.find((m) => m.id === props.genreId);
  return (
    <figure className="w-2xs">
      <img
        className="w-xs rounded-lg"
        src={`https://image.tmdb.org/t/p/w400${props.posterPath}`}
        alt=""
      />
      <figcaption>
        <h3 className="font-bold">{props.title}</h3>
        <h4>{props.releaseDate}</h4>
        <h4>{genre && genre.name}</h4>
        <button
          onClick={addToWatchListHandler}
          className="underline hover:cursor-pointer"
        >
          Add to Watchlist
        </button>
      </figcaption>
    </figure>
  );
};

export default Movie;
