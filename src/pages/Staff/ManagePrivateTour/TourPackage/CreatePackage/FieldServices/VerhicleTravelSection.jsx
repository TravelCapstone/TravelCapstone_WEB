import React, { useState } from "react";
import { Form, InputNumber, Button, Select, Space, DatePicker } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { RangePicker } = DatePicker;

const VerhicleTravelSection = ({ form }) => {
  return (
    <>
      <Form.List name="travelOptions" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }, index) => (
              <Space
                key={key}
                align="baseline"
                className="mb-4 flex justify-between"
              >
                <div className="flex flex-wrap">
                  <div className="text-center font-bold mr-14">{index + 1}</div>
                  <div>
                    <div className="flex flex-wrap">
                      <Form.Item
                        label="Tỉnh:"
                        name={[name, "location"]}
                        className=" font-semibold"
                        rules={[
                          {
                            required: true,
                            message: "Please select a location",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Chọn tỉnh"
                          className="!w-[200px] mr-10"
                        >
                          <Option value="HaGiang">Hà Giang</Option>
                          <Option value="PhuTho">Phú Thọ</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Số ngày:"
                        className=" font-semibold"
                        name={[name, "days"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter number of days",
                          },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          max={30}
                          placeholder="Số ngày"
                          className="!w-[200px] mr-10"
                        />
                      </Form.Item>
                    </div>
                    <div className="flex flex-wrap">
                      <Form.Item
                        className=" font-semibold"
                        label="Phương tiện:"
                        name={[name, "vehicle"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select a vehicle",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Chọn phương tiện"
                          className="!w-[200px] mr-10"
                        >
                          <Option value="7SeatTaxi">Xe taxi 7 chỗ</Option>
                        </Select>
                      </Form.Item>
                      <div className="flex font-semibold text-gray-500">
                        <h3 className="text-lg mr-3">Khoảng giá: </h3>
                        <p className="text-lg">
                          {" "}
                          1.300.000 ~ 1.600.000/xe/ngày
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <DeleteOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item className="w-1/3 ">
              <Button
                className="bg-teal-600 font-semibold text-white"
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Thêm phương tiện du lịch
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};
export default VerhicleTravelSection;
