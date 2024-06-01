import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import prev from "../../assets/Icons/prev.png";
import next from "../../assets/Icons/next.png";
import BeatLoader from "react-spinners/BeatLoader";

import { useNavigate } from "react-router-dom";
import MovieCard from "../../Components/MovieCard.jsx";

export default function OntheAir() {
  const sliderRef = useRef(null);
  const scrollAmount = window.innerWidth;
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Ensure navigate is defined

  useEffect(() => {
    const FetchMovies = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          url: "https://api.themoviedb.org/3/trending/tv/day",
          params: { language: "en-US", page: "1" },
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmUxMGI4YTZiNmUxMTQ4MTFjMGNlZTU0YzQ4ZTA5NCIsInN1YiI6IjY2NDk1NTRiNDRlYjRmNmQwYTkyY2E5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uVXa_n6NgfHnh5OJaRU-fr4eeNBgib47eIpb1palLBU",
          },
        };
        await axios
          .request(options)
          .then(function (response) {
            // console.log(response.data.results);
            setTv(response.data.results);
            setLoading(false);
          })
          .catch(function (error) {
            console.error(error);
            // setLoading(false);
          });
      } catch (error) {}
    };

    FetchMovies();
  }, []);

  //Function for Left and right Slider
  const sliderRight = (element) => {
    element.scrollLeft += scrollAmount - 110;
  };

  const sliderLeft = (element) => {
    element.scrollLeft -= scrollAmount - 110;
  };

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
    <div>
      {loading ? (
        <div className="flex justify-center items-center mx-auto my-4 w-full h-[50vh]">
          <BeatLoader color="#ffffff" />
        </div>
      ) : (
        <div className="flex flex-col">
          <h1 className="px-4 sm:px-10 mt-3 font-semibold text-sm sm:text-xl ">
            Series - Trending
          </h1>

          <div className="flex">
            <div className="justify-center items-center rounded-md w-[25px] h-[150px] sm:h-[200px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[400px] my-4 mx-1 hidden sm:flex">
              <img
                onClick={() => sliderLeft(sliderRef.current)}
                className="hover:cursor-pointer active:scale-95"
                src={prev}
                alt=""
              />
            </div>

            <div
              className="flex overflow-x-auto gap-4 p-4 scrollbar-hide w-full rounded-xl scroll-smooth"
              ref={sliderRef}
            >
              {tv.map((movie) => (
                <a
                  className="flex-shrink-0 block w-auto"
                  href={`/tv/${movie.original_name}`}
                  onClick={(event) => handleLinkClick(movie, event)}
                >
                  <div className="rounded-xl w-auto h-[150px] sm:h-[200px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[400px] overflow-hidden">
                    <MovieCard
                      key={movie.id}
                      url={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      title={movie.original_name}
                    />
                  </div>
                </a>
              ))}
            </div>

            <div className="justify-center items-center rounded-md w-[25px] h-[150px] sm:h-[200px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[400px] my-4 mx-1 hidden sm:flex">
              <img
                onClick={() => sliderRight(sliderRef.current)}
                className="hover:cursor-pointer active:scale-95"
                src={next}
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
