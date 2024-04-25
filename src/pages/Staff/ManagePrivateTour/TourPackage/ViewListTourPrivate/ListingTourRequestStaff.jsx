import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllPrivateTour } from "../../../../../api/privateTourRequestApi";
import { DETAIL_TOUR_REQUEST_STAFF } from "../../../../../settings/constant";
import { statusPrivateTourLabels } from "../../../../../settings/globalStatus";
import PaginationManagement from "../../../../../components/UI/Pagination/PaginationManagement";
import LoadingComponent from "../../../../../components/Loading/LoadingComponent";

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

  const renderOtherLocations = (locations) => {
    return locations.map((location) => location.province?.name).join(", ");
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl text-primary font-semibold mb-4 text-center text-pretty">
          LỊCH SỬ TOUR YÊU CẦU
        </h2>

        <div className="">
          <div className="tabs-bordered mb-4">
            {["all", "0", "1", "2", "3"].map((status) => (
              <a
                key={status}
                className={`tab tab-lifted ${activeTab === status ? "tab-active" : ""}`}
                onClick={() => handleTabChange(status)}
              >
                {status === "all" ? "All" : statusPrivateTourLabels[status]}
              </a>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl shadow-xl">
            <table className="table w-full ">
              <thead className="bg-mainColor text-white h-14">
                <tr>
                  <th>STT</th>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Địa điểm muốn thêm</th>
                  <th>Địa điểm chính</th>
                  <th>Ngày khởi hành - kết thúc</th>
                  <th>Địa điểm bắt đầu</th>
                  <th>Loại tour</th>
                  <th>Ngày tạo yêu cầu</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <LoadingComponent isLoading={isLoading} />

                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.account.phoneNumber}</td>
                    <td>{renderOtherLocations(item.otherLocation)}</td>
                    <td>{item.mainDestination.name}</td>
                    <td>
                      {new Date(item.startDate).toLocaleDateString()} -{" "}
                      {new Date(item.endDate).toLocaleDateString()}
                    </td>
                    <td>{item.startLocation}</td>
                    <td>{item.isEnterprise ? "Doanh nghiệp" : "Gia đình"}</td>
                    <td>{new Date(item.createDate).toLocaleDateString()}</td>
                    <td>
                      <NavLink
                        to={`/staff/${DETAIL_TOUR_REQUEST_STAFF}/${item.id}`}
                      >
                        Xem thêm
                      </NavLink>
                    </td>
                  </tr>
                ))}
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

export default ListingTourRequestStaff;
