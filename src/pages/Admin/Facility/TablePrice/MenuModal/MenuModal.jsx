import React, { useState, useEffect } from "react";

function MenuModal({ isOpen, setIsOpen, menuId, handleClose }) {
  console.log(menuId);

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Danh sách</h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sản phẩm 1</td>
                    <td>10$</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Sản phẩm 2</td>
                    <td>20$</td>
                    <td>3</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => handleClose()}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuModal;
