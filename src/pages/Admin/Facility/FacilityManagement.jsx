import React, { useState, useEffect } from "react";
import { ratingLabels } from "../../../settings/globalStatus";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import { NavLink } from "react-router-dom";
import { getAllProvince } from "../../../api/LocationApi";
import PaginationManagement from "../../../components/UI/Pagination/PaginationManagement";
import {
  getAllFacility,
  getAllFacilityByFilter,
} from "../../../api/FacilityApi";
import { DETAIL_FACILITY } from "../../../settings/constant";
import LocationSelect from "../../../components/UI/Address/LocationSelect";
import FilterFacility from "./Filter/FilterFacility";
function FacilityManagement() {
  const [listFacility, setListFacility] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const fetchData = async () => {
    await filterData();
    const provinceData = await getAllProvince();
    console.log(provinceData);
    if (provinceData.isSuccess) {
      setIsLoading(false);
      setListProvince(provinceData.result.items);
    }
  };
  const filterData = async () => {
    setIsLoading(true);
    const data = await getAllFacility(currentPage, itemsPerPage);
    if (data.isSuccess) {
      setListFacility(data.result.items);
      console.log(data.result.items);
      setIsLoading(false);
      setTotalPages(data.result.totalPages);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const renderRatingType = (rating) => {
    console.log(ratingLabels[rating.id]);
    return ratingLabels[rating.id];
  };
  const log = (data) => {
    setListFacility(data.data);
    setTotalPages(data.totalPages);
  };
  return (
    <>
      <div className=" bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-xl font-semibold text-primary mb-4 text-center text-pretty">
          QUẢN LÍ ĐỐI TÁC
        </h2>
        <div class="flex-col items-start md:flex md:flex-row md:justify-between md:items-end  my-10">
          <div>
            <div>
              <button
                class="btn  m-0 bg-mainColor hover:bg-secondary text-white font-bold rounded-lg"
                onClick={() => setShowFilter(!showFilter)}
              >
                Lọc nâng cao
                <svg
                  className={`fill-current transition-transform ${
                    showFilter ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </button>
              {showFilter && (
                <FilterFacility
                  isFilter={showFilter}
                  log={log}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  fetchData={fetchData}
                />
              )}
            </div>
          </div>
          <div className="">
            <button class="btn  m-0 bg-mainColor text-white font-bold rounded-lg">
              Tạo đối tác
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-xl">
          <table className="table w-full ">
            <thead className="bg-mainColor text-white h-14">
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên cơ sở</th>
                <th className="text-center">Mô tả</th>
                <th className="text-center">Địa chỉ</th>
                <th className="text-center">Loại hình</th>
                <th className="text-center"> Hoạt động</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listFacility &&
                listFacility.map((item, index) => (
                  <tr className="hover" key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      {item.address} {item.commune?.name},
                      {item.communce?.district?.name},
                      {item.communce?.district?.province?.name}
                    </td>
                    <td>{renderRatingType(item.facilityRating?.rating)}</td>
                    <td>
                      {item.isActive ? (
                        <span className="badge bg-green-600 whitespace-nowrap p-4 font-medium text-white">
                          Hoạt động
                        </span>
                      ) : (
                        <span className="badge bg-red-600 whitespace-nowrap font-medium text-white">
                          Ngưng hoạt động
                        </span>
                      )}
                    </td>
                    <td className="cursor-pointer">
                      <NavLink to={`/admin/${DETAIL_FACILITY}/${item.id}`}>
                        <i class="fa-solid fa-eye"></i>
                      </NavLink>
                    </td>
                  </tr>
                ))}
              <LoadingOverlay isLoading={isLoading} />
            </tbody>
          </table>
          <PaginationManagement
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageClick={handlePageClick}
            showPagination={listFacility.length >= itemsPerPage}
          />
        </div>
      </div>
    </>
  );
}

export default FacilityManagement;