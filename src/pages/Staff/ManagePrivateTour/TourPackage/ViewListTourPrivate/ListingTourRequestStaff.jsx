import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StaffLayout } from "../../../../../layouts";
import HeaderManagement from "../../../../../components/Header/HeaderManagement";
import { getAllPrivateTour } from "../../../../../api/privateTourRequestApi";
import Loading from "../../../../../components/Loading/Loading";
import { DETAIL_TOUR_REQUEST_STAFF } from "../../../../../settings/constant";
import { statusPrivateTourLabels } from "../../../../../settings/globalStatus";
import PaginationManagement from "../../../../../components/UI/Pagination/PaginationManagement";

const ListingTourRequestStaff = () => {
  const [listTourRequest, setListTourRequest] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]  = useState(0);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllPrivateTour(currentPage, 10);
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
    if (tab === "all") {
      setIsLoading(true);

      setFilteredData(listTourRequest);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setFilteredData(
        listTourRequest.filter((item) => item.status === parseInt(tab))
      );
      setIsLoading(false);
    }
  };

  const renderOtherLocations = (locations) => {
    return locations.map((location) => location.name).join(", ");
  };

  return (
    <>
    <Loading isLoading={isLoading}/>
    <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4 text-center text-pretty">
      Lịch Sử Tour Yêu Cầu
    </h2>

    <div className="">
      <div className=" tabs-bordered mb-4">
        <a
          className={`tab ${activeTab === "all" ? "tab-active" : ""}`}
          onClick={() => handleTabChange("all")}
        >
          All
        </a>
        <a
          className={`tab tab-lifted ${activeTab === "0" ? "tab-active" : ""}`}
          onClick={() => handleTabChange("0")}
        >
          {statusPrivateTourLabels[0]}
        </a>
        <a
          className={`tab tab-lifted ${activeTab === "1" ? "tab-active" : ""}`}
          onClick={() => handleTabChange("1")}
        >
          {statusPrivateTourLabels[1]}
        </a>
        <a
          className={`tab tab-lifted ${activeTab === "2" ? "tab-active" : ""}`}
          onClick={() => handleTabChange("2")}
        >
          {statusPrivateTourLabels[2]}
        </a>
        <a
          className={`tab tab-lifted ${activeTab === "3" ? "tab-active" : ""}`}
          onClick={() => handleTabChange("3")}
        >
          {statusPrivateTourLabels[3]}
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th>Tên khách hàng</th>
              <th>Số điện thoại</th>
              <th>Địa điểm muốn thêm</th>
              <th>Địa điểm chính</th>
              <th>Ngày khởi hành - kết thúc</th>
              <th>Địa điểm bắt đầu</th>
              <th>Loại tour</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
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
       <PaginationManagement currentPage={currentPage} totalPages={totalPages} handlePageClick={handlePageClick}/>
      </div>
    </div>
  </div>
    </>
 
  );
};

export default ListingTourRequestStaff;
