// BookingSection.js
import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const BookingWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ddd;
  z-index: 1000;
`;

const Price = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const BookingSection = ({ price }) => (
  <BookingWrapper>
    <Price>{price}</Price>
    <div>
      <Button type="primary" style={{ marginRight: '10px' }}>Đặt Tour</Button>
      <Button>Tải File Tour</Button>
    </div>
  </BookingWrapper>
);

export default BookingSection;
