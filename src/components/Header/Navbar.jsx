import React, { useState, useEffect } from "react";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { LogoutOutlined } from "@ant-design/icons";

import ResponsiveMenu from "./ResponsiveMenu";
import { MainLogo } from "../../components";
import { useAuth } from "../../context/AuthContext";
import {
  AGENT_PROFILE_PAGE,
  CREATE_TOUR_PRIVATE,
  LISTING_TOUR,
  LISTING_TOUR_PRIVATE,
  LISTING_TOUR_REQUEST_STAFF,
} from "../../settings/constant";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { isEmptyObject } from "../../utils/Util";
import { message } from "antd";

const DropdownLinks = [
  {
    name: "Đặt tour theo yêu cầu",
    link: CREATE_TOUR_PRIVATE,
  },
  {
    name: "Tham gia tour ghép",
    link: "/danh-sach-tour-ghep",
  },
];

const UserDropdownLinks = [
  // Add links that you want to appear in the user dropdown
  {
    name: "Thông tin người dùng",
    link: AGENT_PROFILE_PAGE,
    role: "isAdmin,isTourguide,isStaff,isCustomer",
  },
  {
    name: "Quản lý hệ thống",
    link: "/staff",
    role: "isAdmin,isStaff",
  },
  {
    name: "Tour yêu cầu của tôi",
    link: LISTING_TOUR_PRIVATE,
    role: "isCustomer",
  },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.user.user || {});
  const role = useSelector((state) => state.user.role || "");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [header, setHeader] = useState(false);

  const scrollHeader = () => {
    const menuItems = document.querySelectorAll(".menuItem");
    if (window.scrollY >= 50) {
      menuItems.forEach((item) => {
        item.classList.add("hover-black");
        item.classList.remove("hover-white");
      });
      setHeader(true);
    } else {
      menuItems.forEach((item) => {
        item.classList.add("hover-white");
        item.classList.remove("hover-black");
      });
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, []);
  useEffect(() => {
    if (!user) {
      window.location.reload();
    }
  }, [user]);
  return (
    <>
      <nav
        className={`navbar fixed top-0 right-0 w-full flex justify-between items-center z-50 font-semibold ${header ? "bg-white backdrop-blur-sm text-black shadow-md" : "bg-transparent text-black"}`}
      >
        <div className="bg-gradient-to-r from-primary to-secondary text-white font-semibold"></div>
        <div className="container py-[2px] sm:block hidden font-semibold">
          <div className="flex flex-row justify-between items-center w-full ">
            <div className="flex items-center justify-center mx-6 gap-4 font-bold text-2xl basis-1/6">
              <MainLogo />
            </div>
            <div className="hidden lg:flex mx-4 w-full justify-around">
              <ul className="flex items-center gap-6 font-semibold">
                <li className="py-4  m-1">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/" ? "activeNavbar" : ""
                    }`}
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <li className="py-4 m-1">
                  <NavLink
                    to="/tour"
                    className={` menuItem ${
                      location.pathname === "/tour" ? "activeNavbar" : ""
                    }`}
                  >
                    Tour du lịch
                  </NavLink>
                </li>
                <li className="py-4  m-1">
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
                <li className="group relative cursor-pointer  m-1">
                  <a
                    href="/#home"
                    className="flex h-[72px] items-center gap-[2px] "
                  >
                    Du lịch khách đoàn{" "}
                    <span>
                      <FaCaretDown className=" transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-9 z-[9999] hidden w-[250px] rounded-md bg-white p-2 text-black group-hover:block shadow-md ">
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
                <li className="py-4  m-1">
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
            <div className="hidden lg:block w-full basis-2/6">
              {!isEmptyObject(user) ? (
                <div className="group relative cursor-pointer ">
                  <a
                    href="/#home"
                    className="flex h-[72px] items-center gap-[2px] "
                  >
                    <FaUserCircle size={30} className="mr-3" />
                    <span className="font-semibold">
                      {`${user?.firstName} ${user?.lastName}`}{" "}
                    </span>
                    <span>
                      <FaCaretDown className="ml-2 transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-9 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md min-w-60 cursor-pointer">
                    <ul className="space-y-3">
                      {UserDropdownLinks.filter((link) =>
                        link.role.includes(role)
                      ).map((link) => (
                        <li key={link.name}>
                          <a
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20  "
                            href={link.link}
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => {
                            dispatch(logout());
                            message.success("Đăng xuất thành công");
                            navigate("/");
                          }}
                          className="font-semibold inline-block w-full rounded-md p-2 hover:bg-primary/20 text-[16px] bg-[#30dae114]"
                        >
                          <LogoutOutlined /> Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 font-semibold ">
                  <NavLink to="/sign-in" className="py-2 text-18 ">
                    <span className="text-black rounded-lg py-2 px-4 hover:bg-teal-800 hover:text-white hover:border-teal-800 border-2 border-white">
                      Đăng Nhập
                    </span>
                  </NavLink>
                  <NavLink to="/sign-up" className="py-4 text-18 ">
                    <span className="rounded-lg py-2 px-4 bg-[rgb(0,132,137)] text-white hover:bg-teal-800">
                      Đăng Ký
                    </span>
                  </NavLink>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 ">
              <div className="lg:hidden block">
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
