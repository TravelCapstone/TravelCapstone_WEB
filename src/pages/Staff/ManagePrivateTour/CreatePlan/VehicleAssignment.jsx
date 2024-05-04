import React, { useState, useEffect } from "react";
import { vehicleTypeLabels } from "../../../../settings/globalStatus";
import { formatPrice } from "../../../../utils/Util";

function VehicleAssignment({ data }) {
  console.log(data);
  return (
    <>
      <p>
        Địa điểm đón khách: <strong>TP. HCM</strong>
      </p>
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
                      {item.startPoint?.name} - {item.endPoint?.name}
                    </div>
                  </div>
                  <div className="w6/12">
                    <strong>Ngày đi: </strong>
                    <span className="mx-2"></span>
                  </div>
                </div>
                <div className="flex my-3">
                  <p className="font-medium ">
                    Phương tiện di chuyển từ{" "}
                    <strong>{item.startPoint?.name}</strong> đến{" "}
                    <strong>{item.endPoint?.name}</strong>
                  </p>
                  <p className="mx-2">
                    <strong className="ml-8">
                      {" "}
                      {vehicleTypeLabels[item.vehicleType]}
                    </strong>{" "}
                    : {formatPrice(item.minPrice)} -{" "}
                    {formatPrice(item.maxPrice)}
                  </p>
                </div>
                {item.vehicleType === 4 && (
                  <div>
                    <div>
                      <div className="flex my-4">
                        <p className="w-3/12">Chọn hãng máy bay</p>
                        <select
                          name=""
                          id=""
                          className="select select-bordered w-9/12"
                        >
                          <option value="">VietnamAirline</option>
                        </select>
                      </div>

                      <div className="flex my-4">
                        <p className="w-3/12">Chọn chuyến máy bay</p>
                        <select
                          name=""
                          id=""
                          className="select select-bordered w-9/12"
                        >
                          <option value="">
                            Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1
                            phòng
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {item.vehicleType !== 4 && item.vehicleType !== 5 && (
                  <>
                    <div>
                      <strong>Số lượng xe </strong>
                      <span className="mx-2">1</span>
                    </div>
                    <div className="flex my-4">
                      <p className="w-3/12">Ngày di chuyển</p>
                      <div className="flex">
                        <input type="date" />
                        -
                        <input type="date" />
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="flex my-4">
                          <p className="w-3/12">Nhà cung cấp xe</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">Mon</option>
                          </select>
                        </div>

                        <div className="flex my-4">
                          <p className="w-3/12">Chọn tài xế</p>
                          <select
                            name=""
                            id=""
                            className="select select-bordered w-9/12"
                          >
                            <option value="">
                              Phạm Bùi Minh Khang SĐT: 0336678864 - Tiền công:
                              1.000.000/ngày
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default VehicleAssignment;
