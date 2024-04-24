import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { TourRequestForm, Home } from "../pages";
import { CommonLayout, StaffLayout } from "../layouts";
import ViewOptions from "../pages/ViewOptions/ViewOptions";
import { alertFail } from "../hook/useNotification";
import {
  ADMIN_PAGE,
  CREATE_OPTIONS_TOUR_PRIVATE,
  CREATE_TOUR_PRIVATE,
  DETAIL_TOUR_REQUEST_STAFF,
  HOME_PAGE,
  IMPORT_DATA,
  LISTING_TOUR_REQUEST_STAFF,
  LOGIN_PAGE,
  STAFF_PAGE,
  VIEW_OPTIONS_TOUR_PRIVATE,
  VIEW_REFERENCE_TRANSPORT_PRICE,
  VIEW_USER,
} from "../settings/constant";
import TourRequestPage from "../pages/Staff/ManagePrivateTour/TourPackage/ViewListTourPrivate/DetailTourRequest";
import SignInPage from "../pages/SignIn_Register/SignIn";
import ListingTourRequestStaff from "../pages/Staff/ManagePrivateTour/TourPackage/ViewListTourPrivate/ListingTourRequestStaff";
import AdminLayout from "../layouts/AdminLayout";
import ListReferenceTransportPrice from "../pages/Admin/ReferenceTransportPrice/ListReferenceTransportPrice";
import ListAccount from "../pages/Admin/Account/ListAccount";
import ImportData from "../pages/Admin/ImportData/ImportData";
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
        { path: VIEW_OPTIONS_TOUR_PRIVATE, element: <ViewOptions /> },
        { path: CREATE_TOUR_PRIVATE, element: <TourRequestForm /> },
      ],
    },
    {
      path: STAFF_PAGE,
      element: <StaffLayout />,
      children: [
        // Staff
        {
          path: LISTING_TOUR_REQUEST_STAFF,
          element: <ListingTourRequestStaff />,
        },
        {
          path: `${DETAIL_TOUR_REQUEST_STAFF}/:id`,
          element: <TourRequestPage />,
        },
      ],
    },
    {
      path: ADMIN_PAGE,
      element: <AdminLayout />,
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
