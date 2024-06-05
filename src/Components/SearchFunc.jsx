import React, { useState, useEffect, useRef } from "react";
import search from "../assets/Icons/srch.png";
import notF from "../assets/4044.png";
import axios from "axios";
import MovieCard from "./MovieCard.jsx";
import AllMovieCard from "./AllMovieCard.jsx";
import BeatLoader from "react-spinners/BeatLoader";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import close from "../assets/Icons/close.png";

export default function SearchFunc() {
  const [searchTerm, setSearchTerm] = useState("");
  const [nowPlaying, setNowPlaying] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  const [width, setWidth] = useState(window.innerWidth);

  const [loading, setLoading] = useState(true);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const navigate = useNavigate(); // Ensure navigate is defined

  // Load data from local storage when the component mounts
  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm");
    const storedMovies = JSON.parse(localStorage.getItem("movies"));
    const storedTvShows = JSON.parse(localStorage.getItem("tv"));

    if (storedSearchTerm) setSearchTerm(storedSearchTerm);
    if (storedMovies) setNowPlaying(storedMovies);
    if (storedTvShows) setTvShows(storedTvShows);
  }, []);

  // Save searchTerm, movies, and TV shows to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(nowPlaying));
  }, [nowPlaying]);

  useEffect(() => {
    localStorage.setItem("tv", JSON.stringify(tvShows));
  }, [tvShows]);

  useEffect(() => {
    if (inputRef1.current) {
      inputRef1.current.focus();
    }
    if (inputRef2.current) {
      inputRef2.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenwidth = window.innerWidth;
      setWidth(screenwidth);
      localStorage.setItem("width", screenwidth);
    };

    //event listener
    window.addEventListener("resize", handleResize);

    //clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      try {
        const movieOptions = {
          method: "GET",
          url: `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
          headers: {
            accept: "application/json",
            Authorization: import.meta.env.VITE_APP_API_KEY,
          },

          params: {
            language: "en-US",
            page: 1,
          },
        };

        const tvShowOptions = {
          method: "GET",
          url: `https://api.themoviedb.org/3/search/tv?query=${searchTerm}`,
          headers: {
            accept: "application/json",
            Authorization: import.meta.env.VITE_APP_API_KEY,
          },
          params: {
            language: "en-US",
            page: 1,
          },
        };

        const [movieResponse, tvShowResponse] = await Promise.all([
          axios.request(movieOptions),
          axios.request(tvShowOptions),
        ]);

        // console.log('Movies:', movieResponse.data.results);
        // console.log('TV Shows:', tvShowResponse.data.results);

        setNowPlaying(movieResponse.data.results);
        setTvShows(tvShowResponse.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    FetchData();
  }, [searchTerm]);

  const handleLinkClick = (movie, event) => {
    event.preventDefault(); // Prevent default navigation
    setTimeout(() => {
      navigate(`/movie/${movie.id}`, {
        state: {
          title: movie.title,
          id: movie.id,
          desc: movie.overview,
          date: movie.release_date.split("-")[0],
          rating: movie.vote_average.toFixed(1),
          image: movie.backdrop_path,
        },
      });
    }, 300);
  };

  const handleLinkClickTv = (movie, event) => {
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
    <div className="text-white font-poppins text-md flex flex-col pb-10 mx-auto max-w-screen-2xl">
      <div
        className={`w-full gap-10 sm:justify-between z-20 h-[50px] sm:h-[60px] fixed flex backdrop-blur-sm bg-black/20 shadow-stone-800 shadow-md px-3`}
      >
        <div className="flex justify-between max-w-screen-2xl h-full w-full">
          {width > 500 && (
            <Link className="flex gap-1 hover:cursor-pointer" to="/">
              <div className="flex gap-1 hover:cursor-pointer items-center">
                <img
                  className="w-7 h-7 sm:w-14 sm:h-14"
                  src={logo}
                  alt="logo"
                />
                <div className="flex items-center">
                  <h1 className="font-poppins font-semibold text-sm sm:text-xl lg:text-2xl text-[#1250f3]">
                    𝑭𝑳𝑰𝑪𝑲
                  </h1>
                  <h1 className="font-poppins font-semibold text-sm sm:text-xl lg:text-2xl italic text-yellow-500">
                    Λ
                  </h1>
                  <h1 className="font-poppins font-semibold text-sm sm:text-xl lg:text-2xl text-[#49cbff]">
                    𝑬𝑹𝑺𝑬
                  </h1>
                </div>
              </div>
            </Link>
          )}

          {width > 500 ? (
            <div className="border-[0.5px] w-[60%] bg-[#0c0c0c] border-[#2f2f2f] rounded-full m-2 flex justify-between">
              <div className="flex gap-3 justify-start items-center px-3 w-full">
                <img
                  className=" w-3 h-3 sm:w-5 sm:h-5"
                  src={search}
                  alt="search"
                />
                <input
                  ref={inputRef1}
                  className="w-full outline-none bg-transparent text-white text-sm font-poppins font-light hidden sm:inline-block"
                  type="text"
                  placeholder="Search Movies/Series"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <input
                  ref={inputRef2}
                  className="w-full outline-none bg-transparent text-white text-sm font-poppins font-light inline-block sm:hidden"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
              <div
                onClick={() => setSearchTerm("")}
                className="w-[10%] justify-end mx-3 flex items-center hover:cursor-pointer active:scale-90 transition-all ease-in-out duration-300"
              >
                <img className=" w-3 h-3 sm:w-4 sm:h-4" src={close} alt="" />
              </div>
            </div>
          ) : (
            <div className="border-[0.5px] w-full bg-[#0c0c0c] border-[#2f2f2f] rounded-full m-2 flex justify-between">
              <div className="flex gap-3 justify-start items-center px-3 w-full">
                <img
                  className=" w-3 h-3 sm:w-5 sm:h-5"
                  src={search}
                  alt="search"
                />
                <input
                  ref={inputRef1}
                  className="w-full outline-none bg-transparent text-white text-sm font-poppins font-light hidden sm:inline-block"
                  type="text"
                  placeholder="Search Movies/Series"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <input
                  ref={inputRef2}
                  className="w-full outline-none bg-transparent text-white text-sm font-poppins font-light inline-block sm:hidden"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
              <div
                onClick={() => setSearchTerm("")}
                className="w-[10%] justify-end mx-3 flex items-center hover:cursor-pointer active:scale-90 transition-all ease-in-out duration-300"
              >
                <img className=" w-3 h-3 sm:w-4 sm:h-4" src={close} alt="" />
              </div>
            </div>
          )}

          <div className="w-6 h-6 hidden sm:flex items-center"></div>
        </div>
      </div>

      {searchTerm.length > 0 && (
        <div className="flex flex-row mt-20 gap-1 flex-wrap mx-4">
          <span className="text-sm sm:text-lg font-poppins font-light sm:font-medium">
            Search Results for:{" "}
          </span>
          <span className="text-orange-500 text-sm sm:text-lg font-poppins font-light sm:font-medium tracking-wide">
            '{searchTerm}'
          </span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center mx-auto my-4 w-full h-[70vh]">
          <BeatLoader color="#ffffff" />
        </div>
      ) : (
        <div>
          {searchTerm.length > 0 && (
            <div className="flex flex-col">
              {nowPlaying.length > 0 && (
                <div>
                  <div className="mx-4 flex items-center gap-1 font-poppins mt-8 font-medium text-lg">
                    <div className="w-full bg-orange-500 h-[1px]"></div>
                    <h1 className="sm:text-xl font-semibold tracking-wider">
                      Movies
                    </h1>
                    <div className="w-full bg-orange-500 h-[1px]"></div>
                  </div>

                  <div className="flex flex-wrap gap-5 sm:gap-10 mt-4 justify-center mx-4 items-center">
                    {nowPlaying.map((movie) => (
                      <a
                        href={`/${movie.title}`}
                        onClick={(event) => handleLinkClick(movie, event)}
                      >
                        {movie.poster_path === null ? (
                          <div className="rounded-xl w-auto h-[150px] sm:h-[200px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[400px] overflow-hidden">
                            <MovieCard
                              key={movie.id}
                              url={notF}
                              title={movie.title}
                            />
                          </div>
                        ) : (
                          <div className="rounded-xl w-auto h-[150px] sm:h-[200px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[400px] overflow-hidden">
                            <AllMovieCard
                              key={movie.id}
                              url={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                              title={movie.title}
                            />
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {tvShows.length > 0 && (
                <div>
                  <div className="mx-4 flex items-center gap-1 font-poppins mt-8 font-medium text-lg">
                    <div className="w-full bg-orange-500 h-[1px]"></div>
                    <h1 className="sm:text-xl font-semibold tracking-wider">
                      Series
                    </h1>
                    <div className="w-full bg-orange-500 h-[1px]"></div>
                  </div>

                  <div className="flex flex-wrap gap-5 sm:gap-10 mt-4 justify-center mx-4 items-center">
                    {tvShows.map((movie) => (
                      <a
                        href={`/${movie.original_name}`}
                        onClick={(event) => handleLinkClickTv(movie, event)}
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
                              url={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                              title={movie.original_name}
                            />
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
