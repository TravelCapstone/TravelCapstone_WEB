import React, { useEffect, useState } from "react";
import {
  Form,
  InputNumber,
  Button,
  Select,
  Space,
  DatePicker,
  Input,
  ConfigProvider,
} from "antd";
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
import { usePrice } from "../../../../../../context/PriceContext";
import moment from "moment";
import "../../../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";

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

  const { updateCommonPrice, commonPrices } = usePrice();

  useEffect(() => {
    if (
      priceInfo &&
      typeof priceInfo === "object" &&
      !Array.isArray(priceInfo)
    ) {
      const travelOptionsFields = form.getFieldValue("travelOptions");
      travelOptionsFields.forEach((_, index) => {
        if (priceInfo[index]) {
          const quantity =
            request?.privateTourResponse?.numOfAdult +
            request?.privateTourResponse?.numOfChildren;
          // debugger;
          const totalPrice = priceInfo[index].maxCostperPerson * quantity;
          const commonService = {
            item: `Phương tiện du lịch tỉnh ${index + 1} `,
            price: priceInfo[index].maxCostperPerson,
            quantity: 1,
            total: totalPrice,
          };
          // Kiểm tra nếu dịch vụ đã tồn tại trong danh sách
          const existingServiceIndex = commonPrices.findIndex(
            (service) => service.item === commonService.item
          );
          if (existingServiceIndex !== -1) {
            // Cập nhật giá trị dịch vụ
            commonPrices[existingServiceIndex] = commonService;
          } else {
            // Thêm dịch vụ mới vào danh sách
            updateCommonPrice(commonService);
          }
        }
      });
    }
  }, [priceInfo, form, request, commonPrices, updateCommonPrice]);

  const calculateNumOfVehicle = (vehicleType) => {
    const totalPassengers =
      request?.privateTourResponse?.numOfAdult +
      request?.privateTourResponse?.numOfChildren;
    let seats;

    switch (vehicleType) {
      case 0:
        seats = 44;
        break;
      case 1:
        seats = 29;
        break;
      case 2:
        seats = 14;
        break;
      case 3:
        seats = 6;
        break;
      case 4:
      case 5:
      case 6:
      case 7:
      default:
        return 0;
    }

    return Math.ceil(totalPassengers / seats);
  };

  const onVehicleTypeChange = (index, value, name) => {
    const newTravelOptions = [...form.getFieldValue("travelOptions")];
    newTravelOptions[index] = {
      ...newTravelOptions[index],
      vehicleType: value,
      numOfVehicle: calculateNumOfVehicle(value),
    };
    // Update selected provinces
    form.setFieldsValue({ travelOptions: newTravelOptions });
    handleProvinceChange(index, value, name);
    fetchVehiclePriceRange(index);
  };

  useEffect(() => {
    form.setFieldsValue({
      travelOptions: form.getFieldValue("travelOptions").map((option) => ({
        ...option,
        numOfVehicle: calculateNumOfVehicle(option.vehicleType),
      })),
    });
  }, [form]);

  // get giá verhicle
  const fetchVehiclePriceRange = async (index) => {
    // debugger;

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
      // debugger;
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

  const disabledDate = (current) => {
    // Lấy giá trị tourDate từ form
    const tourDate = form.getFieldValue("tourDate");
    if (!tourDate || tourDate.length < 2) {
      return false;
    }
    const startDate = tourDate[0];
    const endDate = tourDate[1];
    return current && (current < startDate || current > endDate);
  };

  // Lấy giá trị defaultPickerValue từ tourDate
  const getDefaultPickerValue = () => {
    const tourDate = form.getFieldValue("tourDate");
    if (!tourDate || tourDate.length < 2) {
      return moment(); // Nếu không có tourDate, sử dụng ngày hiện tại
    }
    return tourDate[0]; // Sử dụng ngày bắt đầu của tourDate
  };

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

                      <ConfigProvider locale={viVN}>
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
                            format="DD-MM-YYYY HH:mm:ss"
                            disabledDate={disabledDate}
                            defaultPickerValue={[getDefaultPickerValue()]}
                          />
                        </Form.Item>
                      </ConfigProvider>
                    </div>
                    <div className="">
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
                              onVehicleTypeChange(index, value, name)
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
                        <Form.Item
                          className="font-semibold "
                          label="Số lượng phương tiện:"
                          name={[name, "numOfVehicle"]}
                        >
                          <Input readOnly disabled className="w-[100px]" />
                        </Form.Item>
                      </div>
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
