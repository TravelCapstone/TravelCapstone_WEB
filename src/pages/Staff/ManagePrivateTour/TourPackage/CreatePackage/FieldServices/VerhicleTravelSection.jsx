import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Select, Space, DatePicker } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { servingVehiclesQuantity } from "../../../../../../settings/globalStatus";

const { Option } = Select;
const { RangePicker } = DatePicker;

const VerhicleTravelSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
  priceInfo,
  setPriceInfo,
  fetchVehiclePriceRange,
  handleFieldChange,
}) => {
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
                <div className="flex ">
                  <div className="text-center font-bold mr-14">{index + 1}</div>
                  <div>
                    <div className="flex flex-wrap">
                      <Form.Item
                        label="Tỉnh:"
                        name={[name, "provinceId"]}
                        className="flex font-semibold"
                        rules={[
                          { required: true, message: "Missing province" },
                        ]}
                      >
                        <Select
                          placeholder="Tỉnh"
                          onChange={(value) =>
                            onProvinceChange(index, value, "provinceId")
                          }
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
                        name={[name, "districtId"]}
                        className="flex font-semibold"
                        placeholder="Huyện/TP"
                        rules={[
                          { required: true, message: "Missing district" },
                        ]}
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.province !== currentValues.province
                        }
                      >
                        <Select
                          placeholder="Huyện/TP"
                          className="!w-[200px] mr-10"
                          // disabled={!districtEnabled}
                        >
                          {districts.map((district) => (
                            <Option key={district.id} value={district.id}>
                              {district.name}
                            </Option>
                          ))}
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
                        <RangePicker
                          onChange={() => fetchVehiclePriceRange(index)}
                          showTime
                          className="!w-[350px] mr-10"
                        />
                      </Form.Item>
                    </div>
                    <div className="flex flex-wrap">
                      <Form.Item
                        className=" font-semibold"
                        label="Phương tiện du lịch:"
                        name={[name, "vehicleType"]}
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
                          onChange={(value) =>
                            onProvinceChange(index, value, "vehicleType")
                          }
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
                      {priceInfo[index] && (
                        <div className="flex font-semibold text-gray-500 mr-10">
                          <h3 className="text-lg mr-3">Khoảng giá: </h3>
                          <p className="text-lg">
                            {priceInfo[index].minCostperPerson.toLocaleString(
                              "vi-VN",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )}{" "}
                            ~{" "}
                            {priceInfo[index].maxCostperPerson.toLocaleString(
                              "vi-VN",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )}{" "}
                            /người
                          </p>
                        </div>
                      )}
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
                          onChange={() => fetchVehiclePriceRange(index)}
                          placeholder="Số lượng xe"
                          className="!w-[200px] mr-10"
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <DeleteOutlined
                    className="self-start mt-2"
                    onClick={() => remove(name)}
                  />
                </div>
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
