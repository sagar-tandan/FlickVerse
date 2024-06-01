import React, { useState, useEffect, useRef } from "react";
import notF from "../assets/4044.png";
import axios from "axios";
import MovieCard from "../Components/MovieCard.jsx";
import AllMovieCard from "../Components/AllMovieCard.jsx";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/Headers/NavBar3.jsx";

import Header from "../Components/Headers/Header3.jsx";

export default function AllShows() {
  const [tvpop, setTvPop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [moreLoading, setMoreLoading] = useState(false);

  const navigate = useNavigate(); // Ensure navigate is defined

  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);

      try {
        const options = {
          method: "GET",
          url: "https://api.themoviedb.org/3/tv/popular",
          params: { language: "en-US", page: page },
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmUxMGI4YTZiNmUxMTQ4MTFjMGNlZTU0YzQ4ZTA5NCIsInN1YiI6IjY2NDk1NTRiNDRlYjRmNmQwYTkyY2E5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uVXa_n6NgfHnh5OJaRU-fr4eeNBgib47eIpb1palLBU",
          },
        };
        const response = await axios.request(options);
        setTvPop((prevMovies) => [...prevMovies, ...response.data.results]);
        setLoading(false);
        setMoreLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setMoreLoading(false);
      }
    };

    FetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !moreLoading
      ) {
        setMoreLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [moreLoading]);

  const handleLinkClick = (movie, event) => {
    event.preventDefault(); // Prevent default navigation
    setTimeout(() => {
      navigate(`/tv/${movie.original_name}`, {
        state: {
          title: movie.original_name,
          id: movie.id,
          desc: movie.overview,
          date: movie.first_air_date.split("-")[0],
          rating: movie.vote_average.toFixed(1),
          image: movie.backdrop_path,
        },
      });
    }, 300);
  };

  return (
    <div className="text-white font-poppins text-md flex flex-col tracking-wider">
      <Header />
      <NavBar />
      {loading && page === 1 ? (
        <div className="flex justify-center items-center mx-auto my-4 w-full h-[70vh]">
          <BeatLoader color="#ffffff" />
        </div>
      ) : (
        <div>
          {tvpop.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-3 sm:gap-6 mt-[60px] sm:mt-[70px] justify-center mx-4 items-center">
                {tvpop.map((movie) => (
                  <a
                    key={movie.id}
                    href={`/tv/${movie.original_name}`}
                    onClick={(event) => handleLinkClick(movie, event)}
                  >
                    {movie.poster_path === null ? (
                      <div className="rounded-xl w-auto h-[150px] sm:h-[200px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[400px] overflow-hidden">
                        <MovieCard
                          key={movie.id}
                          url={notF}
                          title={movie.original_name}
                        />
                      </div>
                    ) : (
                      <div className="rounded-xl w-auto h-[150px] sm:h-[200px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[400px] overflow-hidden">
                        <AllMovieCard
                          key={movie.id}
                          url={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                          title={movie.original_name}
                        />
                      </div>
                    )}
                  </a>
                ))}
              </div>
              {moreLoading && (
                <div className="flex justify-center items-center mx-auto my-4 w-full">
                  <BeatLoader color="#ffffff" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
