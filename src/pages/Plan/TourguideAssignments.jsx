import React from "react";
import { Card, List } from "antd";

const TourguideAssignments = ({ tourguideAssignments }) => (
  <Card style={{ marginBottom: "20px" }}>
    <h1 className="text-primary font-bold text-center text-2xl">
      Thông tin về hướng dẫn viên
    </h1>
    <List
      itemLayout="vertical"
      dataSource={tourguideAssignments}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={`${item.account.firstName} ${item.account.lastName}`}
            description={`Email: ${item.account.email}`}
          />
          <p>Start Time: {item.startTime}</p>
          <p>End Time: {item.endTime}</p>
        </List.Item>
      )}
    />
  </Card>
);

export default TourguideAssignments;
