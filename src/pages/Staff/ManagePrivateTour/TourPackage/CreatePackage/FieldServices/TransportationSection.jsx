import React, { useEffect, useState } from "react";
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
import {
  ratingLabels,
  servingVehiclesQuantity,
} from "../../../../../../settings/globalStatus";

const { Option } = Select;

const TransportationSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
}) => {
  const [selectedForSwap, setSelectedForSwap] = useState([]);
  const [routes, setRoutes] = useState([
    { id: 1, from: "", to: "", transport: "", dateRange: [], cost: 0 }, // Initial route
  ]);

  useEffect(() => {
    if (request?.privateTourResponse?.otherLocation) {
      setProvinces(
        request.privateTourResponse.otherLocation.map((loc) => ({
          id: loc.provinceId,
          name: loc.province.name,
        }))
      );
    }
  }, [request]);

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
                <div className="flex flex-wrap flex-grow w-full">
                  <div className="flex flex-wrap ">
                    <Form.Item
                      label="Di chuyển từ:"
                      name={[name, "startPoint"]}
                      className="flex font-semibold"
                      rules={[{ required: true, message: "Missing province" }]}
                    >
                      <Select
                        placeholder="Tỉnh"
                        onChange={onProvinceChange}
                        className="!w-[200px] mr-10"
                      >
                        {provinces.map((province) => (
                          <Option key={province.id} value={province.id}>
                            {province.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={[name, "startPointDistrict"]}
                      className="flex font-semibold"
                      placeholder="Huyện/TP"
                      rules={[{ required: true, message: "Missing district" }]}
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.province !== currentValues.province
                      }
                    >
                      <Select
                        placeholder="Huyện/TP"
                        className="!w-[200px] mr-10"
                      >
                        {districts.map((district) => (
                          <Option key={district.id} value={district.id}>
                            {district.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="flex flex-wrap ">
                    <Form.Item
                      label="Đến:"
                      name={[name, "endPoint"]}
                      className="flex font-semibold"
                      rules={[{ required: true, message: "Missing province" }]}
                    >
                      <Select
                        placeholder="Tỉnh"
                        onChange={onProvinceChange}
                        className="!w-[200px] mr-10"
                      >
                        {provinces.map((province) => (
                          <Option key={province.id} value={province.id}>
                            {province.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={[name, "endPointDistrict"]}
                      className="flex font-semibold"
                      placeholder="Huyện/TP"
                      rules={[{ required: true, message: "Missing district" }]}
                      shouldUpdate={(prevValues, currentValues) =>
                        prevValues.province !== currentValues.province
                      }
                    >
                      <Select
                        placeholder="Huyện/TP"
                        className="!w-[200px] mr-10"
                      >
                        {districts.map((district) => (
                          <Option key={district.id} value={district.id}>
                            {district.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

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
                    <DatePicker showTime className="!w-[250px] mr-10" />
                  </Form.Item>
                  <div className="flex flex-wrap ">
                    <Form.Item
                      name={[name, "vehicleType"]}
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
                        {Object.entries(servingVehiclesQuantity).map(
                          ([key, label]) => (
                            <Option key={key} value={parseInt(key, 10)}>
                              {label}
                            </Option>
                          )
                        )}
                      </Select>
                    </Form.Item>
                    <div className="flex font-semibold text-gray-500 mr-10">
                      <h3 className="text-lg mr-3">Khoảng giá: </h3>
                      <p className="text-lg"> 1.300.000 ~ 1.600.000 /người</p>
                    </div>
                    <Form.Item
                      label="Số lượng xe:"
                      className=" font-semibold"
                      name={[name, "numOfVehicle"]}
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
                        placeholder="Số lượng xe"
                        className="!w-[200px] mr-10"
                      />
                    </Form.Item>
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
