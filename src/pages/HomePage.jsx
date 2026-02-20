import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "../components/Movie";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularMovies } from "../features/movies/movieSlice";
import {
  changeToNextPage,
  changeToPrevPage,
  searchMovies,
} from "../features/movies/movieSlice";
import MovieDetailsModal from "../components/MovieDetailsModal";

const HomePage = () => {
  const { data, error, isLoading, pageNo } = useSelector(
    (state) => state.movies,
  );

  const [searchKeyword, setSearchKeyword] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchKeyword.trim() === "") {
        dispatch(fetchPopularMovies(pageNo));
      } else {
        dispatch(searchMovies(searchKeyword));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchKeyword, dispatch, pageNo]);

  return (
    <section>
      <h1 className="text-3xl w-[70vw] mx-auto my-10">Popular Movies</h1>
      <div className=" w-[60vw] mx-auto my-10 ms-[16vw]">
        <section>
          <input
            onChange={(event) => setSearchKeyword(event.target.value)}
            className="w-full p-3 rounded-3xl my-3 bg-gray-100"
            type="text"
            placeholder="Search Movies"
          />
        </section>
      </div>
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <section className=" w-[70vw] mx-auto flex flex-wrap gap-1">
        {data &&
          data.results &&
          data.results.map((movie) => {
            return (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                genreId={movie.genre_ids[0]}
                onClick={() => setSelectedMovie(movie)}
              />
            );
          })}
      </section>
      <section className="flex justify-center my-5 gap-10">
        <button
          onClick={() => dispatch(changeToPrevPage())}
          className="border rounded-4xl px-8 py-1 hover:cursor-pointer"
        >
          Prev
        </button>
        <p className="pt-1">{pageNo}</p>
        <button
          onClick={() => dispatch(changeToNextPage())}
          className="border rounded-4xl px-8 py-1 hover:cursor-pointer"
        >
          Next
        </button>
      </section>
    </section>
  );
};

export default HomePage;
