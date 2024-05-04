import React, { useState, useEffect } from "react";
import HotelModal from "./HotelModal/HotelModal";
import {
  differenceInDays,
  formatDate,
  formatPrice,
} from "../../../../utils/Util";
import { ratingLabels } from "../../../../settings/globalStatus";

function RestingAssignment({ data, privateTourResponse }) {
  const [selectedHotel, setSelectedHotel] = useState([]);
  const log = (data) => {
    const filter = selectedHotel.filter(
      (item) => item.sellPriceHistory?.id === data.sellPriceHistory?.id
    );
    if (filter.length === 0) {
      setSelectedHotel([...selectedHotel, data]);
    } else {
      const list = selectedHotel.filter(
        (item) => item.sellPriceHistory?.id !== data.sellPriceHistory?.id
      );
      setSelectedHotel(list);
    }
  };
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <div className="flex">
            <strong className="w-1/12 block">{index + 1}</strong>

            <div className="flex flex-col justify-between w-11/12">
              <div className="flex justify-between">
                <div className="flex justify-between w6/12">
                  <strong>Khu vực: </strong>
                  <div className="mx-2">
                    {item.district?.name} - {item.district?.province?.name}
                  </div>
                </div>
                <div className="w6/12">
                  <strong>Ngày lưu trú: </strong>
                  <span className="mx-2">
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </span>
                </div>
              </div>
              <div className="flex">
                <p className="font-bold my-3">Loại hình lưu trú</p>
              </div>
              <div>
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
                        log={log}
                        ratingId={item.facilityRating?.id}
                      />
                    </div>

                    {selectedHotel.length > 0 &&
                      selectedHotel.map((hotel, index) => (
                        <div key={index}>
                          <div className="flex">
                            <strong className="mr-2">Tên khách sạn: </strong>
                            <p>
                              {
                                hotel?.sellPriceHistory?.facilityService
                                  ?.facility.name
                              }
                            </p>
                          </div>
                          <div className="flex">
                            <strong className="mr-2">Địa chỉ: </strong>
                            <p>
                              {
                                hotel?.sellPriceHistory?.facilityService
                                  ?.facility.address
                              }
                              ,{" "}
                              {
                                hotel?.sellPriceHistory?.facilityService
                                  ?.facility.communce?.name
                              }
                              ,{" "}
                              {
                                hotel.sellPriceHistory?.facilityService
                                  ?.facility.communce?.district?.name
                              }
                              ,{" "}
                              {
                                hotel?.sellPriceHistory?.facilityService
                                  ?.facility.communce?.district.province?.name
                              }
                            </p>
                          </div>
                          <div className="flex">
                            <strong className="mr-2">
                              Giá tổng = giá phòng x số phòng x số ngày thuê =
                            </strong>
                            {formatPrice(hotel?.sellPriceHistory?.price)} x{" "}
                            {item.quantity} x{" "}
                            {differenceInDays(item.startDate, item.endDate)}={" "}
                            {formatPrice(
                              hotel?.sellPriceHistory?.price * item.quantity
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default RestingAssignment;
