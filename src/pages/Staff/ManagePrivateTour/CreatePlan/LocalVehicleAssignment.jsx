import React, { useState, useEffect } from "react";

function LocalVehicleAssignment(props) {
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
                  <div className="mx-2">Hà Giang - TP Hà Giang</div>
                </div>
                <div className="w6/12">
                  <strong>Số lượng xe </strong>
                  <span className="mx-2">1</span>
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocalVehicleAssignment;
