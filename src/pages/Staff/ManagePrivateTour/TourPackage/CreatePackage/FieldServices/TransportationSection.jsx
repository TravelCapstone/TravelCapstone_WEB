import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  Select,
  DatePicker,
  Space,
  message,
  Input,
  ConfigProvider,
} from "antd";
import { DeleteOutlined, PlusOutlined, SwapOutlined } from "@ant-design/icons";
import {
  ratingLabels,
  servingVehiclesQuantity,
} from "../../../../../../settings/globalStatus";
import {
  getAvailableVehicleType,
  getOptimalPath,
} from "../../../../../../api/VehicleApi";
import {
  metersToKilometers,
  secondsToHours,
} from "../../../../../../utils/Util";
import { usePrice } from "../../../../../../context/PriceContext";
import moment from "moment-timezone";
import "../../../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";
import { getAllDistrictsByProvinceId } from "../../../../../../api/LocationApi";
import dayjs from "../../../../../../settings/setupDayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

const TransportationSection = ({
  startDateFinal,
  endDateFinal,

  startDateTourChange,
  endDateChange,
  form,
  priceInfo,
  setPriceInfo,
  request,

  fetchVehiclePriceRange,
  handleFieldChange,
  startProvince,
  // selectedProvince,
}) => {
  const [provinces, setProvinces] = useState([]);

  const [districts, setDistricts] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState({});
  const [transportationCount, setTransportationCount] = useState(0);
  const [availableVehicleTypes, setAvailableVehicleTypes] = useState([]);
  console.log("selectedProvinces", selectedProvinces);

  const [selectedForSwap, setSelectedForSwap] = useState([]);
  const [routes, setRoutes] = useState([
    { id: 1, from: "", to: "", transport: "", dateRange: [], cost: 0 },
  ]);
  const [optimalPath, setOptimalPath] = useState([]);
  const [loadingVehicle, setLoadingVehicle] = useState(false);

  const startProvinceId =
    request?.privateTourResponse?.startLocationCommune?.district?.provinceId;
  const startProvinceName = request?.privateTourResponse?.startLocation;

  const startDistrictId =
    request?.privateTourResponse?.startLocationCommune.districtId;
  const startDistrictName =
    request?.privateTourResponse?.startLocationCommune.district.name;

  console.log("optimalPath", optimalPath);

  const { updateCommonPrice, commonPrices } = usePrice();

  const handleProvinceChange = useCallback(
    async (value, index, field) => {
      // debugger;
      setSelectedProvinces((prev) => ({
        ...prev,
        [`${index}_${field}`]: value,
      }));
      if (value) {
        const districtsData = await getAllDistrictsByProvinceId(value);
        setDistricts((prev) => ({
          ...prev,
          [`${index}_${field}`]: districtsData,
        }));
        fetchVehiclePriceRange(index, value); // Assuming this function needs index and province ID
      } else {
        setDistricts((prev) => ({
          ...prev,
          [`${index}_${field}`]: [],
        }));
      }
      // If updating the first item, propagate changes to the last item
      if (index === 0 && field === "startPoint") {
        const fields = form.getFieldValue("transportation");
        if (fields.length > 1) {
          form.setFieldsValue({
            transportation: {
              ...fields,
              [fields.length - 1]: {
                ...fields[fields.length - 1],
                endPoint: value,
              },
            },
          });
        }
      }
    },
    [fetchVehiclePriceRange, form]


  );

  const handleDistrictChange = useCallback(
    (value, index, field) => {
      const newTransportationValues = [...form.getFieldValue("transportation")];
      newTransportationValues[index] = {
        ...newTransportationValues[index],
        [field]: value,
      };
      if (
        field === "endPointDistrict" &&
        index < newTransportationValues.length - 1
      ) {
        newTransportationValues[index + 1].startPointDistrict = value;
      }

      form.setFieldsValue({ transportation: newTransportationValues });

      // If updating the first item, propagate changes to the last item
      if (index === 0 && field === "startPointDistrict") {
        if (newTransportationValues.length > 1) {
          newTransportationValues[
            newTransportationValues.length - 1
          ].endPointDistrict = value;
        }
      }
    },
    [form]
  );

  const getRouteInfo = (from, to) => {
    const fromProvince = optimalPath[from];
    const toProvince = optimalPath[to];

    const distanceToNextDestination = fromProvince.distanceToNextDestination;
    // +
    // (toProvince ? toProvince.distanceToNextDestination : 0);

    const duration =
      // fromProvince.duration + (toProvince ? toProvince.duration : 0);
      fromProvince.duration;

    return {
      fromProvince: fromProvince.provinceName,
      toProvince: toProvince
        ? toProvince.provinceName
        : optimalPath[0].provinceName,
      distance: distanceToNextDestination,
      duration,
    };
  };

  const initialTransportationValues = useMemo(() => {
    return optimalPath
      .map((path, index) => {
        if (index < optimalPath.length - 1) {
          const nextPath = optimalPath[index + 1];

          const startDate = moment(startDateTourChange, "DD-MM-YYYY HH:mm:ss")
            .subtract(1, "days")
            .add(index, "days");
          const endDate = moment(startDate).clone().endOf("day"); // Clone the start date before modifying

          return {
            startPoint: path.provinceId,
            endPoint: nextPath.provinceId,
            startPointDistrict: index === 0 ? startDistrictId : null,
            endPointDistrict:
              index === optimalPath.length - 2 ? startDistrictId : null,

            dateRange: [startDate, endDate],
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [optimalPath, startDateTourChange]);

  useEffect(() => {
    const hasInitialized = localStorage.getItem("hasInitializedTransportation");

    // Initialize only if it hasn't been done before
    // if (!hasInitialized) {
    form.setFieldsValue({ transportation: initialTransportationValues });
    setTransportationCount(initialTransportationValues.length);

    // Use an async function to handle province changes sequentially
    const initializeProvinces = async () => {
      for (let index = 0; index < initialTransportationValues.length; index++) {
        const data = initialTransportationValues[index];
        await handleProvinceChange(data.startPoint, index, "startPoint");
        await handleProvinceChange(data.endPoint, index, "endPoint");
      }
    };

    localStorage.setItem("hasInitializedTransportation", true);
    // }
  }, [form, initialTransportationValues]);

  // Define state variable for available vehicle types

  // Fetch available vehicle types when startPoint and endPoint change
  useEffect(() => {
    const fetchAvailableVehicleTypes = async () => {
      const transportation = form.getFieldValue("transportation");
      if (transportation && transportation.length > 0) {
        const results = await Promise.all(
          transportation.map(async (item) => {
            const { startPoint, endPoint } = item;
            setLoadingVehicle(true);
            try {
              const response = await getAvailableVehicleType(
                startPoint,
                endPoint
              );
              return response.result;
            } catch (error) {
              log.error("Failed to fetch districts");
            } finally {
              setLoadingVehicle(true);
            }

            // debugger;
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

  console.log("initialTransportationValues", initialTransportationValues);

  useEffect(() => {
    const transportationFields = form.getFieldValue("transportation");
    if (
      priceInfo &&
      typeof priceInfo === "object" &&
      !Array.isArray(priceInfo) &&
      transportationFields
    ) {
      // debugger;
      transportationFields.forEach((_, index) => {
        if (priceInfo[index]) {
          const quantity =
            request?.privateTourResponse?.numOfAdult +
            request?.privateTourResponse?.numOfChildren;
          // debugger;
          const totalPrice = priceInfo[index].maxCostperPerson * quantity;
          const commonService = {
            item: `Phương tiện di chuyển từ tỉnh ${index} đến tỉnh ${index + 1}`,
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
    const newTransportation = [...form.getFieldValue("transportation")];
    newTransportation[index] = {
      ...newTransportation[index],
      vehicleType: value,
      numOfVehicle: calculateNumOfVehicle(value),
    };
    form.setFieldsValue({ transportation: newTransportation });
    handleProvinceChange(index, value, name);
    fetchVehiclePriceRange(index);
  };

  useEffect(() => {
    form.setFieldsValue({
      transportation: form.getFieldValue("transportation")?.map((option) => ({
        ...option,
        numOfVehicle: calculateNumOfVehicle(option.vehicleType),
      })),
    });
  }, [form]);

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

  const updatedProvinces = useMemo(() => {
    // Thêm startProvince vào đầu mảng provinces và loại bỏ trùng lặp
    let provincesWithStart = [
      { id: startProvinceId, name: startProvinceName },
      ...provinces,
    ];
    return provincesWithStart.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );
  }, [startProvinceId, startProvinceName, provinces]);

  console.log("updatedProvinces", updatedProvinces);
  console.log("provinces", provinces);

  const getSuggestPath = useCallback(async () => {
    const result = updatedProvinces.map((item) => item.id);
    console.log("resultgetSuggestPath", result);
    const data = await getOptimalPath(result[0], result);
    // debugger;
    if (data.isSuccess) {
      setOptimalPath(Array.isArray(data.result) ? data.result : []);
    }
  }, [updatedProvinces]); // Khai báo dependencies cho useCallback

  useEffect(() => {
    if (updatedProvinces.length > 0) {
      getSuggestPath();
    }
  }, [updatedProvinces, getSuggestPath]);

  const handleSelectForSwap = (index) => {
    const newSelection = [...selectedForSwap, index];
    if (newSelection.length > 2) {
      newSelection.shift();
    }
    setSelectedForSwap(newSelection);
  };

  const disabledDate = (current) => {
    if (!startDateTourChange && !endDateChange) {
      return false;
    }
    const startDateTourChange2 = moment(
      startDateTourChange,
      "DD-MM-YYYY HH:mm:ss"
    ).subtract(2, "days");
    const endDateChange2 = moment(endDateChange, "DD-MM-YYYY HH:mm:ss").add(
      1,
      "days"
    );
    const startDate = startDateTourChange2;
    const endDate = endDateChange2;
    // return current && (current < startDate || current > endDate);
    // Disable giờ ngoài khung
    if (current.isSame(startDateTourChange2, "day")) {
      const numOfDays = request?.privateTourResponse?.numOfDay || 0;
      const numOfNight = request?.privateTourResponse?.numOfNight || 0;
      if (numOfDays === numOfNight) {
        return current.hour() < 6 || current.hour() > 12;
      } else if (numOfDays === numOfNight + 1) {
        return current.hour() < 12 || current.hour() > 18;
      }
    }

    if (current.isSame(endDateChange2, "day")) {
      return current.hour() < 12 || current.hour() > 21;
    }
    // Disable toàn bộ ngày ngoài khung
    if (current && (current < startDate || current > endDate)) {
      return true;
    }
    return false;
  };


  const hasDuplicates = (provinces) => {
    // Use a Set to efficiently store unique values and check for duplicates
    const uniqueProvinces = new Set();
    const modifiedProvinces = []; // Array to store the modified provinces (without duplicates)

    for (const province of provinces) {
      // Check if the current province's ID already exists in the Set
      if (uniqueProvinces.has(province.id)) {
        // Duplicate found, skip adding to modifiedProvinces
        continue; // Move to the next iteration
      }
      uniqueProvinces.add(province.id); // Add the province's ID to the Set
      modifiedProvinces.push(province); // Add the province to the modified array
    }
    // debugger;
    // If duplicates were found, update the provinces state
    if (modifiedProvinces.length !== provinces.length) {
      setProvinces(modifiedProvinces);
    }

    return modifiedProvinces.length !== provinces.length; // Return true if duplicates were removed
  };

  // Example usage
  const hasDuplicatesResult = hasDuplicates(provinces);
  console.log("Provinces have duplicates:", hasDuplicatesResult); // Output: Provinces have duplicates: true (assuming duplicates exist)

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

  const fieldsTransportation = form.getFieldValue("transportation") || [];
  console.log("fieldsTransportation", fieldsTransportation);

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
  console.log("optimalPath", optimalPath);

  const handleRemove = (remove, name) => {
    remove(name);
    setTransportationCount((prevCount) => prevCount - 1); // Decrease the count when an item is removed
  };

  const handleAdd = (add) => {
    add();
    setTransportationCount((prevCount) => prevCount + 1); // Increase the count when an item is added
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          Hành trình tối ưu
        </h2>
        {optimalPath?.length > 0 && (
          <div className="grid gap-4">
            {optimalPath.map((item, index) => {
              const routeInfo = getRouteInfo(index, index + 1);
              if (routeInfo.distance > 0) {
                console.log("routeInfo", routeInfo);

                const calculateFlightTime = (distance) => {
                  const metersToKilometers1 = (meters) => {
                    return meters / 1000;
                  };
                  const distanceInKm = metersToKilometers1(distance); // Chuyển đổi khoảng cách từ mét sang km
                  const averageSpeed = 850; // tốc độ trung bình km/h
                  const flightTimeInHours = distanceInKm / averageSpeed; // thời gian bay tính bằng giờ
                  const flightTimeInSeconds = flightTimeInHours * 3600; // chuyển đổi giờ sang giây
                  return secondsToHours(flightTimeInSeconds); // sử dụng hàm secondsToHours
                };

                return (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-lg font-bold text-gray-800">
                        {routeInfo.fromProvince} -{" "}
                        {routeInfo.toProvince ? ` ${routeInfo.toProvince}` : ""}
                      </p>
                    </div>
                    <div className="mt-2 flex justify-between text-gray-600">
                      <p>
                        <span className="font-bold">Khoảng cách:</span>{" "}
                        {metersToKilometers(routeInfo.distance)}
                      </p>
                      <div>
                        <p>
                          <span className="font-bold">Thời gian:</span>{" "}
                          {secondsToHours(routeInfo.duration)} giờ đi bằng xe
                          khách hoặc ô tô
                        </p>
                        {/* <p>
                        <span className="font-bold">
                          Thời gian bay ước tính:
                        </span>{" "}
                        {calculateFlightTime(routeInfo.distance)} giờ đi bằng
                        máy bay
                      </p> */}
                      </div>
                    </div>
                  </div>
                );
              } else {
                // Optional handling for routeInfo with distance = 0 (e.g., a message)
                return null; // Or display a message like "No route information available"
              }
            })}
          </div>
        )}
      </div>

      <Form.List name="transportation">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Space
                key={key}
                align="baseline"
                className="flex justify-between my-8 "
              >
                <div className="text-center font-bold mr-2">{index + 1}</div>
                <div className="flex flex-wrap flex-grow w-full">
                  <div className="flex flex-wrap ">
                    <Form.Item
                      {...restField}
                      label="Di chuyển từ:"
                      name={[name, "startPoint"]}
                      className="flex font-semibold"
                      rules={[{ required: true, message: "Missing province" }]}
                    >
                      <Select
                        placeholder="Chọn tỉnh"
                        onChange={(value) =>
                          handleProvinceChange(value, index, "startPoint")
                        }
                        className="!w-[200px] mr-10"
                        disabled={index === 0}
                      >
                        {(index === 0
                          ? [{ id: startProvinceId, name: startProvinceName }]
                          : provinces
                        ).map((province) => (
                          <Option key={province.id} value={province.id}>
                            {province.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
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
                        onChange={(value) =>
                          handleDistrictChange(
                            value,
                            index,
                            "startPointDistrict"
                          )
                        }
                        disabled={
                          !selectedProvinces[`${index}_startPoint`] ||
                          index === 0
                        }
                      >
                        {(index === 0
                          ? [{ id: startDistrictId, name: startDistrictName }]
                          : districts[`${index}_startPoint`] || []
                        ).map((district) => (
                          <Option key={district.id} value={district.id}>
                            {district.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="flex flex-wrap ">
                    <Form.Item
                      {...restField}
                      label="Đến:"
                      name={[name, "endPoint"]}
                      placeholder="Chọn tỉnh"
                      className="flex font-semibold"
                      rules={[{ required: true, message: "Missing province" }]}
                    >
                      <Select
                        placeholder="Chọn tỉnh"
                        onChange={(value) => {
                          handleProvinceChange(value, index, "endPoint");
                          updateNextRoute(index);
                        }}
                        className="!w-[200px] mr-10"
                        disabled={index === fields.length - 1}
                      >
                        {(index === fields.length - 1
                          ? [{ id: startProvinceId, name: startProvinceName }]
                          : provinces
                        ).map((province) => (
                          <Option key={province.id} value={province.id}>
                            {province.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
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
                        onChange={(value) =>
                          handleDistrictChange(value, index, "endPointDistrict")
                        }
                        disabled={
                          !selectedProvinces[`${index}_endPoint`] ||
                          index === fields.length - 1 // Disable for the last item
                        }
                      >
                        {(index === fields.length - 1
                          ? [{ id: startDistrictId, name: startDistrictName }]
                          : districts[`${index}_endPoint`] || []
                        ).map((district) => (
                          <Option key={district.id} value={district.id}>
                            {district.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

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
                          updateNextRoute(index);
                        }}
                        showTime
                        className="!w-[350px] mr-10"
                        format="DD-MM-YYYY HH:mm:ss"
                        disabledDate={disabledDate}
                        defaultPickerValue={[getDefaultPickerValue()]}
                      />
                    </Form.Item>
                  </ConfigProvider>

                  <div>
                    <div className="flex flex-wrap  ">
                      <Form.Item
                        {...restField}
                        name={[name, "vehicleType"]}
                        label="Phương tiện:"
                        className="flex font-semibold"
                        rules={[
                          {
                            required: true,
                            message: "Please select transport type!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Chọn phương tiện"
                          className="!w-[250px] mr-10"
                          onChange={(value) =>
                            onVehicleTypeChange(index, value, name)
                          }
                          loading={loadingVehicle}
                          disabled={loadingVehicle || !selectedProvinces}
                        >
                          {availableVehicleTypes[index]?.map((key) => {
                            const label = servingVehiclesQuantity[key];
                            return (
                              <Option key={key} value={key}>
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
                  <Button
                    onClick={() => handleRemove(remove, name)}
                    icon={<DeleteOutlined />}
                  />
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
            {transportationCount !== 6 && (
              <Form.Item className="w-1/3 my-4">
                <Button
                  className="bg-teal-600 font-semibold text-white"
                  type="dashed"
                  onClick={() => handleAdd(add)}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm phương tiện di chuyển
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>
    </>
  );
};

export default TransportationSection;
