import React, { useState } from "react";
import {
  FACILITY,
  LISTING_TOUR_REQUEST_STAFF,
  VIEW_REFERENCE_TRANSPORT_PRICE,
  VIEW_USER,
} from "../settings/constant";
import { NavLink, Outlet } from "react-router-dom";
import HeaderManagement from "../components/Header/HeaderManagement";

const ManagementLayout = ({ isAdmin }) => {
  const [openMenus, setOpenMenus] = useState([]);

  const handleMenuToggle = (index) => {
    if (openMenus.includes(index)) {
      setOpenMenus(openMenus.filter((i) => i !== index));
    } else {
      setOpenMenus([...openMenus, index]);
    }
  };

  const menuAdmin = [
    {
      title: "Thống kê",
      path: "/dashboard",
      icon: <i class="fa-solid fa-chart-column"></i>,
    },
    {
      title: "Người dùng",
      icon: <i class="fa-solid fa-users"></i>,
      submenu: [
        {
          title: "Quản lí người dùng",
          path: VIEW_USER,
        },
      ],
    },
    {
      title: "Đối tác",
      icon: <i class="fa-solid fa-handshake"></i>,
      submenu: [
        {
          title: "Quản lí đối tác",
          path: FACILITY,
        },
      ],
    },
    {
      title: "Các loại chi phí",
      icon: <i class="fa-solid fa-money-bill"></i>,
      submenu: [
        {
          title: "Chi phí phương tiện di chuyển",
          path: VIEW_REFERENCE_TRANSPORT_PRICE,
        },
      ],
    },
    {
      title: "Cấu hình hệ thống",
      path: "/settings",
      icon: <i class="fa-solid fa-gear"></i>,
      submenu: [
        { title: "Ràng buộc kinh doanh", path: "/settings/general" },
        { title: "Cập nhật dữ liệu", path: "/settings/security" },
      ],
    },
  ];

  const menuStaff = [
    {
      title: "Người dùng",
      path: "/users",
      icon: <i class="fa-solid fa-users"></i>,
      submenu: [
        { title: "Quản lí người dùng", path: "/users/all" },
        { title: "Nhập dữ liệu hướng dẫn viên", path: "/users/active" },
      ],
    },
    {
      title: "Tour",
      path: "/users",
      icon: <i class="fa-solid fa-bus-simple"></i>,
      submenu: [
        { title: "Quản lí tour", path: "/users/all" },
        { title: "Tạo tour", path: "/users/active" },
        { title: "Tour yêu cầu", path: LISTING_TOUR_REQUEST_STAFF },
      ],
    },
    {
      title: "Các loại chi phí",
      icon: <i class="fa-solid fa-money-bill"></i>,
      submenu: [
        {
          title: "Chi phí phương tiện di chuyển",
          path: VIEW_REFERENCE_TRANSPORT_PRICE,
        },
        {
          title: "Nơi lưu trú",
          path: VIEW_REFERENCE_TRANSPORT_PRICE,
        },
        {
          title: "Dịch vụ ăn uống",
          path: VIEW_REFERENCE_TRANSPORT_PRICE,
        },
        {
          title: "Dịch vụ vui chơi giải trí",
          path: VIEW_REFERENCE_TRANSPORT_PRICE,
        },
      ],
    },
  ];

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <HeaderManagement />
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn bg-mainColor text-white hover:bg-secondary drawer-button fixed top-2 left-2 lg:hidden z-50"
          >
            <i className="fa-solid fa-bars"></i>
          </label>
        </div>

        <div className="drawer-side shadow-lg h-full">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className=" h-full menu p-4 w-60 max-w-xs bg-base-100 text-base-content">
            <NavLink
              className="mt-12 block mb-4 text-xl font-semibold text-primary italic"
              to={`/`}
            >
              Cóc Travel
            </NavLink>
            {isAdmin
              ? menuAdmin.map((menu, index) => (
                  <li className="mt-2" key={index}>
                    <span
                      className={`flex items-center cursor-pointer p-2 rounded-md hover:bg-mainColor hover:text-white rounded-lg ${
                        openMenus.includes(index)
                          ? "bg-mainColor text-white"
                          : ""
                      }`}
                      onClick={() => handleMenuToggle(index)}
                    >
                      {menu.icon}
                      <span className="ml-2 flex-1">{menu.title}</span>
                      {menu.submenu && (
                        <svg
                          className={`fill-current transition-transform ${
                            openMenus.includes(index) ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                      )}
                    </span>
                    {menu.submenu && (
                      <ul
                        className={`p-2  rounded-md ${
                          openMenus.includes(index) ? "block" : "hidden"
                        }`}
                      >
                        {menu.submenu.map((submenu, subindex) => (
                          <li
                            key={subindex}
                            className="hover:bg-mainColor hover:text-white rounded-md"
                          >
                            <NavLink
                              className="block p-2 text-sm font-medium"
                              to={submenu.path}
                            >
                              {submenu.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              : menuStaff.map((menu, index) => (
                  <li className="mt-2" key={index}>
                    <span
                      className={`flex items-center cursor-pointer p-2 rounded-md hover:bg-mainColor hover:text-white rounded-lg ${
                        openMenus.includes(index)
                          ? "bg-mainColor text-white"
                          : ""
                      }`}
                      onClick={() => handleMenuToggle(index)}
                    >
                      {menu.icon}
                      <span className="ml-2 flex-1">{menu.title}</span>
                      {menu.submenu && (
                        <svg
                          className={`fill-current transition-transform ${
                            openMenus.includes(index) ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                      )}
                    </span>
                    {menu.submenu && (
                      <ul
                        className={`p-2  rounded-md ${
                          openMenus.includes(index) ? "block" : "hidden"
                        }`}
                      >
                        {menu.submenu.map((submenu, subindex) => (
                          <li
                            key={subindex}
                            className="hover:bg-mainColor hover:text-white rounded-md"
                          >
                            <NavLink
                              className="block p-2 text-sm font-medium"
                              to={submenu.path}
                            >
                              {submenu.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ManagementLayout;
