import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  ratingLabels,
  serviceTypeLabels,
} from "../../../../settings/globalStatus";
import { getServiceByFacilityId } from "../../../../api/FacilityApi";
import ServiceTypeBadge from "../../../../components/Badge/ServiceTypeBadge";
import PaginationManagement from "../../../../components/UI/Pagination/PaginationManagement";
import LoadingComponent from "../../../../components/Loading/LoadingComponent";
import { MENU } from "../../../../settings/constant";
function DetailFacilityService({ id }) {
  const [listFacilityService, setListFacilityService] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getServiceByFacilityId(id, currentPage, itemsPerPage);
    console.log(data);
    if (data.isSuccess) {
      setListFacilityService(data.result.items);
      setTotalPages(data.result.totalPages);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

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

  const renderUsingFor = (item) => {
    switch (item) {
      case 0:
        return "Người lớn";
        break;
      case 1:
        return "Trẻ em";
        break;
      case 2:
        return "Người lớn và trẻ em";
        break;
      default:
        return "Không xác  định";
        break;
    }
  };
  const renderRatingType = (rating) => {
    //console.log(ratingLabels[rating.id]);
    return ratingLabels[rating.id];
  };

  return (
    <>
      <div className="p-4">
        <h3 className="font-bold text-primary text-lg text-center mt-4">
          CÁC DỊCH VỤ CUNG CẤP
        </h3>
        {listFacilityService.length > 0 && (
          <div className="flex flex-col my-4 mx-2">
            <div className="flex">
              <span className="font-bold">Tên nhà cung cấp:</span>
              <span className="mx-2">
                {listFacilityService[0].facility?.name}
              </span>
            </div>
            <div className="flex">
              <span className="font-bold">Loại:</span>
              <span className="mx-2">
                {renderRatingType(
                  listFacilityService[0].facility?.facilityRating?.rating
                )}
              </span>
            </div>
            <div className="flex">
              <span className="font-bold">Địa chỉ:</span>
              <span className="mx-2">
                <span> {listFacilityService[0].facility?.address}</span>
                <span className="mx-1">
                  {" "}
                  {listFacilityService[0].facility?.communce?.name},
                </span>
                <span className="mx-1">
                  {listFacilityService[0].facility?.communce?.district?.name},
                </span>
                <span>
                  {
                    listFacilityService[0].facility?.communce?.district
                      ?.province?.name
                  }
                </span>
              </span>
            </div>
          </div>
        )}

        <div className="overflow-x-auto rounded-xl shadow-xl">
          <table className="table w-full ">
            <thead className="bg-mainColor text-white h-14">
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Dịch vụ</th>
                <th>
                  Số lượng <br />
                  phục vụ
                </th>
                <th>Đơn vị tính</th>
                <th>
                  Phần trăm <br /> phụ thu (trẻ em) (%)
                </th>
                <th>Dành cho</th>
                <th>Hoạt động</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listFacilityService &&
                listFacilityService.map((item, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      {" "}
                      <ServiceTypeBadge index={item.serviceTypeId} />
                    </td>
                    <td>{item.servingQuantity}</td>
                    <td>{renderUnit(item.unitId)}</td>
                    <td>{item.surchargePercent * 100}</td>
                    <td>{renderUsingFor(item.serviceAvailabilityId)}</td>
                    <td>
                      {item.isActive ? (
                        <span className="badge bg-green-600 p-4 whitespace-nowrap font-medium text-white">
                          Hoạt động
                        </span>
                      ) : (
                        <span className="badge bg-red-600 whitespace-nowrap font-medium text-white">
                          Ngưng hoạt động
                        </span>
                      )}
                    </td>
                    <td className="cursor-pointer">
                      {item.serviceTypeId === 1 && (
                        <NavLink to={`/admin/${MENU}/${id}`}>
                          <i class="fa-solid fa-eye"></i>
                        </NavLink>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
            <LoadingComponent isLoading={isLoading} />
          </table>
        </div>
        {listFacilityService.length > 0 && (
          <PaginationManagement
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageClick={handlePageClick}
            showPagination={listFacilityService.length >= itemsPerPage}
          />
        )}
      </div>
    </>
  );
}

export default DetailFacilityService;
