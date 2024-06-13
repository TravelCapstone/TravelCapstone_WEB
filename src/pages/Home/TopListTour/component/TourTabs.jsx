// TourTabs.js
import React from 'react';
import { Tabs, Button } from 'antd';
import styled from 'styled-components';
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { themeGet } from '@styled-system/theme-get';

const { TabPane } = Tabs;

const TabsWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
`;

const CustomTabs = styled(Tabs)`
  .ant-tabs-nav-list {
    display: flex;
    align-items: center;
  }

  .ant-tabs-tab {
    padding: 8px 16px;
    margin: 0;
    transition: color 0.2s ease-in-out;

    &:hover {
      .ant-tabs-tab-btn {
        color: ${themeGet('primary.0', '#008489')}; /* Màu khi tab được hover */
      }
    }
  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
    font-weight:500;
      color: ${themeGet('primary.0', '#008489 !important')}; /* Màu khi tab được chọn */
    }
  }

  .ant-tabs-ink-bar {
    background: ${themeGet('primary.0', '#008489 !important')}; /* Màu của gạch chân khi tab được chọn */
    height: 3px;
  }
 
`;



const TourTabs = ({ overview, itinerary, videos, reviews, pricing }) => (
  <TabsWrapper>
    <CustomTabs defaultActiveKey="1">
      <TabPane tab="Tổng quan" key="1" ><div className='w-full'>{overview}</div></TabPane>
      <TabPane tab="Lịch trình" key="2"> <div className='w-full'>{itinerary}</div></TabPane>
      <TabPane tab="Video/Image" key="3">{videos}</TabPane>
      <TabPane tab="Review" key="4">{reviews}</TabPane>
      <TabPane tab="Bảng giá" key="5">{pricing}</TabPane>
    </CustomTabs>
  
  </TabsWrapper>
);

export default TourTabs;
