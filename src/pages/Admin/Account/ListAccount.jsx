import { useEffect, useState } from "react";
import PaginationManagement from "../../../components/UI/Pagination/PaginationManagement";
import { getAllAccount } from "../../../api/AccountApi";
import LoadingComponent from "../../../components/Loading/LoadingComponent";

const ListAccount = () => {
  const itemsPerPage = 10;
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllAccount(currentPage, itemsPerPage);
    if (data?.data?.isSuccess) {
      setListData(data.data.result.items);
      setTotalPages(data.data.result.totalPages);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const renderUserRole = (roles) => {
    const roleNames = roles.map((role) => role.name.toLowerCase());

    let renderedRole = "";
    if (roleNames.includes("admin")) {
      renderedRole = "Quản trị viên";
    } else if (roleNames.includes("staff")) {
      renderedRole = "Nhân viên";
    } else if (
      roleNames.includes("tourguide") &&
      roleNames.includes("customer")
    ) {
      renderedRole = "Hướng dẫn viên";
    } else if (roleNames.includes("customer")) {
      renderedRole = "Khách hàng";
    } else {
      console.error("Unknown role combination.");
      return;
    }

    return renderedRole;
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-pretty">
          Quản lí người dùng
        </h2>

        <div className="overflow-x-auto rounded-xl">
          <table className="table w-full ">
            <thead className="bg-mainColor text-white h-14">
              <tr>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Vai trò </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <LoadingComponent isLoading={isLoading} />

              {listData &&
                listData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      {item.firstName} {item.lastName}
                    </td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.email}</td>
                    <td>{renderUserRole(item.role)}</td>
                    <td className="cursor-pointer">
                      <i class="fa-solid fa-eye"></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {listData.length > 0 && (
            <PaginationManagement
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageClick={handlePageClick}
              showPagination={listData.length >= itemsPerPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ListAccount;
