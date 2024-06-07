import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "../pages";
import { CommonLayout, ManagementLayout } from "../layouts";
import ViewOptions from "../pages/Customer/ViewOptions/ViewOptions";
import TourRequestForm from "../pages/Customer/TourRequest/CompanyTour/TourRequestForm";
import { alertFail } from "../hook/useNotification";
import {
  ADMIN_PAGE,
  CREATE_TOUR_PRIVATE,
  DETAIL_FACILITY,
  DETAIL_TOUR_PRIVATE,
  DETAIL_TOUR_REQUEST_STAFF,
  FACILITY,
  HELP,
  HOME_PAGE,
  IMPORT_DATA,
  INFOMATION_ACC,
  LISTING_TOUR,
  LISTING_TOUR_PRIVATE,
  LISTING_TOUR_REQUEST_STAFF,
  LOGIN_PAGE,
  MENU,
  SECURITY_ACC,
  STAFF_PAGE,
  TRANSACTIONS,
  VIEW_OPTIONS_TOUR_PRIVATE,
  VIEW_POLICY,
  VIEW_REFERENCE_TRANSPORT_PRICE,
  VIEW_USER,
} from "../settings/constant";
import TourRequestPage from "../pages/Staff/ManagePrivateTour/TourPackage/ViewListTourPrivate/DetailTourRequest";
import SignInPage from "../pages/SignIn_Register/SignIn";
import ListingTourRequestStaff from "../pages/Staff/ManagePrivateTour/TourPackage/ViewListTourPrivate/ListingTourRequestStaff";
import ListReferenceTransportPrice from "../pages/Admin/ReferenceTransportPrice/ListReferenceTransportPrice";
import ListAccount from "../pages/Admin/Account/ListAccount";
import ImportData from "../pages/Admin/ImportData/ImportData";
import FacilityManagement from "../pages/Admin/Facility/FacilityManagement";
import DetailFacility from "../pages/Admin/Facility/DetailFacility";
import MenuManagement from "../pages/Admin/Menu/MenuManagement";
import CreatePlanForm from "../pages/Staff/ManagePrivateTour/CreatePlan/CreatePlanForm";
import ListPrivateTour from "../pages/Customer/TourRequest/CompanyTour/ListPrivateTour";
import CustomerLayout from "../layouts/CustomerLayout";
const ProtectedRouteAuth = ({ children }) => {
  const user = useSelector(selectUser);
  if (!user) {
    alertFail("Bạn cần phải đăng nhập để thực hiện thao tác này!!");
    return <Navigate to="/login" replace />;
  }
  return children;
};
const ProtectedRouteCustomer = ({ children }) => {
  const user = useSelector(selectUser);
  console.log(user);
  if (user?.role === "CUSTOMER") {
    alertFail("Bạn không có quyền truy cập");
    return <Navigate to="/go-pro" replace />;
  }
  return children;
};
const ProtectedRouteStaff = ({ children }) => {
  const user = useSelector(selectUser);
  console.log(user);
  if (user?.role !== "STAFF") {
    alertFail("Bạn không có quyền truy cập");
    return <Navigate to="/" replace />;
  }
  return children;
};
const ProtectedRouteAdmin = ({ children }) => {
  const user = useSelector(selectUser);
  console.log(user);
  if (user?.role !== "ADMIN") {
    alertFail("Bạn không có quyền truy cập");
    return <Navigate to="/" replace />;
  }
  return children;
};
function Routers() {
  const routing = useRoutes([
    {
      path: HOME_PAGE,
      element: <CommonLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: CREATE_TOUR_PRIVATE, element: <TourRequestForm /> },
      ],
    },
    {
      path: "/customer",
      element: <CustomerLayout />, // Sử dụng CustomerLayout cho các route của khách hàng
      children: [
        { path: INFOMATION_ACC, element: <TourRequestForm /> },
        { path: SECURITY_ACC, element: <TourRequestForm /> },
        { path: LISTING_TOUR, element: <TourRequestForm /> },
        { path: LISTING_TOUR_PRIVATE, element: <ListPrivateTour /> },
        { path: `${VIEW_OPTIONS_TOUR_PRIVATE}/:id`, element: <ViewOptions /> },
        { path: TRANSACTIONS, element: <TourRequestForm /> },
        { path: VIEW_POLICY, element: <TourRequestForm /> },
        { path: HELP, element: <TourRequestForm /> },
      ],
    },
    {
      path: STAFF_PAGE,
      element: <ManagementLayout isAdmin={false} />,
      children: [
        {
          path: VIEW_USER,
          element: <ListAccount />,
        },
        // Staff
        {
          path: LISTING_TOUR_REQUEST_STAFF,
          element: <ListingTourRequestStaff />,
        },
        {
          path: `${DETAIL_TOUR_REQUEST_STAFF}/:id`,
          element: <TourRequestPage />,
        },
        {
          path: VIEW_REFERENCE_TRANSPORT_PRICE,
          element: <ListReferenceTransportPrice />,
        },
        {
          path: `create-plan`,
          element: <CreatePlanForm />,
        },
      ],
    },
    {
      path: ADMIN_PAGE,
      element: <ManagementLayout isAdmin={true} />,
      children: [
        {
          path: VIEW_REFERENCE_TRANSPORT_PRICE,
          element: <ListReferenceTransportPrice />,
        },
        {
          path: VIEW_USER,
          element: <ListAccount />,
        },
        {
          path: IMPORT_DATA,
          element: <ImportData />,
        },
        {
          path: FACILITY,
          element: <FacilityManagement />,
        },
        {
          path: `${DETAIL_FACILITY}/:id`,
          element: <DetailFacility />,
        },
        {
          path: `${MENU}/:id`,
          element: <MenuManagement />,
        },
      ],
    },

    {
      path: LOGIN_PAGE,
      element: <SignInPage />,
    },
  ]);
  return routing;
}
export default Routers;
