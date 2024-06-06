import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const HeaderManagement = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    // Xử lý đăng xuất
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex justify-between w-full">
        <div>
          <div class="">
            <label
              htmlFor="my-drawer-2"
              className="mx-10 bg-white text-primary drawer-button lg:hidden cursor-pointer"
            >
              <i className="fa-solid fa-bars"></i>
            </label>
            <NavLink to={"/"}>
              <span className="mx-10 normal-case text-xl font-bold text-primary whitespace-nowrap">
                Cóc Travel
              </span>
            </NavLink>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className=" indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="animate-pulse badge badge-xs badge-primary indicator-item"></span>
              </div>
            </label>
            <div
              tabIndex={0}
              className={`mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow ${
                showNotifications ? "visible" : "invisible"
              }`}
            >
              <div className="card-body">
                <span className="font-bold text-lg">4 Thông báo</span>
                <span className="text-info">Xem tất cả thông báo</span>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/414678494_331834699659042_4939488158624701886_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=pFLzY8KDU2cAb69ugGU&_nc_ht=scontent.fdad3-4.fna&cb_e2o_trans=q&oh=00_AfAUdPoSnLqyb8QOP0lacL00RpF-ttQivPbJjLke_MWJ3w&oe=6629984B" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ${
                showProfile ? "visible" : "invisible"
              }`}
            >
              <li>
                <a className="justify-between">
                  Hồ sơ
                  <span className="badge">Xem</span>
                </a>
              </li>
              <li>
                <a>Cài đặt</a>
              </li>
              <li>
                <a onClick={handleLogout}>Đăng xuất</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderManagement;
