import React from 'react';

import { Hero, Navbar } from '../../components';

import NatureVid from "../../assets/video/intro.mp4";
import ListPage from './TopListTour/TopListTour';

function Home() {
    return (
        <>
        <Navbar/>
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
        <ListPage />
        </>
    );
}

export default Home;
