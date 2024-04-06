import React from "react";
import { NavLink } from "react-router-dom";
import logoalt from "../../assets/logoalt.svg";

function MainLogo() {
  return (
    <NavLink to={"/"} onClick={() => window.scrollTo(0, 0)}>
      <div className="flex items-center w-fit-contentx">
        <img src={logoalt} alt="" className="h-16 w-5" />
        <h3 className="text-mainColor capitalize text-2xl font-bold ml-3">TripFinder.</h3>
      </div>
    </NavLink>
  );
}

export default MainLogo;
