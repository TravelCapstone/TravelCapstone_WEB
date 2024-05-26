import React, { useEffect, useState } from "react";
import { Spin, Table, Modal, Button } from "antd";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    console.log(item);
    log(item);
  };

  const columns = [
    { title: "STT", dataIndex: "index", key: "index" },
    { title: "Khách sạn", dataIndex: "facilityName", key: "facilityName" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Dịch vụ", dataIndex: "service", key: "service" },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      render: (unitId) => unitLabels[unitId],
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "sellPriceHistory",
      render: (price) => formatPrice(price),
    },
  ];

  const data = listHotel.map((item, index) => ({
    key: item.sellPriceHistory?.id,
    index: index + 1,
    facilityName: item.sellPriceHistory?.facilityService?.facility.name,
    address: `${item.sellPriceHistory?.facilityService?.facility.address}, ${item.sellPriceHistory?.facilityService?.facility.communce?.name}, ${item.sellPriceHistory?.facilityService?.facility.communce?.district?.name}, ${item.sellPriceHistory?.facilityService?.facility.communce?.district.province?.name}`,
    sellPriceHistory: item.sellPriceHistory?.facilityService?.name,
    unit: item.sellPriceHistory?.facilityService?.unitId,
    price: item.sellPriceHistory?.price,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedHotel(null);
  };

  return (
    <>
      <Spin spinning={!listHotel.length}>
        <Button className="bg-primary text-white mt-2" onClick={showModal}>
          Chọn
        </Button>
        <Modal
          width={1400}
          title="Chọn khách sạn"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button
              key="submit"
              className="bg-primary text-white mt-2"
              onClick={handleOk}
            >
              Chọn
            </Button>,
            <Button key="cancel" onClick={handleCancel}>
              Đóng
            </Button>,
          ]}
        >
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
        </Modal>
      </Spin>
    </>
  );
};

export default HotelModal;
