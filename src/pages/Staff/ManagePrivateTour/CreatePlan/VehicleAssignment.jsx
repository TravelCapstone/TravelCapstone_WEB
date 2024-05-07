import React, { useState, useEffect } from "react";
import { vehicleTypeLabels } from "../../../../settings/globalStatus";
import { formatPrice } from "../../../../utils/Util";
import VehicleSelect from "./Vehicle/VehicleSelect";

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
                    :{" "}
                    <span className=" text-red-600 font-bold">
                      {formatPrice(item.minPrice)} -{" "}
                      {formatPrice(item.maxPrice)}
                    </span>
                  </p>
                </div>
                {item.vehicleType === 4 && (
                  <VehicleSelect
                    startPoint={item.startPointId}
                    endPoint={item.endPointId}
                    vehicleType={item.vehicleType}
                  />
                )}

                {item.vehicleType !== 4 && item.vehicleType !== 5 && (
                  <VehicleSelect
                    startPoint={item.startPointId}
                    endPoint={item.endPointId}
                    vehicleType={item.vehicleType}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default VehicleAssignment;
