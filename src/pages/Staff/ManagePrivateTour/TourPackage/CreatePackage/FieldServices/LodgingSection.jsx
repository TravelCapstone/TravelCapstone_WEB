import React, { useState } from "react";
import {
  Button,
  Dropdown,
  Space,
  Form,
  Menu,
  message,
  Select,
  DatePicker,
  TreeSelect,
  InputNumber,
} from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TreeNode } = TreeSelect;
const { RangePicker } = DatePicker;

const LodgingSection = ({ form, add, remove }) => {
  const [lodgingDetails, setLodgingDetails] = useState({});

  const handleLodgingTypeChange = (selectedItems, name) => {
    const newDetails = { ...lodgingDetails, [name]: selectedItems };
    setLodgingDetails(newDetails);
  };

  const lodgingTypeNames = {
    hotel1: "Khách sạn 1 sao",
    hotel2: "Khách sạn 2 sao",
    hotel3: "Khách sạn 3 sao",
    hotel4: "Khách sạn 4 sao",
    resort: "Resort",
  };
  return (
    <>
      <Form.List name="locations" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
              <Space
                key={key}
                className="flex my-8  justify-between"
                align="baseline"
              >
                <div className="text-center font-bold mr-2">{index + 1}</div>
                <div className="flex flex-col flex-grow w-full">
                  <div className="flex flex-wrap ">
                    <Form.Item
                      {...restField}
                      label="Khu vực:"
                      name={[name, "districtId"]}
                      className="flex font-semibold"
                      rules={[{ required: true, message: "Missing district" }]}
                    >
                      <div className="flex justify-between ml-6">
                        <Select placeholder="Tỉnh" className="!w-[200px] mr-10">
                          <Option value="province">Hà Nội</Option>
                          {/* Add more options as needed */}
                        </Select>
                        <Select
                          placeholder="Huyện/TP"
                          className="!w-[200px] mr-10"
                        >
                          <Option value="commune">Thủ đô Hà Nội</Option>
                          {/* Add more options as needed */}
                        </Select>
                      </div>
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      label="Ngày lưu trú:"
                      className=" font-semibold"
                      name={[name, "stayDates"]}
                      rules={[
                        {
                          required: true,
                          message: "Please choose the stay dates!",
                        },
                      ]}
                    >
                      <RangePicker className="!min-w-[300px] mr-10" />
                    </Form.Item>
                  </div>
                  <Form.Item
                    {...restField}
                    label="Loại hình lưu trú:"
                    className="font-semibold"
                    name={[name, "lodgingTypes"]}
                    rules={[
                      {
                        required: true,
                        message: "Please select lodging types!",
                      },
                    ]}
                  >
                    <TreeSelect
                      className="w-full"
                      onChange={(selectedItems) =>
                        handleLodgingTypeChange(selectedItems, name)
                      }
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                      }}
                      allowClear
                      multiple
                      treeCheckable
                      placeholder="Chọn loại hình lưu trú"
                    >
                      <TreeNode
                        value="hotel"
                        title="Khách sạn"
                        selectable={false}
                      >
                        <TreeNode value="hotel1" title="Khách sạn 1 sao" />
                        <TreeNode value="hotel2" title="Khách sạn 2 sao" />
                        <TreeNode value="hotel3" title="Khách sạn 3 sao" />
                        <TreeNode value="hotel4" title="Khách sạn 4 sao" />
                      </TreeNode>
                      <TreeNode value="resort" title="Resort" />
                      {/* Add more options as needed */}
                    </TreeSelect>
                  </Form.Item>

                  {lodgingDetails[name] &&
                    lodgingDetails[name].map((type, idx) => (
                      <div key={index} className="mx-10 flex">
                        <li className="list-disc" />
                        <div>
                          <div className="flex items-start">
                            <h3 className="font-semibold text-base">
                              {lodgingTypeNames[type]}{" "}
                              <span className="mx-10">
                                {" "}
                                800.000 ~ 1.000.000 /người {" "}
                              </span>
                            </h3>
                            <div className="flex">
                              <h3> Số lượng ngày/đêm: </h3>
                              <Form.Item
                                name={[type, "numOfDay"]}
                                className="ml-4"
                              >
                                <InputNumber min={1} max={30} />
                              </Form.Item>
                            </div>
                          </div>
                          <div className="flex ">
                            <div className="flex">
                              <h3> Loại phòng: </h3>
                              <Form.Item name={[type, "roomType"]}>
                                <Select
                                  placeholder="Chọn loại phòng"
                                  className="ml-4 !w-[200px] mr-10"
                                >
                                  <Option value="province">
                                    Phòng 4 người
                                  </Option>
                                  <Option value="province">
                                    Phòng 2 người
                                  </Option>
                                  {/* Add more options as needed */}
                                </Select>
                              </Form.Item>
                            </div>
                            <div className="flex">
                              <h3> Số lượng phòng: </h3>
                              <Form.Item
                                name={[type, "numOfDay"]}
                                className="ml-4"
                              >
                                <InputNumber min={1} max={30} />
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                        {/* Thêm các trường khác tương ứng */}
                      </div>
                    ))}
                </div>
                <DeleteOutlined
                  onClick={() => {
                    remove(name);
                    const newDetails = { ...lodgingDetails };
                    delete newDetails[name];
                    setLodgingDetails(newDetails);
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
    </>
  );
};

export default LodgingSection;
