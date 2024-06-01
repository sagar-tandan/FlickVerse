import React from "react";
import home from "../../assets/Icons/hom.png";
import yhome from "../../assets/Icons/yhome.png";
import movie from "../../assets/Icons/video.png";
import series from "../../assets/Icons/tv.png";
import user from "../../assets/Icons/prof.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="bottom-0 bg-black/20 backdrop-blur-lg w-full fixed sm:hidden flex h-[50px] items-center justify-center">
      <div className="w-[80%] flex justify-center items-center gap-10">
        <Link to="/">
          <img
            className="w-7 h-7 hover:cursor-pointer active:scale-90 transition-all ease-in-out duration-300"
            src={yhome}
            alt="home"
          />
        </Link>
        <Link to = '/movies'> 
          <img
            className="w-7 h-7 hover:cursor-pointer active:scale-90 transition-all ease-in-out duration-300"
            src={movie}
            alt="movie"
          />
        </Link>
        <Link to="/shows">
          <img
            className="w-7 h-7 hover:cursor-pointer active:scale-90 transition-all ease-in-out duration-300"
            src={series}
            alt="series"
          />
        </Link>
        <Link>
          <img
            className="w-7 h-7 hover:cursor-pointer active:scale-90 transition-all ease-in-out duration-300"
            src={user}
            alt="user"
          />
        </Link>
      </div>
    </div>
  );
}
