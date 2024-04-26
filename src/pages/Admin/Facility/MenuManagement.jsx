import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMenuByFacilityId } from "../../../api/MenuApi";
import PaginationManagement from "../../../components/UI/Pagination/PaginationManagement";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import { dietaryPreferenceLabels } from "../../../settings/globalStatus";

function MenuManagement() {
  const { id } = useParams();
  const [listMenu, setListMenu] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const fetchData = async () => {
    const response = await getMenuByFacilityId(id, currentPage, itemsPerPage);
    if (response.isSuccess) {
      setListMenu(response.result.items);
      setTotalPages(response.result.totalPages);
      setIsLoading(false);
    }
  };
  const renderMealType = (item) => {
    switch (item) {
      case 0:
        return "Sáng";
      case 1:
        return "Trưa";
      case 2:
        return "Tối";
    }
  };
  const renderDietaryPreference = (item) => {
    return dietaryPreferenceLabels[item];
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="p-4">
      <h3 className="text-center text-primary font-bold text-xl">
        QUẢN LÍ THỰC ĐƠN
      </h3>
      <div className="overflow-x-auto rounded-xl shadow-xl my-8 ">
        <table className="table w-full ">
          <thead className="bg-mainColor text-white h-14">
            <tr>
              <th>STT</th>
              <th>Tên thực đơn</th>
              <th>Mô tả</th>
              <th>Bữa </th>
              <th>Loại</th>
              <th>Món ăn</th>
            </tr>
          </thead>
          <tbody>
            {listMenu.map((item, index) => (
              <tr key={item.menu.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{item.menu.name}</td>
                <td>{item.menu.description}</td>
                <td>{renderMealType(item.menu.mealTypeId) || "N/A"}</td>
                <td>
                  {renderDietaryPreference(item.menu.dietaryPreferenceId) ||
                    "N/A"}
                </td>
                <td>{item.dishes.map((dish) => dish.name).join(", ")}</td>
              </tr>
            ))}
            <LoadingOverlay isLoading={isLoading} />
          </tbody>
        </table>
        <PaginationManagement
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageClick={handlePageClick}
          showPagination={listMenu.length >= itemsPerPage}
        />
      </div>
    </div>
  );
}

export default MenuManagement;
