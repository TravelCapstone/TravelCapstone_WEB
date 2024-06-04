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
import { optionClassLabels } from "../../../settings/globalStatus";
import { formatPrice } from "../../../utils/Util";
import ViewOptionDetail from "./ViewOptionDetail";

const ViewOptionCard = ({ option }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalDetailVisible, setIsModalDetailVisible] = useState(false);
  console.log(isModalDetailVisible);
  const navigate = useNavigate();
  const {
    optionQuotation,
    quotationDetails,
    tourguideQuotationDetails,
    optionEvent,
    vehicleQuotationDetails,
  } = option;

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
    <ViewOptionCardWrapper
      onClick={() => setIsModalDetailVisible(!isModalDetailVisible)}
    >
      <ViewOptionHeader>
        <Title2>{getPackageName(optionQuotation.optionClass)}</Title2>{" "}
        {/* Name of the service */}
      </ViewOptionHeader>

      <div className="p-4 mx-auto bg-white rounded-lg w-full ">
        <div className="mb-4">
          <h3 className="text-base font-bold text-gray-800 mb-4">
            Thông tin Gói
          </h3>
          <div className="flex text-sm">
            <p className="text-gray-500 flex-1 py-2 font-semibold">Tên gói</p>
            <p className="text-gray-500 flex-1 py-2 ">
              <strong>
                {optionClassLabels[optionQuotation.optionClassId]}
              </strong>
            </p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="my-4">
          <h3 className="text-base font-bold text-gray-800 mb-4">
            Thông tin dịch vụ và báo giá chi tiết
          </h3>
          {quotationDetails.length > 0 &&
            quotationDetails.map((detail) => (
              <ul key={detail.id}>
                <li className="flex text-sm">
                  <p className="text-gray-500 flex-1 py-2 font-semibold">
                    {detail.facilityRating?.ratingId < 4
                      ? "Dịch vụ lưu trú"
                      : detail.facilityRating?.ratingId < 9
                        ? "Dịch vụ ăn uống"
                        : "Dịch vụ vui chơi giải trí"}
                  </p>
                  <p className="text-gray-500 flex-1 py-2 ">
                    <strong>{`${formatPrice(detail.minPrice)} - ${formatPrice(detail.maxPrice)}`}</strong>
                  </p>
                </li>
                <li className="flex text-sm">
                  <p className="text-gray-500 flex-1 py-2 font-semibold">
                    Số lượng{" "}
                    {detail.facilityRating?.ratingId < 4
                      ? "phòng"
                      : detail.facilityRating?.ratingId < 9
                        ? "bàn"
                        : "vé"}
                  </p>
                  <p className="text-gray-500 flex-1 py-2 ">
                    <strong>{detail.quantity} </strong>
                  </p>
                </li>
                <li className="flex text-sm">
                  <p className="text-gray-500 flex-1 py-2 font-semibold">
                    {detail.facilityRating?.ratingId < 9 && "Sức chứa"}
                  </p>
                  <p className="text-gray-500 flex-1 py-2 ">
                    <strong>
                      {detail.facilityRating?.ratingId < 9 &&
                        detail.servingQuantity}{" "}
                    </strong>
                  </p>
                </li>

                <li className="flex text-sm">
                  <p className="text-gray-500 flex-1 py-2 font-semibold">
                    Ngày:
                  </p>
                  <p className="text-gray-500 flex-1 py-2 ">
                    <strong>{`${formatDate(detail.startDate)} - ${formatDate(detail.endDate)}`}</strong>
                  </p>
                </li>
                <Divider />
              </ul>
            ))}
        </div>
      </div>
      <ViewOptionAction>
        <div>
          <div className="grid grid-cols-2">
            <h2 className="text-left">Phí tổ chức</h2>
            <p>{formatPrice(optionQuotation.organizationCost)}</p>
          </div>

          <div className="grid grid-cols-2">
            <h2 className="text-left">Phí dẫn đường</h2>
            <p>{formatPrice(optionQuotation.escortFee)}</p>
          </div>

          <div className="grid grid-cols-2">
            <h2 className=" text-left">
              Phí vận hành (bao gồm cả lương tài xế)
            </h2>
            <p>
              {formatPrice(
                optionQuotation.operatingFee + optionQuotation.driverCost
              )}
            </p>
          </div>

          <div className="flex justify-between text-red-500 font-bold">
            <h2>Tổng Tiền</h2>
            <p>{formatPrice(optionQuotation.maxTotal)} VND</p>
          </div>
        </div>
        <SelectButton onClick={showModal}>Chọn option này</SelectButton>
      </ViewOptionAction>

      <ViewOptionDetail
        data={option}
        visible={isModalDetailVisible}
        onOk={() => setIsModalDetailVisible(!isModalDetailVisible)}
        onCancel={() => setIsModalDetailVisible(!isModalDetailVisible)}
      />

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
