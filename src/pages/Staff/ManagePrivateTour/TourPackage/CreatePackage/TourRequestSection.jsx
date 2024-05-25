import React from "react";
import {
  dietaryPreferenceLabels,
  statusPrivateTourLabels,
} from "../../../../../settings/globalStatus";
import { formatPrice, formatDate } from "../../../../../utils/Util";
import { Button, Card, List } from "antd";
import { useNavigate } from "react-router-dom";

function TourRequestSection({ request }) {
  const navigate = useNavigate();

  const handleCreateTour = () => {
    const TourId = request?.privateTourResponse?.id;
    navigate(`/staff/view-list-tour-private/${TourId}?tab=1`);
  };

  const renderOtherLocations = (locations) => {
    return (
      <div className="flex flex-wrap">
        {locations?.map((location, index) => (
          <div key={location.id} className="pr-2 mb-4">
            <div className="flex items-center">
              <h2 className=" mr-2">{location.province?.name}</h2>
              {index !== locations.length - 1 && <span className="">-</span>}
              <p>{location.address}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFoodRequest = (food) => {
    return dietaryPreferenceLabels[food] || "Không yêu cầu";
  };

  return (
    <>
      <h1 className="text-center font-bold text-xl mb-5 text-mainColor">
        THÔNG TIN YÊU CẦU TOUR
      </h1>
      <div className="shadow-xl p-5 rounded-6xl">
        <div className="flex flex-row mt-10 p-5 rounded-4xl ">
          {/* Thông tin khách hàng */}
          <div className="w-4/12 border-r border-solid border-gray-300">
            <h2 className="text-start font-semibold text-mainColor text-lg mb-5">
              Thông tin khách hàng
            </h2>
            <div className="mb-3">
              <span className="font-bold text-sm">Khách hàng</span>
              <span className="font-normal text-sm ml-3">
                {request?.privateTourResponse?.name}
              </span>
            </div>
            <div className="mb-3">
              <span className="font-bold text-sm">Điện thoại liên hệ</span>
              <span className="font-normal text-sm ml-3">
                {request?.privateTourResponse?.account.phoneNumber}
              </span>
            </div>
            <div className="mb-3">
              <span className="font-bold text-sm">Ngày tạo yêu cầu</span>
              <span className="font-normal text-sm ml-3">
                {formatDate(request?.privateTourResponse?.createDate)}
              </span>
            </div>
            <div className="mb-3">
              <span className="font-bold text-sm">Trạng thái</span>
              <span className="font-normal text-sm ml-3">
                {statusPrivateTourLabels[request?.privateTourResponse?.status]}
              </span>
            </div>
          </div>

          {/* Chi tiết yêu cầu */}
          <div className="w-8/12 px-2">
            <h2 className="text-start font-semibold text-mainColor text-lg mb-5">
              Chi tiết yêu cầu
            </h2>
            <div className="mb-3">
              <span className="font-bold text-sm">Loại tour:</span>
              <span className="font-normal text-sm ml-3">
                {request?.privateTourResponse?.isEnterprise
                  ? "Doanh nghiệp"
                  : "Gia đình"}
              </span>
            </div>
            <div className="mb-3">
              <span className="font-bold text-sm">Mô tả yêu cầu:</span>
              <span className="font-normal text-sm ml-3">
                {request?.privateTourResponse?.description}
              </span>
            </div>
            <div className="mb-3">
              <span className="font-bold text-sm">Yêu cầu về đồ ăn:</span>
              <span className="font-normal text-sm ml-3">
                {renderFoodRequest(
                  request?.privateTourResponse?.dietaryPreference
                )}
              </span>
            </div>
            <div className="mb-3">
              <span className="font-bold text-sm">Yêu cầu lưu trú:</span>
              <List
                dataSource={request.privateTourResponse?.roomDetails}
                renderItem={(item) => (
                  <List.Item>
                    <Card className="mr-4 bg-teal-100">
                      <Card.Meta
                        title={`Phòng ${item.quantityPerRoom === 4 ? "đôi" : "đơn"} `}
                        description={`Tổng số phòng: ${item.totalRoom}`}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </div>
            <div className="mb-3">
              <span className="font-bold text-sm">
                Ngân sách dự tính trên đầu người:
              </span>
              <span className="font-normal text-sm ml-3">
                {formatPrice(request?.privateTourResponse?.wishPrice)}
              </span>
            </div>
            <div className="mb-3">
              <span className="font-bold text-sm">Số người lớn:</span>
              <span className="font-normal text-sm ml-3">
                {request?.privateTourResponse?.numOfAdult}
              </span>
              <span className="font-bold text-sm ml-5">Số trẻ em:</span>
              <span className="font-normal text-sm ml-3">
                {request?.privateTourResponse?.numOfChildren}
              </span>
            </div>
            <div className="mb-3">
              <span className="font-bold text-sm">Địa điểm xuất phát:</span>
              <span className="font-normal text-sm ml-3">
                {request?.privateTourResponse?.startLocation}
              </span>
            </div>
            <div className="mb-3">
              <span className="font-bold text-sm">Địa điểm yêu cầu:</span>
              <span className="font-normal text-sm ml-3">
                {renderOtherLocations(
                  request?.privateTourResponse?.otherLocation
                )}
              </span>
            </div>
            {/* Các thông tin khác */}
          </div>
        </div>

        {/* Nút tạo tour */}
        <div className="text-right my-4 w-5/6">
          {request.privateTourResponse?.status === 0 && (
            <Button
              className="bg-mainColor text-white font-semibold"
              onClick={handleCreateTour}
            >
              TẠO GÓI TOUR
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default TourRequestSection;
