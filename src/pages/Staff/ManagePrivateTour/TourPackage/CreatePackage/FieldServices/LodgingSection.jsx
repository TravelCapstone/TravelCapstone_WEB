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
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ratingLabels,
  ratingLabelsAPI,
  servingActor,
  servingHotelsQuantity,
} from "../../../../../../settings/globalStatus";
import { getMinMaxPriceOfHotel } from "../../../../../../api/SellPriceHistoryApi";
import { getAllFacility } from "../../../../../../api/FacilityApi";
import moment from "moment";

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

  const numOfRooms =
    (request.privateTourResponse.numOfAdult +
      request.privateTourResponse.numOfChildren) /
    roomType;

  console.log("numOfRooms", numOfRooms);

  const indexToAlpha = (index) => {
    // Converts 0 to 'a', 1 to 'b', etc.
    return String.fromCharCode(97 + index);
  };

  const privatetourRequestId = request.privateTourResponse.id;
  const districtId = selectedDistrict;

  const fetchFacilities = async () => {
    const allFacilities = await getAllFacility(1, 1000); // Giả sử bạn lấy 100 cơ sở lưu trú
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
        filteredRatingID[0].facilityRating.id,
        1, // pageNumber
        10, // pageSize
        numOfDays
      );
      debugger;

      setPriceData((prev) => ({
        ...prev,
        [ratingId]: priceInfo.result.items,
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

  const minMaxPrice1 = priceData[
    selectedOptions[`hotelOptionRatingOption1`]
  ]?.filter((item) => item.servingQuantity === roomType);
  const minMaxPrice2 = priceData[
    selectedOptions[`hotelOptionRatingOption2`]
  ]?.filter((item) => item.servingQuantity === roomType);
  const minMaxPrice3 = priceData[
    selectedOptions[`hotelOptionRatingOption3`]
  ]?.filter((item) => item.servingQuantity === roomType);

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
                        onChange={(dates, dateStrings) =>
                          onDateRangeChange(dates, dateStrings, field.name)
                        }
                      />
                    </Form.Item>
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
                  <div className="flex flex-wrap">
                    <Form.Item
                      className=" font-semibold"
                      {...field}
                      name={[field.name, "roomType"]}
                      label="Loại phòng:"
                      rules={[
                        {
                          required: true,
                          message: "Please select room type!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn loại phòng"
                        onChange={(value) => setRoomType(parseInt(value, 10))}
                        className="!w-[200px] mr-10"
                      >
                        {Object.entries(servingHotelsQuantity).map(
                          ([key, value]) => (
                            <Option key={key} value={parseInt(key, 10)}>
                              {value}
                            </Option>
                          )
                        )}
                      </Select>
                    </Form.Item>
                  </div>

                  {/* Các gói */}
                  {selectedDistrict && (
                    <div className="Options">
                      <div className="Option1">
                        <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                          Gói Tiết Kiệm:
                        </li>
                        <div className="flex flex-wrap">
                          <Form.Item
                            {...field}
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
                                  `hotelOptionRatingOption1`
                                )
                              }
                            >
                              {filteredFacilities.map((facility) => (
                                <p key={facility.id}>
                                  {facility.name} - {facility.description}
                                </p>
                              ))}
                            </Select>
                          </Form.Item>
                          <div className="flex font-semibold text-sm text-gray-500 ml-10">
                            {priceData[
                              selectedOptions[`hotelOptionRatingOption1`]
                            ] && (
                              <p>
                                {" "}
                                Giá khoảng:{" "}
                                {minMaxPrice1[0].minPrice.toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}{" "}
                                -{" "}
                                {minMaxPrice1[0].maxPrice.toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                                / Người / Đêm
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="Option1">
                        <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                          Gói Cơ Bản:
                        </li>
                        <div className="flex flex-wrap">
                          <Form.Item
                            {...field}
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
                                  `hotelOptionRatingOption2`
                                )
                              }
                            >
                              {filteredFacilities.map((facility) => (
                                <p key={facility.id}>
                                  {facility.name} - {facility.description}
                                </p>
                              ))}
                            </Select>
                          </Form.Item>
                          <div className="flex font-semibold text-sm text-gray-500 ml-10">
                            {priceData[
                              selectedOptions[`hotelOptionRatingOption2`]
                            ] && (
                              <p>
                                {" "}
                                Giá khoảng:{" "}
                                {minMaxPrice2[0].minPrice.toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}{" "}
                                -{" "}
                                {minMaxPrice2[0].maxPrice.toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                                / Người / Đêm
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="Option1">
                        <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                          Gói Nâng Cao:
                        </li>
                        <div className="flex flex-wrap">
                          <Form.Item
                            {...field}
                            name={[field.name, "hotelOptionRatingOption3"]}
                            // name={[...basePath, "hotelOptionRatingOption3"]} // Updated to use 'ratingHotel'
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
                                  `hotelOptionRatingOption3`
                                )
                              }
                            >
                              {filteredFacilities?.map((facility) => (
                                <p key={facility.id}>
                                  {facility.name} - {facility.description}
                                </p>
                              ))}
                            </Select>
                          </Form.Item>
                          <div className="flex font-semibold text-sm text-gray-500 ml-10">
                            {priceData[
                              selectedOptions[`hotelOptionRatingOption3`]
                            ] && (
                              <p>
                                {" "}
                                Giá khoảng:{" "}
                                {minMaxPrice3[0].minPrice.toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}{" "}
                                -{" "}
                                {minMaxPrice3[0].maxPrice.toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}{" "}
                                / Người / Đêm
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <DeleteOutlined
                  onClick={() => remove(field.name)}
                  className="self-start mt-2"
                />
              </div>
            </Space>
          ))}
          <Form.Item className="w-1/2">
            <Button
              className="bg-teal-600 font-semibold text-white"
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
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
