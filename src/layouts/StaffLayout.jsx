import { Outlet } from "react-router-dom";
import MenuManagement from "../components/Menu/MenuManagement";
import HeaderManagement from "../components/Header/HeaderManagement";

function StaffLayout() {
  return (
    <>
      <div className="flex">
        <MenuManagement />
        <div className="flex-1">
          <HeaderManagement />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default StaffLayout;
