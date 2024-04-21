import React, { useState } from "react";
import ViewOptionCardWrapper, {
  ViewOptionHeader,
  Title,
  ViewOptionList,
  ViewOptionAction,
  SelectButton,
  Title2,
} from "./ViewOptionCard.style";
import { Divider, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const ViewOptionCard = ({ option }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const { optionQuotation, quotationDetails } = option;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/#");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getPackageName = (optionClass) => {
    switch (optionClass) {
      case 0:
        return "Gói Tiết Kiệm";
      case 1:
        return "Gói Cơ Bản";
      case 2:
        return "Gói Nâng Cao";
      default:
        return "Gói Nâng Cao";
    }
  };

  console.log("option ViewOptionCard", option);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };
  return (
    <ViewOptionCardWrapper>
      <ViewOptionHeader>
        <Title2>{getPackageName(optionQuotation.optionClass)}</Title2>{" "}
        {/* Name of the service */}
      </ViewOptionHeader>

      <div className="p-4 mx-auto bg-white rounded-lg w-full ">
        <div className="mb-4">
          <h3 className="text-base font-bold text-gray-800 mb-4">
            Thông tin Tour
          </h3>
          <div className="flex text-sm">
            <p className="text-gray-500 flex-1 py-2 font-semibold">Tên Tour</p>
            <p className="text-gray-500 flex-1 py-2 ">
              <strong>{optionQuotation.name}</strong>
            </p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="my-4">
          <h3 className="text-base font-bold text-gray-800 mb-4">
            Thông tin dịch vụ và báo giá chi tiết
          </h3>
          {quotationDetails.map((detail) => (
            <ul key={detail.id}>
              <li className="flex text-sm">
                <p className="text-gray-500 flex-1 py-2 font-semibold">
                  Tên Khách Sạn:{" "}
                </p>
                <p className="text-gray-500 flex-1 py-2 ">
                  <strong>Khách Sạn Trùng Dương - TP. Đà Nẵng</strong>
                </p>
              </li>
              <li className="flex text-sm">
                <p className="text-gray-500 flex-1 py-2 font-semibold">
                  Số lượng người:{" "}
                </p>
                <p className="text-gray-500 flex-1 py-2 ">
                  <strong>{detail.quantity} Người</strong>
                </p>
              </li>
              <li className="flex text-sm">
                <p className="text-gray-500 flex-1 py-2 font-semibold">
                  Giá cho người lớn:{" "}
                </p>
                <p className="text-gray-500 flex-1 py-2 ">
                  <strong>
                    {detail.sellPriceHistory.pricePerAdult.toLocaleString()} VND
                  </strong>
                </p>
              </li>
              <li className="flex text-sm">
                <p className="text-gray-500 flex-1 py-2 font-semibold">
                  Giá cho trẻ em:{" "}
                </p>
                <p className="text-gray-500 flex-1 py-2 ">
                  <strong>
                    {detail.sellPriceHistory.pricePerChild.toLocaleString()} VND
                  </strong>
                </p>
              </li>
              <li className="flex text-sm">
                <p className="text-gray-500 flex-1 py-2 font-semibold">
                  Ngày:{" "}
                </p>
                <p className="text-gray-500 flex-1 py-2 ">
                  <strong>{formatDate(detail.sellPriceHistory.date)}</strong>
                </p>
              </li>
              <Divider />
            </ul>
          ))}
        </div>
      </div>
      <ViewOptionAction>
        <div>
          <Title>
            <p>Tổng Tiền:</p>
            <p>{optionQuotation.total.toLocaleString()} VND</p>
          </Title>
        </div>
        <SelectButton onClick={showModal}>Chọn option này</SelectButton>
      </ViewOptionAction>

      {/* Modal xác nhận */}
      <Modal
        title="Xác nhận chọn gói"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn chọn gói này không?</p>
      </Modal>
    </ViewOptionCardWrapper>
  );
};

export default ViewOptionCard;
