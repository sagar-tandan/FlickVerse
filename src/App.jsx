import React from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import MovieDetail from "./Pages/MovieDetail.jsx";
import MovieStream from "./Pages/MovieStream.jsx";
import TvDetail from "./Pages/TvDetail.jsx";
import TvStream from "./Pages/TvStream.jsx";
import SearchFunc from "./Components/SearchFunc.jsx";
import AllMovies from "./MainComps/AllMovies.jsx";
import AllShows from "./MainComps/AllShows.jsx";
import Flick from "./Pages/Flick.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:title" element={<MovieDetail />} />
          <Route path="/:title/:ids" element={<MovieStream />} />
          <Route path="/tv/:title/:ids" element={<TvStream />} />
          <Route path="/tv/:title" element={<TvDetail />} />
          <Route path="/flick" element={<Flick />} />
          <Route path="/search" element={<SearchFunc />} />
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/shows" element={<AllShows />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
