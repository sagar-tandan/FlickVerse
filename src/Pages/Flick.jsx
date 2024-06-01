import React from "react";

export default function Flick() {
  return (
    <div className="w-full flex flex-col text-white font-poppins p-3 sm:p-6 max-w-screen-xl mx-auto overflow-y-scroll absolute top-0 bottom-0 left-0 right-0">
      <h1 className="text-lg sm:text-xl font-semibold tracking-widest">
        How to watch
      </h1>
      <h2 className="text-sm my-2">
        Follow these tips for uninterrupted streaming :
      </h2>
      <div className="flex flex-col border-[1px] p-5 border-[#c1c1c1] bg-[#242424] rounded">
        <h1 className="text-lg">1. Install Ad Blocker</h1>
        <p className="text-sm text-[#c1c1c1] mt-2">
          To ensure a smooth viewing experience, it is recommended to installing
          an ad blocker. Since this site is using third-party to stream movies,
          so site has no right to take control the ads that are displayed. So it
          is recommended to use Ad Blocker in order to avoid ads.
        </p>

        <p className="text-sm text-[#c1c1c1] mt-2">
          These are the best ad blocker extensions recommended but you are free
          to use any ad blocker you want :
        </p>

        <a
          href="https://chromewebstore.google.com/detail/adblock-%E2%80%94-block-ads-acros/gighmmpiobklfepjocnamgkkbiglidom?hl=en-US&utm_source=ext_sidebar"
          target="_blank"
        >
          <div className="flex flex-col border-[1px] p-2 border-[#d5d5d5] rounded mt-5 text-black font-semibold text-xl hover:cursor-pointer hover:bg-[#c1c1c1] active:scale-[99%] transition-all ease-in-out duration-75">
            <h1 className="text-lg">AdBlock - best ad blocker</h1>
            <div className="flex mt-2">
              <img
                src="https://getadblock.com/images/updateAssets/core_logo_full.svg"
                alt=""
              />
            </div>
          </div>
        </a>
        <a
          href="https://chromewebstore.google.com/detail/pop-up-blocker-for-chrome/bkkbcggnhapdmkeljlodobbkopceiche"
          target="_blank"
        >
          <div className="flex flex-col border-[1px] p-2 border-[#d5d5d5] rounded mt-5 text-black font-semibold text-xl hover:cursor-pointer hover:bg-[#c1c1c1] active:scale-[99%] transition-all ease-in-out duration-75">
            Pop up blocker for Chrome
          </div>
        </a>
      </div>

      <div className="flex flex-col border-[1px] p-5 border-[#c1c1c1] bg-[#242424] rounded mt-5">
        <h1 className="text-lg">2. Switch Servers (If Needed)</h1>
        <p className="text-sm text-[#c1c1c1] mt-2">
          Since this site is using third-party to stream movies, so site has no
          right to take control over the servers. If you experience buffering on
          any server, try switching to another server.
        </p>

        <p className="text-sm text-[#c1c1c1] mt-2">
          Watch the video below to learn how to switch to a different server.
        </p>
        <div className="mt-5">Video goes here!!!!</div>
        <div className="mt-5">Video goes here!!!!</div>
        <div className="mt-5">Video goes here!!!!</div>
        <div className="mt-5">Video goes here!!!!</div>
        <div className="mt-5">Video goes here!!!!</div>
        <div className="mt-5">Video goes here!!!!</div>
      </div>
    </div>
  );
}
