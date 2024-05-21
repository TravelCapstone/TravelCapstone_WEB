import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Select, Space, DatePicker } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { servingVehiclesQuantity } from "../../../../../../settings/globalStatus";
import {
  getVehiclePriceRange,
  getVehiclePriceRangeNoEndPoint,
} from "../../../../../../api/SellPriceHistoryApi";

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
  // Get giá Verhicle
  const [priceInfo, setPriceInfo] = useState({});

  // get giá verhicle
  const fetchVehiclePriceRange = async (index) => {
    debugger;

    const quantity =
      request?.privateTourResponse?.numOfAdult +
      request?.privateTourResponse?.numOfChildren;
    const values = form.getFieldValue("travelOptions")[index];
    if (
      !values.provinceId ||
      // !values.districtId ||
      !values.vehicleType ||
      !values.dateRange ||
      !quantity
    ) {
      debugger;
      return;
    }
    const startDate = values.dateRange[0].toISOString();
    const endDate = values.dateRange[1].toISOString();

    try {
      const response = await getVehiclePriceRangeNoEndPoint(
        values.provinceId,
        values.vehicleType,
        quantity,
        startDate,
        endDate
      );
      console.log("responseVerhicle", response);
      if (response && response.result) {
        setPriceInfo((prev) => ({
          ...prev,
          [index]: {
            minCostperPerson: response.result.minCostperPerson,
            maxCostperPerson: response.result.maxCostperPerson,
          },
        }));
      } else {
        message.error("Failed to fetch vehicle price range");
      }
    } catch (error) {
      console.error("Failed to fetch vehicle price range:", error);
      message.error("Failed to fetch vehicle price range");
    }
  };

  // Get giá verhicle change
  const handleProvinceChange = (index, value, name) => {
    // Update selected provinces
    const newSelectedProvinces = form.getFieldValue("provinces") || [];
    newSelectedProvinces[name] = value;
    fetchVehiclePriceRange(index);
  };

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
                            handleProvinceChange(index, value, "provinceId")
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
                      {/* <Form.Item
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
                      </Form.Item> */}

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
                            handleProvinceChange(index, value, "vehicleType")
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
                      {/* <Form.Item
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
                      </Form.Item> */}
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
