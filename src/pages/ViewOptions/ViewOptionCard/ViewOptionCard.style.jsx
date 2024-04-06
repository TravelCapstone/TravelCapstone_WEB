import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const ViewOptionCardWrapper = styled.div`
  border-radius: 6px;
  position: relative;
  border: 1px solid ${themeGet('border.3', '#E6E6E6')};
  transition: box-shadow 0.3s ease;
  margin: 10px; // Added based on the card margin from your ViewOptionCard component

  &:hover {
    border-color: transparent; // changed from 0 to transparent for valid CSS
    box-shadow: 0 0 30px ${themeGet('boxShadow.1', 'rgba(0, 0, 0, 0.16)')};
    button {
      color: ${themeGet('color.1', '#ffffff')};
      background-color: ${themeGet('primary.0', '#008489')};
    }
  }
`;

export const ViewOptionHeader = styled.div`
  padding: 27px 29px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: ${themeGet('color.2', '#F7F7F7')};
`;

export const Title = styled.h2`
  color: ${themeGet('text.0', '#2C2C2C')};
  font-size: 22px;
  line-height: 1.2;
  font-weight: 700;
`;

export const ViewOption = styled.p`
  color: ${themeGet('text.0', '#2C2C2C')};
  font-size: 16px;
  line-height: 18px;
  margin-bottom: 0;
`;

export const ViewOptionList = styled.ul`
  margin: 0;
  padding: 29px 30px 30px;
  margin-bottom: 140px;
  // background: pink;
  height: fit-content;

  li {
    margin-bottom: 14px;
    color: ${themeGet('text.0', '#2C2C2C')};
    font-size: 13px;
    line-height: 18px;
    .anticon {
      margin-right: 12px;
    }
    .anticon-check-circle {
      color: ${themeGet('primary.0', '#008489')};
    }
    .anticon-close-circle {
      color: ${themeGet('color.4', '#FC5C63')};
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ViewOptionAction = styled.div`
  padding: 30px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: ${themeGet('color.1', '#ffffff')};
`;

export const SelectButton = styled.button`
  cursor: pointer;
  padding: 10px;
  min-width: 120px; // Adjusted width
  min-height: 40px; // Adjusted height
  border: 0;
  font-size: 16px;
  line-height: 18px;
  font-weight: 700;
  border-radius: 5px; // Adjusted for rounded corners
  color: #ffffff; // Assuming you want a white text
  background-color: #7D4CDB; // Assuming a purple background as per the button in the image
  transition: background-color 0.25s ease;
  margin-top: 20px; // Space above the button
`;

export default ViewOptionCardWrapper;
