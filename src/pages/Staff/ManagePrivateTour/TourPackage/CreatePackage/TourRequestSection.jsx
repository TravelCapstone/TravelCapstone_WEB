import React from "react";
import {
  AiOutlineUser,
  AiOutlineEye,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineCarryOut,
} from "react-icons/ai";

function TourRequestSection() {
  return (
    <div className="px-2">
      <div className="font-semibold border-b-2 mb-4 ">
        <h4 className="pb-2 uppercase">Chi tiết yêu cầu tour</h4>
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col space-y-5 mb-4 mx-8">
          <div className="flex ">
            <div className="flex items-center mr-4">
              <AiOutlineUser className="text-baseGreen" size={19} />
              <span className="ml-2 text-gray-700">Khách hàng:</span>
            </div>
            <div>Nguyễn Văn A</div>
          </div>

          <div className="flex ">
            <div className="flex items-center mr-4">
              <AiOutlinePhone className="text-baseGreen" size={19} />
              <span className="ml-2 text-gray-700">Điện thoại liên hệ:</span>
            </div>
            <div>0123456789</div>
          </div>

          <div className="flex ">
            <div className="flex items-center mr-4">
              <AiOutlineMail className="text-baseGreen" size={19} />
              <span className="ml-2 text-gray-700">Email:</span>
            </div>
            <div>nguyenvana@gmail.com</div>
          </div>

          <div className="flex ">
            <div className="flex items-center mr-4">
              <AiOutlineCarryOut className="text-baseGreen" size={19} />
              <span className="ml-2 text-gray-700">Ngày tạo yêu cầu:</span>
            </div>
            <div>04/04/2024</div>
          </div>
        </div>

        <div className="flex flex-col space-y-5 mb-4 mx-8">
          <div className="flex ">
            <div className="flex items-center mr-4">
              {/* <AiOutlineUser className="text-baseGreen" size={19} /> */}
              <strong className="ml-2 text-gray-700">Tên tour:</strong>
            </div>
            <div>
              Tour Đà Nẵng - Huế - Đầm Lập An - La Vang - Động Phong Nha
            </div>
          </div>

          <div className="flex ">
            <div className="flex items-center mr-4">
              {/* <AiOutlinePhone className="text-baseGreen" size={19} /> */}
              <strong className="ml-2 text-gray-700">Mô tả yêu cầu:</strong>
            </div>
            <div>
              Tham quan các điểm du lịch nổi tiếng tại Đà Nẵng, gồm Bán đảo Sơn
              Trà, Bãi biển Mỹ Khê,...
            </div>
          </div>

          <div className="flex ">
            <div className="flex items-center mr-4">
              {/* <AiOutlineMail className="text-baseGreen" size={19} /> */}
              <strong className="ml-2 text-gray-700">
                Số lượng người lớn:
              </strong>
            </div>
            <div>10</div>
          </div>

          <div className="flex ">
            <div className="flex items-center mr-4">
              {/* <AiOutlineCarryOut className="text-baseGreen" size={19} /> */}
              <strong className="ml-2 text-gray-700">Số lượng trẻ em:</strong>
            </div>
            <div>3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourRequestSection;
