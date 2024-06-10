import React, { useEffect, useState } from "react";
import ViewOptionCardWrapper, {
  ViewOptionHeader,
  Title,
  ViewOptionList,
  ViewOptionAction,
  SelectButton,
  Title2,
} from "./ViewOptionCard.style";
import { Button, Divider, Modal, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { optionClassLabels } from "../../../../settings/globalStatus";
import { formatPrice } from "../../../../utils/Util";
import ViewOptionDetail from "./ViewOptionDetail";
import { VIEW_OPTIONS_TOUR_PRIVATE } from "../../../../settings/constant";
import { useSelector } from "react-redux";
import LoadingOverlay from "../../../../components/Loading/LoadingOverlay";
import { confirmOption } from "../../../../api/OptionsApi";

const ViewOptionCard = ({ option, selectedOption }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalDetailVisible, setIsModalDetailVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isModalDetailVisible);
  const role = useSelector((state) => state.user.role);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  console.log("option ViewOptionCard", option);

  const {
    optionQuotation,
    quotationDetails,
    // tourguideQuotationDetails,
    // optionEvent,
    // vehicleQuotationDetails,
  } = option;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const orderId = option.optionQuotation.privateTourRequest.id;
    setIsModalVisible(false);
    navigate(0); // Reload lại trang
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

  console.log("selectedOption", selectedOption);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };
  const handleConfirm = async (id) => {
    setIsLoading(true);
    console.log("id", id);

    const response = await confirmOption(id, user.id);
    console.log("response", response);
    if (response?.isSuccess) {
      message.success("Chọn gói thành công");
      navigate("/customer/view-list-tour-private");
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <ViewOptionCardWrapper>
      <LoadingOverlay isLoading={isLoading} title={"đang xử lý"} />
      <ViewOptionHeader>
        <Title2 className="uppercase">
          {optionClassLabels[optionQuotation.optionClassId]}
        </Title2>{" "}
        {/* Name of the service */}
      </ViewOptionHeader>

      <div className="p-4  bg-white rounded-lg w-full ">
        <div className="mb-4">
          <div className="flex justify-between">
            <h3 className="text-base font-bold text-gray-800 mb-4">
              Thông tin Gói
            </h3>
            <Button
              onClick={() => setIsModalDetailVisible(!isModalDetailVisible)}
            >
              {" "}
              Chi tiết
            </Button>
          </div>
          <div className="flex text-sm">
            <p className="text-gray-500 flex-1 py-2 font-semibold">Tên gói</p>
            <p className="text-gray-500 flex-1 py-2 text-right">
              <strong>
                {optionClassLabels[optionQuotation.optionClassId]}
              </strong>
            </p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="my-4">
          <h3 className="text-base font-bold text-gray-800 my-6">
            Thông tin dịch vụ và báo giá chi tiết
          </h3>
          <div className="h-[600px] overflow-y-auto px-3">
            {quotationDetails.length > 0 &&
              quotationDetails.map((detail, index) => (
                <div>
                  <div className="flex">
                    <p className="font-semibold text-sm w-4 mt-2">
                      {index + 1}.
                    </p>
                    <ul key={detail.id} className="w-full">
                      <li className="flex text-sm">
                        <p className="text-gray-500 flex-1 py-2 font-semibold !w-[40%] whitespace-nowrap">
                          {detail.facilityRating?.ratingId < 4
                            ? "Dịch vụ lưu trú"
                            : detail.facilityRating?.ratingId < 9
                              ? "Dịch vụ ăn uống"
                              : "Dịch vụ vui chơi giải trí"}
                        </p>
                        <p className="text-gray-500 flex-1 py-2 text-right ">
                          {/* <strong>{`${formatPrice(detail.minPrice)} - ${formatPrice(detail.maxPrice)}`}</strong> */}
                          <strong className="font-bold">{` ${formatPrice(detail.maxPrice)}`}</strong>
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
                        <p className="text-gray-500 flex-1 py-2 text-right">
                          <strong>
                            {detail.quantity}{" "}
                            {detail.facilityRating?.ratingId < 4
                              ? "phòng"
                              : detail.facilityRating?.ratingId < 9
                                ? "bàn"
                                : "vé"}
                          </strong>
                        </p>
                      </li>
                      <li className="flex text-sm">
                        <p className="text-gray-500 flex-1 py-2 font-semibold">
                          {detail.facilityRating?.ratingId < 9 && "Sức chứa"}
                        </p>
                        <p className="text-gray-500 flex-1 py-2  text-right whitespace-nowrap">
                          <strong className="">
                            {detail.facilityRating?.ratingId < 9 &&
                              detail.servingQuantity}{" "}
                            {detail.facilityRating?.ratingId < 9 ? "người" : ""}
                          </strong>
                        </p>
                      </li>

                      <li className="flex text-sm">
                        <p className="text-gray-500 flex-1 py-2 font-semibold">
                          Ngày
                        </p>
                        <p className="text-gray-500 flex-1 py-2 text-right  whitespace-nowrap">
                          <strong>{`${formatDate(detail.startDate)} - ${formatDate(detail.endDate)}`}</strong>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <Divider />
                </div>
              ))}
          </div>
        </div>
      </div>
      <ViewOptionAction>
        <div className="text-sm">
          <div className="grid grid-cols-2">
            <h2 className="text-left font-semibold">Phí tổ chức</h2>
            <p className="text-right">
              {formatPrice(optionQuotation.organizationCost)}
            </p>
          </div>

          <div className="grid grid-cols-2 ">
            <h2 className="text-left font-semibold">Phí dẫn đường</h2>
            <p className="text-right">
              {formatPrice(optionQuotation.escortFee)}
            </p>
          </div>

          <div className="grid grid-cols-2">
            <h2 className=" text-left font-semibold">
              Phí vận hành (bao gồm cả lương tài xế)
            </h2>
            <p className="text-right">
              {formatPrice(
                optionQuotation.operatingFee + optionQuotation.driverCost
              )}
            </p>
          </div>
        </div>

        <div className="flex justify-between text-red-500 font-bold my-4">
          <h2>Tổng Tiền</h2>
          <p>{formatPrice(optionQuotation.maxTotal)} VND</p>
        </div>
        {!selectedOption && role === "isCustomer" && (
          <SelectButton
            onClick={async () => await handleConfirm(optionQuotation.id)}
          >
            Chọn gói tour này
          </SelectButton>
        )}
      </ViewOptionAction>

      <ViewOptionDetail
        showModal={showModal}
        data={option}
        visible={isModalDetailVisible}
        onOk={() => {
          setIsModalDetailVisible(false);
          showModal();
        }}
        onCancel={() => setIsModalDetailVisible(!isModalDetailVisible)}
      />

      {/* Modal xác nhận */}
      {!selectedOption && role === "isCustomer" && (
        <Modal
          title="Xác nhận chọn gói"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Bạn có chắc chắn chọn gói này không?</p>
        </Modal>
      )}
    </ViewOptionCardWrapper>
  );
};

export default ViewOptionCard;
