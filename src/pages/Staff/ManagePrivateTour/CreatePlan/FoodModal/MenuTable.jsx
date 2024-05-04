import React, { useState, useEffect } from "react";
import { getAveragePriceOfMealService } from "../../../../../api/SellPriceHistoryApi";
import LoadingOverlay from "../../../../../components/Loading/LoadingOverlay";
import { formatPrice } from "../../../../../utils/Util";
function MenuTable({
  privateTourRequestId,
  districtId,
  servingQuantity,
  serviceType,
  ratingId,
  mealType,
  log,
}) {
  const [listMenu, setListMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAveragePriceOfMealService(
      districtId,
      privateTourRequestId,
      ratingId,
      serviceType,
      mealType,
      servingQuantity,
      1,
      10
    );
    if (data.isSuccess) {
      console.log(data.result?.items);
      setListMenu(data?.result?.items);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [
    privateTourRequestId,
    districtId,
    servingQuantity,
    serviceType,
    ratingId,
    mealType,
  ]);
  const [selectedRestaurent, setSelectedRestaurent] = useState(null); // State để lưu trữ hàng được chọn
  const handleSelectRestaurent = (item) => {
    if (
      selectedRestaurent &&
      item.sellPriceHistory?.id === selectedRestaurent.sellPriceHistory?.id
    ) {
      setSelectedRestaurent(null);
    } else {
      setSelectedRestaurent(item);
    }
    log(item);
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <div className="flex mt-4">
        <strong className="text-sm">Yêu cầu về ăn uống: </strong>
        <p className="mx-2 text-sm"></p>
      </div>
      <div className="overflow-x-auto rounded-xl mt-4 shadow-xl">
        <table className="table w-full ">
          <thead className="bg-mainColor text-white h-14">
            <tr>
              <th>STT</th>
              <th>Tên nhà hàng</th>
              <th>Địa chỉ</th>
              <th>Menu </th>
              <th>Bữa</th>
              <th>Loại</th>
              <th>Số lượng phục vụ</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {listMenu.length > 0 &&
              listMenu.map((item, index) => (
                <tr
                  key={index}
                  className={
                    item.sellPriceHistory?.id ===
                    selectedRestaurent?.sellPriceHistory?.id
                      ? "bg-yellow-100 text-black"
                      : ""
                  }
                  onClick={() => handleSelectRestaurent(item)}
                >
                  {" "}
                  <td>{index + 1}</td>
                  <td>{item.facilityServices?.facility?.name}</td>
                  <td>
                    {item.facilityServices?.facility?.address},{" "}
                    {item.facilityServices?.facility?.communce?.name},{" "}
                    {item.facilityServices?.facility?.communce?.district?.name},{" "}
                    {
                      item.facilityServices?.facility?.communce?.district
                        .province?.name
                    }
                  </td>{" "}
                  <td>
                    {item.menuDishes.map((dish) => dish.dish.name).join(", ")}
                  </td>
                  <td>
                    {item.sellPriceHistory?.menu.mealTypeId == 0
                      ? "Ăn sáng"
                      : item.sellPriceHistory?.menu.mealTypeId == 1
                        ? " Ăn trưa"
                        : "Ăn tối"}
                  </td>
                  <td></td>
                  <td>{item.facilityServices?.servingQuantity}</td>
                  <td>{formatPrice(item.sellPriceHistory?.price)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MenuTable;
