import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { LogoutOutlined } from '@ant-design/icons';

import ResponsiveMenu from "./ResponsiveMenu";
import { MainLogo } from "../../components";
import { useAuth } from "../../context/AuthContext";

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

const UserDropdownLinks = [
  // Add links that you want to appear in the user dropdown
  {
    name: 'My Profile',
    link: '/my-profile',
  },
  {
    name: 'My Tours',
    link: '/my-tours',
  },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn, username, logout } = useAuth();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const location = useLocation();
  console.log('isLoggedIn', isLoggedIn);
  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 h-24 bg-white backdrop-blur-sm text-black shadow-md">
        <div className="bg-gradient-to-r from-primary to-secondary text-white "></div>
        <div className="container sm:py-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 font-bold text-2xl">
              <MainLogo />
            </div>
            <div className="hidden md:block ml-4 mr-4">
              <ul className="flex items-center gap-6 ">
                <li className="py-4 text-xl m-2">
                  <NavLink
                    to="/"
                    className={` menuItem ${location.pathname === "/" ? "activeNavbar" : ""
                      }`}
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <li className="py-4 text-xl m-2">
                  <NavLink
                    to="/tour"
                    className={` menuItem ${location.pathname === "/tour" ? "activeNavbar" : ""
                      }`}
                  >
                    Tour du lịch
                  </NavLink>
                </li>
                <li className="py-4 text-xl m-2">
                  <NavLink
                    to="/cam-nang-du-lich"
                    className={` menuItem ${location.pathname === "/cam-nang-du-lich"
                      ? "activeNavbar"
                      : ""
                      }`}
                  >
                    Cẩm nang du lịch
                  </NavLink>
                </li>
                <li className="group relative cursor-pointer m-2 text-xl">
                  <a
                    href="/#home"
                    className="flex h-[72px] items-center gap-[2px] "
                  >
                    Du lịch khách đoàn{" "}
                    <span>
                      <FaCaretDown className="ml-2 transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-9 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md w-fit">
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
                <li className="py-4 text-xl  m-2">
                  <NavLink
                    to="/gioi-thieu"
                    className={` menuItem ${location.pathname === "/gioi-thieu" ? "activeNavbar" : ""
                      }`}
                  >
                    Về chúng tôi
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
              {
                isLoggedIn ? (
                  <div className="group relative cursor-pointer ">
                    <a
                    href="/#home"
                    className="flex h-[72px] items-center gap-[2px] text-xl "
                    >
                    <FaUserCircle size={30} className="mr-3"/>
                    <span className="font-semibold">{username}{" "}</span>
                    <span>
                      <FaCaretDown className="ml-2 transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -right-0 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md w-48 cursor-pointer">
                    <ul className="space-y-3">
                      {UserDropdownLinks.map((link) => (
                        <li key={link.name}>
                          <a
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20 text-center text-xl"
                            href={link.link}
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                      <li>
                          <button onClick={logout} className="font-semibold inline-block w-full rounded-md p-2 hover:bg-primary/20 text-xl"><LogoutOutlined /> Logout</button>
                      </li>
                    </ul>
                  </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 font-semibold">
                    <NavLink to="/sign-in" className="py-4 text-xl">
                    <span className="text-black rounded-lg py-2 px-4 hover:bg-teal-800 hover:text-white">Đăng Nhập</span>
                    </NavLink>
                    <NavLink to="/sign-up" className="py-4 text-xl">
                      <span className="rounded-lg py-2 px-4 bg-[rgb(0,132,137)] text-white hover:bg-teal-800">Đăng Ký</span>
                    </NavLink>
                  </div>
                )}
            </div>
            <div className="flex items-center gap-4">
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
