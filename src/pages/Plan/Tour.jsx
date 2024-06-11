import React from "react";
import { Card } from "antd";
import { formatDate, formatPrice } from "../../utils/Util";
import { Button, QRCode } from "antd";
import {
  tourStatus,
  tourTypes,
  vehicleTypeLabels,
} from "../../settings/globalStatus";

const Tour = ({ tour }) => {
  const downloadQRCode = () => {
    const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-primary font-bold text-center text-2xl mb-6">
        Thông tin về tour
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-md shadow-md p-4">
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">Mã tour:</strong>
            <p className="w-2/3"> {tour?.id}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">
              Ngày bắt đầu:
            </strong>
            <p className="w-2/3">{formatDate(tour?.startDate)}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">
              Ngày kết thúc:
            </strong>
            <p className="w-2/3">{formatDate(tour?.endDate)}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">
              Phí dự phòng:
            </strong>
            <p className="w-2/3">{formatPrice(tour?.contingencyFee)}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">Mô tả:</strong>
            <p className="w-2/3">{tour?.description}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">
              Phí dẫn tour:
            </strong>
            <p className="w-2/3">{formatPrice(tour?.escortFee)}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">
              Phí vận hành:
            </strong>
            <p className="w-2/3">{formatPrice(tour?.operatingFee)}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">
              Phí tổ chức:
            </strong>
            <p className="w-2/3">{formatPrice(tour?.organizationCost)}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">
              Giá người lớn:
            </strong>
            <p className="w-2/3">{formatPrice(tour?.pricePerAdult)}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">
              Giá trẻ em:
            </strong>
            <p className="w-2/3">{formatPrice(tour?.pricePerChild)}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">Tổng giá:</strong>
            <p className="w-2/3">{formatPrice(tour?.totalPrice)}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">
              Trạng thái tour:
            </strong>
            <p className="w-2/3">{tourStatus[tour?.tourStatusId]}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">Loại tour:</strong>
            <p className="w-2/3">{tourTypes[tour?.tourTypeId]}</p>
          </div>
          <div className="flex flex-wrap mb-4">
            <strong className="text-primary font-bold w-1/3">
              Phương tiện di chuyển chính:
            </strong>
            <p className="w-2/3">{vehicleTypeLabels[tour?.vehicleTypeId]}</p>
          </div>
        </div>
        <div className="flex flex-col items-center shadow-md">
          <h3 className="text-center text-primary text-xl font-bold">
            Mã QR của tour
          </h3>
          <div id="myqrcode" className="mb-4">
            <QRCode value={tour?.id} bgColor="#fff" size={300} />
          </div>
          <Button className={"bg-primary text-white"} onClick={downloadQRCode}>
            Tải QR
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Tour;
