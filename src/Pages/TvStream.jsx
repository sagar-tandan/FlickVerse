import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import tips from "../assets/Icons/tips.png";
import axios from "axios";
import "../Components/TVSeries/style.css";
import BeatLoader from "react-spinners/BeatLoader";
import Header from "../Components/Headers/Header3.jsx";

export default function MovieStream() {
  const location = useLocation();
  const { id2, season } = location.state;
  const [seasons, setSeasons] = useState(season);
  const [mainID, setMainID] = useState(id2);
  const [server, setServer] = useState("server1");

  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [eNo, setENo] = useState(1);

  const [loadingID, setLoadingID] = useState(false);

  const [ID, setID] = useState(
    `${import.meta.env.VITE_APP_Link_1}${mainID}-${selectedSeason}-${eNo}`
  );

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);

  // console.log(location.state);
  // console.log(seasons);
  // console.log(selectedSeason);
  // console.log(eNo);

  const [count, setCount] = useState(1);

  const handleSeason = (event) => {
    const newCount = count + 1;
    setCount(newCount);
    const rem = newCount % 2;
    {
      rem === 0 ? setSelected(true) : setSelected(false);
    }
    console.log(rem);
  };

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/tv/${mainID}/season/${selectedSeason}`,
          headers: {
            accept: "application/json",
            Authorization: import.meta.env.VITE_APP_API_KEY,
          },
          params: {
            language: "en-US",
            page: 1,
          },
        };
        const response = await axios.request(options);
        setEpisodes(response.data.episodes);
        setLoading(false);
        setENo(1);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [selectedSeason]);

  useEffect(() => {
    setLoadingID(true);
    {
      server === "server1"
        ? setID(
            `${
              import.meta.env.VITE_APP_Link_1
            }${mainID}-${selectedSeason}-${eNo}`
          )
        : server === "server2"
        ? setID(
            `${
              import.meta.env.VITE_APP_Link_2
            }${mainID}&s=${selectedSeason}&e=${eNo}`
          )
        : server === "server3"
        ? setID(
            `${
              import.meta.env.VITE_APP_Link_3
            }${mainID}&tmdb=1&s=${selectedSeason}&e=${eNo}`
          )
        : setID(
            `${
              import.meta.env.VITE_APP_Link_4
            }${mainID}/${selectedSeason}/${eNo}`
          );
    }
    setLoadingID(false)
  }, [eNo, selectedSeason]);

  return (
    <>
      {/* <div className="relative max-w-screen-5xl h-screen flex justify-center items-center overflow-hidden mx-auto"> */}
      <div className="flex flex-col gap-5 bg-[#0c0c0c] absolute top-0 left-0 right-0 w-full h-full bg-opacity-85 overflow-y-scroll scroll-smooth">
        <Header />
        <div className="flex flex-col lg:flex-row gap-4 text-white font-poppins w-full p-4 mb-20 mt-[50px] sm:mt-[60px] max-w-screen-2xl mx-auto">
          <div className="flex flex-col w-full lg:w-[80%]">
            <div className="flex flex-row m-2 gap-3 flex-wrap">
              <div
                onClick={() => {
                  setID(
                    `${
                      import.meta.env.VITE_APP_Link_1
                    }${mainID}-${selectedSeason}-${eNo}`
                  );
                  setServer("server1");
                }}
                className={`border-[#454545] border-[1px] px-3 py-1 sm:py-2 rounded  hover:bg-opacity-80 hover:cursor-pointer transition-all ease-in-out ${
                  server == "server1" ? "bg-blue-600" : "bg-[#2b2b2b]"
                } `}
              >
                Server 1
              </div>
              <div
                onClick={() => {
                  setID(
                    `${
                      import.meta.env.VITE_APP_Link_2
                    }${mainID}&s=${selectedSeason}&e=${eNo}`
                  );
                  setServer("server2");
                }}
                className={`border-[#454545] border-[1px] px-3 py-1 sm:py-2 rounded  hover:bg-opacity-80 hover:cursor-pointer transition-all ease-in-out ${
                  server == "server2" ? "bg-blue-600" : "bg-[#2b2b2b]"
                } `}
              >
                Server 2
              </div>

              <div
                onClick={() => {
                  setID(
                    `${
                      import.meta.env.VITE_APP_Link_3
                    }${mainID}&tmdb=1&s=${selectedSeason}&e=${eNo}`
                  );
                  setServer("server3");
                }}
                className={`border-[#454545] border-[1px] px-3 py-1 sm:py-2 rounded  hover:bg-opacity-80 hover:cursor-pointer transition-all ease-in-out ${
                  server == "server3" ? "bg-blue-600" : "bg-[#2b2b2b]"
                } `}
              >
                Server 3
              </div>

              <div
                onClick={() => {
                  setID(
                    `${
                      import.meta.env.VITE_APP_Link_4
                    }${mainID}/${selectedSeason}/${eNo}`
                  );
                  setServer("server5");
                }}
                className={`border-[#454545] border-[1px] px-3 py-1 sm:py-2 rounded  hover:bg-opacity-80 hover:cursor-pointer transition-all ease-in-out ${
                  server == "server5" ? "bg-blue-600" : "bg-[#2b2b2b]"
                } `}
              >
                Server 4
              </div>
            </div>
            <div className="flex gap-1 items-center justify-start mt-3">
              <img className="w-5 h-5 p-[2px]" src={tips} alt="" />
              <p className="text-sm font-poppins font-extralight">
                Need tips to stream the movie Uninterrupted ?
                <Link to="/flick">
                  <span className="hover:cursor-pointer hover:text-blue-600 font-poppins font-medium text-sm transition-all ease-in-out duration-200 ml-[2px]">
                    Click here!
                  </span>
                </Link>
              </p>
            </div>

            <div className="w-full overflow-y-auto h-[60vh] sm:h-[85vh] mt-4">
              {!loadingID && (
                <iframe
                  className="w-full h-full"
                  src={ID}
                  title="Streaming content"
                  allowFullScreen={true}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="allow-scripts allow-same-origin"
                ></iframe>
              )}
            </div>
          </div>

          <div className="w-full lg:w-[30%] flex flex-col mt-4 bg-[#373737] lg:mt-24 px-4 rounded-3xl">
            <div className="relative w-full p-2 mt-3">
              <div
                onClick={handleSeason}
                className=" w-full bg-blue-600 rounded-full py-2 flex justify-between items-center hover:cursor-pointer px-2"
              >
                <h1>Season {selectedSeason}</h1>
                <h2>▼</h2>
              </div>

              {selected && (
                <div className="absolute w-full left-0 right-0 rounded-xl h-[70vh] p-2 my-4 overflow-y-scroll bg-[#171717] py-4 scrollbar-custom">
                  <div className=" w-full outline-none flex flex-col gap-3 h-full">
                    {seasons.map((item, index) => (
                      <div
                        onClick={() => {
                          handleSeason();
                          setSelectedSeason(item.season_number);
                        }}
                        className={`font-light font-poppins text-md md:text-lg py-2 justify-center items-center flex ${
                          selectedSeason === item.season_number
                            ? "bg-blue-600 hover:bg-blue-700"
                            : " hover:bg-[#4b4b4b]"
                        }  p-3 py-3 px-4 rounded-full hover:cursor-pointer scrollbar-default active:scale-95 transition-all ease-in-out duration-300 truncate`}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center items-center mx-auto my-4">
                <BeatLoader color="#ffffff" />
              </div>
            ) : (
              <div className="w-full h-[70vh] p-2 my-3 overflow-y-scroll scrollbar-custom">
                <div className=" w-full outline-none flex flex-col gap-3 h-full">
                  {episodes.map((item, index) => (
                    <div
                      className={`font-lightfont-poppins text-sm ${
                        eNo === item.episode_number
                          ? "bg-blue-700 hover:bg-blue-700"
                          : "bg-[#1a1a1a] hover:bg-[#5a5a5a]"
                      }  p-4 rounded-full hover:cursor-pointer scrollbar-default active:scale-95 transition-all ease-in-out duration-300`}
                      onClick={() => {
                        setENo(item.episode_number);
                      }}
                    >
                      <h1 className="truncate ...">
                        Episode {item.episode_number} : {item.name}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
