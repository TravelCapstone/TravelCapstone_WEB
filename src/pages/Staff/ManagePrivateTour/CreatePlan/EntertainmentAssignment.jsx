import React, { useState, useEffect } from 'react';

function EntertainmentAssignment(props) {
    const [state, setState] = useState('');

    useEffect(() => {
        return () => {

        }
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
                        <strong>Hà Giang </strong>
                        <div className="mx-2">
                          Gía vé trung bình: 20.000đ - 180.000đ/vé
                        </div>
                      </div>
                      <div className="w6/12">
                        <strong>Số lượng địa điểm du lịch </strong>
                        <input
                          type="number"
                          value={2}
                          className="input input-bordered w-16 mx-2"
                        ></input>
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
                        <div className="flex flex-col">
                          <div className="flex justify-between px-10">
                            <span>Dịch vụ vua mèo</span>
                            <span>Gía vé tham quan: 30.000đ</span>
                          </div>
                          <div className="flex justify-between px-10">
                            <span>Dịch vụ vua mèo</span>
                            <span>Gía vé tham quan: 30.000đ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}

export default EntertainmentAssignment;