import React, { useContext, useState } from "react";
import WatchListContext from "../store/watchlist-context";
import WatchListItem from "../components/WatchListItem";
import { getGenreNameById } from "../utils/genreListMap";

const WatchListPage = () => {
  const { watchList, sortAscByRating, sortDescByRating, genreList } =
    useContext(WatchListContext);

  const [searchKeyword, setSearchKeyword] = useState("");

  const [selectedGenre, setSelectedGenre] = useState("All Genre");

  const genreClickHandler = (genre) => {
    setSelectedGenre(() => genre);
  };

  return (
    <div className="my-10 w-[60vw] mx-auto">
      <section>
        {genreList.map((g, idx) => {
          return (
            <button
              onClick={() => genreClickHandler(g)}
              className=" text-white bg-blue-500 rounded-lg px-5 py-0.5 me-1 mb-1 hover:cursor-pointer"
              key={idx}
            >
              {g}
            </button>
          );
        })}
      </section>
      <section>
        <h2>Sort: Rating</h2>
        <button
          className="m-3 hover:cursor-pointer"
          onClick={() => sortAscByRating()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
            />
          </svg>
        </button>
        <button
          className="m-3 hover:cursor-pointer"
          onClick={() => sortDescByRating()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
            />
          </svg>
        </button>
      </section>
      <section>
        <input
          onChange={(event) => setSearchKeyword(event.target.value)}
          className="w-full p-3 rounded-3xl my-3 bg-gray-100"
          type="text"
          placeholder="Search Movies"
        />
      </section>
      {watchList
        .filter((m) => {
          if (selectedGenre === "All Genre") {
            return true;
          }
          return getGenreNameById(m.genreId).name === selectedGenre;
        })
        .filter((movie) =>
          movie.title.toLowerCase().includes(searchKeyword.toLowerCase()),
        )
        .map((item, idx) => {
          return <WatchListItem key={idx} movie={item} />;
        })}
    </div>
  );
};

export default WatchListPage;
