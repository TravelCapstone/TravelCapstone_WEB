import React from "react";
import {
  dietaryPreferenceLabels,
  statusPrivateTourLabels,
} from "../../../../../settings/globalStatus";
import { formatPrice, formatDate } from "../../../../../utils/Util";

function TourRequestSection({ request }) {
  console.log("request", request);

  const renderOtherLocations = (locations) => {
    return locations?.map((location) => (
      <div key={location.id}>
        <div className="flex">
          <h2 className="font-semibold mx-2">{location.province?.name}</h2>
          <p>{location.address}</p>
        </div>
      </div>
    ));
  };

  const renderFoodRequest = (food) => {
    if (food === 0) return dietaryPreferenceLabels[0];
    else if (food === 1) return dietaryPreferenceLabels[1];
    else if (food === 2) return dietaryPreferenceLabels[2];
    else if (food === 3) return dietaryPreferenceLabels[3];
    else if (food === 4) return dietaryPreferenceLabels[4];
    else if (food === 5) return dietaryPreferenceLabels[5];
    else if (food === 6) return dietaryPreferenceLabels[6];
  };

  return (
    <>
      <h1 class="text-center font-bold text-xl mb-5 text-mainColor">
        THÔNG TIN YÊU CẦU TOUR
      </h1>
      <div className="flex flex-row mt-10 shadow-xl p-5 rounded-4xl">
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
              {request?.privateTourResponse?.status === 0
                ? statusPrivateTourLabels[0]
                : request?.privateTourResponse?.status === 1
                  ? statusPrivateTourLabels[1]
                  : request?.privateTourResponse?.status === 2
                    ? statusPrivateTourLabels[2]
                    : statusPrivateTourLabels[3]}
            </span>
          </div>
        </div>
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
            <span className="font-bold text-sm">Địa điểm mong muốn:</span>
            <span className="font-normal text-sm ml-3">
              {renderOtherLocations(
                request?.privateTourResponse?.otherLocation
              )}
            </span>
          </div>
          <div className="mb-3">
            <span className="font-bold text-sm">Địa điểm chính:</span>
            <span className="font-normal text-sm ml-3">
              {request?.privateTourResponse?.mainDestination?.name}
            </span>
          </div>
          <div className="mb-3">
            <span className="font-bold text-sm">Khoảng thời gian:</span>
            <span className="font-normal text-sm ml-3">
              {request?.privateTourResponse?.numOfDay} ngày{" "}
              {request?.privateTourResponse?.numOfNight} đêm
            </span>
          </div>
          <div className="mb-3">
            <span className="font-bold text-sm">Thời gian rảnh dự kiến:</span>
            <span className="font-normal text-sm ml-3">
              {formatDate(request?.privateTourResponse?.startDate)} -{" "}
              {formatDate(request?.privateTourResponse?.endDate)}
            </span>
          </div>
          <div className="mb-3">
            <span className="font-bold text-sm">URL tour đề xuất:</span>
            <span className="font-normal text-sm ml-3">
              {request?.privateTourResponse?.recommnendedTourUrl}
            </span>
          </div>
          <div className="mb-3">
            <span className="font-bold text-sm">Yêu cầu khác:</span>
            <span className="font-normal text-sm ml-3">
              {request?.privateTourResponse?.note}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default TourRequestSection;
