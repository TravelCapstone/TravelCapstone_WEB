import React, { useState, useEffect } from "react";

function DetailPlanFollowingTimeline(props) {
  const [state, setState] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className="my-16">
        <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
          LỊCH TRÌNH TỪNG THỜI GIAN
        </h2>
        <div className="flex justify-center item-center flex-col">
          <div className="flex flex-col">
            <div className="sm:flex-col md:flex item-center">
              <div className="sm:flex md:flex ">
                <div className="flex items-center">
                  <div className=" bg-red-600 text-white w-12 h-12 text-center flex justify-center items-center">
                    <span className="font-bold">01</span>
                  </div>
                  <span className="mx-2 font-bold">Giai đoạn 1</span>
                </div>

                <div className=" flex justify-center md:items-center">
                  <div className="mx-12 md:flex">
                    <p className="mx-5 font-bold">Từ ngày</p>
                    <input type="date" />
                  </div>
                  <div className="mx-12 md:flex">
                    <p className="mx-5 font-bold">Đến ngày</p>
                    <input type="date" />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-14 py-6 ">
              <label className="input input-bordered flex items-center ">
                <input type="text" className="grow" placeholder="Tiên đề" />
              </label>
            </div>
            <div className="flex flex-col mx-16">
              <div className="flex justify-around">
                <p className="block font-bold">Thời gian</p>
                <p className="block m-18 font-bold">Nội dung từng thời gian</p>
              </div>
              <div className=" md:flex justify-around my-2">
                <input type="date" />
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Search" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <button className="btn bg-mainColor w46 text-white rounded-lg mt-4">
          Thêm mốc thời gian
        </button>
      </div>
    </>
  );
}

export default DetailPlanFollowingTimeline;
