import React, { useEffect, useState } from "react";
import { Button, Form, Select, DatePicker, Space, message } from "antd";
import { DeleteOutlined, PlusOutlined, SwapOutlined } from "@ant-design/icons";
import {
  ratingLabels,
  servingVehiclesQuantity,
} from "../../../../../../settings/globalStatus";
import { getOptimalPath } from "../../../../../../api/VehicleApi";
import {
  metersToKilometers,
  secondsToHours,
} from "../../../../../../utils/Util";

const { RangePicker } = DatePicker;
const { Option } = Select;

const TransportationSection = ({
  form,
  priceInfo,
  setPriceInfo,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
  fetchVehiclePriceRange,
  handleFieldChange,
  startProvince,
}) => {
  const [selectedForSwap, setSelectedForSwap] = useState([]);
  const [routes, setRoutes] = useState([
    { id: 1, from: "", to: "", transport: "", dateRange: [], cost: 0 },
  ]);
  const [optimalPath, setOptimalPath] = useState({});
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
  const getSuggestPath = async () => {
    const result = provinces.map((item) => item.id);

    const data = await getOptimalPath(result[0], result);
    if (data.isSuccess) {
      setOptimalPath(data.result);
    }
  };
  useEffect(() => {
    getSuggestPath();
  }, [provinces]);

  const handleSelectForSwap = (index) => {
    const newSelection = [...selectedForSwap, index];
    if (newSelection.length > 2) {
      newSelection.shift();
    }
    setSelectedForSwap(newSelection);
  };

  const executeSwap = () => {
    if (selectedForSwap.length === 2) {
      const [firstIndex, secondIndex] = selectedForSwap;
      const firstValues = form.getFieldValue(["transportation", firstIndex]);
      const secondValues = form.getFieldValue(["transportation", secondIndex]);
      form.setFieldsValue({
        transportation: {
          [firstIndex]: secondValues,
          [secondIndex]: firstValues,
        },
      });
      setSelectedForSwap([]);
      message.success("Items swapped successfully!");
    }
  };

  const addRoute = (add) => {
    const fields = form.getFieldValue("transportation") || [];
    const lastRoute = fields[fields.length - 1];
    const newRoute = {
      startPoint: lastRoute ? lastRoute.endPoint : "",
      startPointDistrict: lastRoute ? lastRoute.endPointDistrict : "",
      dateRange: lastRoute ? [lastRoute.dateRange[1], null] : [],
    };
    add(newRoute);
  };

  const updateNextRoute = (index) => {
    const fields = form.getFieldValue("transportation") || [];
    if (index < fields.length - 1) {
      const currentRoute = fields[index];
      const nextRoute = fields[index + 1];
      const updatedNextRoute = {
        ...nextRoute,
        startPoint: currentRoute.endPoint,
        startPointDistrict: currentRoute.endPointDistrict,
        dateRange: [currentRoute.dateRange[1], nextRoute.dateRange[1]],
      };
      form.setFieldsValue({
        transportation: {
          ...fields,
          [index + 1]: updatedNextRoute,
        },
      });
    }
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          Hành trình tối ưu
        </h2>
        <div className="mb-6">
          <p className="text-gray-800 text-lg font-bold">
            Tổng quãng đường:{" "}
            <span className="font-medium text-blue-600">
              {metersToKilometers(optimalPath?.totalDistance)}
            </span>
          </p>
          <p className="text-gray-800 text-lg font-bold">
            Tổng thời gian:{" "}
            <span className="font-medium text-blue-600">
              {secondsToHours(optimalPath?.totalDuration)}
            </span>
          </p>
        </div>
        <ul className="list-none pl-0">
          {optimalPath?.optimalTrip?.length > 0 &&
            optimalPath?.optimalTrip?.map((stop, index) => (
              <li key={index} className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center mb-3">
                  <span className="text-blue-800 text-xl font-bold mr-3">
                    {index + 1}.
                  </span>
                  <span className="text-2xl text-gray-900 font-semibold">
                    {stop.provinceName}
                  </span>
                </div>
                <div className="ml-10">
                  <div className="flex items-center text-gray-700 mb-2">
                    <i className="fa-solid fa-stopwatch text-green-500 mr-3"></i>
                    <span className="text-lg">
                      Thời gian di chuyển:{" "}
                      <span className="font-medium">
                        {secondsToHours(stop?.duration)}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="fa-solid fa-map-location-dot text-red-500 mr-3"></i>
                    <span className="text-lg">
                      Quãng đường:{" "}
                      <span className="font-medium">
                        {metersToKilometers(stop?.distanceToNextDestination)}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="fa-solid fa-bus-simple mx-2"></i>{" "}
                    <span className="text-lg">
                      Phương tiện:{" "}
                      <span className="font-medium">
                        {servingVehiclesQuantity[stop.vehicleToNextDestination]}
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

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
                        onChange={(value) =>
                          onProvinceChange(index, value, "startPoint")
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
                        onChange={(value) =>
                          onProvinceChange(index, value, "endPoint")
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
                    <RangePicker
                      onChange={() => {
                        fetchVehiclePriceRange(index);
                        updateNextRoute(index);
                      }}
                      showTime
                      className="!w-[350px] mr-10"
                      format={"DD/MM/YYYY"}
                    />
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
                onClick={() => addRoute(add)}
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
