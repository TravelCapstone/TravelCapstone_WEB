import React, { useCallback, useEffect, useState } from "react";
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
  List,
  Card,
  ConfigProvider,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ratingLabels,
  servingActor,
  servingHotelsQuantity,
} from "../../../../../../settings/globalStatus";
import { getMinMaxPriceOfHotel } from "../../../../../../api/SellPriceHistoryApi";
import { getAllFacility } from "../../../../../../api/FacilityApi";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import "../../../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";

const { Option } = Select;
const { RangePicker } = DatePicker;

const LodgingSection = ({
  form,
  districts,
  onProvinceChange,
  request,
  setProvinces,
  provinces,
  onDistrictChange,
  selectedDistrict,
  basePath,
  setNumOfDaysLoging,
  numOfDaysLoging,
  numOfRoom,
  startDateTourChange,
  endDateChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [roomType, setRoomType] = useState(null);

  const [facilities, setFacilities] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState({
    hotelOptionRatingOption1: null,
    hotelOptionRatingOption2: null,
    hotelOptionRatingOption3: null,
  });

  const [priceData, setPriceData] = useState({});
  const [disableOptions, setDisableOptions] = useState(true);

  console.log(
    "request.privateTourResponse?.roomDetails",
    request.privateTourResponse?.roomDetails
  );

  const indexToAlpha = (index) => {
    // Converts 0 to 'a', 1 to 'b', etc.
    return String.fromCharCode(97 + index);
  };

  const privatetourRequestId = request.privateTourResponse.id;
  const districtId = selectedDistrict;

  const fetchFacilities = async () => {
    const allFacilities = await getAllFacility(1, 10000); // Giả sử bạn lấy 100 cơ sở lưu trú
    setFacilities(allFacilities.result.items);
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const keysToShow = [0, 1, 2, 3, 4, 10];

  const filteredFacilities = facilities.filter(
    (facility) =>
      facility.communce.districtId === selectedDistrict &&
      keysToShow.includes(facility.facilityRating.ratingId)
  );

  console.log("filteredFacilities", filteredFacilities);

  const fetchPriceData = async (
    districtId,
    privatetourRequestId,
    ratingId,
    numOfDays
  ) => {
    console.log("ratingId", ratingId);
    const filteredRatingID = filteredFacilities.filter(
      (facility) => ratingId === facility.id
    );
    console.log("filteredRatingID", filteredRatingID);

    setIsLoading(true);
    try {
      const priceInfo = await getMinMaxPriceOfHotel(
        districtId,
        privatetourRequestId,
        filteredRatingID[0]?.facilityRating?.id,
        1, // pageNumber
        10, // pageSize
        numOfDays
      );

      setPriceData((prev) => ({
        ...prev,
        [filteredRatingID[0]?.facilityRating?.ratingId]:
          priceInfo?.result?.items,
      }));
    } catch (error) {
      console.error("Error fetching hotel prices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDateRangeChange = (dates, dateStrings, fieldKey) => {
    if (dates) {
      const startDate = dates[0].toDate(); // Convert moment to Date object
      const endDate = dates[1].toDate();
      const duration = endDate - startDate; // Difference in milliseconds
      const hours = duration / 3600000; // Convert milliseconds to hours

      const numOfDays = Math.ceil(hours / 24); // Rounds up to the nearest whole day
      setNumOfDaysLoging(numOfDays);
      // Set the number of days in the form
      setDisableOptions(false);
      fetchPriceData(districtId, privatetourRequestId, ratingId, numOfDays);
      form.setFieldsValue({
        [basePath.join(".")]: {
          ...form.getFieldValue(basePath.join(".")),
          [fieldKey]: {
            ...form.getFieldValue([...basePath, fieldKey]),
            numOfDays: numOfDays, // Assuming 'numOfRoom' is where you want to store this, adjust as necessary
          },
        },
      });
    } else {
      setDisableOptions(true); // Disable options when stayDatesLoging is not selected
    }
  };

  const onOptionChange = (value, optionKey) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionKey]: value,
    }));
    fetchPriceData(
      selectedDistrict,
      request.privateTourResponse.id,
      value,
      numOfDaysLoging
    );
  };

  // Lấy dữ liệu provinceId và province name từ request để hiển thị lên form
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

  useEffect(() => {
    Object.values(selectedOptions).forEach((option) => {
      const filteredFacilities = facilities.filter(
        (facility) =>
          facility.communce.districtId === selectedDistrict &&
          facility.facilityRating.ratingId === option
      );
      if (filteredFacilities) {
        fetchPriceData(
          selectedDistrict,
          privatetourRequestId,
          filteredFacilities[0]?.id,
          numOfDaysLoging
        );
      }
    });
  }, [selectedOptions]);

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

  // Lấy giá trị defaultPickerValue từ tourDate
  const getDefaultPickerValue = () => {
    const tourDate = form.getFieldValue("tourDate");
    if (!tourDate || tourDate.length < 2) {
      return moment(); // Nếu không có tourDate, sử dụng ngày hiện tại
    }
    return tourDate[0]; // Sử dụng ngày bắt đầu của tourDate
  };

  return (
    <Form.List name={[...basePath, "hotels"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Space
              direction="vertical"
              key={field.key}
              size="large"
              className="flex my-8  justify-between"
              align="baseline"
            >
              <div className="flex">
                <div className="font-semibold mr-5 text-lg">
                  {indexToAlpha(index)}.
                </div>
                <div className="flex flex-col flex-grow w-full">
                  <div className="flex flex-wrap ">
                    <ConfigProvider locale={viVN}>
                      <Form.Item
                        label="Ngày lưu trú:"
                        className=" font-semibold"
                        {...field}
                        name={[field.name, "stayDatesLoging"]}
                        rules={[
                          {
                            required: true,
                            message: "Please choose the stay dates!",
                          },
                        ]}
                      >
                        <RangePicker
                          showTime
                          className="!min-w-[300px] mr-10"
                          format="DD-MM-YYYY HH:mm:ss"
                          onChange={(dates, dateStrings) =>
                            onDateRangeChange(dates, dateStrings, field.name)
                          }
                          disabledDate={disabledDate}
                          // defaultPickerValue={[getDefaultPickerValue()]}
                        />
                      </Form.Item>
                    </ConfigProvider>
                    <Form.Item
                      className=" font-semibold"
                      {...field}
                      name={[field.name, "numOfDays"]}
                      label="Số lượng ngày/đêm:"
                    >
                      <InputNumber
                        value={numOfDaysLoging}
                        min={numOfDaysLoging}
                        placeholder={numOfDaysLoging}
                        disabled
                      />
                    </Form.Item>
                  </div>
                  <div className="Options">
                    <div className="Option1">
                      <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                        Gói Tiết Kiệm:
                      </li>
                      <div className="flex flex-wrap">
                        <Form.Item
                          name={[field.name, "hotelOptionRatingOption1"]}
                          label="Loại hình lưu trú:"
                          className="font-semibold"
                          rules={[
                            {
                              required: true,
                              message: "Please select a lodging type!",
                            },
                          ]}
                        >
                          <Select
                            className="!w-full mr-10"
                            placeholder="Chọn loại hình lưu trú"
                            onChange={(value) =>
                              onOptionChange(value, "hotelOptionRatingOption1")
                            }
                            disabled={disableOptions}
                          >
                            {filteredFacilities.map((facility) => (
                              <Option
                                key={facility.id}
                                value={facility.facilityRating.ratingId}
                              >
                                {facility.name} - {facility.description}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="Option1">
                      <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                        Gói Cơ Bản:
                      </li>
                      <div className="flex flex-wrap">
                        <Form.Item
                          name={[field.name, "hotelOptionRatingOption2"]}
                          label="Loại hình lưu trú:"
                          className="font-semibold"
                          rules={[
                            {
                              required: true,
                              message: "Please select a lodging type!",
                            },
                          ]}
                        >
                          <Select
                            className="!w-full mr-10"
                            placeholder="Chọn loại hình lưu trú"
                            onChange={(value) =>
                              onOptionChange(value, "hotelOptionRatingOption2")
                            }
                            disabled={disableOptions}
                          >
                            {filteredFacilities.map((facility) => (
                              <Option
                                key={facility.id}
                                value={facility.facilityRating.ratingId}
                              >
                                {facility.name} - {facility.description}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="Option1">
                      <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                        Gói Nâng Cao:
                      </li>
                      <div className="flex flex-wrap">
                        <Form.Item
                          name={[field.name, "hotelOptionRatingOption3"]}
                          label="Loại hình lưu trú:"
                          className="font-semibold"
                          rules={[
                            {
                              required: true,
                              message: "Please select a lodging type!",
                            },
                          ]}
                        >
                          <Select
                            className="!w-full mr-10"
                            placeholder="Chọn loại hình lưu trú"
                            onChange={(value) =>
                              onOptionChange(value, "hotelOptionRatingOption3")
                            }
                            disabled={disableOptions}
                          >
                            {filteredFacilities.map((facility) => (
                              <Option
                                key={facility.id}
                                value={facility.facilityRating.ratingId}
                              >
                                {facility.name} - {facility.description}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  <List
                    // dataSource={request.privateTourResponse?.roomDetails}
                    dataSource={numOfRoom}
                    renderItem={(roomDetail) => {
                      const minMaxPrice1 = priceData[
                        selectedOptions["hotelOptionRatingOption1"]
                      ]?.filter(
                        (item) => item.servingQuantity === roomDetail.roomSize
                      );
                      const minMaxPrice2 = priceData[
                        selectedOptions["hotelOptionRatingOption2"]
                      ]?.filter(
                        (item) => item.servingQuantity === roomDetail.roomSize
                      );
                      const minMaxPrice3 = priceData[
                        selectedOptions["hotelOptionRatingOption3"]
                      ]?.filter(
                        (item) => item.servingQuantity === roomDetail.roomSize
                      );
                      console.log("minMaxPrice1", minMaxPrice1);
                      console.log("minMaxPrice2", minMaxPrice2);
                      console.log("minMaxPrice3", minMaxPrice3);

                      return (
                        <List.Item key={roomDetail.id}>
                          <div className="mr-10">
                            <div className="mb-6">
                              <p className="font-semibold text-lg mb-3">
                                Loại Phòng:
                              </p>
                              <Card className="mr-4 bg-teal-100">
                                <Card.Meta
                                  title={`Phòng ${
                                    roomDetail.roomSize === 4 ? "đôi" : "đơn"
                                  } `}
                                  description={`Tổng số phòng: ${roomDetail.numOfRoom}`}
                                />
                              </Card>
                            </div>
                            <div className="flex font-semibold text-sm text-gray-500 mb-4">
                              {minMaxPrice1?.length > 0 && (
                                <p>
                                  Gói Tiết Kiệm: Giá khoảng:{" "}
                                  {minMaxPrice1[0].minPrice.toLocaleString(
                                    "vi-VN",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}{" "}
                                  ~{" "}
                                  {minMaxPrice1[0].maxPrice.toLocaleString(
                                    "vi-VN",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}
                                  / Người / {numOfDaysLoging} Đêm
                                </p>
                              )}
                            </div>
                            <div className="flex font-semibold text-sm text-gray-500 mb-4 ">
                              {minMaxPrice2?.length > 0 && (
                                <p>
                                  Gói Cơ Bản: Giá khoảng:{" "}
                                  {minMaxPrice2[0].minPrice.toLocaleString(
                                    "vi-VN",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}{" "}
                                  ~{" "}
                                  {minMaxPrice2[0].maxPrice.toLocaleString(
                                    "vi-VN",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}
                                  / Người / {numOfDaysLoging} Đêm
                                </p>
                              )}
                            </div>
                            <div className="flex font-semibold text-sm text-gray-500  mb-4">
                              {minMaxPrice3?.length > 0 && (
                                <p>
                                  Gói Nâng Cao: Giá khoảng:{" "}
                                  {minMaxPrice3[0].minPrice.toLocaleString(
                                    "vi-VN",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}{" "}
                                  ~{" "}
                                  {minMaxPrice3[0].maxPrice.toLocaleString(
                                    "vi-VN",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}
                                  / Người / {numOfDaysLoging} Đêm
                                </p>
                              )}
                            </div>
                          </div>
                        </List.Item>
                      );
                    }}
                  />
                </div>
                <DeleteOutlined
                  onClick={() => remove(field.name)}
                  className="self-start mt-2 ml-4"
                />
              </div>
            </Space>
          ))}
          <Form.Item className="w-1/2">
            <Button
              className="bg-teal-600 font-semibold text-white"
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() =>
                add({
                  key: uuidv4(), // Add a unique key for each new item
                  stayDatesLoging: null,
                  // numOfDays: 0,
                  hotelOptionRatingOption1: null,
                  hotelOptionRatingOption2: null,
                  hotelOptionRatingOption3: null,
                })
              }
            >
              Thêm khách sạn
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default LodgingSection;
