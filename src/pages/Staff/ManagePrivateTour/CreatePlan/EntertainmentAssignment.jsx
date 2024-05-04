import React, { useState, useEffect } from "react";
import { formatPrice } from "../../../../utils/Util";

function EntertainmentAssignment({ data }) {
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
                    <strong>
                      {" "}
                      {item.district?.name} - {item.district?.province?.name}
                    </strong>
                    <div className="ml-8">
                      <strong className="mr-2"> Gía vé:</strong>
                      <span className="font-bold text-red-600">
                        {formatPrice(item.minPrice)} -{" "}
                        {formatPrice(item.maxPrice)}/vé
                      </span>
                    </div>
                  </div>
                  <div className="w6/12">
                    <strong>Số lượng địa điểm du lịch: </strong>
                    <span>{item.quantity}</span>
                  </div>
                </div>
                <div className="flex my-4">
                  <p className="w-3/12">Chọn khu du lịch</p>
                  <div className="w-9/12">
                    <select
                      name=""
                      id=""
                      className="w-full select select-bordered mb-3"
                    ></select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default EntertainmentAssignment;
