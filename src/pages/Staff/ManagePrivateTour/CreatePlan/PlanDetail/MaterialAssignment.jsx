import React, { useState, useEffect } from 'react';

function MaterialAssignment(props) {
    const [state, setState] = useState('');

    useEffect(() => {
        return () => {

        }
    }, []);

    return (
        <>
<div className="my-16">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            NHỮNG DỤNG CỤ CẦN THIẾT MANG THEO TOUR
          </h2>
          <div className="overflow-x-auto my-10 w-200 rounded-md shadow-md">
            <table className="table table-xs">
              <thead className="bg-mainColor text-white h-14">
                <tr>
                  <th></th>
                  <th>Tên dụng cụ</th>
                  <th>Mức độ cần thiết</th>
                  <th>Đơn vị</th>
                  <th>Số lượng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Đi máy bay tầm 3 tỷ đến 5 tỷ</td>
                  <td>Đi lamboghini</td>
                  <td>Nhìu tiền á</td>
                  <td>1</td>
                  <td className="flex">
                    <div className="flex">
                      <button className="">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                      <button className="mx-2">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>        </>
    )
}

export default MaterialAssignment;