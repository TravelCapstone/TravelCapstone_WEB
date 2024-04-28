import React, { useState, useEffect } from "react";
import FoodModal from "./FoodModal/FoodModal";

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
                  <strong>Ngày: </strong>
                  <span className="mx-2">27/04/2024 - 30/1/2024</span>
                </div>
              </div>
              <div className="flex">
                <p className="font-medium my-3">Loại hình ăn uống</p>
              </div>
              <div>
                <div>
                  <div className="flex justify-between">
                    <p>
                      <strong>Quán ăn bình dân</strong>
                    </p>
                  </div>
                  <div className="flex my-4">
                    <p className="w-3/12">Chọn quán ăn</p>
                    
                    <FoodModal />
                  </div>
                  <div className="flex">
                    <p>Quán ăn Phương Nam</p>
                    <p className="mx-2">
                      <strong>Địa chỉ: </strong>299 Nguyên Tử Lực, phường 8
                    </p>
                  </div>
                  <div>
                    <strong>Menu ăn trưa</strong>
                    <div className="mx-4">
                      <p>1.Bún bò</p>
                      <p>2.Cơm hến</p>
                    </div>
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
