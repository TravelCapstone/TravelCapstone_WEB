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
import moment from "moment-timezone";
import "../../../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";
import { getAvailableVehicleType } from "../../../../../../api/VehicleApi";
import dayjs from "../../../../../../settings/setupDayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

const VerhicleTravelSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
  startDateTourChange,
  endDateChange,
  startDateFinal,
  endDateFinal,
  handleDateRangeChange,
}) => {
  // Get giá Verhicle
  const [priceInfo, setPriceInfo] = useState({});
  const [availableVehicleTypes, setAvailableVehicleTypes] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [availableProvinces, setAvailableProvinces] = useState([]);
  const [loadingVehicle, setLoadingVehicle] = useState(false);
  const { updateCommonPrice, commonPrices } = usePrice();
  const [provinceVerhicle, setProvinceVerhicle] = useState([]);

  const fieldsTransportation = form.getFieldValue("transportation") || [];

  // Extract startPoint of the first item and endPoint of the last item
  const firstStartPoint =
    fieldsTransportation.length > 0 ? fieldsTransportation[0].startPoint : null;
  const lastEndPoint =
    fieldsTransportation.length > 0
      ? fieldsTransportation[fieldsTransportation.length - 1].endPoint
      : null;

  let remainingProvinces = [];
  if (fieldsTransportation.length > 2) {
    remainingProvinces = Array.from(
      new Set(
        fieldsTransportation
          .slice(1, -1) // Ignore the first and last items
          .flatMap((item) => [item.startPoint, item.endPoint]) // Extract startPoint and endPoint
          .filter((point, index, self) => self.indexOf(point) === index) // Remove duplicates
      )
    );
  } else if (fieldsTransportation.length === 2) {
    remainingProvinces = Array.from(
      new Set([
        fieldsTransportation[0].endPoint,
        fieldsTransportation[1].startPoint,
      ])
    );
  }

  // Log for debugging

  useEffect(() => {
    setProvinceVerhicle(remainingProvinces);
  }, [fieldsTransportation]);

  // Map provinceVerhicle to the ids and names from provinces
  const provinceIdNamePairs = provinceVerhicle
    .map((id) => {
      const province = provinces.find((province) => province.id === id);
      return province ? { id: province.id, name: province.name } : null;
    })
    .filter((item) => item !== null); // Filter out any null values

  // Log for debugging

  // Prepare initial values for Form.List
  const initialValues = provinceIdNamePairs.map((pair) => ({
    provinceId: pair.id,
  }));

  useEffect(() => {
    if (
      priceInfo &&
      typeof priceInfo === "object" &&
      !Array.isArray(priceInfo) &&
      availableVehicleTypes.length !== 0
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

  useEffect(() => {
    const fetchAvailableVehicleTypes = async () => {
      const travelOptions = form.getFieldValue("travelOptions");
      if (travelOptions && travelOptions.length > 0) {
        const results = await Promise.all(
          travelOptions.map(async (item) => {
            const { provinceId } = item;
            setLoadingVehicle(true);
            try {
              const response = await getAvailableVehicleType(
                provinceId,
                provinceId
              );
              // debugger;
              return response.result;
            } catch (error) {
              log.error("Failed to fetch districts");
            } finally {
              setLoadingVehicle(true);
            }
          })
        );
        if (selectedProvinces) {
          setLoadingVehicle();
        } else {
          setAvailableVehicleTypes([]);
        }
        setAvailableVehicleTypes(results);
      }
    };

    fetchAvailableVehicleTypes();
  }, [form, selectedProvinces]);

  const updateNextTravelOption = (index) => {
    const fields = form.getFieldValue("travelOptions") || [];
    if (index < fields.length - 1) {
      const currentOption = fields[index];
      const nextOption = fields[index + 1];

      // Kiểm tra và khởi tạo dateRange cho nextOption nếu chưa có
      if (!currentOption.dateRange) {
        currentOption.dateRange = [null, null];
      }

      if (!nextOption.dateRange) {
        nextOption.dateRange = [null, null];
      }

      const updatedNextOption = {
        ...nextOption,
        dateRange: [currentOption.dateRange[1], nextOption.dateRange[1]],
      };

      form.setFieldsValue({
        travelOptions: [
          ...fields.slice(0, index + 1),
          updatedNextOption,
          ...fields.slice(index + 2),
        ],
      });
    }
  };

  const handleRemove = (index) => {
    const currentValues = form.getFieldValue("travelOptions");
    const newValues = currentValues.filter((_, idx) => idx !== index);
    form.setFieldsValue({ tourGuideCosts: newValues });
    setSelectedProvinces(newValues.map((item) => item.provinceId));
  };

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
    const travelOptions = form.getFieldValue("travelOptions");
    if (Array.isArray(travelOptions)) {
      form.setFieldsValue({
        travelOptions: travelOptions.map((option) => ({
          ...option,
          numOfVehicle: calculateNumOfVehicle(option.vehicleType),
        })),
      });
    }
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
    const currentValues = form.getFieldValue("travelOptions");
    const newValues = currentValues.map((item, idx) =>
      idx === index ? { ...item, provinceId: value } : item
    );
    const newSelectedProvinces = form.getFieldValue("provinces") || [];
    newSelectedProvinces[name] = value;
    setSelectedProvinces(newValues.map((item) => item.provinceId));
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
    if (!startDateTourChange && !endDateChange) {
      return false;
    }
    const startDateTourChange2 = moment(
      startDateTourChange,
      "DD-MM-YYYY HH:mm:ss"
    );
    const endDateChange2 = moment(endDateChange, "DD-MM-YYYY HH:mm:ss");
    const startDate = startDateTourChange2;
    const endDate = endDateChange2;

    return current && (current < startDate || current > endDate);
  };

  // Chuyển đổi startDateFinal và endDateFinal để getDefaultPickerValue hợp lệ
  const getDefaultPickerValue = () => {
    const startDateFinal1 = moment(
      startDateFinal,
      "YYYY-MM-DDTHH:mm:ss"
    ).toDate();
    const endDateFinal1 = moment(endDateFinal, "YYYY-MM-DDTHH:mm:ss").toDate();

    // Convert to Day.js
    const startDateDayjs = dayjs(startDateFinal1);
    const endDateDayjs = dayjs(endDateFinal1);

    if (!startDateDayjs || !endDateDayjs) {
      return moment(); // If no tourDate, use current date for both start and end
    }
    return startDateDayjs; // Use start and end date of tourDate
  };

  useEffect(() => {
    setAvailableProvinces(provinces);
  }, [provinces]);

  useEffect(() => {
    setAvailableProvinces(
      provinces.filter((province) => !selectedProvinces.includes(province.id))
    );
  }, [selectedProvinces]);

  return (
    <>
      {provinceIdNamePairs.length > 0 && (
        <Form.List name="travelOptions" initialValue={initialValues}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  align="baseline"
                  className="mb-4 flex justify-between"
                >
                  <div className="flex ">
                    <div className="text-center font-bold mr-14">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex flex-wrap">
                        <Form.Item
                          {...restField}
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
                            defaultValue={initialValues[index]?.provinceId}
                          >
                            {provinceIdNamePairs.map((province) => (
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
                            {...restField}
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
                                updateNextTravelOption(index);
                                handleDateRangeChange();
                              }}
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
                            className="font-semibold"
                            {...restField}
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
                              loading={
                                loadingVehicle ||
                                availableVehicleTypes.length === 0
                              }
                              disabled={
                                loadingVehicle ||
                                !selectedProvinces ||
                                availableVehicleTypes.length === 0
                              }
                              onChange={(value) =>
                                onVehicleTypeChange(index, value, name)
                              }
                            >
                              {availableVehicleTypes[index]?.map((key) => {
                                const label = servingVehiclesQuantity[key];
                                return (
                                  <Option key={key} value={parseInt(key, 10)}>
                                    {label}
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
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
              {fields.length < initialValues.length && (
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
              )}
            </>
          )}
        </Form.List>
      )}
    </>
  );
};
export default VerhicleTravelSection;
