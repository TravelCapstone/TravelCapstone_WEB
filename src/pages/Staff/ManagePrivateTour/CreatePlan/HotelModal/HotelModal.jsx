import React, { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import { getAveragePriceOfService } from "../../../../../api/SellPriceHistoryApi";
import { unitLabels } from "../../../../../settings/globalStatus";
import { formatPrice } from "../../../../../utils/Util";

const HotelModal = ({
  districtId,
  privateTourRequestId,
  servingQuantity,
  serviceType,
  ratingId,
  log,
}) => {
  const [listHotel, setListHotel] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAveragePriceOfService(
        districtId,
        privateTourRequestId,
        ratingId,
        serviceType,
        servingQuantity,
        1,
        10
      );
      if (data.isSuccess) {
        setListHotel(data.result.items);
      }
    };

    fetchData();
  }, [
    districtId,
    privateTourRequestId,
    servingQuantity,
    serviceType,
    ratingId,
  ]);

  const handleSelectHotel = (item) => {
    setSelectedHotel(
      selectedHotel &&
        item.sellPriceHistory?.id === selectedHotel.sellPriceHistory?.id
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
      title: "Khách sạn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      render: (unitId) => unitLabels[unitId],
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => formatPrice(price),
    },
  ];

  const data = listHotel.map((item, index) => ({
    key: index,
    index: index + 1,
    name: item.sellPriceHistory?.facilityService?.facility.name,
    address: `${item.sellPriceHistory?.facilityService?.facility.address}, ${item.sellPriceHistory?.facilityService?.facility.communce?.name}, ${item.sellPriceHistory?.facilityService?.facility.communce?.district?.name}, ${item.sellPriceHistory?.facilityService?.facility.communce?.district.province?.name}`,
    service: item.sellPriceHistory?.facilityService?.name,
    unit: item.sellPriceHistory?.facilityService?.unitId,
    price: item.sellPriceHistory?.price,
  }));

  return (
    <>
      <Spin spinning={!listHotel.length}>
        <button
          className="btn bg-mainColor text-white"
          onClick={() => document.getElementById("hotel_modal").showModal()}
        >
          Chọn
        </button>
        <dialog id="hotel_modal" className="modal">
          <div className="modal-box w-11/12 max-w-6xl">
            <h3 className="font-bold text-lg">Chọn khách sạn</h3>

            <div className="overflow-x-auto rounded-xl shadow-xl my-4">
              <Table
                dataSource={data}
                columns={columns}
                onRow={(record) => ({
                  onClick: () => handleSelectHotel(record),
                })}
                rowClassName={(record) =>
                  record.sellPriceHistory?.id ===
                  selectedHotel?.sellPriceHistory?.id
                    ? "bg-yellow-100 text-black"
                    : ""
                }
                pagination={false}
              />
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-mainColor text-white">Chọn</button>
                <button
                  className="mx-2 btn"
                  onClick={() => setSelectedHotel(null)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </Spin>
    </>
  );
};

export default HotelModal;
