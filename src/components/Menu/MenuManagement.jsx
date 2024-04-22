import React, { useState } from "react";
import {
  LISTING_TOUR_REQUEST_STAFF,
  VIEW_REFERENCE_TRANSPORT_PRICE,
} from "../../settings/constant";
import { NavLink } from "react-router-dom";
const MenuManagement = ({ isAdmin }) => {
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
      title: "Doanh thu",
      path: "/revenue",
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
  ];
  return (
    <>
      <div className="flex h-screen">
        <div className="bg-white shadow-md rounded-r-lg text-black">
          <NavLink className="block m-8 text-lg font-semibold	italic" to={`/`}>
            Cóc Travel
          </NavLink>

          <ul className="menu  h-full font-medium text-black bg-white">
            {isAdmin
              ? menuAdmin.map((menu, index) => (
                  <li
                    key={index}
                    className="block menu-title hover:cursor-pointer bg-white"
                  >
                    <span
                      className={` hover:cursor-pointer px-2 text-black rounded-md menu-dropdown-toggle flex items-center ${
                        openMenus.includes(index) ? "menu-dropdown-show" : ""
                      }`}
                      onClick={() => handleMenuToggle(index)}
                    >
                      {menu.icon}
                      <span className="m-3 font-medium">{menu.title}</span>
                    </span>
                    {menu.submenu && (
                      <ul
                        className={`menu-dropdown ${
                          openMenus.includes(index) ? "menu-dropdown-show" : ""
                        }`}
                      >
                        {menu.submenu.map((submenu, subindex) => (
                          <li
                            key={subindex}
                            className="hover:bg-black hover:text-white hover:cursor-pointer my-2 rounded-md"
                          >
                            <NavLink
                              className="p-2 block text-black font-medium hover:text-white"
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
                  <li
                    key={index}
                    className="block menu-title hover:cursor-pointer bg-white"
                  >
                    <span
                      className={` hover:cursor-pointer px-2 text-black rounded-md menu-dropdown-toggle flex items-center ${
                        openMenus.includes(index) ? "menu-dropdown-show" : ""
                      }`}
                      onClick={() => handleMenuToggle(index)}
                    >
                      {menu.icon}
                      <span className="m-3 font-medium">{menu.title}</span>
                    </span>
                    {menu.submenu && (
                      <ul
                        className={`menu-dropdown ${
                          openMenus.includes(index) ? "menu-dropdown-show" : ""
                        }`}
                      >
                        {menu.submenu.map((submenu, subindex) => (
                          <li
                            key={subindex}
                            className="hover:bg-black hover:text-white hover:cursor-pointer my-2 rounded-md"
                          >
                            <NavLink
                              className="p-2 block text-black font-medium hover:text-white"
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

export default MenuManagement;
