import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

function BasicTimeline(props) {
  const [timelineItems, setTimelineItems] = useState([]);

  const handleAddTimeline = () => {
    setTimelineItems([
      ...timelineItems,
      {
        key: timelineItems.length,
        location: "",
        date: "",
      },
    ]);
  };

  const handleChangeLocation = (index, location) => {
    setTimelineItems(
      timelineItems.map((item, i) =>
        i === index ? { ...item, location } : item
      )
    );
  };

  const handleChangeDate = (index, date) => {
    setTimelineItems(
      timelineItems.map((item, i) => (i === index ? { ...item, date } : item))
    );
  };

  const handleRemoveTimeline = (index) => {
    setTimelineItems(timelineItems.filter((_, i) => i !== index));
  };

  const handleLogData = () => {
    console.log("Dữ liệu timelineItems:", timelineItems);
  };

  useEffect(() => {
    // Log dữ liệu khi component được render
    handleLogData();
  }, []);

  return (
    <Form>
      <h3 className="font-bold text-base my-2 text-mainColor">
        LỊCH TRÌNH CƠ BẢN
      </h3>
      <Form.List name="timelines">
        {(fields, { add, remove }) => (
          <>
            <div className="flex flex-wrap justify-center">
              {timelineItems.map((item, index) => (
                <div key={index} className="mr-4 mb-4 relative flex flex-col">
                  <Form.Item
                    name={[index, "location"]}
                    rules={[
                      { required: true, message: "Vui lòng chọn địa điểm" },
                    ]}
                  >
                    <Select
                      value={item.location}
                      onChange={(value) => handleChangeLocation(index, value)}
                    >
                      <Option value="">Chọn địa điểm</Option>
                      <Option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</Option>
                      {/* Add more options as needed */}
                    </Select>
                  </Form.Item>
                  <div className="hidden md:flex md:items-center">
                    <div className="hidden md:flex md:items-end">
                      <i className="fa-solid fa-minus"></i>
                      <i className="fa-solid fa-minus"></i>
                      <i className="fa-solid fa-minus"></i>
                      <i className="fa-solid fa-minus"></i>
                      <i className="fa-solid fa-map-pin text-4xl text-center"></i>
                      <i className="fa-solid fa-minus"></i>
                      <i className="fa-solid fa-minus"></i>
                      <i className="fa-solid fa-minus"></i>
                      <i className="fa-solid fa-minus"></i>
                    </div>
                  </div>
                  <Form.Item
                    name={[index, "date"]}
                    rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
                  >
                    <DatePicker
                      value={item.date ? moment(item.date) : null}
                      onChange={(date) => handleChangeDate(index, date)}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    danger
                    shape="circle"
                    icon={<i className="fa-solid fa-xmark"></i>}
                    onClick={() => handleRemoveTimeline(index)}
                    className="absolute top-0 right-0"
                  />
                </div>
              ))}
            </div>
            <Form.Item>
              <Button
                type="dashed"
                onClick={handleAddTimeline}
                disabled={timelineItems.length >= 16}
                block
              >
                Thêm mốc thời gian
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleLogData}>
                Log dữ liệu
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}

export default BasicTimeline;
