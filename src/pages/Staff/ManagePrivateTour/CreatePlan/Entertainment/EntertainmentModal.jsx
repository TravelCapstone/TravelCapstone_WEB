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

  const handleSelectHotel = (item) => {
    const index = selectedEntertainment.findIndex(
      (selectedItem) =>
        selectedItem.sellPriceHistory?.id === item.sellPriceHistory?.id
    );
    if (index === -1) {
      setSelectedEntertainment([...selectedEntertainment, item]);
    } else {
      const updatedSelection = [...selectedEntertainment];
      updatedSelection.splice(index, 1);
      setSelectedEntertainment(updatedSelection);
    }
  };

  useEffect(() => {
    log(selectedEntertainment);
  }, [selectedEntertainment]);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Địa điểm",
      dataIndex: ["sellPriceHistory", "facilityService", "facility", "name"],
      key: "facilityName",
    },
    {
      title: "Địa chỉ",
      key: "address",
      render: (text, record) => {
        const facility = record.sellPriceHistory?.facilityService?.facility;
        return `${facility?.address}, ${facility?.communce?.name}, ${facility?.communce?.district?.name}, ${facility?.communce?.district?.province?.name}`;
      },
    },
    {
      title: "Dịch vụ",
      dataIndex: ["sellPriceHistory", "facilityService", "name"],
      key: "serviceName",
    },
    {
      title: "Đơn vị",
      key: "unit",
      render: (text, record) =>
        unitLabels[record.sellPriceHistory?.facilityService?.unitId],
    },
    {
      title: "Giá",
      key: "price",
      render: (text, record) => formatPrice(record.sellPriceHistory?.price),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Chọn
      </Button>
      <Modal
        title="Chọn địa điểm vui chơi"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
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
          dataSource={listEntertainment}
          columns={columns}
          rowKey={(record) => record.sellPriceHistory?.id}
          rowClassName={(record) =>
            selectedEntertainment.some(
              (selectedItem) =>
                selectedItem.sellPriceHistory?.id ===
                record.sellPriceHistory?.id
            )
              ? "bg-yellow-100 text-black"
              : ""
          }
          onRow={(record) => ({
            onClick: () => handleSelectHotel(record),
          })}
        />
      </Modal>
    </>
  );
};

export default EntertainmentModal;
