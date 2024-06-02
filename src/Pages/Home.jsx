import Header from "../Components/Headers/Header1.jsx";
import NowPlaying from "../MainComps/NowPlaying.jsx";
import PopularMovies from "../MainComps/PopularMovies.jsx";
import TopRated from "../MainComps/TopRated.jsx";
import OntheAir from "../MainComps/TV/OntheAir.jsx";
import TvPopular from "../MainComps/TV/TvPopular.jsx";
import NavBar from '../Components/Headers/NavBar1.jsx'
import HindiNowPlaying from "../MainComps/HindiNowPlaying.jsx";

export default function Home() {
  return (
    <div className="w-full text-white font-poppins tracking-wider overflow-y-scroll absolute top-0 bottom-0 left-0 right-0 pb-10 scroll-smooth">
      <Header />
      
      <PopularMovies />
      <div className="flex flex-col px-5">
        <NowPlaying />
      </div>

      <div className="flex flex-col px-5">
        <OntheAir />
      </div>
      <div className="flex flex-col px-5">
        <HindiNowPlaying />
      </div>

      <div className="flex flex-col px-5">
        <TvPopular />
      </div>

      <div className="flex flex-col px-5">
        <TopRated />
      </div>
      <NavBar />

    </div>
  );
}
