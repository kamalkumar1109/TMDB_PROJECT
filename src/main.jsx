import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { WatchListContextProvider } from "./store/watchlist-context.jsx";
import { Provider } from "react-redux";
import { store } from './app/store.js';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WatchListContextProvider>
      <Provider store = {store}>
        <App />
      </Provider>
    </WatchListContextProvider>
  </BrowserRouter>,
);
