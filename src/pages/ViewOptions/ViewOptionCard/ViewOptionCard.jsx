import React from 'react';
import ViewOptionCardWrapper, {
  ViewOptionHeader,
  Title,
  ViewOptionList,
  ViewOptionAction,
  SelectButton,
} from './ViewOptionCard.style'; 

const ViewOptionCard = ({ option }) => {
  const { services = [] } = option;
  return (
    <ViewOptionCardWrapper>
      <ViewOptionHeader>
        <Title>{option.packageName}</Title>
      </ViewOptionHeader>
      <ViewOptionList>
        {services.map(service =>  (
          <li key={service.name}>
            {/* Assuming you want to use icons, you need to import and use them here */}
            <h3>{service.name}</h3>
            <p>Địa điểm: {service.location}</p>
            <p>Loại dịch vụ: {service.serviceType}</p>
          </li>
        ))}
        <ViewOptionAction>
        <div>
          <Title>TOTAL PRICE</Title>
          <p>{option.price}</p>
        </div>
        <SelectButton>Chọn option này</SelectButton>
      </ViewOptionAction>
      </ViewOptionList>
      
    </ViewOptionCardWrapper>
  );
};

export default ViewOptionCard;