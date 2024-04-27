import React, { useState, useEffect } from "react";

function TourguideAssignment(props) {
  const [state, setState] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className="my-16">
        <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
          THÔNG TIN HƯỚNG DẪN VIÊN
        </h2>
        <div className="flex justify-center item-center flex-col">
          <div className="flex flex-col">
            <div className="flex flex-col justify-evenly item-center">
              <div className="flex items-center justify-evenly">
                <span className="m-6 font-bold">Tên hướng dẫn viên</span>

                <p className="mx-5 font-bold">Nơi hướng dẫn du lịch</p>
              </div>
              <div className="flex items-center">
                <select name="" className="select select-bordered w-6/12" id="">
                  <option value="">
                    Nguyễn Văn A SĐT: .... Tiền công: 500.000/ngày
                  </option>
                </select>
                <select
                  name=""
                  className="select select-bordered w-5/12 mx-4"
                  id=""
                >
                  <option value="">Lâm Đồng</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <button className="btn bg-mainColor w46 text-white rounded-lg mt-4">
          Thêm hướng dẫn viên
        </button>
      </div>{" "}
    </>
  );
}

export default TourguideAssignment;
