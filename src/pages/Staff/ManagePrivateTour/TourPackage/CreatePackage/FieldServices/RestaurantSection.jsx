import React, { useState } from "react";
import {
  Button,
  Form,
  Select,
  DatePicker,
  Space,
  TreeSelect,
  InputNumber,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;

const RestaurantSection = ({ form }) => {
  const [diningDetails, setDiningDetails] = useState({});

  const handleDiningTypeChange = (selectedType, name) => {
    const newDetails = { ...diningDetails, [name]: [selectedType] }; // Store as an array for future multi-selection
    setDiningDetails(newDetails);
  };

  const diningTypeNames = {
    restaurant: "Nhà hàng",
    cafe: "Quán cà phê",
    fastFood: "Thức ăn nhanh",
  };

  return (
    <Form.List name="diningOptions" initialValue={[{}]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <Space
              key={key}
              className="flex my-8 justify-between"
              align="baseline"
            >
              <div className="text-center font-bold mr-2">{index + 1}</div>
              <div className="flex flex-col flex-grow w-full">
                <div className="flex flex-wrap">
                  <div className="flex flex-wrap">
                    <Form.Item
                      {...restField}
                      label="Khu vực:"
                      placeholder="Tỉnh"
                      name={[name, "province"]}
                      className="flex font-semibold"
                      rules={[{ required: true, message: "Missing province" }]}
                    >
                      <Select placeholder="Tỉnh" className="!w-[200px] mr-10">
                        <Option value="HaNoi">Hà Nội</Option>
                        <Option value="SaiGon">TP. Hồ Chí Minh</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "district"]}
                      className="flex font-semibold"
                      placeholder="Huyện/TP"
                      rules={[{ required: true, message: "Missing district" }]}
                    >
                      <Select
                        placeholder="Huyện/TP"
                        className="!w-[200px] mr-10"
                      >
                        <Option value="commune">Thủ đô Hà Nội</Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <Form.Item
                    {...restField}
                    label="Ngày dùng bữa:"
                    className="font-semibold"
                    name={[name, "mealDates"]}
                    rules={[
                      {
                        required: true,
                        message: "Please choose the meal dates!",
                      },
                    ]}
                  >
                    <RangePicker showTime className="!min-w-[300px] mr-10" />
                  </Form.Item>
                </div>
                <div className="flex flex-wrap">
                  <Form.Item
                    {...restField}
                    className="font-semibold"
                    label="Loại hình ăn uống:"
                    name={[name, "diningType"]}
                    rules={[
                      {
                        required: true,
                        message: "Please select a dining type!",
                      },
                    ]}
                  >
                    <Select
                      className="!w-[250px] mr-10"
                      onChange={(selectedType) =>
                        handleDiningTypeChange(selectedType, name)
                      }
                      placeholder="Chọn loại hình ăn uống"
                    >
                      <Option value="restaurant">Nhà hàng</Option>
                      <Option value="cafe">Quán cà phê</Option>
                      <Option value="fastFood">Thức ăn nhanh</Option>
                    </Select>
                  </Form.Item>
                  <div className="flex font-semibold text-gray-500">
                    <h3 className="text-lg mr-3">Khoảng giá: </h3>
                    <p className="text-lg"> 1.300.000 ~ 1.600.000 /người</p>
                  </div>
                </div>
              </div>
              <DeleteOutlined
                onClick={() => {
                  remove(name);
                  const newDetails = { ...diningDetails };
                  delete newDetails[name];
                  setDiningDetails(newDetails);
                }}
                className="self-end mt-2"
              />
            </Space>
          ))}
          <Form.Item className="w-1/3 ">
            <Button
              className="bg-teal-600 font-semibold text-white"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Thêm khu vực
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default RestaurantSection;
