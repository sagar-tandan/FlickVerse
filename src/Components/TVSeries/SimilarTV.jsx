import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import MovieCard from "../MovieCard.jsx";
import BeatLoader from "react-spinners/BeatLoader";

import { useNavigate } from "react-router-dom";

import prev from "../../assets/Icons/prev.png";
import next from "../../assets/Icons/next.png";
import notF from "../../assets/4044.png";

export default function SimilarTV({ id, tits }) {
  const sliderRef = useRef(null);
  const scrollAmount = window.innerWidth;
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const FetchMovies = async () => {
      setLoading(true);

      try {
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/tv/${id}/similar`,
          params: { language: "en-US", page: "1" },
          headers: {
            accept: "application/json",
            Authorization: import.meta.env.VITE_APP_API_KEY,
          },
        };
        axios
          .request(options)
          .then(function (response) {
            // console.log(response.data.results);
            setSimilar(response.data.results);
            setLoading(false);
          })
          .catch(function (error) {
            console.error(error);
            setLoading(false);
          });
      } catch (error) {}
    };

    FetchMovies();
  }, [id]);

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
    <>
      {loading ? (
        <div className="flex justify-center items-center mx-auto my-4">
          <BeatLoader color="#ffffff" />
        </div>
      ) : (
        <div>
          {similar.length > 0 && (
            <div className="flex flex-col">
              <div className="font-poppins font-semibold text-white text-lg sm:text-xl tracking-wide px-3 sm:px-10">
                <h1 className="inline-block sm:hidden">Similar Movies</h1>
                <h1 className="hidden sm:inline-block truncate ...">
                  Because you are watching{" "}
                  <span className="text-orange-600">{tits}</span>
                </h1>
              </div>
              <div className="flex px-3">
                <div className="justify-center items-center rounded-md w-[25px] h-[150px] sm:h-[200px] my-4 mx-1 hidden sm:flex">
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
                  {similar.map((item) => (
                    <a
                      className="flex-shrink-0 block w-auto"
                      href={`/tv/${item.original_name}`}
                      onClick={(event) => handleLinkClick(item, event)}
                    >
                      <div
                        key={item.id}
                        className="rounded-xl w-[120px] sm:w-[150px] xl:w-[200px] 2xl:w-[300px] 3xl:w-[350px] h-[150px] sm:h-[200px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[400px] overflow-hidden flex-shrink-0"
                      >
                        {item.poster_path ? (
                          <MovieCard
                            key={item.id}
                            url={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                            title={item.title}
                          />
                        ) : (
                          <MovieCard
                            key={item.id}
                            url={notF}
                            title={item.title}
                          />
                        )}
                      </div>
                    </a>
                  ))}
                </div>

                <div className="justify-center items-center rounded-md w-[25px] h-[150px] sm:h-[200px] my-4 mx-1 hidden sm:flex">
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
      )}
    </>
  );
}
