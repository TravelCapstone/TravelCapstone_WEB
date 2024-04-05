import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { TourRequestForm, Home } from '../pages';
import { CommonLayout } from '../layouts';
import ViewOptions from '../pages/ViewOptions/ViewOptions'
import { alertFail } from '../hook/useNotification';
import CreateOptionForm from '../pages/Staff/ManagePrivateTour/TourPackage/CreatePackage/CreateOptionForm';

const ProtectedRouteAuth = ({ children }) => {
    const user = useSelector(selectUser);
    if (!user) {
        alertFail('Bạn cần phải đăng nhập để thực hiện thao tác này!!');
        return <Navigate to="/login" replace />;
    }
    return children;
};

const ProtectedRouteCustomer = ({ children }) => {
    const user = useSelector(selectUser);
    console.log(user);
    if (user?.role === 'CUSTOMER') {
        alertFail('Bạn không có quyền truy cập');
        return <Navigate to="/go-pro" replace />;
    }
    return children;
};

const ProtectedRouteStaff = ({ children }) => {
    const user = useSelector(selectUser);
    console.log(user);
    if (user?.role !== 'STAFF') {
        alertFail('Bạn không có quyền truy cập');
        return <Navigate to="/" replace />;
    }
    return children;
};

const ProtectedRouteAdmin = ({ children }) => {
    const user = useSelector(selectUser);
    console.log(user);
    if (user?.role !== 'ADMIN') {
        alertFail('Bạn không có quyền truy cập');
        return <Navigate to="/" replace />;
    }
    return children;
};

function Routers() {
    const routing = useRoutes([
        {
            path: '/',
            element: <CommonLayout />,
            children: [{ index: true, element: <Home /> },
            { path: '/view-options', element: <ViewOptions/> },
            { path: "dat-tour-theo-yeu-cau", element: <TourRequestForm/> },
            
            { path: "create", element: <CreateOptionForm/> }],
        },
    ]);
    return routing;
}

export default Routers; 
