import React, { useState, useEffect } from "react";
import LoadingOverlay from "../../../../components/Loading/LoadingOverlay";
import {
  getSellPriceByFacilityAndServiceType,
  getServiceCostByFacilityAndServiceType,
} from "../../../../api/PriceApi";
import ServiceTypeBadge from "../../../../components/Badge/ServiceTypeBadge";
import { formatDateTime, formatPrice } from "../../../../utils/Util";
import MenuModal from "../../Menu/MenuModal";
import PaginationManagement from "../../../../components/UI/Pagination/PaginationManagement";
function TablePrice({ id, serviceType }) {
  const [listCostHistory, setListCostHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    setListCostHistory([]);
    setIsLoading(true);
    const data = await getServiceCostByFacilityAndServiceType(
      id,
      serviceType,
      currentPage,
      itemsPerPage
    );
    if (data.isSuccess) {
      if (data.result !== null) {
        setListCostHistory(data.result.items);
        setTotalPages(data.result.totalPages);
      }
      setIsLoading(false);
    }
  };
  const fetchExportData = async () => {
    setIsLoading(true);
    setListCostHistory([]);

    const data = await getSellPriceByFacilityAndServiceType(
      id,
      serviceType,
      currentPage,
      itemsPerPage
    );
    if (data.isSuccess) {
      if (data.result !== null) {
        setListCostHistory(data.result.items);
      }
      setIsLoading(false);
    }
  };
  const handeOpen = (id) => {
    setIsOpen(true);
    setSelectedMenuId(id);
  };

  const tabs = [
    {
      label: "Lịch sử giá nhập",
      content: "",
    },
    {
      label: "Lịch sử giá xuất",
      content: "",
    },
  ];
  useEffect(() => {
    if (activeTab === 0) {
      fetchData();
    } else {
      fetchExportData();
    }
  }, [id, serviceType, activeTab, currentPage]);

  const renderData = (item, index) => {
    if (item.facilityService !== null) {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            {<ServiceTypeBadge index={item.facilityService?.serviceTypeId} />}
          </td>
          <td>{item.facilityService?.name}</td>
          <td>{item.moq}</td>
          <td>{item.facilityService?.servingQuantity}</td>
          <td>{renderUnit(item.facilityService?.unitId)}</td>
          <td>{item.facilityService?.surchargePercent * 100}</td>
          <td>{formatPrice(item.price)}</td>
          <td>{formatDateTime(item.date)}</td>
        </tr>
      );
    } else if (item.menu !== null) {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            {
              <ServiceTypeBadge
                index={item.menu?.facilityService?.serviceTypeId}
              />
            }
          </td>
          <td>{item.moq}</td>
          <td>{item.menu?.facilityService?.servingQuantity}</td>
          <td>{item.menu?.name}</td>
          <td>{item.menu?.facilityService?.surchargePercent * 100}</td>
          <td>{formatPrice(item.price)}</td>
          <td>{renderUnit(item.menu?.facilityService?.unitId)}</td>
          <td>{formatDateTime(item.date)}</td>
          <td>
            <i
              className="fa-solid fa-eye cursor-pointer"
              onClick={() => handeOpen(item.menu.id)}
            ></i>
          </td>
        </tr>
      );
    } else if (item.transportServiceDetail !== null) {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            {
              <ServiceTypeBadge
                index={
                  activeTab == 1
                    ? item.transportServiceDetail?.facilityService
                        ?.serviceTypeId
                    : item.transport?.facilityService?.serviceTypeId
                }
              />
            }
          </td>
          <td>
            {activeTab == 1
              ? item.transportServiceDetail?.vehicleTypeId
              : item.transport?.vehicleTypeId}
          </td>
          <td>
              {activeTab == 1
                ? item.transportServiceDetail?.facilityService?.name
                : item.transport?.facilityService?.name}
            </td>
          <td>{item.moq}</td>
          <td>
            {activeTab == 1
              ? item.transportServiceDetail?.facilityService?.servingQuantity
              : item.transport?.facilityService?.servingQuantity}
          </td>
          
          <td>{formatPrice(item.price)}</td>
          <td>
            {renderUnit(
              activeTab == 1
                ? item.transportServiceDetail?.facilityService?.unitId
                : item.transport?.facilityService?.unitId
            )}
          </td>
          <td>{formatDateTime(item.date)}</td>
        </tr>
      );
    }
  };
  const renderUnit = (unitId) => {
    switch (unitId) {
      case 0:
        return "Ngày";
        break;
      case 1:
        return "Phòng";
        break;
      case 2:
        return "Người";
        break;
      default:
        return "Không xác  định";
        break;
    }
  };

  const renderHeader = () => {
    if (serviceType == 0 || serviceType == 2) {
      return (
        <tr>
          <th>STT</th>
          <th>Dịch vụ</th>
          <th>Tên</th>
          <th>
            Số lượng <br /> tối thiểu (MOQ)
          </th>
          <th>
            Số lượng <br /> phục vụ
          </th>
          <th>Đơn vị tính</th>
          <th>
            Phần trăm <br /> phụ thu (trẻ em) (%)
          </th>
          <th>Gía</th>
          <th>Ngày</th>
        </tr>
      );
    } else if (serviceType == 1) {
      return (
        <tr>
          <th>STT</th>
          <th>Dịch vụ</th>
          <th>
            Số lượng <br /> tối thiểu (MOQ)
          </th>
          <th>
            Số lượng <br /> phục vụ
          </th>
          <th>Tên menu</th>
          <th>
            Phần trăm <br /> phụ thu (trẻ em) (%)
          </th>
          <th>Gía</th>
          <th>Đơn vị tính</th>
          <th>Ngày</th>
          <th>Hành động</th>
        </tr>
      );
    } else if (serviceType == 3) {
      return (
        <tr>
          <th>STT</th>
          <th>Dịch vụ</th>
          <th>Loại xe</th>
          <th>Tên dịch vụ</th>
          <th>Số lượng tối thiểu (MOQ)</th>
          <th>Số lượng phục vụ</th>
          <th>Gía</th>
          <th>Đơn vị tính</th>
          <th>Ngày</th>
        </tr>
      );
    }
  };
  const handleTabChange = (index) => {
    console.log(index);
    setActiveTab(index);
  };
  return (
    <>
      <div className=" ">
        <div className="flex tabs mt-16 justify-center">
          <div className="tab-headers mx-10">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`mx-2 tab-header ${activeTab === index ? "font-bold border-b-2" : ""}`}
                onClick={() => handleTabChange(index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {tabs[activeTab].content}
      </div>
      <div className="flex justify-end">
        <button className="bg-mainColor text-white px-4 py-2 rounded-md m-2">
          Nhập dữ liệu Excel
        </button>
      </div>
      <div className="overflow-x-auto mt-10 rounded-xl shadow-xl">
        <table className="table">
          <thead className="bg-mainColor text-white w-full h-14">
            {renderHeader()}
          </thead>
          <tbody>
            {listCostHistory &&
              listCostHistory.map((item, index) => {
                return renderData(item, index);
              })}
          </tbody>
          <LoadingOverlay isLoading={isLoading} />
        </table>
      </div>
      {listCostHistory.length > 0 && (
        <PaginationManagement
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageClick={handlePageClick}
          showPagination={listCostHistory.length >= itemsPerPage}
        />
      )}
      <MenuModal
        isOpen={isOpen}
        setIsOpen={handeOpen}
        handleClose={() => setIsOpen(false)}
        menuId={selectedMenuId}
      />
    </>
  );
}

export default TablePrice;
