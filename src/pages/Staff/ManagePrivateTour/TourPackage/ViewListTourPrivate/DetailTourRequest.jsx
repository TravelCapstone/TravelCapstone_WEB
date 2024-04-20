import React, { useEffect, useState } from "react";
import { Card, List, Button } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CREATE_OPTIONS_TOUR_PRIVATE } from "../../../../../settings/constant";
import { NavLink } from "react-router-dom";
import { StaffLayout } from "../../../../../layouts";
import HeaderManagement from "../../../../../components/Header/HeaderManagement";
import { getPrivateTourById } from "../../../../../api/privateTourRequestApi";
import Loading from "../../../../../components/Loading/Loading";
import { statusLabels } from "../../../../../settings/globalStatus";
function TourRequestPage() {
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(id);

  const fetchData = async () => {
    const data = await getPrivateTourById(id);
    if (data?.data?.isSuccess) {
      setRequest(data?.data?.result);
      setIsLoading(false);
      console.log(request);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const renderOtherLocations = (locations) => {
    return locations?.map((location) => location.name).join(", ");
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="flex">
        <StaffLayout />
        <div className="flex-1">
          <HeaderManagement />
          <div role="tablist" className="tabs tabs-bordered">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Thông tin yêu cầu"
              checked
            />
            <div role="tabpanel" class="tab-content p-10">
              <h1 class="text-center font-semibold text-xl mb-5">
                Thông tin yêu cầu tour
              </h1>
              <div class="flex flex-row mt-10 shadow-2xl p-5 rounded-md">
                <div class="w-4/12 border-r border-solid border-gray-300">
                  <h2 class="text-start font-semibold text-lg mb-5">
                    Thông tin khách hàng
                  </h2>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Khách hàng</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.name}
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Điện thoại liên hệ</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.account.phoneNumber}
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Ngày tạo yêu cầu</span>
                    <span class="font-light text-sm ml-3">
                      {new Date(
                        request?.privateTourRespone?.createDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Trạng thái</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.status === 0
                        ? statusLabels[0]
                        : request?.privateTourRespone?.status === 1
                          ? statusLabels[1]
                          : request?.privateTourRespone?.status === 2
                            ? statusLabels[2]
                            : statusLabels[3]}
                    </span>
                  </div>
                </div>
                <div class="w-8/12 px-2">
                  <h2 class="text-start font-semibold text-lg mb-5">
                    Chi tiết yêu cầu
                  </h2>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Loại tour:</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.isEnterprise
                        ? "Doanh nghiệp"
                        : "Gia đình"}
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Mô tả yêu cầu:</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.description}
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Số người lớn:</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.numOfAdult}
                    </span>
                    <span class="font-bold text-sm ml-5">Số trẻ em:</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.numOfChildren}
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Địa điểm xuất phát:</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.startLocation}
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Địa điểm mong muốn:</span>
                    <span class="font-light text-sm ml-3">
                      {renderOtherLocations(
                        request?.privateTourRespone?.otherLocation
                      )}
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Địa điểm chính:</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.mainDestination?.name}
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Khoảng thời gian:</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.numOfDay} ngày{" "}
                      {request?.privateTourRespone?.numOfNight} đêm
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">
                      Thời gian rảnh dự kiến:
                    </span>
                    <span class="font-light text-sm ml-3">
                      {new Date(
                        request?.privateTourRespone?.startDate
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(
                        request?.privateTourRespone?.endDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">URL tour đề xuất:</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.recommnendedTourUrl}
                    </span>
                  </div>
                  <div class="mb-3">
                    <span class="font-bold text-sm">Yêu cầu khác:</span>
                    <span class="font-light text-sm ml-3">
                      {request?.privateTourRespone?.note}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Tạo gói tour"
            />
            <div role="tabpanel" className="tab-content p-10">
              Tab content 2
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TourRequestPage;