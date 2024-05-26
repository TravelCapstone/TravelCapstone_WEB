import React, { useState } from "react";
import { Form } from "antd";
import { formatPrice } from "../../../../utils/Util";
import EntertainmentModal from "./Entertainment/EntertainmentModal";

function EntertainmentAssignment({ data, privateTourResponse }) {
  const [selectedEntertainment, setSelectedEntertainment] = useState([]);

  const log = (selectedList) => {
    setSelectedEntertainment(selectedList);
  };

  return (
    <Form>
      <Form.List name="entertainments">
        {(fields, { add, remove }) => (
          <>
            {data &&
              data.map((item, index) => (
                <div key={index}>
                  <div className="flex">
                    <strong className="w-1/12">{index + 1}</strong>
                    <div className="flex flex-col justify-between w-11/12">
                      <div className="flex justify-between">
                        <div className="flex justify-between w-6/12">
                          <strong>
                            {item.district?.name} -{" "}
                            {item.district?.province?.name}
                          </strong>
                          <div className="ml-8">
                            <strong className="mr-2">Giá vé:</strong>
                            <span className="font-bold text-red-600">
                              {formatPrice(item.minPrice)} -{" "}
                              {formatPrice(item.maxPrice)}/vé
                            </span>
                          </div>
                        </div>
                        <div className="w-6/12">
                          <strong>Số lượng địa điểm du lịch: </strong>
                          <span>{item.quantity}</span>
                        </div>
                      </div>
                      <div className="flex my-4">
                        <p className="w-3/12 font-bold">Chọn nơi giải trí</p>
                        <EntertainmentModal
                          districtId={item.districtId}
                          privateTourRequestId={
                            privateTourResponse?.privateTourResponse?.id
                          }
                          servingQuantity={item.servingQuantity}
                          serviceType={2}
                          ratingId={item.facilityRating?.id}
                          log={log}
                        />
                      </div>
                      {selectedEntertainment.length > 0 &&
                        selectedEntertainment.map((entertainment, entIndex) => (
                          <div key={entIndex}>
                            <div className="flex">
                              <strong className="mr-2">Địa điểm: </strong>
                              <p>
                                {
                                  entertainment?.sellPriceHistory
                                    ?.facilityService?.facility.name
                                }
                              </p>
                            </div>
                            <div className="flex">
                              <strong className="mr-2">Địa chỉ: </strong>
                              <p>
                                {
                                  entertainment?.sellPriceHistory
                                    ?.facilityService?.facility.address
                                }
                                ,{" "}
                                {
                                  entertainment?.sellPriceHistory
                                    ?.facilityService?.facility.communce?.name
                                }
                                ,{" "}
                                {
                                  entertainment.sellPriceHistory
                                    ?.facilityService?.facility.communce
                                    ?.district?.name
                                }
                                ,{" "}
                                {
                                  entertainment?.sellPriceHistory
                                    ?.facilityService?.facility.communce
                                    ?.district.province?.name
                                }
                              </p>
                            </div>
                            <div className="flex">
                              <strong className="mr-2">Tên dịch vụ: </strong>
                              <p>
                                {
                                  entertainment.sellPriceHistory
                                    ?.facilityService?.name
                                }
                              </p>
                            </div>
                            <div className="flex">
                              <strong className="mr-2">Giá: </strong>
                              <p>
                                {formatPrice(
                                  entertainment.sellPriceHistory?.price
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </Form.List>
    </Form>
  );
}

export default EntertainmentAssignment;
