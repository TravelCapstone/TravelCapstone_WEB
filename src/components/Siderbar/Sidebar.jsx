import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  FACILITY,
  LISTING_TOUR_REQUEST_STAFF,
  VIEW_REFERENCE_TRANSPORT_PRICE,
  VIEW_USER,
} from "../../settings/constant";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [roleName, setRoleName] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = {
    isAdmin: [
      {
        title: "Thống kê",
        path: "/dashboard",
        icon: <i className="fa-solid fa-chart-column"></i>,
      },
      {
        title: "Người dùng",
        icon: <i className="fa-solid fa-users"></i>,
        submenu: [
          {
            title: "Quản lí người dùng",
            path: VIEW_USER,
          },
        ],
      },
      {
        title: "Đối tác",
        icon: <i className="fa-solid fa-handshake"></i>,
        submenu: [
          {
            title: "Quản lí đối tác",
            path: FACILITY,
          },
        ],
      },
      {
        title: "Các loại chi phí",
        icon: <i className="fa-solid fa-money-bill"></i>,
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
        icon: <i className="fa-solid fa-gear"></i>,
        submenu: [
          { title: "Ràng buộc kinh doanh", path: "/settings/general" },
          { title: "Cập nhật dữ liệu", path: "/settings/security" },
        ],
      },
    ],
    isStaff: [
      {
        title: "Người dùng",
        icon: <i className="fa-solid fa-users"></i>,
        submenu: [
          { title: "Khách hàng", path: VIEW_USER },
          { title: "Hướng dẫn viên", path: "/users/active" },
          { title: "Tài xế", path: "/users/active" },
        ],
      },
      {
        title: "Tour",
        path: "/staff",
        icon: <i className="fa-solid fa-bus-simple"></i>,
        submenu: [
          { title: "Quản lí tour", path: "/users/all" },
          { title: "Tạo tour", path: "/users/active" },
          { title: "Tour yêu cầu", path: LISTING_TOUR_REQUEST_STAFF },
        ],
      },
      {
        title: "Các loại chi phí",
        icon: <i className="fa-solid fa-money-bill"></i>,
        submenu: [
          {
            title: "Chi phí phương tiện di chuyển",
            path: VIEW_REFERENCE_TRANSPORT_PRICE,
          },
        ],
      },
    ],
  };

  useEffect(() => {
    // Trong đây, bạn có thể lấy giá trị roleName từ một nguồn dữ liệu khác (ví dụ: từ Redux store, localStorage, API, ...)
    // Ví dụ, giả sử giá trị roleName là "isShop":
    setRoleName("isStaff");
  }, []);

  const handleMenuClick = (index) => {
    if (expandedMenu === index) {
      setExpandedMenu(null); // Collapse if already expanded
    } else {
      setExpandedMenu(index); // Expand the clicked menu
    }
  };

  const renderMenu = (items) => {
    return items.map((item, index) => (
      <>
        <li key={index}>
          <div
            className={`flex items-center w-full cursor-pointer`}
            onClick={() => handleMenuClick(index)}
          >
            {item.icon}
            <span className="ml-2 text-md">{item.title}</span>
          </div>
          {item.submenu && expandedMenu === index && (
            <ul className="p-2">{renderSubMenu(item.submenu)}</ul>
          )}
          {!item.submenu && (
            <NavLink to={item.path}>
              <div className="ml-4">{item.title}</div>
            </NavLink>
          )}
        </li>
      </>
    ));
  };

  const renderSubMenu = (subMenu) => {
    return subMenu.map((item, index) => (
      <li key={index}>
        <NavLink to={item.path}>
          <div className="rounded-md my-1 ml-4">{item.title}</div>
        </NavLink>
      </li>
    ));
  };

  return (
    <div className="">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-10 shadow-lg rounded-4xl">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-60 min-h-full bg-white text-base-content">
            {roleName && renderMenu(menuItems[roleName])}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
