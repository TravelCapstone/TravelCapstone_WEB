import { useEffect, useState } from "react";
import {
  getAllReferenceTransportPrice,
  getAllReferenceTransportPriceByProvince,
} from "../../../api/ReferencePriceTransportApi";
import PaginationManagement from "../../../components/UI/Pagination/PaginationManagement";
import Loading from "../../../components/Loading/Loading";
import { typePortLabels } from "../../../settings/globalStatus";
import { formatPrice } from "../../../utils/Util";
import { getAllProvince } from "../../../api/privateTourRequestApi";
import { getLocationAllProvince } from "../../../api/LocationApi";

const ListReferenceTransportPrice = () => {
  const itemsPerPage = 10;
  const [listData, setListData] = useState([]);
  const [listProvince, setListProvince] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [province1, setProvince1] = useState("0");
  const [province2, setProvince2] = useState("0");
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllReferenceTransportPrice(currentPage, itemsPerPage);
    const province = await getLocationAllProvince();
    if (data?.data?.isSuccess) {
      setListData(data.data.result.items);
      setListProvince(province);
      setTotalPages(data.data.result.totalPages);
      setIsLoading(false);
    }
  };
  const filterData = async () => {
    setIsLoading(true);
    const data = await getAllReferenceTransportPriceByProvince(
      province1,
      province2,
      currentPage,
      itemsPerPage
    );
    if (data?.data?.isSuccess) {
      setListData(data.data.result.items);
      setTotalPages(data.data.result.totalPages);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const resetFilter = () => {
    setProvince1("0");
    setProvince2("0");
    fetchData();
  };
  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-pretty">
          Chi phí phương tiện di chuyển
        </h2>
        <div class="flex items-end justify-between my-10">
          <div className="flex items-end">
            <div>
              <label for="departureProvince" class="label">
                Tỉnh đi
              </label>
              <select
                id="departureProvince"
                class="select select-bordered w-36"
                onChange={(e) => setProvince1(e.target.value)}
                value={province1}
              >
                <option disabled value={0}>
                  ------
                </option>
                {listProvince &&
                  listProvince.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mx-5">
              <label for="arrivalProvince" class="label">
                Tỉnh đến
              </label>
              <select
                id="arrivalProvince"
                class="select select-bordered w-36"
                onChange={(e) => setProvince2(e.target.value)}
                value={province2}
              >
                <option disabled value={0}>
                  ------
                </option>
                {listProvince &&
                  listProvince.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <button class="btn  m-0" onClick={filterData}>
              Lọc
            </button>
            <button class="btn  mx-2" onClick={resetFilter}>
              <i class="fa-solid fa-arrow-rotate-left"></i>
              Reset
            </button>
          </div>
          <div className="">
            <button class="btn  m-0">Import excel</button>
          </div>
        </div>
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
                      {new Date(item.departureDate).toLocaleDateString()} -
                      {new Date(item.arrivalDate).toLocaleDateString()}
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
