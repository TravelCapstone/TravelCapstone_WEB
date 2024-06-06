import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logoalt from "../../assets/logoalt.svg";

function MainLogo() {
  const [header, setHeader] = useState(false);

  const scrollHeader = () => {
    if (window.scrollY >= 50) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, []);
  return (
    <NavLink to={"/"} onClick={() => window.scrollTo(0, 0)}>
      <div className="flex items-center w-fit-contentx">
        {/* Thêm class dynamic để điều chỉnh màu của ảnh */}
        <div className="flex h-16 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="27.984"
            viewBox="0 0 25 27.984"
            fill={header ? "currentColor" : "white"}
          >
            <path
              id="Path_432"
              data-name="Path 432"
              d="M25.45,2.767a34.5,34.5,0,0,0-4,1.143,35.262,35.262,0,0,0-3.771,1.545,26.069,26.069,0,0,0-3.179,1.8,26.068,26.068,0,0,0-3.191-1.8A35.262,35.262,0,0,0,7.54,3.909,34.5,34.5,0,0,0,3.55,2.767L2,2.45V17.94a12.5,12.5,0,1,0,25,0V2.45ZM14.5,10.492c2.339,1.96,3.522,4.19,3.512,6.608a3.512,3.512,0,1,1-7.024,0h0C10.98,14.66,12.162,12.442,14.5,10.492Zm9.913,7.448a9.915,9.915,0,0,1-19.831,0V5.69a31.8,31.8,0,0,1,7.748,3.259,13.43,13.43,0,0,0-2.344,2.737A9.929,9.929,0,0,0,8.4,17.095a6.1,6.1,0,1,0,12.2,0,9.932,9.932,0,0,0-1.587-5.412,13.427,13.427,0,0,0-2.346-2.742,29.737,29.737,0,0,1,5.586-2.577c.819-.284,1.559-.51,2.158-.675Z"
              transform="translate(-2 -2.45)"
            />
          </svg>

          <h3
            className={`text-mainColor capitalize text-2xl font-bold ml-3 whitespace-nowrap ${header ? "text-mainColor" : "text-white"}`}
          >
            Cóc Travel
          </h3>
        </div>
      </div>
    </NavLink>
  );
}

export default MainLogo;
