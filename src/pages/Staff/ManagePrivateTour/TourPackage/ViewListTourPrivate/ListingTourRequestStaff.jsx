import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllPrivateTour } from "../../../../../api/privateTourRequestApi";
import {
  DETAIL_TOUR_REQUEST_STAFF,
  LISTING_TOUR_REQUEST_STAFF,
} from "../../../../../settings/constant";
import { statusPrivateTourLabels } from "../../../../../settings/globalStatus";
import PaginationManagement from "../../../../../components/UI/Pagination/PaginationManagement";
import LoadingComponent from "../../../../../components/Loading/LoadingComponent";
import LoadingOverlay from "../../../../../components/Loading/LoadingOverlay";

import { formatDate } from "../../../../../utils/Util";
import { Tooltip } from "antd";
import BreadcrumbWithBackButton from "../../../../../components/BreadCrumb/BreadCrumb";
const ListingTourRequestStaff = () => {
  const itemsPerPage = 10;
  const [listTourRequest, setListTourRequest] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllPrivateTour(currentPage, itemsPerPage);
    if (data?.data?.isSuccess) {
      setFilteredData(data.data.result.items);
      setListTourRequest(data.data.result.items);
      setTotalPages(data.data.result.totalPages);
      setIsLoading(false);
    }
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsLoading(true);
    const newFilteredData =
      tab === "all"
        ? listTourRequest
        : listTourRequest.filter((item) => item.status === parseInt(tab));
    setFilteredData(newFilteredData);
    setIsLoading(false);
    setCurrentPage(1);
  };

  const breadcrumbItems = [
    { name: "Lịch sử tour yêu cầu", url: LISTING_TOUR_REQUEST_STAFF },
  ];

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto ">
        <div className="mb-8">
          <BreadcrumbWithBackButton
            breadcrumbItems={breadcrumbItems}
            currentTab={
              activeTab === "all"
                ? "Tất cả"
                : statusPrivateTourLabels[activeTab]
            }
          />
        </div>
        <h2 className="text-xl text-primary font-semibold mb-4 text-center text-pretty">
          LỊCH SỬ TOUR YÊU CẦU
        </h2>

        <div className="overflow-auto">
          <div className="tabs-bordered mb-4">
            {["all", "0", "1", "2", "4", "3"].map((status) => (
              <a
                key={status}
                className={`tab tab-lifted ${activeTab === status ? "tab-active" : ""}`}
                onClick={() => handleTabChange(status)}
              >
                {status === "all" ? "Tất cả" : statusPrivateTourLabels[status]}
              </a>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl shadow-xl ">
            <table className="table w-full ">
              <thead className="bg-mainColor text-white h-14">
                <tr>
                  <th>STT</th>
                  <th className="w-20">Mã tour</th>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Địa điểm muốn thêm</th>
                  <th>Ngày khởi hành - kết thúc</th>
                  <th>Địa điểm bắt đầu</th>
                  <th>Loại tour</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo yêu cầu</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <LoadingComponent isLoading={isLoading} /> */}

                {filteredData.map((item, index) => {
                  const uniqueProvinces = [
                    ...new Set(
                      item.otherLocation.map(
                        (location) => location.province.name
                      )
                    ),
                  ];
                  return (
                    <tr key={item.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>
                        <Tooltip title={item.id}>
                          <span className="truncate w-20 block">{item.id}</span>
                        </Tooltip>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.account.phoneNumber}</td>
                      <td>
                        <Tooltip title={uniqueProvinces.join(", ")}>
                          <span className="truncate text-mainColor w-32 block font-semibold">
                            {uniqueProvinces.join(", ")}
                          </span>
                        </Tooltip>
                      </td>
                      <td>
                        {formatDate(item.startDate)} -{" "}
                        {formatDate(item.endDate)}
                      </td>
                      <td>
                        <Tooltip title={item.startLocation}>
                          <span className="truncate text-mainColor w-32 block font-semibold">
                            {item.startLocation}
                          </span>
                        </Tooltip>
                      </td>
                      <td>{item.isEnterprise ? "Doanh nghiệp" : "Gia đình"}</td>

                      <td
                        className=" w-56 uppercase font-semibold p-2"
                        style={{
                          ...getOrderStatusStyle(item.status),
                        }}
                      >
                        {item.status === 0 && "CHỜ XỬ LÝ"}
                        {item.status === 1 && "ĐỢI KHÁCH HÀNG PHẢN HỒI"}
                        {item.status === 2 && "ĐÃ CHỌN TOUR "}
                        {item.status === 3 && "HUỶ YÊU CẦU"}
                        {item.status === 4 && "ĐÃ TẠO KẾ HOẠCH TOUR"}
                      </td>
                      <td>{formatDate(item.createDate)}</td>
                      <td>
                        <NavLink
                          to={`/staff/${DETAIL_TOUR_REQUEST_STAFF}/${item.id}`}
                        >
                          <i className="fa-solid fa-eye cursor-pointer"></i>
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredData.length > 0 && (
              <PaginationManagement
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageClick={handlePageClick}
                showPagination={filteredData.length >= itemsPerPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const getOrderStatusStyle = (status) => {
  switch (status) {
    case 0:
      return { fontWeight: 600, color: "orange" };
    case 1:
      return { fontWeight: 600, color: "007bff" };
    case 2:
      return { fontWeight: 600, color: "green" };
    case 3:
      return { fontWeight: 600, color: "red" };
    case 4:
      return { fontWeight: 600, color: "blue" };
    default:
      return {};
  }
};

export default ListingTourRequestStaff;
