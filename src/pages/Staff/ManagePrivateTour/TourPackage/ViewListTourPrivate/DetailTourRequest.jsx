import React from 'react';
import { Card, List, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_OPTIONS_TOUR_PRIVATE } from '../../../../../settings/constant';

function TourRequestPage() {
  const location = useLocation();
  const { order } = location.state; 
  const navigate = useNavigate();

  const data = [
    { title: "Họ tên người đại diện", description: order.username },
    { title: "Số điện thoại liên hệ", description: order.phone },
    { title: "Phân loại tour", description: order.type },
    { title: "Tên tour", description: order.tourName },
    { title: "Thời gian", description: order.dateRange },
    { title: "Mô tả yêu cầu", description: order.description },
    { title: "Số người lớn", description: order.adults},
    { title: "Số trẻ em", description: order.child },
    // { title: "Địa điểm mong muốn", order: mockData.locations },
    // { title: "Ghi chú (nếu có)", order: mockData.note },
  ];
  console.log('order', data);

  const handleCreateTourOption = () => {
    navigate(CREATE_OPTIONS_TOUR_PRIVATE  , { state: { order } });
  };

  return (
    <div className="container mx-auto mt-20 p-4 w-1/2">
      <h1 className="text-xl font-semibold mb-4">Chi Tiết Yêu Cầu Tour</h1>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<span className="font-semibold ">{item.title}</span>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>
      <Button className='mt-4' type="primary" onClick={handleCreateTourOption}>
        Tạo Lựa Chọn Tour
      </Button>
    </div>
  );
}

export default TourRequestPage;
