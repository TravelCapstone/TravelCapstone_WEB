import React, { useState, useEffect } from 'react';

function BasicTimeline(props) {
    const [state, setState] = useState('');

    useEffect(() => {
        return () => {

        }
    }, []);

    return (
        <>
            <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              LỊCH TRÌNH CƠ BẢN
            </h3>
            <div className=" sm:flex-col md:flex items-center justify-evenly mt-16">
              <div className="flex flex-col">
                <select name="" id="" className="select select-bordered">
                  <option value="">TP. Hồ Chí Minh</option>
                </select>
                <div className="hidden md:flex md:items-center">
                  <div className="hidden md:flex md:items-end">
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-map-pin text-4xl text-center"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                    <i class="fa-solid fa-minus"></i>
                  </div>
                </div>
                <input type="date" />
              </div>
            </div>
            <button className="btn bg-mainColor text-white rounded-lg mt-4">
              Thêm mốc thời gian
            </button>
          </div>
        </>
    )
}

export default BasicTimeline;