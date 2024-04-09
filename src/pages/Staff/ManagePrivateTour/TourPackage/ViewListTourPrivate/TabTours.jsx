import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Tabs } from 'antd';
import ListTourPrivate from './ListTourPrivate';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
  && .ant-tabs-nav-list .ant-tabs-tab {
    font-size: 1.25rem; /* 20px, equivalent to Tailwind's text-xl */
  }
`;

const ListingTourRequestStaff = () => {
    const [listTourRequest, setListTourRequest] = useState([])
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(`/`);
    };

    // const getListService =  async ()  =>{
    //     const res = await api.get(`/get-service-by-province-id/${locationID}/${type}`)
    //     console.log(res.data.result.items)
    //     setListService(res.data.result.items)
    //   }
      
        
    //     useEffect(() =>{
    //       getListService();
    //     },[locationID])

    

    // fake data
    const mockOrders = [
        {
            id: 1,
            tourName: 'Du lịch biển Đà Nẵng',
            dateRange: '2024-04-10 đến 2024-04-15',
            status: 'PROCESSING',
            username: 'Nguyen Van A',
            phone: '+84901234567',
            type: 'Tour gia đình',
            description: 'Chuyến đi bao gồm thăm quan các điểm du lịch nổi tiếng tại Đà Nẵng, bao gồm Bán đảo Sơn Trà, Bãi biển Mỹ Khê,...',
            adults: 2,
            children: 1,
            locations: 'Bán đảo Sơn Trà, Bãi biển Mỹ Khê',
            note: 'Yêu cầu xe đưa đón có ghế cho trẻ em',
        },
        {
            id: 2,
            tourName: 'Khám phá Sapa',
            dateRange: '2024-05-01 đến 2024-05-05',
            status: 'AWAITING_RESPONSE',
            username: 'Nguyen Van A',
            phone: '+84901234567',
            type: 'Tour gia đình',
            description: 'Chuyến đi bao gồm thăm quan các điểm du lịch nổi tiếng tại Đà Nẵng, bao gồm Bán đảo Sơn Trà, Bãi biển Mỹ Khê,...',
            adults: 2,
            children: 1,
            locations: 'Bán đảo Sơn Trà, Bãi biển Mỹ Khê',
            note: 'Yêu cầu xe đưa đón có ghế cho trẻ em',
        },
        {
            id: 3,
            tourName: 'Trải nghiệm Phú Quốc',
            dateRange: '2024-06-10 đến 2024-06-15',
            status: 'SELECTED_TOUR',
            username: 'Nguyen Van A',
            phone: '+84901234567',
            type: 'Tour gia đình',
            description: 'Chuyến đi bao gồm thăm quan các điểm du lịch nổi tiếng tại Đà Nẵng, bao gồm Bán đảo Sơn Trà, Bãi biển Mỹ Khê,...',
            adults: 2,
            children: 1,
            locations: 'Bán đảo Sơn Trà, Bãi biển Mỹ Khê',
            note: 'Yêu cầu xe đưa đón có ghế cho trẻ em',
        },
        {
            id: 4,
            tourName: 'Trải nghiệm Vịnh Hạ Long',
            dateRange: '2024-06-10 đến 2024-06-15',
            status: 'COMPLETED',
            username: 'Nguyen Van A',
            phone: '+84901234567',
            type: 'Tour gia đình',
            description: 'Chuyến đi bao gồm thăm quan các điểm du lịch nổi tiếng tại Đà Nẵng, bao gồm Bán đảo Sơn Trà, Bãi biển Mỹ Khê,...',
            adults: 2,
            children: 1,
            locations: 'Bán đảo Sơn Trà, Bãi biển Mỹ Khê',
            note: 'Yêu cầu xe đưa đón có ghế cho trẻ em',
        },
        {
            id: 5,
            tourName: 'Trải nghiệm Hang Sơn Đòong',
            dateRange: '2024-06-10 đến 2024-06-15',
            status: 'CANCELLED',
            username: 'Nguyen Van A',
            phone: '+84901234567',
            type: 'Tour gia đình',
            description: 'Chuyến đi bao gồm thăm quan các điểm du lịch nổi tiếng tại Đà Nẵng, bao gồm Bán đảo Sơn Trà, Bãi biển Mỹ Khê,...',
            adults: 2,
            children: 1,
            locations: 'Bán đảo Sơn Trà, Bãi biển Mỹ Khê',
            note: 'Yêu cầu xe đưa đón có ghế cho trẻ em',
        },
    ];


    const tabItems = [
        {
            label: "Tất cả",
            key: "1",
            children: <ListTourPrivate orders={mockOrders} title="Tất cả yêu cầu" />,
        },
        {
            label: "Chờ Xử Lý",
            key: "2",
            children: <ListTourPrivate orders={mockOrders.filter(order => order.status === 'PROCESSING')} title="Yêu cầu đang chờ xử lý" />,
        },
        {
            label: "Chờ Phản Hồi",
            key: "3",
            children: <ListTourPrivate orders={mockOrders.filter(order => order.status === 'AWAITING_RESPONSE')} title=" Tour chờ phản hồi" />,
        },
        {
            label: "Đã Chọn Tour",
            key: "4",
            children: <ListTourPrivate orders={mockOrders.filter(order => order.status === 'SELECTED_TOUR')} title=" Tour đã chọn"  />,
        },
        {
            label: "Tour Hoàn Thành",
            key: "5",
            children: <ListTourPrivate  orders={mockOrders.filter(order => order.status === 'COMPLETED')} title=" Tour đã hoàn thành" />,
        },
        {
            label: "Tour Đã Huỷ",
            key: "6",
            children: <ListTourPrivate orders={mockOrders.filter(order => order.status === 'CANCELLED')} title=" Tour đã bị hủy" />,
        },
    ];


    // const breadcrumbs = [
    //     { title: 'Home', href: HOME_PAGE },
    //     { title: 'Tour Request History', href: ORDER_HISTORY },
    // ];

    
    return (
        <div className='mt-36'>
            {/* <Container>
                <Row gutter={30} id="tourOverviewSection" style={{ marginTop: 30 }}>
                    <Col span={24} className='flex'>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                        <BackButton onClick={handleBackClick} />
                    </Col>
                </Row>
            </Container> */}
            <div>
                <h2 className="text-2xl font-bold text-center mx-10 my-5">LỊCH SỬ TOUR YÊU CẦU</h2>
                <StyledTabs defaultActiveKey="1" centered items={tabItems}/>
            </div>
        </div>
    );
};

export default ListingTourRequestStaff;
