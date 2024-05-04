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

  const handleDiningTypeChange = (selectedItems, name) => {
    const newDetails = { ...diningDetails, [name]: selectedItems };
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
                  <Form.Item
                    {...restField}
                    label="Khu vực:"
                    name={[name, "districtId"]}
                    className="flex font-semibold"
                    rules={[{ required: true, message: "Missing district" }]}
                  >
                    {/* <div className="flex flex-wrap justify-between ml-6"> */}
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
                <Form.Item
                  {...restField}
                  label="Loại hình ăn uống:"
                  className="font-semibold"
                  name={[name, "diningTypes"]}
                  rules={[
                    { required: true, message: "Please select dining types!" },
                  ]}
                >
                  <TreeSelect
                    className="w-full"
                    onChange={(selectedItems) =>
                      handleDiningTypeChange(selectedItems, name)
                    }
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    allowClear
                    // multiple
                    treeCheckable
                    placeholder="Chọn loại hình ăn uống"
                  >
                    <TreeNode value="restaurant" title="Nhà hàng" />
                    <TreeNode value="cafe" title="Quán cà phê" />
                    <TreeNode value="fastFood" title="Thức ăn nhanh" />
                    {/* Add more options as needed */}
                  </TreeSelect>
                  {diningDetails[name] &&
                    diningDetails[name].map((type, idx) => (
                      <div key={index} className="mt-4 flex">
                        <li className="list-disc" />
                        <div className="flex items-start">
                          <h3 className="font-semibold text-base">
                            {diningTypeNames[type]}{" "}
                            <span className="mx-10">
                              {" "}
                              800.000 ~ 1.000.000 /người {" "}
                            </span>
                          </h3>
                        </div>
                        {/* Thêm các trường khác tương ứng */}
                      </div>
                    ))}
                </Form.Item>
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
