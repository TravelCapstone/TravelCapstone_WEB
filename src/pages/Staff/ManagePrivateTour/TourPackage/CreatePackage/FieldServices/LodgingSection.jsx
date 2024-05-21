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
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [roomType, setRoomType] = useState(null);

  const [facilities, setFacilities] = useState([]);

  const indexToAlpha = (index) => {
    // Converts 0 to 'a', 1 to 'b', etc.
    return String.fromCharCode(97 + index);
  };

  const privatetourRequestId = request.privateTourResponse.id;

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

  // console.log("selectedDistrict", selectedDistrict);
  // console.log("facilities", facilities);
  console.log("filteredFacilities", filteredFacilities);

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

  // Define the keys you want to include in the dropdown

  // Filter ratingLabels to only include the specified keys
  const filteredLabels = Object.fromEntries(
    Object.entries(ratingLabels).filter(([key]) =>
      keysToShow.includes(parseInt(key))
    )
  );

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
                      <RangePicker showTime className="!min-w-[300px] mr-10" />
                    </Form.Item>
                    <div className="ml-4 text-lg">
                      <span className="font-semibold ">Số lượng ngày/đêm:</span>
                      <span className="font-normal  ml-3">1</span>
                    </div>
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
                    <Form.Item
                      className=" font-semibold"
                      {...field}
                      name={[field.name, "numOfRoom"]}
                      label="Số lượng phòng:"
                      rules={[
                        {
                          required: true,
                          message: "Please input number of rooms!",
                        },
                      ]}
                    >
                      <InputNumber min={1} max={30} className=" mr-10" />
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
                            >
                              {filteredFacilities.map((facility) => (
                                <p key={facility.id}>
                                  {facility.name} - {facility.description}
                                  {/* {facility.facilityRating.rating.name} */}
                                  {/* Vĩ độ: {facility.province.lat}, Kinh độ:{" "}
                                  {facility.province.lng} */}
                                </p>
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
                            >
                              {filteredFacilities.map((facility) => (
                                <p key={facility.id}>
                                  {facility.name} - {facility.description}
                                  {/* {facility.facilityRating.rating.name} */}
                                  {/* Vĩ độ: {facility.province.lat}, Kinh độ:{" "}
                                  {facility.province.lng} */}
                                </p>
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
                            >
                              {filteredFacilities?.map((facility) => (
                                <p key={facility.id}>
                                  {facility.name} - {facility.description}
                                  {/* {facility.facilityRating.rating.name} */}
                                  {/* Vĩ độ: {facility.province.lat}, Kinh độ:{" "}
                                  {facility.province.lng} */}
                                </p>
                              ))}
                            </Select>
                          </Form.Item>
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
