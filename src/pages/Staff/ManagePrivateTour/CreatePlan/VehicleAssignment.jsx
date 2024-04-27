import React, { useState, useEffect } from "react";

function VehicleAssignment(props) {
  const [state, setState] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div>
        <div>
          <p>
            Địa điểm đón khách: <strong>TP. HCM</strong>
          </p>
          <div className="flex">
            <strong className="w-1/12">1</strong>

            <div className="flex flex-col justify-between w-11/12">
              <div className="flex justify-between">
                <div className="flex justify-between w6/12">
                  <strong>Khu vực: </strong>
                  <div className="mx-2">Hà Giang - TP Hà Giang</div>
                </div>
                <div className="w6/12">
                  <strong>Ngày đi: </strong>
                  <span className="mx-2">27/04/2024 - 30/1/2024</span>
                </div>
              </div>
              <div className="flex my-3">
                <p className="font-medium ">
                  Phương tiện di chuyển từ <strong>TP HCM</strong> đến{" "}
                  <strong>Hà Giang</strong>
                </p>
                <p className="mx-2">Máy bay : 1.400.000đ - 1.700.000đ</p>
              </div>
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
                        Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1 phòng
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex">
            <strong className="w-1/12">2</strong>

            <div className="flex flex-col justify-between w-11/12">
              <div className="flex justify-between">
                <div className="flex justify-between w6/12">
                  <strong>Khu vực: </strong>
                  <div className="mx-2">Hà Giang - TP Hà Giang</div>
                </div>
                <div className="w6/12">
                  <strong>Ngày đi: </strong>
                  <span className="mx-2">27/04/2024 - 30/1/2024</span>
                </div>
              </div>
              <div className="flex my-3">
                <p className="font-medium ">
                  Phương tiện di chuyển từ <strong>TP HCM</strong> đến{" "}
                  <strong>Hà Giang</strong>
                </p>
                <p className="mx-2">Máy bay : 1.400.000đ - 1.700.000đ</p>
              </div>
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

export default VehicleAssignment;
