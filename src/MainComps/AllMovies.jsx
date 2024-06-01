import React, { useState, useEffect } from "react";
import notF from "../assets/4044.png";
import axios from "axios";
import AllMovieCard from "../Components/AllMovieCard.jsx";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Headers/Header2.jsx";
import NavBar from '../Components/Headers/NavBar2.jsx'

export default function AllMovies() {
  const [allMovies, setAllMovies] = useState([]);
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
          url: "https://api.themoviedb.org/3/movie/popular",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmUxMGI4YTZiNmUxMTQ4MTFjMGNlZTU0YzQ4ZTA5NCIsInN1YiI6IjY2NDk1NTRiNDRlYjRmNmQwYTkyY2E5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uVXa_n6NgfHnh5OJaRU-fr4eeNBgib47eIpb1palLBU", // Replace YOUR_ACCESS_TOKEN with your actual access token
          },
          params: {
            language: "en-US",
            page: page,
          },
        };

        const response = await axios.request(options);
        setAllMovies((prevMovies) => [...prevMovies, ...response.data.results]);
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

  return (
    <div className="text-white font-poppins text-md flex flex-col tracking-wider">
      <Header />
      <NavBar/>
      {loading && page === 1 ? (
        <div className="flex justify-center items-center mx-auto my-4 w-full h-[70vh]">
          <BeatLoader color="#ffffff" />
        </div>
      ) : (
        <div>
          {allMovies.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-3 sm:gap-6 mt-[60px] sm:mt-[70px] justify-center mx-4 items-center">
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
      )}
    </div>
  );
}
