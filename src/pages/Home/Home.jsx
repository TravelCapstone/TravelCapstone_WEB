import React, { useEffect } from "react";

import { Hero, Navbar } from "../../components";

import NatureGif from "../../assets/video/intro.gif";
import ListPage from "./TopListTour/TopListTour";

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className="h-[700px] relative"
        style={{
          backgroundImage: `url(${NatureGif})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Hero />
      </div>
      <ListPage />
    </>
  );
};

export default Home;
