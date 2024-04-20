// src/components/StyledCard.js
import React from 'react';
import { Carousel, Card } from 'antd';
import styled from 'styled-components';
import { HeartOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const StyledCardContainer = styled.div`
  max-width: 768px; 
  padding-bottom:20px;
  margin-bottom: 100px;
  border-radius: 6px;
  overflow: hidden; 
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s; 
  position: relative; // Added for positioning favorite icon

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledCarousel = styled(Carousel)`
  .slick-slide {
    text-align: center;
    height: 200px;
    line-height: 200px;
    background: #364d79;
    overflow: hidden;
  }

  .slick-slide img {
    width: 100%;
    height: 100%;
  }

  .slick-prev, .slick-next {
    z-index: 1;
    top: 50%;
    transform: translate(0, -50%);
    width: 30px;
    height: 30px;
    color: #fff;
  }

  .slick-prev { left: 10px; }
  .slick-next { right: 10px; }
`;

const FavoriteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  background-color: rgba(0,0,0,0.5); // Adjust for visibility
  padding: 8px;
  width:40px;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
`;

const formatter = value => `${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// This is the custom card using Tailwind CSS
const TailwindCard = ({ data }) => {
    console.log('data', data);

    const { nameTour, minPrice, location, duration, totalSlotOrdered, groupSize, images } = data;
    const firstLocation = location[0];
    const lastLocation = location[location.length - 1];

    const PrevArrow = ({ className, style, onClick }) => (
        <LeftOutlined className={className} style={{ ...style, color: '#fff', fontSize: '20px', zIndex: 2 }} onClick={onClick} />
    );

    const NextArrow = ({ className, style, onClick }) => (
        <RightOutlined className={className} style={{ ...style, color: '#fff', fontSize: '20px', zIndex: 2 }} onClick={onClick} />
    );
    return (
        <StyledCardContainer>
            <StyledCarousel
                autoplay={false} // Disable auto play
                arrows // Enable arrows
                prevArrow={<PrevArrow />} // Custom previous arrow
                nextArrow={<NextArrow />} // Custom next arrow
            >
                {images.map((imageUrl, index) => (
                    <div key={index}>
                        <img src={imageUrl} alt={`${nameTour} image ${index + 1}`} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                    </div>
                ))}
            </StyledCarousel>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{nameTour}</div>
                <p className="text-gray-700 text-base">
                    Khởi hành từ {firstLocation} đến {lastLocation}
                </p>
                <p className="text-gray-700 text-base">
                    Khoảng thời gian: {duration}
                </p>
                <p className="text-gray-700 text-base">
                    Đã có: {totalSlotOrdered} người đặt/{groupSize}
                </p>
                <p className="text-cyan-700 text-xl font-semibold mt-5">
                    Giá chỉ từ {formatter(minPrice)} / Người
                </p>
            </div>
            <FavoriteIcon>
                <HeartOutlined />
            </FavoriteIcon>
            <div className="flex justify-end">
                <NavLink to="/detail-tour-public" className="py-4 text-xl">
                    <span className="rounded-lg py-2 px-4 bg-[rgb(0,132,137)] text-white hover:bg-teal-800 mr-6">Xem Chi Tiết</span>
                </NavLink>
            </div>
        </StyledCardContainer>
    );
};

export default TailwindCard; 