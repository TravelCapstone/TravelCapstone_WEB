import React, { useState, useEffect } from "react";
import FoodModal from "./FoodModal/FoodModal";
import { ratingLabels } from "../../../../settings/globalStatus";
import { formatDate, formatPrice } from "../../../../utils/Util";

function FoodAndBevarageAssignment({ data, privateTourResponse }) {
  console.log(data);
  const [selectedRestaurent, setSelectedRestaurent] = useState([]);
  const log = (data) => {
    const filter = selectedRestaurent.filter(
      (item) => item.sellPriceHistory?.id === data.sellPriceHistory?.id
    );
    if (filter.length === 0) {
      setSelectedRestaurent([...selectedRestaurent, data]);
    } else {
      const list = selectedRestaurent.filter(
        (item) => item.sellPriceHistory?.id !== data.sellPriceHistory?.id
      );
      setSelectedRestaurent(list);
    }
  };
  return (
    <>
      {data &&
        data.map((item, index) => (
          <div>
            <div className="flex">
              <strong className="w-1/12">{index + 1}</strong>

              <div className="flex flex-col justify-between w-11/12">
                <div className="flex justify-between">
                  <div className="flex justify-between w6/12">
                    <strong>Khu vực: </strong>
                    <div className="mx-2">
                      {" "}
                      {item.district?.name} - {item.district?.province?.name}
                    </div>
                  </div>
                  <div className="w6/12">
                    <strong>Ngày: </strong>
                    <span className="mx-2">
                      {" "}
                      {formatDate(item.startDate)} - {formatDate(item.endDate)}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <p className="font-bold my-3">Loại hình ăn uống</p>
                </div>
                <div>
                  <div className="mx-6">
                    <div className="flex justify-start">
                      <p className="font-bold">
                        {" "}
                        {ratingLabels[item.facilityRating?.rating?.id]}:
                      </p>
                      <span className="text-red-600 font-bold ml-2">
                        {formatPrice(item.minPrice)} -{" "}
                        {formatPrice(item.maxPrice)}
                      </span>
                    </div>
                    <p className="my-2">
                      <strong>Số lượng bữa:</strong> {item.mealPerDay}
                    </p>
                    <p className="my-2">
                      <strong>Bàn:</strong> {item.servingQuantity} người
                    </p>
                    <div className="flex my-4">
                      <p className="w-3/12">Chọn quán ăn</p>

                      <FoodModal
                        districtId={item.districtId}
                        servingQuantity={item.servingQuantity}
                        serviceType={0}
                        ratingId={item.facilityRating?.id}
                        privateTourRequestId={
                          privateTourResponse?.privateTourResponse?.id
                        }
                        log={log}
                      />
                    </div>
                    {selectedRestaurent.length > 0 &&
                      selectedRestaurent.map((restaurent, index) => (
                        <div key={index}>
                          <div className="flex">
                            <strong className="mr-2">Tên nhà hàng: </strong>
                            <p>{restaurent.facilityServices?.facility?.name}</p>
                          </div>
                          <div className="flex">
                            <strong className="mr-2">Địa chỉ: </strong>
                            <p>
                              {restaurent.facilityServices?.facility?.address},{" "}
                              {
                                restaurent.facilityServices?.facility?.communce
                                  ?.name
                              }
                              ,{" "}
                              {
                                restaurent.facilityServices?.facility?.communce
                                  ?.district?.name
                              }
                              ,{" "}
                              {
                                restaurent.facilityServices?.facility?.communce
                                  ?.district.province?.name
                              }{" "}
                            </p>
                          </div>
                          <div className="flex">
                            <strong>
                              Thực đơn{" "}
                              {restaurent.sellPriceHistory?.menu.mealTypeId == 0
                                ? "ăn sáng"
                                : restaurent.sellPriceHistory?.menu
                                      .mealTypeId == 1
                                  ? " ăn trưa"
                                  : "ăn tối"}
                            </strong>
                            <p className="mx-2">
                              {" "}
                              {restaurent.menuDishes
                                .map((dish) => dish.dish.name)
                                .join(", ")}
                            </p>
                          </div>
                          <div className="flex">
                            <strong className="mr-2">
                              Giá tổng = giá menu x số bữa ={" "}
                            </strong>
                            <p>
                              {formatPrice(restaurent.sellPriceHistory?.price)}{" "}
                              x {item.mealPerDay} ={" "}
                              {formatPrice(
                                restaurent.sellPriceHistory?.price *
                                  item.mealPerDay
                              )}{" "}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default FoodAndBevarageAssignment;
