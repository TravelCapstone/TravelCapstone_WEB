import React, { useState } from "react";
import {
  Button,
  Form,
  Select,
  DatePicker,
  Space,
  InputNumber,
  message,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SwapOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { RangePicker } = DatePicker;

const TransportationSection = ({ form }) => {
  const [selectedForSwap, setSelectedForSwap] = useState([]);
  const [routes, setRoutes] = useState([
    { id: 1, from: "", to: "", transport: "", dateRange: [], cost: 0 }, // Initial route
  ]);

  const handleSelectForSwap = (index) => {
    const newSelection = [...selectedForSwap, index];
    if (newSelection.length > 2) {
      newSelection.shift(); // Ensure only two items can be selected at once
    }
    setSelectedForSwap(newSelection);
  };

  const executeSwap = () => {
    if (selectedForSwap.length === 2) {
      const [firstIndex, secondIndex] = selectedForSwap;
      // Swap the values in the form
      const firstValues = form.getFieldValue(["transportation", firstIndex]);
      const secondValues = form.getFieldValue(["transportation", secondIndex]);
      form.setFieldsValue({
        transportation: {
          [firstIndex]: secondValues,
          [secondIndex]: firstValues,
        },
      });
      setSelectedForSwap([]); // Clear selections after swap
      message.success("Items swapped successfully!");
    }
  };

  // const removeRoute = (index) => {
  //   const newRoutes = [...routes];
  //   newRoutes.splice(index, 1);
  //   setRoutes(newRoutes);
  // };

  // const handleTransportChange = (value, field, id) => {
  //   const updatedRoutes = routes.map((route) => {
  //     if (route.id === id) {
  //       return { ...route, [field]: value };
  //     }
  //     return route;
  //   });
  //   setRoutes(updatedRoutes);
  // };

  return (
    <>
      <Form.List name="transportation" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }, index) => (
              <Space
                key={key}
                align="baseline"
                className="flex justify-between my-8 "
              >
                <div className="text-center font-bold mr-2">{index + 1}</div>
                <div className="flex flex-col flex-grow w-full">
                  <div className="flex flex-wrap ">
                    <Form.Item
                      name={[name, "from"]}
                      className="flex font-semibold"
                      label="Di chuyển từ:"
                      rules={[
                        {
                          required: true,
                          message: "Please select the departure!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select departure"
                        className="!w-[200px] mr-10"
                      >
                        <Option value="HCM">TP. Hồ Chí Minh</Option>
                        <Option value="PT">Phú Thọ</Option>
                        <Option value="HG">Hà Giang</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={[name, "to"]}
                      className="flex font-semibold"
                      label="Đến:"
                      rules={[
                        {
                          required: true,
                          message: "Please select the destination!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select destination"
                        className="!w-[200px] mr-10"
                      >
                        <Option value="HCM">TP. Hồ Chí Minh</Option>
                        <Option value="PT">Phú Thọ</Option>
                        <Option value="HG">Hà Giang</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={[name, "dateRange"]}
                      label="Ngày đi:"
                      className="flex font-semibold"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn ngày đi!",
                        },
                      ]}
                    >
                      <RangePicker showTime className="!w-[250px] mr-10" />
                    </Form.Item>
                  </div>
                  <div className="flex flex-wrap ">
                    <Form.Item
                      name={[name, "transport"]}
                      label="Phương tiện di chuyển:"
                      className="flex font-semibold"
                      rules={[
                        {
                          required: true,
                          message: "Please select transport type!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select transport"
                        className="!w-[250px] mr-10"
                      >
                        <Option value="bus">Bus</Option>
                        <Option value="limo">Limousine</Option>
                        <Option value="train">Train</Option>
                        <Option value="plane">Plane</Option>
                      </Select>
                    </Form.Item>
                    <div className="flex font-semibold text-gray-500">
                      <h3 className="text-lg mr-3">Khoảng giá: </h3>
                      <p className="text-lg"> 1.300.000 ~ 1.600.000 /người</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    className="mr-2"
                    icon={
                      selectedForSwap.includes(index) ? (
                        <SwapOutlined spin />
                      ) : (
                        <SwapOutlined />
                      )
                    }
                    onClick={() => handleSelectForSwap(index)}
                    type={
                      selectedForSwap.includes(index) ? "primary" : "default"
                    }
                  />
                  <DeleteOutlined onClick={() => remove(name)} />
                </div>
              </Space>
            ))}
            {selectedForSwap.length === 2 && (
              <Form.Item className="w-full text-right">
                <Button
                  type="primary"
                  onClick={executeSwap}
                  icon={<SwapOutlined />}
                >
                  Đổi vị trí
                </Button>
              </Form.Item>
            )}
            <Form.Item className="w-1/3 ">
              <Button
                className="bg-teal-600 font-semibold text-white"
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Thêm phương tiện di chuyển
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default TransportationSection;
