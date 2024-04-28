import React, { useState, useEffect } from "react";

function MenuTable(props) {
  const [state, setState] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className="flex mt-4">
        <strong className="text-sm">Yêu cầu về ăn uống: </strong>
        <p className="mx-2 text-sm">Ăn hết</p>
      </div>
      <div className="overflow-x-auto rounded-xl mt-4 shadow-xl">
        <table className="table w-full ">
          <thead className="bg-mainColor text-white h-14">
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Thực đơn</th>
              <th>Mô tả </th>
              <th>Bữa</th>
              <th>Loại</th>
              <th>Số lượng phục vụ</th>
              <th>Món ăn</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}

export default MenuTable;
