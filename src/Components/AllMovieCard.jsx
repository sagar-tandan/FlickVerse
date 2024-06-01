import React from "react";


export default function MovieCard({id, url,title }) {
  return (
    <img
    className="text-white rounded-xl w-[100%] h-[150px] sm:h-[200px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[400px] hover:scale-[115%] transition-all ease-in-out duration-300 hover:cursor-pointer active:scale-[105%]"
      key={id}
      src={url}
      alt={title}
    />
  );
}