import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import star from "../assets/Icons/star.png";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { useNavigate } from "react-router-dom";

export default function PopularMovies() {
  const [populars, setPopular] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate(); // Ensure navigate is defined
  useEffect(() => {
    const handleResize = () => {
      const screenwidth = window.innerWidth;
      setWidth(screenwidth);
      console.log(screenwidth);
    };

    //event listener
    window.addEventListener("resize", handleResize);

    //clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const FetchMovies = async () => {
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
            page: 1,
          },
        };
        await axios
          .request(options)
          .then(function (response) {
            // console.log(response.data.results);
            setPopular(response.data.results);
          })
          .catch(function (error) {
            console.error(error);
          });
      } catch (error) {}
    };

    FetchMovies();
  }, []);

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
    <div className="flex gap-10 overflow-x-scroll scroll-smooth mt-[50px] sm:mt-[60px] ">
      {/* mt-[50px] sm:mt-[60px] */}
      <Carousel
        showThumbs={false}
        showIndicators={false}
        swipeable={true}
        infiniteLoop={true}
        emulateTouch
        showStatus={false}
        autoPlay
        interval={5000}
        stopOnHover={true}
      >
        {populars.map((movie) => (
          <div className="relative w-full h-[350px] xl:h-[400px] 2xl:h-[500px] 3xl:h-[600px]">
            <img
              className="w-full h-[350px] xl:h-[400px] 2xl:h-[500px] 3xl:h-[600px] rounded brightness-[30%] object-cover"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt=""
            />
            <div className="absolute flex flex-row top-0 bottom-0 left-0 right-0">
              <div className="flex flex-col w-full sm:w-[60%] gap-1 mx-7 sm:ml-8 xl:ml-16 justify-center">
                <h1 className="flex justify-start items-start text-left text-lg sm:text-xl xl:text-4xl font-semibold tracking-wider mb-1 sm:mb-4 uppercase">
                  {movie.title}
                </h1>

                <div className="flex gap-5 justify-start items-center mb-1 sm:mb-4 xl:text-2xl">
                  {movie?.adult === false ? (
                    <span className="bg-[#d4d4d4] px-3 rounded-lg text-black xl:text-2xl font-semibold">
                      13+
                    </span>
                  ) : (
                    <span className="bg-[#d4d4d4] px-3 rounded-lg xl:text-2xl text-red-700 font-semibold">
                      18+
                    </span>
                  )}

                  <span>{movie?.release_date.split("-")[0]}</span>
                  <span className="flex gap-1">
                    <h1>{movie?.vote_average.toFixed(1)}</h1>
                    <img className="w-5 h-5 xl:w-7 xl:h-7 " src={star} alt="" />
                  </span>
                </div>

                {movie.overview && (
                  <p className=" font-poppins text-sm lg:text-lg font-light text-left 2xl:text-xl 3xl:text-2xl">
                    {width <= 390 ? (
                      <p>{movie?.overview.slice(0, 180) + "..."}</p>
                    ) : width > 390 && width < 500? (
                      <p>{movie?.overview.slice(0, 200) + "..."}</p>
                    ) : width > 500 && width < 1000 ? (
                      <p>{movie?.overview.slice(0, 280) + "..."}</p>
                    ): width > 1000 && movie.overview.length > 400  ? (
                      <p>{movie?.overview.slice(0, 350) + "..."}</p>
                    ):width > 1000 && movie.overview.length < 400  ? (
                      <p>{movie?.overview}</p>
                    ):(
                      <div></div>
                    )}
                  </p>
                )}

                <a
                  className="bg-blue-500 w-[50%] sm:w-[50%] xl:w-[25%] text-white py-2 sm:py-3 2xl:py-4 px-4 rounded-xl mt-2 sm:mt-5 hover:bg-blue-700 hover:text-yellow-400 transition-all duration-300 ease-in-out active:scale-95 xl:text-2xl"
                  href={`/${movie.title}`}
                  onClick={(event) => handleLinkClick(movie, event)}
                >
                  <button className="font-poppins sm:font-medium">Watch</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
