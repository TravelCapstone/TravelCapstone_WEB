import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import HotelModal from "./HotelModal/HotelModal";
import {
  differenceInDays,
  formatDate,
  formatPrice,
} from "../../../../utils/Util";
import { ratingLabels } from "../../../../settings/globalStatus";

const RestingAssignment = ({ data, privateTourResponse, setRestingData }) => {
  const [selectedHotels, setSelectedHotels] = useState([[]]);

  const log = (hotel, dataIndex, hotelIndex) => {
    console.log("hotel", hotel);

    // Clone the selectedHotels array to avoid direct state mutation
    const updatedSelectedHotels = [...selectedHotels];

    // Ensure the dataIndex array exists
    if (!updatedSelectedHotels[dataIndex]) {
      updatedSelectedHotels[dataIndex] = [];
    }

    // Check if the specific hotel entry already exists
    if (updatedSelectedHotels[dataIndex][hotelIndex]) {
      // Remove the hotel if it already exists
      delete updatedSelectedHotels[dataIndex][hotelIndex];

      // Optionally, clean up the array to remove any undefined entries
      // This step ensures the array stays compact without gaps
      updatedSelectedHotels[dataIndex] = updatedSelectedHotels[
        dataIndex
      ].filter((item) => item !== undefined);
    } else {
      // Assign the hotel if it does not already exist
      updatedSelectedHotels[dataIndex][hotelIndex] = hotel;
    }

    // Update the state with the new array
    setSelectedHotels(updatedSelectedHotels);
  };

  console.log(selectedHotels);
  const convertData = (data) => {
    const provinces = {};

    data.flat().forEach((item) => {
      const provinceId = item.province;

      if (!provinces[provinceId]) {
        provinces[provinceId] = {
          provinceId: provinceId,
          provinceName: item.provinceName, // Cần cập nhật tên tỉnh
          services: [],
        };
      }

      provinces[provinceId].services.push({
        facilityService: {
          id: item.facilityId,
          name: item.facilityName,
          address: item.address,
        },
      });
    });

    return Object.values(provinces);
  };
  const convertedData = convertData(selectedHotels);
  console.log(JSON.stringify(convertedData, null, 2));
  useEffect(() => {
    setRestingData(convertedData);
  }, [selectedHotels]);
  return (
    <Form>
      <Form.List name="hotels">
        {(fields, { add, remove }) => (
          <>
            {data &&
              data.length > 0 &&
              data.map((item, index) => (
                <div key={index}>
                  <div className="flex">
                    <strong className="w-1/12 block">{index + 1}</strong>
                    <div className="flex flex-col justify-between w-11/12">
                      <div className="flex justify-between">
                        <div className="flex justify-between w6/12">
                          <strong>Khu vực: </strong>
                          <div className="mx-2">
                            {item.district?.name} -{" "}
                            {item.district?.province?.name}
                          </div>
                        </div>
                        <div className="w6/12">
                          <strong>Ngày lưu trú: </strong>
                          <span className="mx-2">
                            {formatDate(item.startDate)} -{" "}
                            {formatDate(item.endDate)}
                          </span>
                        </div>
                      </div>
                      <div className="flex">
                        <p className="font-bold my-3">Loại hình lưu trú</p>
                      </div>
                      <div>
                        <div className="mx-6">
                          <div className="flex justify-between">
                            <div>
                              <strong className="mr-2">
                                {ratingLabels[item.facilityRating?.rating?.id]}:
                              </strong>
                              <span className="text-red-600 font-bold">
                                {formatPrice(item.minPrice)} -{" "}
                                {formatPrice(item.maxPrice)}
                              </span>
                            </div>
                            <p>
                              Số lượng ngày/đêm:{" "}
                              {differenceInDays(item.startDate, item.endDate)}
                            </p>
                          </div>
                          <p className="my-2">
                            <strong>Số lượng : </strong> {item.quantity} phòng{" "}
                            {item.servingQuantity === 2
                              ? "đơn"
                              : item.servingQuantity === 4
                                ? "đôi"
                                : "không xác định"}
                            (1 phòng: {item.servingQuantity} người)
                          </p>
                          <div className="flex my-4">
                            <p className="w-3/12 font-bold">Chọn nơi lưu trú</p>
                            <HotelModal
                              districtId={item.districtId}
                              privateTourRequestId={
                                privateTourResponse?.privateTourResponse?.id
                              }
                              servingQuantity={item.servingQuantity}
                              serviceType={0}
                              log={(hotel) => log(hotel, index, 0)} // Assuming single hotel selection for now
                              ratingId={item.facilityRating?.id}
                            />
                          </div>

                          {selectedHotels[index] &&
                            selectedHotels[index].map((hotel, hotelIndex) => (
                              <div key={hotelIndex}>
                                {hotel && (
                                  <>
                                    <div className="flex">
                                      <strong className="mr-2">
                                        Tên khách sạn:{" "}
                                      </strong>
                                      <p>{hotel.facilityName}</p>
                                    </div>
                                    <div className="flex">
                                      <strong className="mr-2">
                                        Địa chỉ:{" "}
                                      </strong>
                                      <p>{hotel.address}</p>
                                    </div>
                                    <div className="flex">
                                      <strong className="mr-2">
                                        Giá tổng = giá phòng x số phòng x số
                                        ngày thuê =
                                      </strong>
                                      {formatPrice(hotel.price)} x{" "}
                                      {item.quantity} x{" "}
                                      {differenceInDays(
                                        item.startDate,
                                        item.endDate
                                      )}
                                      ={" "}
                                      {formatPrice(
                                        hotel.price *
                                          item.quantity *
                                          differenceInDays(
                                            item.startDate,
                                            item.endDate
                                          )
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default RestingAssignment;
