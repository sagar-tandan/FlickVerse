import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMovieDetailsAndCredits } from "../Components/getMovieDetailsAndCredits";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SimilarMovies from "../MainComps/SimilarMovies.jsx";

import star from "../assets/Icons/star.png";
import Recommendation from "../MainComps/Recommendation.jsx";
import YtVideos from "../Components/YtVideos.jsx";

export default function MovieDetail() {
  const [details, setDetails] = useState([]);
  const [cred, setCredits] = useState([]);
  const [Video, setVideo] = useState("false");
  const location = useLocation();
  const { title, id, desc, date, rating, image } = location.state;

  const navigate = useNavigate(); // Ensure navigate is defined

  useEffect(() => {
    // Scroll to the element with the ID "top"
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [id]);

  useEffect(() => {
    const fetchDetails = async () => {
      const movieData = await getMovieDetailsAndCredits(id);
      //   console.log(movieData.credits);
      setDetails(movieData.details);
      setCredits(movieData.credits);
    };
    fetchDetails();
  }, [id]);

  //Getting genre and cast and crews
  const { genres } = details;

  const director =
    cred?.crew?.find((member) => member.job === "Director")?.name || "N/A";

  const cast = cred?.cast?.slice(0, 3).map((member) => member.name);

  const handleLinkClick = (ids, mainId, event) => {
    event.preventDefault();
    setTimeout(() => {
      navigate(`/${title}/${mainId}`, {
        state: {
          id: ids,
          id2: mainId,
        },
      });
    }, 300);
  };

  const watchTrailer = (id, event) => {
    event.preventDefault(); // Prevent default navigation
    setVideo("true");
  };

  const handleDataChange = (newData) => {
    setVideo(newData);
  };

  return (
    <>
      <div className="relative max-w-screen-5xl h-screen flex justify-center items-center overflow-hidden mx-auto">
        <img
          className="absolute top-0 left-0 right-0 w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${image}`}
          alt=""
        />

        <div
          className="flex flex-col gap-5 bg-[#0c0c0c] absolute top-0 left-0 right-0 w-full h-full bg-opacity-85 overflow-y-scroll"
        >
          {/* Movie detail */}
          <div  id="top" className="flex flex-col gap-3 text-white font-poppins w-full md:w-[80%] lg:w-[80%] xl:w-[60%] p-6 sm:p-10">
            <h1 className="font-poppins font-bold tracking-widest text-xl sm:text-3xl mt-2 uppercase">
              {title}
            </h1>
            <div className="flex gap-3 flex-wrap">
              {genres &&
                genres.map((genre) => (
                  <div
                    key={genre.id}
                    className="border bg-[#464646] rounded-full px-3 py-[2px] sm:py-1 text-sm"
                  >
                    {genre.name}
                  </div>
                ))}
            </div>

            <div className="flex gap-1 sm:gap-6 flex-col sm:flex-row">
              <div className="flex gap-2 justify-start items-center flex-wrap">
                <span className="font-medium md:font-semibold text-md md:text-lg">
                  Director :
                </span>
                <span className="font-light md:font-medium text-yellow-500 text-sm md:text-lg">
                  {director}
                </span>
              </div>

              {cast && (
                <div className="flex gap-2 justify-start items-center flex-wrap">
                  <span className="font-medium md:font-semibold text-md md:text-lg">
                    Stars :
                  </span>
                  <span className="font-light md:font-medium text-yellow-500">
                    {cast[0]}, {cast[1]}
                  </span>
                </div>
              )}
            </div>

            {/* movie overview */}
            <p className="font-light md:font-medium">{desc}</p>

            {details.runtime ? (
              <div className="flex gap-6 justify-start items-center flex-wrap">
                <span className="text-yellow-400">{details.runtime} mins</span>
                <span>{date}</span>
                <div className="flex justify-start gap-1">
                  <span>{rating}</span>
                  <img className="w-5 h-5" src={star} alt="" />
                </div>
              </div>
            ) : (
              <div className="text-yellow-400 text-md font-light">
                Fetching...
              </div>
            )}

            <div className="flex gap-6 mt-2 flex-col sm:flex-row justify-between">
              <a
                className="w-[80%] sm:w-full mx-auto flex justify-center items-center bg-blue-600 text-sm sm:text-lg font-medium py-2 px-3 sm:px-6 rounded-full opacity-100 hover:bg-blue-800 transition-all ease-in-out duration-300 active:scale-[105%] hover:text-yellow-400"
                onClick={(event) =>
                  handleLinkClick(
                    `https://www.2embed.cc/embed/${id}`,
                    id,
                    event
                  )
                }
              >
                <button className="w-full ">Play Now</button>
              </a>

              <button
                onClick={(event) => watchTrailer(id, event)}
                className=" w-[80%] mx-auto sm:w-full flex justify-center items-center bg-blue-600 text-sm sm:text-lg font-medium py-2 px-3 sm:px-6 rounded-full opacity-100 hover:bg-blue-800 transition-all ease-in-out duration-300 active:scale-[105%] hover:text-yellow-400"
              >
                Watch Video
              </button>
            </div>
          </div>

          {Video == "true" && (
            <YtVideos id={id} onDataChange={handleDataChange} />
          )}

          <div className="border w-[98%] border-yellow-400 mx-auto"></div>

          {/* Similar Movies */}
          <div className="w-full">
            <SimilarMovies id={id} tits={title} />
          </div>
          <div className="w-full">
            <Recommendation id={id} />
          </div>
        </div>
      </div>
    </>
  );
}
