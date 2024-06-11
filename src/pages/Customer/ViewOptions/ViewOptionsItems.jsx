import React, { useState } from "react";
import ViewOptionCard from "./ViewOptionCard/ViewOptionCard";
import {
  Modal,
  Select,
  Button,
  InputNumber,
  Divider,
  Col,
  Row,
  Card,
  List,
} from "antd";
import styled from "styled-components";
import {
  facilityTypeLabels,
  ratingLabels,
  ratingRestaurant,
} from "../../../settings/globalStatus";
import { getExcelQuotation } from "../../../api/OptionsApi";
import LoadingComponent from "../../../components/Loading/LoadingComponent";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
const formatter = (value) =>
  `${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const ButtonModal = styled(Button)`
  margin-left: 15px;
  margin-bottom: 15px;
  height: 40px;
  font-weight: 600;
  font-size: 18px;
`;

const ViewOptionsItems = ({ options, loading, error, selectedOption }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log("options ViewOptionsItems", options);

  // Loại bỏ `privateTourResponse` và lấy ra các option
  const optionsArray = Object.keys(options)
    .filter((key) => key.startsWith("option"))
    .map((key) => options[key]);

  const getPackageName = (isEnterprise) => {
    if (isEnterprise === true) {
      return "Tour Đoàn Thể (Doanh Nghiệp)";
    } else {
      return "Tour Gia Đình";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays + 1}N${diffDays}D`;
  };

  // Các hàm để mở và đóng Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) return <LoadingComponent isLoading={true} />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mb-20">
      <LoadingOverlay isLoading={isLoading} />
      <div className="flex justify-between flex-wrap">
        <ButtonModal type="primary" onClick={showModal}>
          Hiển thị Chi Tiết Tour Yêu Cầu
        </ButtonModal>
        <ButtonModal
          type="primary"
          onClick={async () => {
            setIsLoading(true);
            const data = await getExcelQuotation(
              options?.privateTourResponse?.id
            );
            setIsLoading(false);
          }}
        >
          Tải file
        </ButtonModal>
      </div>

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="!w-[50%] items-center"
      >
        <div className="p-4 mx-auto bg-white  rounded-lg w-full h-[700px] overflow-y-scroll">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Chi tiết đơn yêu cầu của bạn
            </h2>
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              {" "}
              Mã đơn :#{options?.privateTourResponse?.id}
            </h2>
            <Divider />
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thông tin khách hàng
            </h3>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Họ tên người đại diện: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2 ">
                {options?.privateTourResponse?.account?.firstName}{" "}
                {options?.privateTourResponse?.account?.lastName}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Số điện thoại liên hệ: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2 ">
                {options?.privateTourResponse?.account?.phoneNumber}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Ngày tạo yêu cầu: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {formatDate(options?.privateTourResponse?.createDate)}
              </p>
            </div>
          </div>
          <Divider />

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thông tin đơn hàng
            </h3>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Tên tour: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {options?.privateTourResponse?.name}{" "}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Phân loại tour: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {getPackageName(options?.privateTourResponse?.isEnterprise)}{" "}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Thời gian: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {formatDate(options?.privateTourResponse?.startDate)} -{" "}
                {formatDate(options?.privateTourResponse?.endDate)}{" "}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Khoảng thời gian: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {calculateDuration(
                  options?.privateTourResponse?.startDate,
                  options?.privateTourResponse?.endDate
                )}{" "}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Số lượng Người lớn: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {options?.privateTourResponse?.numOfAdult} người{" "}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Số lượng Trẻ em: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {options?.privateTourResponse?.numOfChildren}{" "}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Nơi muốn tới du lịch: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {options?.privateTourResponse?.mainDestination.name}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Các địa điểm khác: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {options?.privateTourResponse?.otherLocation?.map(
                  (location) => (
                    <li>{`${location?.address} - ${location.province?.name}`}</li>
                  )
                )}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Mô tả yêu cầu: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {" "}
                {options?.privateTourResponse?.description}{" "}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Yêu cầu tối thiểu về dịch vụ lưu trú: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {" "}
                {`${
                  ratingLabels[
                    options?.privateTourResponse?.minHotelRating.facilityTypeId
                  ]
                }`}{" "}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Yêu cầu về dịch vụ ăn uống: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {" "}
                {`${
                  ratingRestaurant[
                    options?.privateTourResponse?.minRestaurantRating?.ratingId
                  ]
                }`}{" "}
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Số người: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {options?.privateTourResponse?.numOfAdult} người lớn/{" "}
                {options?.privateTourResponse?.numOfChildren} trẻ em
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Chi tiết hàng khách lẻ/ độc thân: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {options?.privateTourResponse?.numOfSingleFemale} nữ/{" "}
                {options?.privateTourResponse?.numOfSingleMale} nam
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Nơi bắt đầu xuất phát: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {`${options?.privateTourResponse?.startLocation} - ${options?.privateTourResponse?.startLocationCommune?.name} - ${options?.privateTourResponse?.startLocationCommune?.district?.name} - ${options?.privateTourResponse?.startLocationCommune.district?.province?.name}`}
              </p>
            </div>

            <div className="flex">
              <p className="text-gray-500 flex-1 py-2">
                <strong>Trạng thái: </strong>
              </p>
              <p className="text-gray-500 flex-1 py-2">
                {" "}
                {options?.privateTourResponse?.status === 0 && "CHỜ XỬ LÝ"}
                {options?.privateTourResponse?.status === 1 &&
                  "CHỜ CHỌN GÓI TOUR"}
                {options?.privateTourResponse?.status === 2 && "ĐÃ CHỌN TOUR"}
                {options?.privateTourResponse?.status === 3 &&
                  "HUỶ YÊU CẦU"}{" "}
                {options?.privateTourResponse?.status === 4 &&
                  "ĐÃ TẠO KẾ HOẠCH TOUR"}{" "}
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7  justify-around">
        {optionsArray.map((option, index) => (
          <ViewOptionCard
            key={index}
            option={option}
            selectedOptionCus={selectedOption}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewOptionsItems;
