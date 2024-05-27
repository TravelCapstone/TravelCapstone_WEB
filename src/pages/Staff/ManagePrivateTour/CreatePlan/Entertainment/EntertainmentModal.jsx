import React, { useState, useEffect } from "react";
import { getAveragePriceOfService } from "../../../../../api/SellPriceHistoryApi";
import { unitLabels } from "../../../../../settings/globalStatus";
import { formatPrice } from "../../../../../utils/Util";
import { Button, Modal, Table, Typography } from "antd";

const { Text } = Typography;
const EntertainmentModal = ({
  districtId,
  privateTourRequestId,
  servingQuantity,
  serviceType,
  ratingId,
  log,
}) => {
  const [listEntertainment, setListEntertainment] = useState([]);
  const [selectedEntertainment, setSelectedEntertainment] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      setListEntertainment(data.result.items);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    districtId,
    privateTourRequestId,
    servingQuantity,
    serviceType,
    ratingId,
  ]);

  const handleSelectEntertainment = (item) => {
    const index = selectedEntertainment.findIndex(
      (selectedItem) => selectedItem.key === item.key
    );
    if (index === -1) {
      setSelectedEntertainment((prev) => [...prev, item]);
    } else {
      setSelectedEntertainment((prev) =>
        prev.filter((selectedItem) => selectedItem.key !== item.key)
      );
    }
  };

  console.log(selectedEntertainment);
  useEffect(() => {
    log(selectedEntertainment);
  }, [selectedEntertainment]);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Địa điểm",
      dataIndex: "facilityName",
      key: "facilityName",
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Giá",
      key: "price",
      dataIndex: "price",
    },
  ];
  const data = listEntertainment.map((item, index) => ({
    key: item.sellPriceHistory?.id,
    index: index + 1,
    facilityName: item.facilityServices?.facility?.name,
    facilityId: item.facilityServices?.facility?.id,
    address: `${item.facilityServices?.facility?.address}, ${item.facilityServices?.facility?.communce?.name}, ${item.facilityServices?.facility?.communce?.district?.name}, ${item.facilityServices?.facility?.communce?.district.province?.name}`,
    province: item.facilityServices?.facility?.communce?.district.province?.id,
    provinceName:
      item.facilityServices?.facility?.communce?.district.province?.name,
    serviceName: item.sellPriceHistory?.facilityService?.name,
    unit: unitLabels[item.sellPriceHistory?.facilityService?.unitId],
    price: formatPrice(item.sellPriceHistory?.price),
  }));
  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Chọn
      </Button>
      <Modal
        title="Chọn địa điểm vui chơi"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1400}
        footer={[
          <Button key="clear" onClick={() => setSelectedEntertainment([])}>
            Clear
          </Button>,
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <Table
          dataSource={data}
          columns={columns}
          rowKey={(record) => record.index}
          onRow={(record) => ({
            onClick: () => handleSelectEntertainment(record),
          })}
        />
      </Modal>
    </>
  );
};

export default EntertainmentModal;
