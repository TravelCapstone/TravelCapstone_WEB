// import React from 'react';
// import ViewOptionCardWrapper, {
//   ViewOptionHeader,
//   Title,
//   ViewOptionList,
//   ViewOptionAction,
//   SelectButton,
// } from './ViewOptionCard.style'; 

// const ViewOptionCard = ({ option }) => {
//   const { services = [] } = option;
//   return (
//     <ViewOptionCardWrapper>
//       <ViewOptionHeader>
//         <Title>{option.packageName}</Title>
//       </ViewOptionHeader>
//       <ViewOptionList>
//         {services.map(service =>  (
//           <li key={service.name}>
//             {/* Assuming you want to use icons, you need to import and use them here */}
//             <h3>{service.name}</h3>
//             <p>Địa điểm: {service.location}</p>
//             <p>Loại dịch vụ: {service.serviceType}</p>
//           </li>
//         ))}
//         <ViewOptionAction>
//         <div>
//           <Title>TOTAL PRICE</Title>
//           <p>{option.price}</p>
//         </div>
//         <SelectButton>Chọn option này</SelectButton>
//       </ViewOptionAction>
//       </ViewOptionList>
      
//     </ViewOptionCardWrapper>
//   );
// };

// export default ViewOptionCard;

import React from 'react';
import ViewOptionCardWrapper, {
  ViewOptionHeader,
  Title,
  ViewOptionList,
  ViewOptionAction,
  SelectButton,
} from './ViewOptionCard.style'; 

const ViewOptionCard = ({ option }) => {
  const { 
    quantity, 
    sellPriceHistory: { 
      pricePerAdult, 
      pricePerChild, 
      date, 
      service: { 
        id, 
        name, 
        description, 
        type, 
        isActive, 
        address, 
        communceId, 
        serviceProviderId 
      } 
    },
    optionQuotation: {
      name: quotationName,
      description: quotationDescription,
      optionClass,
      total,
      status,
      privateTourRequest: {
        startDate,
        endDate,
        numOfAdult,
        numOfChildren,
        tourId,
        isEnterprise,
        accountId,
      }
    }
  } = option;

  return (
    <ViewOptionCardWrapper>
      <ViewOptionHeader>
        <Title>{name}</Title> {/* Name of the service */}
      </ViewOptionHeader>
      <ViewOptionList>
        <li>ID dịch vụ: {id}</li>
        <li>Mô tả dịch vụ: {description}</li>
        <li>Loại dịch vụ: {type}</li>
        <li>Trạng thái: {isActive ? 'Hoạt động' : 'Không hoạt động'}</li>
        <li>Địa điểm: {address}</li>
        <li>ID cộng đồng: {communceId}</li>
        <li>ID nhà cung cấp dịch vụ: {serviceProviderId}</li>
        <li>Giá cho người lớn: {pricePerAdult.toLocaleString()} VND</li>
        <li>Giá cho trẻ em: {pricePerChild.toLocaleString()} VND</li>
        <li>Tổng Số Lượng: {quantity}</li>
        <li>Ngày: {date}</li>
        <li>Tên báo giá: {quotationName}</li>
        <li>Mô tả báo giá: {quotationDescription}</li>
        <li>Lớp tùy chọn: {optionClass}</li>
        <li>Tổng: {total}</li>
        <li>Trạng thái: {status}</li>
        <li>Ngày bắt đầu: {startDate}</li>
        <li>Ngày kết thúc: {endDate}</li>
        <li>Số người lớn: {numOfAdult}</li>
        <li>Số trẻ em: {numOfChildren}</li>
        <li>ID tour: {tourId}</li>
        <li>Doanh nghiệp: {isEnterprise ? 'Có' : 'Không'}</li>
        <li>ID tài khoản: {accountId}</li>
      </ViewOptionList>
      <ViewOptionAction>
        <div>
          {/* <Title>`Tổng Tiền: {totalPrice}`</Title> */}
        </div>
        <SelectButton>Chọn option này</SelectButton>
      </ViewOptionAction>
    </ViewOptionCardWrapper>
  );
};

export default ViewOptionCard;


