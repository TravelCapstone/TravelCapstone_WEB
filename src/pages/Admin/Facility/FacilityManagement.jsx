import React, { useState, useEffect } from "react";
import { ratingLabels } from "../../../settings/globalStatus";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import { NavLink } from "react-router-dom";
import { getAllProvince } from "../../../api/LocationApi";
import PaginationManagement from "../../../components/UI/Pagination/PaginationManagement";
import {
  getAllFacility,
  getAllFacilityByProvince,
} from "../../../api/FacilityApi";
import { DETAIL_FACILITY } from "../../../settings/constant";
import LocationSelect from "../../../components/UI/Address/LocationSelect";
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
    console.log(data);
  };
  return (
    <>
      <div className=" bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-xl font-semibold text-primary mb-4 text-center text-pretty">
          QUẢN LÍ ĐỐI TÁC
        </h2>
        <div class="flex items-end justify-between my-10">
          <div>
            <div>
              <button
                class="btn  m-0 bg-mainColor hover:bg-secondary text-white font-bold rounded-lg"
                onClick={() => setShowFilter(!showFilter)}
              >
                Lọc nâng cao
              </button>
              {showFilter && (
                <div className="flex flex-col mb-4">
                  <LocationSelect isFlex={true} log={log} />
                  <div className="flex">
                    <div className="form-control mt-6">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Loại hình
                        </span>
                      </label>
                      <select className="select select-bordered">
                        <option value="">Chọn loại hình</option>
                        <option value="">Khách sạn</option>
                        <option value="">Nhà hàng</option>
                      </select>
                    </div>
                    <div className="form-control mt-6 mx-8">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Loại hình
                        </span>
                      </label>
                      <select className="select select-bordered">
                        <option value="">Phân loại</option>
                        <option value="">1 sao</option>
                        <option value="">2 sao</option>
                      </select>
                    </div>
                  </div>
                  <button className="btn w-16 mt-8 bg-mainColor text-white">
                    Lọc
                  </button>
                </div>
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
                <th>STT</th>
                <th>Tên cơ sở</th>
                <th>Mô tả</th>
                <th>Địa chỉ</th>
                <th>Loại hình</th>
                <th>Hoạt động</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listFacility &&
                listFacility.map((item, index) => (
                  <tr key={index}>
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
