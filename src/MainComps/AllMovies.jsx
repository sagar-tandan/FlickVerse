import React, { useState, useEffect } from "react";
import notF from "../assets/4044.png";
import axios from "axios";
import AllMovieCard from "../Components/AllMovieCard.jsx";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Headers/Header2.jsx";
import NavBar from "../Components/Headers/NavBar2.jsx";

export default function AllMovies() {
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("28");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [moreLoading, setMoreLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const fetchMoviesByLanguage = async (language) => {
          const options = {
            method: "GET",
            url: "https://api.themoviedb.org/3/discover/movie",
            headers: {
              accept: "application/json",
              Authorization: import.meta.env.VITE_APP_API_KEY,
            },
            params: {
              language: "en-US",
              page: page,
              sort_by: "popularity.desc",
              with_genres: selectedGenre,
              with_original_language: language,
            },
          };

          const response = await axios.request(options);
          return response.data.results;
        };

        const [hindiMovies, englishMovies] = await Promise.all([
          fetchMoviesByLanguage("hi"),
          fetchMoviesByLanguage("en"),
        ]);

        const combinedMovies = [...englishMovies,...hindiMovies];
        const uniqueMovies = combinedMovies.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
        );

        setAllMovies((prevMovies) => {
          const existingMovieIds = new Set(prevMovies.map((movie) => movie.id));
          const newUniqueMovies = uniqueMovies.filter(
            (movie) => !existingMovieIds.has(movie.id)
          );
          return [...prevMovies, ...newUniqueMovies];
        });

        setLoading(false);
        setMoreLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setMoreLoading(false);
      }
    };

    fetchMovies();
  }, [page, selectedGenre]);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          url: "https://api.themoviedb.org/3/genre/movie/list",
          params: { language: "en" },
          headers: {
            accept: "application/json",
            Authorization: import.meta.env.VITE_APP_API_KEY,
          },
        };

        const response = await axios.request(options);
        setGenres(response.data.genres);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

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
    event.preventDefault();
    setTimeout(() => {
      navigate(`/${movie.title}`, {
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

  const changeGenre = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1);
    setAllMovies([]);
    // console.log(selectedGenre);
  };

  return (
    <div className="text-white font-poppins text-md flex flex-col tracking-wider ">
      <Header />
      <NavBar />
      <div className="flex text-white flex-wrap mx-4 lg:mx-16 mb-5 gap-3  mt-[60px] sm:mt-[70px]">
        {genres.map((genre) => (
          <div
            key={genre.id}
            onClick={() => changeGenre(genre.id)}
            className={`${
              selectedGenre == genre.id
                ? "border-blue-500 bg-blue-500"
                : "border-[0.5px]"
            } px-2 sm:px-3 py-[2px] font-poppins text-sm font-light rounded-full hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500 active:scale-95 transition-all ease-in-out duration-300 flex items-center justify-center`}
          >
            {genre.name}
          </div>
        ))}
      </div>
      {loading && page === 1 ? (
        <div className="flex justify-center items-center mx-auto my-4 w-full h-[30vh] sm:h-[70vh]">
          <BeatLoader color="#ffffff" />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-3 sm:gap-6 justify-center mx-4 items-center">
            {allMovies.map((movie) => (
              <a
                key={movie.id}
                href={`/${movie.title}`}
                onClick={(event) => handleLinkClick(movie, event)}
              >
                {movie.poster_path === null ? (
                  <div className="rounded-xl w-auto h-[150px] sm:h-[200px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[400px] overflow-hidden">
                    <AllMovieCard
                      key={movie.id}
                      url={notF}
                      title={movie.title}
                    />
                  </div>
                ) : (
                  <div className="rounded-xl w-auto h-[150px] sm:h-[200px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[400px] overflow-hidden">
                    <AllMovieCard
                      key={movie.id}
                      url={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                      title={movie.title}
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
  );
}
