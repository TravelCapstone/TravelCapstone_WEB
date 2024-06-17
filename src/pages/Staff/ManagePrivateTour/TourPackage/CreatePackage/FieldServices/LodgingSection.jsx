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
import {
  getAllFacility,
  getAllFacilityByFilter,
} from "../../../../../../api/FacilityApi";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import "../../../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";
import dayjs from "../../../../../../settings/setupDayjs";

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
  startDateFinal,
  endDateFinal,
  indexMain,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [roomType, setRoomType] = useState(null);

  const [facilities, setFacilities] = useState([[]]);
  // const [selectedOptions, setSelectedOptions] = useState({
  //   hotelOptionRatingOption1: null,
  //   hotelOptionRatingOption2: null,
  //   hotelOptionRatingOption3: null,
  // });

  const [selectedOptions, setSelectedOptions] = useState([
    {
      hotelOptionRatingOption1: null,
      hotelOptionRatingOption2: null,
      hotelOptionRatingOption3: null,
    },
  ]);

  console.log("selectedOptions", selectedOptions);

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

  const fetchFacilitiesByLocation = async () => {
    const allFacilities = await getAllFacilityByFilter(
      {
        provinceId: null,
        districtId: districtId,
        communeId: null,
      },
      1,
      100
    ); // Giả sử bạn lấy 100 cơ sở lưu trú
    setFacilities((facility) => {
      const fac = [...facility];
      fac[0] = allFacilities.result?.items;
      fac[1] = allFacilities.result?.items;
      fac[2] = allFacilities.result?.items;

      return fac;
    });
  };

  const keysToShow = [0, 1, 2, 3, 4, 10];

  const filteredFacilities = facilities.filter(
    (facility) =>
      facility.communce?.districtId === selectedDistrict &&
      keysToShow.includes(facility?.facilityRating?.ratingId)
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

  const onDateRangeChange = (dates, dateStrings, fieldKey, itemIndex) => {
    if (dates) {
      const startDate = dates[0].toDate();
      const endDate = dates[1].toDate();
      const duration = endDate - startDate;
      const hours = duration / 3600000;
      const numOfDays = Math.ceil(hours / 24);

      const newNumOfDaysLoging = [...numOfDaysLoging];
      newNumOfDaysLoging[itemIndex] = numOfDays;
      debugger;
      setNumOfDaysLoging(newNumOfDaysLoging);
      setDisableOptions(false);

      form.setFieldsValue({
        [basePath.join(".")]: {
          ...form.getFieldValue(basePath.join(".")),
          [fieldKey]: {
            ...form.getFieldValue([...basePath, fieldKey]),
            numOfDays: numOfDays,
          },
        },
      });
    } else {
      setDisableOptions(true);
    }
  };

  const onOptionChange = (value, optionKey, index) => {
    debugger;
    setSelectedOptions((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [optionKey]: value } : item
      )
    );
    fetchPriceData(
      selectedDistrict,
      request.privateTourResponse.id,
      value,
      numOfDaysLoging[index]
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

  // useEffect(() => {
  //   selectedOptions.forEach((option, index) => {
  //     Object.values(option).forEach((opt) => {
  //       const filteredFacilities = facilities.filter(
  //         (facility) =>
  //           facility.communce.districtId === selectedDistrict &&
  //           facility.facilityRating.ratingId === opt
  //       );
  //       if (filteredFacilities.length > 0) {
  //         debugger;
  //         fetchPriceData(
  //           selectedDistrict,
  //           privatetourRequestId,
  //           facilities[0]?.id,
  //           numOfDaysLoging[index]
  //         );
  //       }
  //     });
  //   });
  // }, [
  //   selectedOptions,
  //   selectedDistrict,
  //   privatetourRequestId,
  //   facilities,
  //   numOfDaysLoging,
  // ]);

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
    fetchFacilitiesByLocation();
  }, [selectedDistrict]);
  console.log("facilities", facilities);
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
                            onDateRangeChange(
                              dates,
                              dateStrings,
                              field.name,
                              index
                            )
                          }
                          disabledDate={disabledDate}
                          defaultPickerValue={[getDefaultPickerValue()]}
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
                        value={numOfDaysLoging[index]}
                        min={numOfDaysLoging[index]}
                        placeholder={numOfDaysLoging[index]}
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
                              onOptionChange(
                                value,
                                "hotelOptionRatingOption1",
                                index
                              )
                            }
                            // disabled={disableOptions}
                          >
                            {facilities &&
                              facilities[0].length > 0 &&
                              facilities[0].map((facility) => (
                                <Option
                                  key={facility.id}
                                  value={facility.facilityRating?.ratingId}
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
                              onOptionChange(
                                value,
                                "hotelOptionRatingOption2",
                                index
                              )
                            }
                            // disabled={disableOptions}
                          >
                            {facilities &&
                              facilities[1].length > 0 &&
                              facilities[1].map((facility) => (
                                <Option
                                  key={facility.id}
                                  value={facility.facilityRating?.ratingId}
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
                              onOptionChange(
                                value,
                                "hotelOptionRatingOption3",
                                index
                              )
                            }
                            // disabled={disableOptions}
                          >
                            {facilities &&
                              facilities[2].length > 0 &&
                              facilities[2].map((facility) => (
                                <Option
                                  key={facility.id}
                                  value={facility.facilityRating?.ratingId}
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
                    renderItem={(roomDetail, index) => {
                      debugger;
                      const minMaxPrice1 = priceData[
                        selectedOptions[0]?.hotelOptionRatingOption1
                      ]?.filter(
                        (item) => item.servingQuantity === roomDetail.roomSize
                      );
                      const minMaxPrice2 = priceData[
                        selectedOptions[0]?.hotelOptionRatingOption2
                      ]?.filter(
                        (item) => item.servingQuantity === roomDetail.roomSize
                      );
                      const minMaxPrice3 = priceData[
                        selectedOptions[0]?.hotelOptionRatingOption3
                      ]?.filter(
                        (item) => item.servingQuantity === roomDetail.roomSize
                      );
                      console.log("minMaxPrice1", minMaxPrice1);
                      console.log("minMaxPrice2", minMaxPrice2);
                      console.log("minMaxPrice3", minMaxPrice3);

                      return (
                        <List.Item key={roomDetail.id}>
                          {roomDetail.numOfRoom > 0 ? (
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
                          ) : null}
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
