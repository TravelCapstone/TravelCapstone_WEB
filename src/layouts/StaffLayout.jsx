import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet } from 'react-router';
const { Header, Sider, Content } = Layout;

function StaffLayout() {
    
    return (
      
            <Outlet/>
         
    );
}

export default StaffLayout