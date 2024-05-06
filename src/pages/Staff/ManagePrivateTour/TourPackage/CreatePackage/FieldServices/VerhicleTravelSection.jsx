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
                <div className="flex flex-wrap">
                  <div className="text-center font-bold mr-14">{index + 1}</div>
                  <div>
                    <div className="flex flex-wrap">
                      <Form.Item
                        label="Khu vực:"
                        name={[name, "provinceId"]}
                        className="flex font-semibold"
                        rules={[
                          { required: true, message: "Missing province" },
                        ]}
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
                        label="Số ngày:"
                        className=" font-semibold"
                        name={[name, "numOfRentingDay"]}
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
                        <p className="text-lg">
                          {" "}
                          1.300.000 ~ 1.600.000/xe/ngày
                        </p>
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
