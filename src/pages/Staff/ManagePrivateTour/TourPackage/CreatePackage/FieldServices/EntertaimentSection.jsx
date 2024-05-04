import React from "react";
import { Form, InputNumber, Button, Space, Select } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const EntertainmentSection = ({ form }) => {
  return (
    <Form.List name="entertainment" initialValue={[{}]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name }, index) => (
            <Space
              key={key}
              align="baseline"
              className="mb-8 flex justify-between"
            >
              <div className="flex">
                <div className="text-center font-bold mr-14">{index + 1}</div>
                <div>
                  <div className="flex ">
                    <div className="flex flex-wrap">
                      <Form.Item
                        label="Khu vực:"
                        name={[name, "districtId"]}
                        className="flex font-semibold"
                        rules={[
                          { required: true, message: "Missing district" },
                        ]}
                      >
                        {/* <div className="flex justify-between ml-6"> */}
                        <Select placeholder="Tỉnh" className="!w-[200px] mr-10">
                          <Option value="HaNoi">Hà Nội</Option>
                          <Option value="SaiGon">TP. Hồ Chí Minh</Option>
                          {/* Add more options as needed */}
                        </Select>
                        {/* <Select
                            placeholder="Huyện/TP"
                            className="!w-[200px] mr-10"
                          >
                            <Option value="commune">Thủ đô Hà Nội</Option>
                          </Select> */}
                        {/* </div> */}
                      </Form.Item>
                      <div className="flex font-semibold text-gray-500">
                        <h3 className="text-lg mr-3">Khu du lịch - </h3>
                        <h3 className="text-lg mr-3">Giá vé: </h3>
                        <p className="text-lg"> 40.000 ~ 180.000/vé</p>
                      </div>
                    </div>
                  </div>

                  <Form.Item
                    className=" font-semibold my-4"
                    name={[name, "numberOfLocations"]}
                    label="Số lượng địa điểm du lịch:"
                    rules={[
                      {
                        required: true,
                        message: "Missing number of locations",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      className="!w-[200px] mr-10"
                      max={100}
                      placeholder="Số lượng địa điểm du lịch"
                    />
                  </Form.Item>
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
              Thêm khu vực giải trí
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
export default EntertainmentSection;
