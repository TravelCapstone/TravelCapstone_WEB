import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

import ResponsiveMenu from "./ResponsiveMenu";
import { MainLogo } from "../../components";

const DropdownLinks = [
  {
    name: "Đặt tour theo yêu cầu",
    link: "/dat-tour-theo-yeu-cau",
  },
  {
    name: "Tham gia tour ghép",
    link: "/danh-sach-tour-ghep",
  },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const location = useLocation();
  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm text-black shadow-md">
        <div className="bg-gradient-to-r from-primary to-secondary text-white "></div>
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 font-bold text-2xl">
              <MainLogo />
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-6 ">
                <li className="py-4">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/" ? "activeNavbar" : ""
                    }`}
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <li className="py-4">
                  <NavLink
                    to="/tour"
                    className={` menuItem ${
                      location.pathname === "/tour" ? "activeNavbar" : ""
                    }`}
                  >
                    Tour du lịch
                  </NavLink>
                </li>
                <li className="py-4">
                  <NavLink
                    to="/cam-nang-du-lich"
                    className={` menuItem ${
                      location.pathname === "/cam-nang-du-lich"
                        ? "activeNavbar"
                        : ""
                    }`}
                  >
                    Cẩm nang du lịch
                  </NavLink>
                </li>

                <li className="group relative cursor-pointer">
                  <a
                    href="/#home"
                    className="flex h-[72px] items-center gap-[2px]"
                  >
                    Du lịch khách đoàn{" "}
                    <span>
                      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-9 z-[9999] hidden w-[200px] rounded-md bg-white p-2 text-black group-hover:block shadow-md ">
                    <ul className="space-y-3">
                      {DropdownLinks.map((data) => (
                        <li key={data.name}>
                          <a
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                            href={data.link}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li className="py-4">
                  <NavLink
                    to="/gioi-thieu"
                    className={` menuItem ${
                      location.pathname === "/gioi-thieu" ? "activeNavbar" : ""
                    }`}
                  >
                    Về chúng tôi
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-4">
              {/* <button
                  className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full"
                  onClick={() => {
                    handleOrderPopup();
                  }}
                >
                  Book Now
                </button> */}
              {/* Mobile Hamburger icon */}
              <div className="md:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className=" cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  );
}

export default Navbar;
