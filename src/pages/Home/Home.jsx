import React from 'react';

import { Hero } from '../../components';

import NatureVid from "../../assets/video/intro.mp4";

function Home() {
    return (
        <>
        <div className="h-[700px] relative">
          <video
            autoPlay
            loop
            muted
            className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
          >
            <source src={NatureVid} type="video/mp4" />
          </video>
          <Hero />
        </div>
        </>
    );
}

export default Home;
