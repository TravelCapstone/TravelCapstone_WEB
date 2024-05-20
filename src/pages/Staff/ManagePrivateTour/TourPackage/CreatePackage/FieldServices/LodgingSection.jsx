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
  const [lodgingDetails, setLodgingDetails] = useState({});
  const [selectedRatingId, setSelectedRatingId] = useState();
  const [numOfDay, setNumOfDay] = useState();

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [availableActors, setAvailableActors] = useState([]);

  const indexToAlpha = (index) => {
    // Converts 0 to 'a', 1 to 'b', etc.
    return String.fromCharCode(97 + index);
  };

  const privatetourRequestId = request.privateTourResponse.id;

  const handleRatingChange = (selectedRatingId) => {
    // Tìm rating trong mảng dựa trên `ratingId`
    const rating = ratingLabelsAPI.find(
      (rating) => rating.ratingId === selectedRatingId
    );
    if (rating) {
      // Nếu tìm thấy, cập nhật state với `id` của rating đó
      setSelectedRatingId(rating.id);
    } else {
      // Nếu không tìm thấy, có thể xử lý tình huống này (set giá trị mặc định hoặc hiển thị lỗi)
      console.log("Rating not found for selected ratingId:", selectedRatingId);
    }
  };

  // GỌI API LẤY GIÁ TRỊ MIN MAX CỦA KHÁCH SẠN
  useEffect(() => {
    setMinPrice(null);
    setMaxPrice(null);
    if (
      selectedDistrict &&
      privatetourRequestId &&
      selectedRatingId &&
      numOfDay &&
      roomType
    ) {
      setIsLoading(true);
      getMinMaxPriceOfHotel(
        selectedDistrict,
        privatetourRequestId,
        selectedRatingId,
        1,
        10,
        numOfDay
      )
        .then((priceData) => {
          setIsLoading(false);
          if (priceData) {
            console.log("Min and Max prices:", priceData.result.items);
            const prices = priceData.result.items;
            // debugger;
            const uniqueAvailabilities = new Set(
              priceData.result.items.map((item) => item.serviceAvailability)
            );
            setAvailableActors([...uniqueAvailabilities]);

            const filteredPrices = prices.filter(
              (item) => item.servingQuantity === roomType
            );
            console.log("Filtered prices:", filteredPrices);
            if (filteredPrices.length > 0) {
              const minPrices = filteredPrices.map((item) => item.minPrice);
              const maxPrices = filteredPrices.map((item) => item.maxPrice);
              setMinPrice(Math.min(...minPrices));
              setMaxPrice(Math.max(...maxPrices));
            } else {
              setMinPrice(null);
              setMaxPrice(null);
            }
          } else {
            // Không có dữ liệu, thiết lập minPrice và maxPrice là null
            setAvailableActors([]);
            setMinPrice(null);
            setMaxPrice(null);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setAvailableActors([]);
          console.error("Failed to fetch data:", error);
          setMinPrice(null);
          setMaxPrice(null);
        });
    } else {
      setIsLoading(false);
      setMinPrice(null);
      setMaxPrice(null);
    }
  }, [
    selectedDistrict,
    privatetourRequestId,
    selectedRatingId,
    numOfDay,
    roomType,
  ]);

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
  const keysToShow = [0, 1, 2, 3, 4, 10];

  // Filter ratingLabels to only include the specified keys
  const filteredLabels = Object.fromEntries(
    Object.entries(ratingLabels).filter(([key]) =>
      keysToShow.includes(parseInt(key))
    )
  );

  return (
    <>
      <Form.List name={[...basePath, "hotels"]} initialValue={[{}]}>
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
                        />
                      </Form.Item>
                      <div className="ml-4 text-lg">
                        <span className="font-semibold ">
                          Số lượng ngày/đêm:
                        </span>
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
                              className="!w-[250px] mr-10"
                              placeholder="Chọn loại hình lưu trú"
                              onChange={handleRatingChange}
                            >
                              {ratingLabelsAPI.map((item) => (
                                <Option
                                  key={item.ratingId}
                                  value={item.ratingId}
                                >
                                  {item.label}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "Prices1"]}
                            className="font-semibold"
                          >
                            <div className="flex font-semibold text-gray-500">
                              <h3 className="text-lg mr-3">Khoảng giá: </h3>
                              {selectedDistrict &&
                              privatetourRequestId &&
                              selectedRatingId &&
                              roomType &&
                              numOfDay ? (
                                <p className="text-lg">
                                  {isLoading
                                    ? "Đang tải..."
                                    : minPrice !== null && maxPrice !== null
                                      ? `${minPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} ~ 
        ${maxPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} / Người / ${numOfDay} ngày`
                                      : "Khu vực này tạm thời không có loại hình lưu trú này"}
                                </p>
                              ) : (
                                <p className="text-lg">
                                  Vui lòng chọn các trường cần thiết để xem giá
                                </p>
                              )}
                            </div>
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
                              className="!w-[250px] mr-10"
                              placeholder="Chọn loại hình lưu trú"
                              onChange={handleRatingChange}
                            >
                              {ratingLabelsAPI.map((item) => (
                                <Option
                                  key={item.ratingId}
                                  value={item.ratingId}
                                >
                                  {item.label}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "Prices2"]}
                            className="font-semibold"
                          >
                            <div className="flex font-semibold text-gray-500">
                              <h3 className="text-lg mr-3">Khoảng giá: </h3>
                              {selectedDistrict &&
                              privatetourRequestId &&
                              selectedRatingId &&
                              roomType &&
                              numOfDay ? (
                                <p className="text-lg">
                                  {isLoading
                                    ? "Đang tải..."
                                    : minPrice !== null && maxPrice !== null
                                      ? `${minPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} ~ 
        ${maxPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} / Người / ${numOfDay} ngày`
                                      : "Khu vực này tạm thời không có loại hình lưu trú này"}
                                </p>
                              ) : (
                                <p className="text-lg">
                                  Vui lòng chọn các trường cần thiết để xem giá
                                </p>
                              )}
                            </div>
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
                              className="!w-[250px] mr-10"
                              placeholder="Chọn loại hình lưu trú"
                              onChange={handleRatingChange}
                            >
                              {ratingLabelsAPI.map((item) => (
                                <Option
                                  key={item.ratingId}
                                  value={item.ratingId}
                                >
                                  {item.label}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "Prices3"]}
                            // name={[...basePath, "Prices"]} // Updated to use 'ratingHotel'
                            className="font-semibold"
                          >
                            <div className="flex font-semibold text-gray-500">
                              <h3 className="text-lg mr-3">Khoảng giá: </h3>
                              {selectedDistrict &&
                              privatetourRequestId &&
                              selectedRatingId &&
                              roomType &&
                              numOfDay ? (
                                <p className="text-lg">
                                  {isLoading
                                    ? "Đang tải..."
                                    : minPrice !== null && maxPrice !== null
                                      ? `${minPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} ~ 
        ${maxPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} / Người / ${numOfDay} ngày`
                                      : "Khu vực này tạm thời không có loại hình lưu trú này"}
                                </p>
                              ) : (
                                <p className="text-lg">
                                  Vui lòng chọn các trường cần thiết để xem giá
                                </p>
                              )}
                            </div>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DeleteOutlined
                    onClick={() => remove(field.name)}
                    className="self-start mt-2"
                  />
                </div>
              </Space>
            ))}
            <Form.Item className="w-1/3">
              <Button
                className="bg-teal-600 font-semibold text-white"
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Hotel
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default LodgingSection;
