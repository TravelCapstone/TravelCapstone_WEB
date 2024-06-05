import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FACILITY,
  LISTING_TOUR_REQUEST_STAFF,
  VIEW_REFERENCE_TRANSPORT_PRICE,
  VIEW_USER,
} from "../../settings/constant";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [roleName, setRoleName] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(200); // initial width
  const sidebarRef = useRef(null);

  console.log("collapsed", collapsed);
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
    // Here you can get the roleName value from another data source (e.g., from Redux store, localStorage, API, etc.)
    // For example, assuming the roleName value is "isShop":
    setRoleName("isStaff");
  }, []);

  useEffect(() => {
    // Ensure the sidebar is expanded when the location pathname changes
    if (collapsed) {
      setCollapsed(false);
    }
  }, [location.pathname]);

  const handleMenuClick = (index) => {
    if (expandedMenu === index) {
      setExpandedMenu(null); // Collapse if already expanded
    } else {
      setExpandedMenu(index); // Expand the clicked menu
    }
  };

  const findActiveMenuKey = (items) => {
    for (const item of items) {
      if (item.submenu) {
        const activeSubMenuKey = findActiveMenuKey(item.submenu);
        if (activeSubMenuKey) {
          return { key: item.path, subKey: activeSubMenuKey.key };
        }
      } else if (item.path === location.pathname) {
        return { key: item.path };
      }
    }
    return null;
  };

  const activeMenuKeys = roleName
    ? findActiveMenuKey(menuItems[roleName])
    : null;

  const renderMenu = (items, parentKey = null) => {
    return items.map((item, index) => {
      const key = parentKey ? `${parentKey}-${index}` : `${index}`;
      const isActive =
        activeMenuKeys &&
        (activeMenuKeys.key === item.path ||
          activeMenuKeys.subKey === item.path);

      return item.submenu ? (
        <Menu.SubMenu
          key={item.path}
          icon={item.icon}
          title={item.title}
          popupClassName={isActive ? "ant-menu-item-selected" : ""}
        >
          {renderMenu(item.submenu, key)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item
          key={item.path}
          icon={item.icon}
          className={isActive ? "bg-blue-500 text-white" : ""}
        >
          <NavLink to={item.path}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };

  const handleMouseDown = (e) => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newWidth = e.clientX;
    if (newWidth >= 200 && newWidth <= 600) {
      // Minimum and maximum width
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        ref={sidebarRef}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={sidebarWidth}
        className="bg-white shadow-lg"
        style={{ borderRadius: "0 0.75rem 0.75rem 0" }}
      >
        {/* <div className="flex items-center justify-between px-4 py-2">
          <span className="text-xl font-bold">Cóc Travel</span>
        </div> */}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={
            activeMenuKeys ? [activeMenuKeys.subKey || activeMenuKeys.key] : []
          }
          className="bg-white font-semibold"
        >
          {roleName && renderMenu(menuItems[roleName])}
        </Menu>
        <div
          className="absolute right-0 top-0 h-full w-2 bg-gray-200 cursor-ew-resize"
          onMouseDown={handleMouseDown}
        />
      </Sider>
      <Layout>
        <Header
          className="flex items-center justify-between px-4"
          style={{
            background: theme.useToken().token.colorBgContainer,
            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-xl"
          />
        </Header>
        <Content
          className="m-6 p-6 bg-white rounded-lg shadow-md"
          style={{
            background: theme.useToken().token.colorBgContainer,
            borderRadius: theme.useToken().token.borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
