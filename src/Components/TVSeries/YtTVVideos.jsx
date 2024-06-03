import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function YtTVVideos({ id, onDataChange }) {
  const iframeContainerRef = useRef(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const FetchVideo = async () => {
      try {
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/tv/${id}/videos`,
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
            setVideos(response.data.results);
          })
          .catch(function (error) {
            console.error(error);
          });
      } catch (error) {}
    };

    FetchVideo();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      {
        // console.log("outside");
        onDataChange("false");
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const trailer = videos[0]?.key;

  return (
    <>
      {}
      {videos.length > 0 && (
        <div className="bg-black fixed top-0 bottom-0 left-0 right-0 bg-opacity-[95%] h-[100%] flex justify-center items-center transition-all ease-in-out duration-300">
          <div
            className="flex flex-col max-w-screen-lg fixed aspect-video my-auto w-[80%] justify-center items-center"
            ref={iframeContainerRef}
          >
            <iframe
              className=" w-full h-full sm:w-[80%] sm:h-[80%] border-[1px] border-white"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="YouTube video player"
              frameborder="1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
