import React, { useState } from "react";
import { Modal, Button, Tabs } from "antd";
import MenuTable from "./MenuTable";

const { TabPane } = Tabs;

function FoodModal({
  privateTourRequestId,
  districtId,
  servingQuantity,
  serviceType,
  ratingId,
  log,
}) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("0");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const tabs = [
    {
      label: "Ăn sáng",
      key: "0",
      mealType: 0,
    },
    {
      label: "Ăn trưa",
      key: "1",
      mealType: 1,
    },
    {
      label: "Ăn tối",
      key: "2",
      mealType: 0,
    },
  ];

  return (
    <>
      <Button
        type="primary"
        className="rounded-md"
        onClick={() => setVisible(true)}
      >
        Chọn
      </Button>
      <Modal
        title="Chọn nhà hàng"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="close" onClick={() => setVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          {tabs.map((tab) => (
            <TabPane tab={tab.label} key={tab.key}>
              <MenuTable
                districtId={districtId}
                servingQuantity={servingQuantity}
                serviceType={serviceType}
                ratingId={ratingId}
                mealType={tab.mealType}
                privateTourRequestId={privateTourRequestId}
                log={log}
              />
            </TabPane>
          ))}
        </Tabs>
      </Modal>
    </>
  );
}

export default FoodModal;
