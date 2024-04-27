import React, { useState, useEffect } from "react";

function FoodAndBevarageAssignment(props) {
  const [state, setState] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div>
        <div>
          <div className="flex">
            <strong className="w-1/12">1</strong>

            <div className="flex flex-col justify-between w-11/12">
              <div className="flex justify-between">
                <div className="flex justify-between w6/12">
                  <strong>Khu vực: </strong>
                  <div className="mx-2">Phú Thọ -TP Việt Trì</div>
                </div>
                <div className="w6/12">
                  <strong>Ngày lưu trú: </strong>
                  <span className="mx-2">27/04/2024 - 30/1/2024</span>
                </div>
              </div>
              <div className="flex">
                <p className="font-medium my-3">Loại hình lưu trú</p>
              </div>
              <div>
                <div>
                  <div className="flex justify-between">
                    <p>
                      <strong>Khách sạn - khách sạn 1 sao</strong> 800.000 -
                      1.000.000 đ/ người
                    </p>
                    <p>Số lượng ngày/đêm: 2</p>
                  </div>
                  <div className="flex my-4">
                    <p className="w-3/12">Chọn khách sạn</p>
                    <select
                      name=""
                      id=""
                      className="select select-bordered w-9/12"
                    >
                      <option value="">
                        Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1 phòng
                      </option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <p>
                      <strong>Khách sạn - khách sạn 1 sao</strong> 800.000 -
                      1.000.000 đ/ người
                    </p>
                    <p>Số lượng ngày/đêm: 2</p>
                  </div>
                  <div className="flex my-4">
                    <p className="w-3/12">Chọn khách sạn</p>
                    <select
                      name=""
                      id=""
                      className="select select-bordered w-9/12"
                    >
                      <option value="">
                        Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1 phòng
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FoodAndBevarageAssignment;
