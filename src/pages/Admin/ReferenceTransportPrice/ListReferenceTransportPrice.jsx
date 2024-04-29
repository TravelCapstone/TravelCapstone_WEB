import { useEffect, useState } from "react";
import {
  getAllReferenceTransportPrice,
  getAllReferenceTransportPriceByFilter,
} from "../../../api/ReferencePriceTransportApi";
import PaginationManagement from "../../../components/UI/Pagination/PaginationManagement";
import { typePortLabels } from "../../../settings/globalStatus";
import { formatDate, formatPrice } from "../../../utils/Util";
import { getAllProvince } from "../../../api/LocationApi";
import LoadingComponent from "../../../components/Loading/LoadingComponent";
import LocationSelect from "../../../components/UI/Address/LocationSelect";
import { render } from "react-dom";
import { toast } from "react-toastify";
import FilterReferenceTransportPrice from "./FilterReferenceTransportPrice";
const ListReferenceTransportPrice = () => {
  const itemsPerPage = 10;
  const [listData, setListData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllReferenceTransportPrice(currentPage, itemsPerPage);
    if (data?.isSuccess) {
      setListData(data.result.items);
      setTotalPages(data.result.totalPages);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const log = (data) => {
    setListData(data.data);
    setTotalPages(data.totalPages);
  };

  return (
    <>
      <div className=" bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-primary mb-4 text-center text-pretty">
          CHI PHÍ PHƯƠNG TIỆN DI CHUYỂN <br />{" "}
          <span className="text-sm">MÁY BAY/ TÀU THỦY</span>
        </h2>
        <button
          className="bg-mainColor text-white rounded-md px-4 py-2 my-4"
          onClick={() => setIsFilter(!isFilter)}
        >
          Lọc nâng cao
        </button>
        <FilterReferenceTransportPrice
          isFilter={isFilter}
          log={log}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <div className="overflow-x-auto rounded-xl">
          <table className="table w-full ">
            <thead className="bg-mainColor text-white h-14">
              <tr>
                <th>STT</th>
                <th>Loại cảng</th>
                <th>Hãng cung cấp</th>
                <th>Điểm đi- Điểm đến</th>
                <th>Tỉnh/Thành phố đi -Tỉnh/Thành phố đến </th>
                <th>Ngày đi- Ngày đến</th>
                <th>Giá trẻ em</th>
                <th>Giá người lớn</th>
              </tr>
            </thead>
            <tbody>
              <LoadingComponent isLoading={isLoading} />

              {listData &&
                listData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      {item.arrival?.portType === 0
                        ? typePortLabels[0]
                        : item.arrival?.portType === 1
                          ? typePortLabels[1]
                          : item.arrival?.portType === 2
                            ? typePortLabels[2]
                            : item.arrival?.portType === 3
                              ? typePortLabels[3]
                              : typePortLabels[4]}
                    </td>
                    <td>{item.providerName}</td>
                    <td>
                      {item.departure?.name} -{item.arrival?.name}
                    </td>
                    <td>
                      {item.departure?.commune?.district?.province.name} -
                      {item.arrival?.commune?.district?.province.name}
                    </td>
                    <td>
                      {formatDate(item.departureDate)} -
                      {formatDate(item.arrivalDate)}
                    </td>
                    <td>{formatPrice(item.childPrice)}</td>
                    <td>{formatPrice(item.adultPrice)}</td>
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

export default ListReferenceTransportPrice;
