import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "react-router";
import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (pageNo) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNo}`,
      {
        headers: {
          Accept: "application/json",
          Authorization:
            `Bearer ${TMDB_API_KEY}`,
        },
      },
    );
    return response.data;
  },
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    data: null,
    error: null,
    isLoading: false,
    pageNo: 1,
  },
  reducers: {
    changeToNextPage: (state, action) => {
        state.pageNo += 1;
    },
    changeToPrevPage: (state, action) => {
        if(state.pageNo <= 1){
            return;
        }
        state.pageNo -= 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
  }
});

export const {changeToNextPage, changeToPrevPage} = movieSlice.actions;
export default movieSlice.reducer;
