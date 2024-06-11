import React from "react";
import { formatPrice } from "../../utils/Util";

const TourPrices = ({ data }) => {
  return (
    <div className="shadow-md p-6 rounded-lg ">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Tổng chi phí tour:</p>
          <p className="text-lg font-semibold">{formatPrice(data.total)}</p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí cho người lớn:</p>
          <p className="text-lg font-semibold">
            {formatPrice(data.pricePerAdult)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí cho trẻ em:</p>
          <p className="text-lg font-semibold">
            {formatPrice(data.pricePerChildren)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí hướng dẫn viên:</p>
          <p className="text-lg font-semibold">
            {formatPrice(data.tourguideCost)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí cho tài xế:</p>
          <p className="text-lg font-semibold">
            {formatPrice(data.driverCost)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí vật dụng cần thiết:</p>
          <p className="text-lg font-semibold">
            {formatPrice(data.materialCost)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí bảo hiểm:</p>
          <p className="text-lg font-semibold">
            {formatPrice(data.assuranceCost)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí dẫn đường:</p>
          <p className="text-lg font-semibold">{formatPrice(data.escortFee)}</p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí dự phòng:</p>
          <p className="text-lg font-semibold">
            {formatPrice(data.contingencyFee)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí vận hành:</p>
          <p className="text-lg font-semibold">
            {formatPrice(data.operatingFee)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí tổ chức:</p>
          <p className="text-lg font-semibold">
            {formatPrice(data.organizationCost)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">
            Chi phí dịch vụ bao gồm (lưu trú, ăn uống, vui chơi):
          </p>
          <p className="text-lg font-semibold">
            {formatPrice(data.facilityCost)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí phương tiện:</p>
          <p className="text-lg font-semibold">
            {formatPrice(data.vehicleCost)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Chi phí sự kiện:</p>
          <p className="text-lg font-semibold">{formatPrice(data.eventCost)}</p>
        </div>
      </div>
    </div>
  );
};

export default TourPrices;
