import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FACILITY,
  HELP,
  INFOMATION_ACC,
  LISTING_TOUR,
  LISTING_TOUR_PRIVATE,
  LISTING_TOUR_REQUEST_STAFF,
  SECURITY_ACC,
  TRANSACTIONS,
  VIEW_POLICY,
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
import ListPrivateTour from "../../pages/Customer/TourRequest/CompanyTour/ListPrivateTour";

const { Header, Sider, Content } = Layout;

const SlidebarCus = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(250); // initial width
  const sidebarRef = useRef(null);
  const [activeMenuKeys, setActiveMenuKeys] = useState(null);

  console.log("sidebarWidth", sidebarWidth);
  const menuItems = [
    {
      title: "Tài khoản",
      icon: <i className="fa-solid fa-users"></i>,
      submenu: [
        {
          title: "Thông tin người dùng",
          path: INFOMATION_ACC,
        },
        {
          title: "Bảo mật tài khoản",
          path: SECURITY_ACC,
        },
      ],
    },
    {
      title: "Danh sách tour của tôi",
      icon: <i className="fa-solid fa-handshake"></i>,
      submenu: [
        {
          title: "Danh sách tour đặt",
          path: LISTING_TOUR,
        },
        {
          title: "Danh sách tour yêu cầu ",
          path: LISTING_TOUR_PRIVATE,
        },
      ],
    },
    {
      title: "Lịch sử giao dịch",
      icon: <i className="fa-solid fa-money-bill"></i>,
      submenu: [
        {
          title: "Giao dịch",
          path: TRANSACTIONS,
        },
      ],
    },
    {
      title: "Chính sách ",
      path: "/policies",
      icon: <i className="fa-solid fa-gear"></i>,
      submenu: [
        { title: "Chính sách tour và người dùng", path: VIEW_POLICY },
        { title: "Trợ giúp", path: HELP },
      ],
    },
  ];

  //   useEffect(() => {
  //     // Here you can get the roleName value from another data source (e.g., from Redux store, localStorage, API, etc.)
  //     // For example, assuming the roleName value is "isShop":
  //     setRoleName("isStaff");
  //   }, []);

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

  useEffect(() => {
    setActiveMenuKeys(findActiveMenuKey(menuItems));
  }, [location.pathname]);

  const handleMenuClick = (index) => {
    if (expandedMenu === index) {
      setExpandedMenu(null); // Collapse if already expanded
    } else {
      setExpandedMenu(index); // Expand the clicked menu
    }
  };

  const renderMenu = (items) => {
    return items.map((item) => {
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
          {renderMenu(item.submenu)}
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
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={
            activeMenuKeys ? [activeMenuKeys.subKey || activeMenuKeys.key] : []
          }
          className="bg-white font-semibold"
        >
          {renderMenu(menuItems)}
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

export default SlidebarCus;
