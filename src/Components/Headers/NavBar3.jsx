import React from "react";
import home from "../../assets/Icons/hom.png";
import movie from "../../assets/Icons/video.png";
import series from "../../assets/Icons/tv.png";
import yseries from "../../assets/Icons/ytv.png";
import user from "../../assets/Icons/prof.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="bottom-0 z-10 bg-black/20 backdrop-blur-lg w-full fixed sm:hidden flex h-[50px] items-center justify-center">
      <div className="w-[70%] flex justify-between items-center">
        <Link to="/">
          <img
            className="w-7 h-7 hover:cursor-pointer active:scale-90 transition-all ease-in-out duration-300"
            src={home}
            alt="home"
          />
        </Link>
        <Link to="/movies">
          <img
            className="w-7 h-7 hover:cursor-pointer active:scale-90 transition-all ease-in-out duration-300"
            src={movie}
            alt="movie"
          />
        </Link>
        <Link to="/shows">
          <img
            className="w-7 h-7 hover:cursor-pointer active:scale-90 transition-all ease-in-out duration-300"
            src={yseries}
            alt="series"
          />
        </Link>
        {/* <Link>
          <img
            className="w-7 h-7 hover:cursor-pointer active:scale-90 transition-all ease-in-out duration-300"
            src={user}
            alt="user"
          />
        </Link> */}
      </div>
    </div>
  );
}
