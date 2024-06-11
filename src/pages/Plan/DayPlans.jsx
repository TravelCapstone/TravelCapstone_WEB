import React from "react";
import { formatDate, formatDateTime } from "../../utils/Util";

const DayPlans = ({ dayPlans }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h1 className="text-primary font-bold text-2xl mb-4 text-center">
        Lịch trình dự kiến
      </h1>
      {dayPlans &&
        dayPlans?.length > 0 &&
        dayPlans.map((dayPlan, index) => (
          <div key={index} className="mb-8 shadow-lg rounded-lg p-4">
            <div className="flex items-center mb-2">
              <i className="fas fa-calendar-day text-primary mr-2"></i>
              <strong>Ngày:</strong>
              <p className="ml-2">{formatDate(dayPlan?.dayPlan?.date)}</p>
            </div>
            <div className="flex items-center mb-2">
              <i className="fas fa-info-circle text-primary mr-2"></i>
              <strong>Mô tả:</strong>
              <p className="ml-2">{dayPlan?.dayPlan?.description}</p>
            </div>
            <div>
              <strong className="flex items-center mb-2">
                <i className="fas fa-road text-primary mr-2"></i>
                Lịch trình di chuyển
              </strong>
              {dayPlan &&
                dayPlan?.vehicleRoutes.length > 0 &&
                dayPlan?.vehicleRoutes?.map((vehicleRoute, indexInner) => (
                  <div
                    key={`${indexInner}-${index}`}
                    className="p-4 rounded-lg mb-4"
                  >
                    <div className="flex items-center mb-2">
                      <i className="fas fa-clock text-primary mr-2"></i>
                      <strong>Thời gian bắt đầu:</strong>
                      <p className="ml-2">
                        {formatDateTime(vehicleRoute?.route?.startTime)}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <i className="fas fa-clock text-primary mr-2"></i>
                      <strong>Thời gian kết thúc:</strong>
                      <p className="ml-2">
                        {formatDateTime(vehicleRoute?.route?.endTime)}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                      <strong>Địa điểm đi:</strong>
                      <p className="ml-2">{`${vehicleRoute?.route?.startPoint?.name} - ${vehicleRoute?.route?.startPoint?.address}`}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                      <strong>Địa điểm đến:</strong>
                      <p className="ml-2">{`${vehicleRoute?.route?.endPoint?.name} - ${vehicleRoute?.route?.endPoint?.address}`}</p>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-user-tie text-primary mr-2"></i>
                      <strong>Tài xế:</strong>
                      <p className="ml-2">{`${vehicleRoute?.driver?.name} - ${vehicleRoute?.driver?.phoneNumber}`}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DayPlans;
