import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import tips from "../assets/Icons/tips.png";
import { Link } from "react-router-dom";
import Header from '../Components/Headers/Header2.jsx'

export default function MovieStream() {
  const location = useLocation();
  const { id, id2 } = location.state;
  const [ID, setID] = useState(id);
  const [mainID, setMainID] = useState(id2);
  const [server, setServer] = useState("server1");

  // console.log(location.state);

  return (
    <>
      {/* <div className="relative max-w-screen-5xl h-screen flex justify-center items-center overflow-hidden mx-auto"> */}
      <div className="flex flex-col gap-5 bg-[#0c0c0c] absolute top-0 left-0 right-0 w-full h-full bg-opacity-85 overflow-y-scroll scroll-smooth">
        <Header/>
        <div className="flex flex-col gap-3 text-white font-poppins w-full p-4 mb-20 mt-[50px] sm:mt-[60px] max-w-screen-2xl mx-auto">
          <div className="flex flex-row m-2 gap-3 flex-wrap">
            <div
              onClick={() => {
                setID(`https://www.2embed.cc/embed/${mainID}`);
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
                setID(`https://moviesapi.club/movie/${mainID}`);
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
                setID(`https://multiembed.mov/?video_id=${mainID}&tmdb=1`);
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
                setID(`https://player.smashy.stream/movie/${mainID}`);
                setServer("server4");
              }}
              className={`border-[#454545] border-[1px] px-3 py-1 sm:py-2 rounded  hover:bg-opacity-80 hover:cursor-pointer transition-all ease-in-out ${
                server == "server4" ? "bg-blue-600" : "bg-[#2b2b2b]"
              } `}
            >
              Server 4
            </div>
            <div
              onClick={() => {
                setID(`https://vidsrc.pro/embed/movie/${mainID}`);
                setServer("server5");
              }}
              className={`border-[#454545] border-[1px] px-3 py-1 sm:py-2 rounded  hover:bg-opacity-80 hover:cursor-pointer transition-all ease-in-out ${
                server == "server5" ? "bg-blue-600" : "bg-[#2b2b2b]"
              } `}
            >
              Server 5
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

          <div className="w-full overflow-y-auto h-[60vh] sm:h-[85vh] mt-4 border-[0.5px] border-gray-900">
            <iframe
              className="w-full h-full"
              src={ID}
              title="Streaming content"
              allowFullScreen={true}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="allow-scripts allow-same-origin"
            ></iframe>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
