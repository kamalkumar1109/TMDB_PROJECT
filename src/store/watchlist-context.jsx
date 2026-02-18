import React, { createContext, useEffect, useState } from "react";
import genreMapList from "../utils/genreListMap";

// This is a context object created by react using 'createContext'
const WatchListContext = createContext({
  watchList: [],
  addToWatchList: () => {},
  sortAscByRating: () => {},
  sortDescByRating: () => {},
  genreList: []
});

//This provider component is used to pass down the context in child elements.
export const WatchListContextProvider = (props) => {
  const initialWatchList = JSON.parse(
    window.localStorage.getItem("watchList") || "[]",
  );

  const [watchList, setWatchList] = useState(initialWatchList);

  const [genreList, setGenreList] = useState(JSON.parse(window.localStorage.getItem('genreList') || JSON.stringify(['All Genre'])));

  const addToWatchList = (movie) => {
    // Please look out why use prevState not watchList directly
    setWatchList((prevState) => [...prevState, movie]);
  
    const genre = genreMapList.find((m)=>m.id===movie.genreId);

    setGenreList(()=>[...new Set([...genreList, genre.name])])
  };

  const sortAscByRating = () => {
    setWatchList((prevState)=>prevState.toSorted((m1,m2)=>m1.rating-m2.rating));
  }
  const sortDescByRating = () => {
    setWatchList((prevState)=>prevState.toSorted((m1,m2)=>m2.rating-m1.rating));
  }

  useEffect(() => {
    window.localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);
  useEffect(() => {
    window.localStorage.setItem("genreList", JSON.stringify(genreList));
  }, [genreList]);

  const context = {
    watchList: watchList,
    addToWatchList: addToWatchList,
    sortAscByRating: sortAscByRating,
    sortDescByRating: sortDescByRating,
    genreList: genreList
  };
  return (
    <WatchListContext.Provider value={context}>
      {props.children}
    </WatchListContext.Provider>
  );
};

export default WatchListContext;
