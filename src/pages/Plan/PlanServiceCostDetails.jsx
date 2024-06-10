import React from "react";
import { Card, List } from "antd";
import Title from "antd/es/skeleton/Title";

const PlanServiceCostDetails = ({ planServiceCostDetails }) => {
  console.log("planServiceCostDetails", planServiceCostDetails);
  return (
    <Card style={{ marginBottom: "20px" }}>
      <h1 className="text-primary font-bold text-center text-2xl">
        Bảng giá chi tiết kế hoạch
      </h1>
      <List
        itemLayout="vertical"
        dataSource={planServiceCostDetails}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.name} description={item.description} />
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.sellPriceHistory.price}</p>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default PlanServiceCostDetails;
