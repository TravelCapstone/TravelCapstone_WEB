// ViewOptions.jsx
import React from 'react';
import { viewOptionsData } from './ViewOptions.data'; // Assuming you have this data file
import ViewOptionsItems from './ViewOptionsItems'; // This should be the component that maps over your options and returns a list of cards
import ViewOptionsWrapper, {
  ViewOptionHeader,
  Title,
  Description,
  ViewOptionTableArea,
  ButtonGroup,
  Button,
} from './ViewOptions.style';

const ViewOptions = () => {
  const options = viewOptionsData.result.items;
  return (
    <ViewOptionsWrapper>
      <ViewOptionHeader>
        <Title>Chọn Gói Dịch Vụ</Title>
        <Description>
          Customize this description to describe your view options.
        </Description>
      </ViewOptionHeader>
      <div>
        <ViewOptionsItems options={options} />
      </div>
    </ViewOptionsWrapper>
  );
};

export default ViewOptions;
