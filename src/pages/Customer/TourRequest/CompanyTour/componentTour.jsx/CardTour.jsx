// OrderCard.js
import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { VIEW_OPTIONS_TOUR_PRIVATE } from "../../../../../settings/constant";

function getOrderStatusStyle(status) {
  switch (status) {
    case 0:
      return { backgroundColor: "orange", color: "white" };
    case 1:
      return { backgroundColor: "#007bff", color: "white" };
    case 2:
      return { backgroundColor: "#28a745", color: "white" };
    case 3:
      return { backgroundColor: "#dc3545", color: "white" };
    default:
      return {};
  }
}

const OrderCard = ({ order, index, onSelect, status }) => {
  let navigate = useNavigate();
  const orderId = order.id;

  const handleClick = () => {
    navigate(`${VIEW_OPTIONS_TOUR_PRIVATE}/${orderId}`, { state: { order } });
  };

  return (
    <Card title={`Mã đơn: ${orderId}`}>
      <div className="flex absolute top-2 right-6 items-center">
        <p
          className="text-gray-600 uppercase font-semibold p-2 "
          style={{
            borderRadius: "5px",
            ...getOrderStatusStyle(order.details.privateTourResponse.status),
          }}
        >
          {" "}
          {order.details.privateTourResponse.status === 0 && "Đã gửi yêu cầu"}
          {order.details.privateTourResponse.status === 1 && "Chọn gói tour"}
          {order.details.privateTourResponse.status === 2 &&
            "ĐÃ CHONJ GÓI TOUR"}
          {order.details.privateTourResponse.status === 3 && "ĐÃ HUỶ"}
        </p>
      </div>
      <div className="text-lg mb-4">
        <p>
          Tên tour:
          {order.details.privateTourResponse.otherLocation.map(
            (location) =>
              location.address && <strong>{location.province.name},</strong>
          )}
        </p>
        <p>
          Ngày bắt đầu: {order.startDate} - Ngày kết thúc: {order?.endDate}
        </p>
      </div>
      <div className="flex text-xl font-bold text-center text-cyan-700">
        <p className="mr-4">Tổng tiền: </p> <p>${order.price}</p>
      </div>
      {/* <p>Đơn giá: ${order.price}</p> */}
      <hr />
      <div></div>
      <button
        className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded float-right mt-4"
        onClick={handleClick}
      >
        Xem chi tiết
      </button>
    </Card>
  );
};

export default OrderCard;
