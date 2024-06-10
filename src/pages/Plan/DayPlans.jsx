import React from "react";
import { Card, List } from "antd";

const DayPlans = ({ dayPlans }) => (
  <Card style={{ marginBottom: "20px" }}>
    <h1 className="text-primary font-bold text-center text-2xl">
      Lịch trình dự kiến
    </h1>
    <List
      itemLayout="vertical"
      dataSource={dayPlans}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={`Day Plan on ${item.dayPlan.date}`}
            description={item.dayPlan.description}
          />
          <List
            dataSource={item.vehicleRoutes}
            renderItem={(route) => (
              <List.Item>
                <p>Route Note: {route.route.note}</p>
                <p>Start Time: {route.route.startTime}</p>
                <p>End Time: {route.route.endTime}</p>
              </List.Item>
            )}
          />
        </List.Item>
      )}
    />
  </Card>
);

export default DayPlans;
