import React, { useState, useEffect } from "react";
import HamMenu from "./NavBar1.jsx";
import search from "../../assets/Icons/srch.png";
import user from "../../assets/Icons/usr.png";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Header() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const screenwidth = window.innerWidth;
      setWidth(screenwidth);
      localStorage.setItem("width", screenwidth);
    };

    //event listener
    window.addEventListener("resize", handleResize);

    //clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Load data from local storage when the component mounts
  useEffect(() => {
    const storedWidth = localStorage.getItem("width");
    if (storedWidth) setWidth(storedWidth);
  }, []);

  return (
    <div className="w-full justify-between z-20 h-[50px] sm:h-[60px] fixed flex backdrop-blur-lg bg-black/20 shadow-stone-800 shadow-md px-3">
      <div className="w-full justify-between h-full flex max-w-screen-2xl mx-auto">

      
      <Link className="flex gap-1 hover:cursor-pointer" to="/">
        <div className="flex gap-1 hover:cursor-pointer items-center">
          <img className="w-7 h-7 sm:w-14 sm:h-14" src={logo} alt="logo" />
          <div className="flex items-center">
            <h1 className="font-poppins font-semibold text-sm sm:text-xl lg:text-2xl text-[#1250f3]">
              𝑭𝑳𝑰𝑪𝑲
            </h1>
            <h1 className="font-poppins font-semibold text-sm sm:text-xl lg:text-2xl italic text-yellow-500">
              Λ
            </h1>
            <h1 className="font-poppins font-semibold text-sm sm:text-xl lg:text-2xl text-[#49cbff]">
              𝑬𝑹𝑺𝑬
            </h1>
          </div>
        </div>
      </Link>

      <ul className="hidden sm:flex gap-7 lg:gap-20 xl:gap-28 2xl:gap-36 3xl:gap-48 px-3 items-center font-poppins font-medium">
        <Link to="/">
          <li
            className={`hover:cursor-pointer transition-all ease-in-out duration-500 text-yellow-400 hover:text-yellow-400`}
          >
            Home
          </li>
        </Link>
        <Link to="/movies">
          <li
            className={`hover:cursor-pointer transition-all ease-in-out duration-500 text-white hover:text-blue-400`}
          >
            Movies
          </li>
        </Link>
        <Link to="/shows">
          <li
            className={`hover:cursor-pointer transition-all ease-in-out duration-500 text-white hover:text-blue-400`}
          >
            TV Shows
          </li>
        </Link>
      </ul>

      {width > 310 ? (
        <Link className="items-center flex sm:hidden w-[50%]" to="/search">
          <div className="flex w-full gap-1 items-center border-[0.2px] py-1 rounded-full">
            <img className="w-5 h-5 p-1 ml-1" src={search} alt="" />
            <input
              className="outline-none bg-transparent text-white text-sm font-poppins font-light  hover:cursor-pointer"
              type="text"
              placeholder="Search"
            />
          </div>
        </Link>
      ) : (
        <div className="flex items-center hover:cursor-pointer">
          <Link to="/search">
            <img className="w-5 h-5" src={search} alt="search" />
          </Link>
        </div>
      )}

      <div className="hidden sm:flex sm:gap-10">
        {width > 800 ? (
          <Link className="flex items-center" to="/search">
            <div className="flex gap-3 items-center border-[0.2px] py-1 rounded-full">
              <img className="w-6 h-6 p-1 ml-2" src={search} alt="" />
              <input
                className="outline-none bg-transparent text-white text-sm font-poppins font-light  hover:cursor-pointer"
                type="text"
                placeholder="Search Everything"
              />
            </div>
          </Link>
        ) : (
          <div className="sm:flex hidden items-center hover:cursor-pointer">
            <Link to="/search">
              <img className="w-5 h-5" src={search} alt="search" />
            </Link>
          </div>
        )}

        {/* <div className="sm:flex items-center hidden">
          <Link to="/login">
            <img className="w-6 h-6" src={user} alt="" />
          </Link>
        </div> */}
      </div>
      </div>
    </div>
  );
}
