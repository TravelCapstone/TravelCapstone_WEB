import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';

function CommonLayout() {
    return (
        <>
            {/* <Navbar /> */}
            <Outlet />
            {/* <Footer /> */}
        </>
    );
}

export default CommonLayout;
