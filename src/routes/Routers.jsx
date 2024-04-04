import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { CompanyTourRequest, Home } from '../pages';
import { CommonLayout } from '../layouts';

import { alertFail } from '../hook/useNotification';

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
            { path: "tour-doan-the", element: <CompanyTourRequest/> }],
        },
    ]);
    return routing;
}

export default Routers;
