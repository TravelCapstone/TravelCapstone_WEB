import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StaffLayout } from "../../../../../layouts";
import HeaderManagement from "../../../../../components/Header/HeaderManagement";
import { getAllPrivateTour } from "../../../../../api/privateTourRequestApi";
import Loading from "../../../../../components/Loading/Loading";

const ListingTourRequestStaff = () => {
  const [listTourRequest, setListTourRequest] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const statusLabels = {
    0: "Chờ xử lí",
    1: "Đợi khách hàng phản hồi",
    2: "Chấp nhận",
    3: "Từ chối",
  };
  const fetchData = async () => {
    const data = await getAllPrivateTour(1, 10);
    if (data?.data?.isSuccess) {
      setFilteredData(data.data.result.items);
      setListTourRequest(data.data.result.items);
      setIsLoading(false);
    }
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
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
    <div className="flex">
      <Loading isLoading={isLoading} />

      <StaffLayout />
      <div className="flex-1">
        <HeaderManagement />
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
                {statusLabels[0]}
              </a>
              <a
                className={`tab tab-lifted ${activeTab === "1" ? "tab-active" : ""}`}
                onClick={() => handleTabChange("1")}
              >
                {statusLabels[1]}
              </a>
              <a
                className={`tab tab-lifted ${activeTab === "2" ? "tab-active" : ""}`}
                onClick={() => handleTabChange("2")}
              >
                {statusLabels[2]}
              </a>
              <a
                className={`tab tab-lifted ${activeTab === "3" ? "tab-active" : ""}`}
                onClick={() => handleTabChange("3")}
              >
                {statusLabels[3]}
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
                    <td>Xem thêm</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingTourRequestStaff;
