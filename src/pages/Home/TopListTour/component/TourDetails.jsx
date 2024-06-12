// TourDetails.js
import React from 'react';
import styled from 'styled-components';
import { Rate, Button } from 'antd';
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { themeGet } from '@styled-system/theme-get';

const DetailsWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;


const InfoWrapper = styled.div`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;


  button,
  button.ant-btn {
    margin: 0 5px;
    height: 37px;
    min-width: 90px;
    padding: 0 15px;
    border: 1px solid ${themeGet('border.3', '#E6E6E6')};
    color: ${themeGet('text.0', '#2C2C2C')};
    font-size: 15px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;

    svg {
      width: 18.309px;
      height: 15.537px;
      margin-right: 10px;

      path {
        fill: transparent;
        stroke: ${themeGet('text.0', '#2C2C2C')};
        stroke-width: 1.5px;
      }
    }

    &:focus {
      outline: none;
    }
    &:hover {
      background-color: ${themeGet('color.2', '#F7F7F7')};
    }
    &:after {
      display: none;
    }

    &:first-child {
      margin-left: 0;
      svg {
        position: relative;
        top: 1px;
        path {
          stroke-width: 1.8px;
        }
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;



const TourDetails = ({ name, rating, address, numFeedBack }) =>{
    console.log("rating", rating);
    const getRatingText = (rating) => {
        if (rating === 5) {
          return 'Tuyệt vời';
        } else if (rating >= 4.5) {
          return 'Rất tốt';
        } else if (rating >= 4) {
          return 'Tốt';
        } else if (rating >= 3.5) {
          return 'Khá tốt';
        } else if (rating >= 3) {
          return 'Khá';
        } else if (rating >= 2.5) {
          return 'Trung bình';
        } else if (rating >= 2) {
          return 'Dưới trung bình';
        } else if (rating >= 1.5) {
          return 'Kém';
        } else if (rating >= 1) {
          return 'Rất kém';
        } else {
          return 'Không đánh giá';
        }
      };
  
    return (
        <DetailsWrapper>
        <InfoWrapper>
          <p className='text-xs font-normal text-gray-500'>{address}</p>
          <h1 className='font-semibold text-2xl mb-2'>{name}</h1>
          <div className='items-center'>
            <Rate allowHalf disabled defaultValue={rating} />
            <span className="text-mainColor text-xs font-semibold mx-2">
              ({numFeedBack}) - {getRatingText(rating)}
            </span>
          </div>
        </InfoWrapper>
        <ButtonGroup>
          <Button icon={<HeartOutlined />}>Save</Button>
          <Button icon={<ShareAltOutlined />}>Share</Button>
        </ButtonGroup>
      </DetailsWrapper>
);
};

export default TourDetails;
