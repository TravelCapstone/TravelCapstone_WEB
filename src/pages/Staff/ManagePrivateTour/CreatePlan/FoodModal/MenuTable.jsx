import React, { useState, useEffect } from "react";
import { Spin, Table } from "antd";
import { getAveragePriceOfMealService } from "../../../../../api/SellPriceHistoryApi";
import { formatPrice } from "../../../../../utils/Util";

const MenuTable = ({
  privateTourRequestId,
  districtId,
  servingQuantity,
  serviceType,
  ratingId,
  mealType,
  log,
}) => {
  const [listMenu, setListMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
        setListMenu(data?.result?.items);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [
    privateTourRequestId,
    districtId,
    servingQuantity,
    serviceType,
    ratingId,
    mealType,
  ]);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleSelectRestaurant = (item) => {
    console.log(item);
    setSelectedRestaurant(
      selectedRestaurant &&
        item.sellPriceHistory?.id === selectedRestaurant.sellPriceHistory?.id
        ? null
        : item
    );
    log(item);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Tên nhà hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Menu",
      dataIndex: "menu",
      key: "menu",
      render: (menu) => menu.map((dish) => dish.dish.name).join(", "),
    },
    {
      title: "Bữa",
      dataIndex: "mealType",
      key: "mealType",
      render: (mealType) =>
        mealType === 0 ? "Ăn sáng" : mealType === 1 ? "Ăn trưa" : "Ăn tối",
    },
    {
      title: "Số lượng phục vụ",
      dataIndex: "servingQuantity",
      key: "servingQuantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => formatPrice(price),
    },
  ];

  const data = listMenu.map((item, index) => ({
    key: item.sellPriceHistory?.id,
    index: index + 1,
    name: item.facilityServices?.facility?.name,
    facilityId: item.facilityServices?.facility?.id,
    address: `${item.facilityServices?.facility?.address}, ${item.facilityServices?.facility?.communce?.name}, ${item.facilityServices?.facility?.communce?.district?.name}, ${item.facilityServices?.facility?.communce?.district.province?.name}`,
    menu: item.menuDishes,
    mealType: item.sellPriceHistory?.menu.mealTypeId,
    servingQuantity: item.facilityServices?.servingQuantity,
    price: item.sellPriceHistory?.price,
    province: item.facilityServices?.facility?.communce?.district.province?.id,
    provinceName:
      item.facilityServices?.facility?.communce?.district.province?.name,
  }));
  console.log(listMenu);
  return (
    <>
      <Spin spinning={isLoading}>
        <div className="flex mt-4">
          <strong className="text-sm">Yêu cầu về ăn uống: </strong>
          <p className="mx-2 text-sm"></p>
        </div>
        <div className="overflow-x-auto rounded-xl mt-4 shadow-xl">
          <Table
            dataSource={data}
            columns={columns}
            onRow={(record) => ({
              onClick: () => handleSelectRestaurant(record),
            })}
            rowClassName={(record) =>
              record.sellPriceHistory?.id ===
              selectedRestaurant?.sellPriceHistory?.id
                ? "bg-yellow-100 text-black"
                : ""
            }
            pagination={false}
          />
        </div>
      </Spin>
    </>
  );
};

export default MenuTable;
