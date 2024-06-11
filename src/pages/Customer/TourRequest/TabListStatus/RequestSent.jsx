import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoadingOverlay from "../../../../components/Loading/LoadingOverlay";
import { formatDate } from "../../../../utils/Util";
import { VIEW_OPTIONS_TOUR_PRIVATE } from "../../../../settings/constant";
import { Tooltip } from "antd";
import PaginationManagement from "../../../../components/UI/Pagination/PaginationManagement";

const RequestSent = ({ orders, title, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-x-auto   ">
      <h2 className="text-lg font-semibold mt-1 mb-6 text-cyan-700">
        {title}: {orders.length}
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto rounded-xl shadow-xl ">
        <table className="table w-full">
          <thead className="bg-mainColor text-white h-14">
            <tr>
              <th className="w-10 ">STT</th>
              <th className="w-20">Mã tour</th>
              <th className="w-40">Tên Tour yêu cầu</th>
              <th className="w-40">Địa điểm xuất phát</th>
              <th className="w-32">Thời lượng tour</th>
              <th className="w-40 ">Khoảng thời gian</th>
              <th className="w-32">Số lượng người</th>
              <th className="w-40">Ngày tạo yêu cầu</th>
              <th className="w-32">Trạng thái</th>
              <th className="w-20">Xem chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => {
              const uniqueProvinces = [
                ...new Set(
                  order.otherLocation.map((location) => location.province.name)
                ),
              ];
              return (
                <tr key={order.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>
                    <Tooltip title={order.id}>
                      <span className="truncate w-20 block">{order.id}</span>
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip title={`Tour đi ${uniqueProvinces.join("- ")}`}>
                      <span className="truncate text-mainColor w-40 block font-semibold">
                        Tour đi {uniqueProvinces.join("- ")}
                      </span>
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip title={order.startLocation}>
                      <span className="truncate w-40 block">
                        {order.startLocation}
                      </span>
                    </Tooltip>
                  </td>

                  <td>
                    {order.numOfDay} ngày {order.numOfNight} đêm
                  </td>
                  <td>
                    <Tooltip
                      title={`${formatDate(order.startDate)} - ${formatDate(order.endDate)}`}
                    >
                      <span className="truncate w-40 block">
                        {formatDate(order.startDate)} -{" "}
                        {formatDate(order.endDate)}
                      </span>
                    </Tooltip>
                  </td>
                  <td>
                    {order.numOfAdult} người lớn, {order.numOfChildren} trẻ em
                  </td>
                  <td>{formatDate(order.createDate)}</td>
                  <td
                    className="text-gray-600 uppercase font-semibold p-2"
                    style={{
                      ...getOrderStatusStyle(order.status),
                    }}
                  >
                    {order.status === 0 && "Đã gửi yêu cầu"}
                    {order.status === 1 && "Chọn gói tour"}
                    {order.status === 2 && "ĐÃ chọn gói tour"}
                    {order.status === 3 && "ĐÃ HUỶ"}
                    {order.status === 4 && "ĐÃ TẠO KẾ HOẠCH TOUR"}
                  </td>
                  <td className="text-center">
                    <NavLink
                      to={`${VIEW_OPTIONS_TOUR_PRIVATE}/${order.id}`}
                      state={{ order }}
                    >
                      <i className="fa-solid fa-eye cursor-pointer"></i>
                    </NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {orders.length > itemsPerPage && (
        <PaginationManagement
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageClick={handlePageClick}
        />
      )}
    </div>
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

export default RequestSent;
