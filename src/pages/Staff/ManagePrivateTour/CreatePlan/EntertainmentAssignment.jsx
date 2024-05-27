import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { formatPrice } from "../../../../utils/Util";
import EntertainmentModal from "./Entertainment/EntertainmentModal";

function EntertainmentAssignment({
  data,
  privateTourResponse,
  setEntertainmentData,
}) {
  const [selectedEntertainment, setSelectedEntertainment] = useState([[]]);

  const log = (selectedList, index) => {
    const updatedSelectedEntertainment = [...selectedEntertainment];
    updatedSelectedEntertainment[index] = selectedList;
    setSelectedEntertainment(updatedSelectedEntertainment);
  };
  console.log(selectedEntertainment);
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
  const convertedData = convertData(selectedEntertainment);
  console.log(JSON.stringify(convertedData, null, 2));
  useEffect(() => {
    setEntertainmentData(convertedData);
  }, [selectedEntertainment]);
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
                          log={(selectedList) => log(selectedList, index)}
                        />
                      </div>
                      {selectedEntertainment[index] &&
                        selectedEntertainment[index].map(
                          (entertainment, entIndex) => (
                            <div key={entIndex}>
                              <div className="flex">
                                <strong className="mr-2">Địa điểm: </strong>
                                <p>{entertainment?.facilityName}</p>
                              </div>
                              <div className="flex">
                                <strong className="mr-2">Địa chỉ: </strong>
                                <p>{entertainment?.address}</p>
                              </div>
                              <div className="flex">
                                <strong className="mr-2">Tên dịch vụ: </strong>
                                <p>{entertainment.serviceName}</p>
                              </div>
                              <div className="flex">
                                <strong className="mr-2">Giá: </strong>
                                <p>{entertainment.price}</p>
                              </div>
                            </div>
                          )
                        )}
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
