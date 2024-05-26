import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Space,
  Select,
  Radio,
  Modal,
  Tooltip,
  Checkbox,
} from "antd";
import {
  WarningFilled,
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { alertFail, alertSuccess } from "../../../hook/useNotification";
import { createPrivateTour } from "../../../api/privateTourRequestApi";
import AddressSearch from "../../../api/SearchAddress/SearchAddress";
import {
  getCommuneByDistrictAndCommuneName,
  getProvinceByName,
} from "../../../api/LocationApi";
import AddressSearchMultiple from "../../../api/SearchAddress/SearchAddressMulti";
import RoomTypeSection from "../RoomTypeSection";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

function TourRequestForm() {
  const [value, setValue] = useState();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [valueFoodType, setValueFoodType] = useState();
  const [days, setDays] = useState(1);
  const [nights, setNights] = useState(0);
  const [form] = Form.useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [startCommuneId, setStartCommuneId] = useState("");
  const [mainLocation, setMainLocation] = useState("");
  const [mainDestinationId, setMainDestinationId] = useState("");
  const [totalRooms, setTotalRooms] = useState(0);

  console.log("days", days);
  console.log("nights", nights);

  useEffect(() => {
    if (selectedLocations.length === 1) {
      setMainLocation(selectedLocations[0]);
    } else {
      setMainLocation(null);
    }
  }, [selectedLocations]);

  const calculateTotalRooms = () => {
    const values = form.getFieldsValue();
    const { adult, children, roomTypes } = values;

    if (!adult || !children || !roomTypes) {
      form.setFieldsValue({
        roomTypes: roomTypes.map((room) => ({ ...room, totalRoom: 0 })),
      });
      return;
    }

    let totalPeople = adult + children;
    let roomsNeeded = { 2: 0, 4: 0 };

    roomTypes.forEach((room) => {
      if (room && room.RoomType) {
        const roomCapacity = room.RoomType;
        roomsNeeded[roomCapacity] = room.totalRoom || 0;
      }
    });

    // Calculate rooms for type 4 (Phòng đôi) first
    let remainingPeople = totalPeople - roomsNeeded[4] * 4;
    if (remainingPeople < 0) remainingPeople = 0;

    // Calculate rooms for type 2 (Phòng đơn) with the remaining people
    let singleRoomsNeeded = Math.ceil(remainingPeople / 2);

    // Update the form values
    const updatedRoomTypes = roomTypes.map((room) => {
      if (room && room.RoomType === 2) {
        return { ...room, totalRoom: singleRoomsNeeded };
      } else if (room && room.RoomType === 4) {
        return { ...room, totalRoom: roomsNeeded[4] };
      }
      return room;
    });

    form.setFieldsValue({
      roomTypes: updatedRoomTypes,
    });
  };

  useEffect(() => {
    form.setFieldsValue({ totalRooms });
  }, [totalRooms, form]);

  const handleMainLocationSelect = async (location) => {
    try {
      const provinceData = await getProvinceByName(location);
      if (provinceData.isSuccess) {
        setMainLocation(location);
        setMainDestinationId(provinceData.result?.id);
      }
    } catch (error) {
      alertFail(
        "Failed to fetch province ID. Please check the location and try again."
      );
    }
  };

  const handleAddressSelect = async (value, details) => {
    form.setFieldsValue({ startLocation: value });
    console.log("Address details received:", details);
    if (details) {
      const { districtName, communeName } = details;
      try {
        const communeData = await getCommuneByDistrictAndCommuneName(
          districtName,
          communeName
        );
        if (communeData && communeData.result.items.length > 0) {
          setStartCommuneId(communeData.result.items[0].id);
        } else {
          console.log("No communes found with the provided names");
        }
      } catch (error) {
        console.error(
          "Error fetching commune ID:",
          error.message,
          error.response
        );
      }
    }
  };

  const onCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const onFinish = async (formValues) => {
    if (!isChecked) {
      alertFail("Please agree to the terms and conditions before submitting.");
      return;
    }

    // Ensuring the date values exist and are correctly formatted
    const startDate = formValues.startDate
      ? formValues.startDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
      : null;
    const endDate = formValues.endDate
      ? formValues.endDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
      : null;

    if (!startDate || !endDate) {
      alertFail("Start date and end date must be provided.");
      return;
    }
    const tourData = {
      startDate,
      endDate,
      description: formValues["description"],
      numOfAdult: formValues["adult"],
      numOfChildren: formValues["children"],
      numOfDay: days,
      numOfNight: nights,
      startLocation: formValues["startLocation"],
      startCommuneId: startCommuneId,
      tourId: "591b4a71-d561-46a5-8057-84fe72ce1185", // Tour ID Gốc
      recommnendedTourUrl: formValues["recommnendedTourUrl"],
      note: formValues["note"],
      isEnterprise: formValues["isEnterprise"],
      roomQuantityDetailRequest: formValues["roomTypes"].map((loc) => ({
        quantityPerRoom: loc.RoomType,
        totalRoom: loc.totalRoom,
      })),
      otherLocation: selectedLocations.map((loc) => ({
        address: loc.location,
        provinceId: loc.provinceId,
      })),
      mainDestinationId: mainDestinationId,
      accountId: "208be820-3a09-4a8c-af3f-d86cb0f5ccee", // accoundId
      dietaryPreference: valueFoodType,
      wishPrice: formValues["budget"],
    };
    console.log("tourData", tourData);
    try {
      const response = await createPrivateTour(tourData);

      if (response?.data?.isSuccess) {
        alertSuccess("Tour created successfully!");
        form.resetFields(); // Reset all fields in the form
        setSelectedLocations([]); // Reset state if needed for locations
        setMainLocation(""); // Reset main location
        setIsChecked(false); // Uncheck the terms and conditions box
      } else {
        for (const message in response.messages) {
          alertFail(message);
        }
      }
    } catch (error) {
      console.error("Error creating tour:", error);
      alertFail(
        "An error occurred while creating the tour. Please try again later."
      );
    }
  };

  useEffect(() => {
    if (days) {
      setNights(days - 1);
    }
  }, [days]);

  const handleDaysChange = (value) => {
    setDays(value);
  };

  const handleLocationsChange = async (selectedItems) => {
    try {
      const detailedItemsWithIds = await Promise.all(
        selectedItems.map(async (item) => {
          const provinceData = await getProvinceByName(item.provinceName);
          return { ...item, provinceId: provinceData.result.id };
        })
      );

      setSelectedLocations(detailedItemsWithIds); // This includes province IDs now
    } catch (error) {
      console.error("Error fetching province IDs:", error);
      alertFail("Failed to fetch province IDs. Please try again.");
    }
  };

  const handleMainLocationChange = (location) => {
    if (location) {
      handleMainLocationSelect(location);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onChangeFoodType = (e) => {
    setValueFoodType(e.target.value);
  };

  const prefixSelector = <span style={{ paddingRight: 5 }}>+84</span>;
  return (
    <div className="mt-32 container">
      <div className="text-3xl text-center font-bold uppercase my-6">
        Đặt tour theo yêu cầu
      </div>
      <div className="max-w-[800px] mx-auto mb-12">
        <Form form={form} onFinish={onFinish} className="" layout="vertical">
          <Form.Item
            label="Họ tên người đại diện:"
            name="username"
            className="font-semibold"
            rules={[
              {
                required: true,
                message: (
                  <div>
                    <WarningFilled /> Vui lòng nhập họ và tên!
                  </div>
                ),
              },
              {
                max: 50,
                message: (
                  <div>
                    <WarningFilled /> Độ dài vượt quá 50 kí tự!
                  </div>
                ),
              },
            ]}
          >
            <Input className="h-10" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại liên hệ:"
            name="phone"
            className="font-semibold"
            rules={[
              {
                required: true,
                message: (
                  <div>
                    <WarningFilled /> Vui lòng nhập số điện thoại!
                  </div>
                ),
              },
              {
                min: 9,
                message: (
                  <div>
                    <WarningFilled /> Số điện thoại bao gồm ít nhất 9 số!
                  </div>
                ),
              },
              {
                max: 10,
                message: (
                  <div>
                    <WarningFilled /> Số điện thoại vượt quá 10 số!
                  </div>
                ),
              },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>
          <div className="font-semibold border-b-2 mt-8 mb-4 text-xl">
            <h4 className="pb-2 uppercase">Thông tin tour yêu cầu</h4>
          </div>
          <Form.Item
            label="Phân loại tour:"
            name="isEnterprise"
            className="font-semibold"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group onChange={onChange} defaultValue={value}>
              <Radio className="font-normal" value={true}>
                Tour gia đình
              </Radio>
              <Radio className="font-normal" value={false}>
                Tour đoàn thể (doanh nghiệp)
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Hình thức ăn:"
            name="foodType"
            className="font-semibold"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group onChange={onChangeFoodType} defaultValue={value}>
              <Radio className="font-normal" value={0}>
                Ăn chay
              </Radio>
              <Radio className="font-normal" value={1}>
                Ăn mặn
              </Radio>
              <Radio className="font-normal" value={2}>
                Có người ăn chay, có người ăn mặn
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Flex vertical gap={32}>
            <Form.Item
              label="Mô tả yêu cầu:"
              className="font-semibold"
              name="description"
            >
              <TextArea
                rows={6}
                showCount
                maxLength={225}
                className="h-10"
                placeholder="Nhập mô tả yêu cầu (VD: 10 người ăn chay, dị ứng món gì, .... )"
                style={{
                  height: 120,
                  //   resize: 'none',
                }}
              />
            </Form.Item>
          </Flex>

          <Form.Item
            name="locations"
            label={
              <span>
                Địa điểm mong muốn: &nbsp;
                <Tooltip title="Bạn có thể chọn nhiều địa điểm trên thanh tìm kiếm!">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            className="font-semibold"
            rules={[
              {
                required: true,
                message: "Chọn ít nhất 1 địa điểm mà bạn muốn thăm",
              },
            ]}
          >
            <AddressSearchMultiple onChange={handleLocationsChange} />
          </Form.Item>
          {/* Chỉ hiển thị Form.Item này nếu người dùng chọn từ 2 địa điểm trở lên */}
          {selectedLocations.length > 1 && (
            <Form.Item
              name="mainLocation"
              label="Địa điểm mong muốn chính (địa điểm quan trọng nhất):"
              className="font-semibold"
              rules={[
                { required: true, message: "Chọn một địa điểm quan trọng" },
              ]}
            >
              <Select
                placeholder="Chọn địa điểm chính"
                showSearch
                style={{ width: "100%" }}
                value={mainLocation}
                onChange={handleMainLocationChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {selectedLocations.map((location) => (
                  <Option key={location.location} value={location.provinceName}>
                    {location.description}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            name="startLocation"
            label={
              <span>
                Địa chỉ xuất phát hoặc tập trung: &nbsp;
                <Tooltip
                  title="Nếu điền địa chỉ xuất phát hoặc tập trung thì chúng tôi sẽ chuẩn bị cho bạn phương tiện đưa đón phù hợp 
                  tới điểm bắt đầu chuyến tour!"
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            className="font-semibold"
            // rules={[
            //   {
            //     required: true,
            //     message: (
            //       <div>
            //         <WarningFilled /> Vui lòng chọn địa chỉ xuất phát hoặc tập
            //         trung!
            //       </div>
            //     ),
            //   },
            // ]}
          >
            <AddressSearch onChange={handleAddressSelect} />
          </Form.Item>

          <Form.Item
            name="range-picker"
            label={
              <span>
                Khoảng thời gian rảnh để diễn ra tour: &nbsp;
                <Tooltip title="Nên cho chúng tôi khoảng thời gian rảnh của bạn để diễn ra tour để chúng tôi sắp xếp tour tốt nhất cho bạn.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            className="font-semibold"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="ml-3"
            >
              <Form.Item
                name="startDate"
                label="Từ ngày:"
                rules={[
                  { required: true, message: " Vui lòng chọn thời gian!" },
                ]}
              >
                <DatePicker showTime />
              </Form.Item>

              <Form.Item
                name="endDate"
                label="Đến ngày:"
                rules={[
                  { required: true, message: " Vui lòng chọn thời gian!" },
                ]}
              >
                <DatePicker showTime />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            name="daysTour"
            label="Số ngày diễn ra tour:"
            className="flex font-semibold"
            rules={[{ required: true, message: "Vui lòng nhập số ngày!" }]}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="ml-3"
            >
              <Form.Item
                name="days"
                label="Số ngày:"
                className="font-normal "
                style={{ flex: "1", marginRight: "50px" }} // Adjust the margin as needed
              >
                <InputNumber
                  className="text-right"
                  min={1}
                  value={days}
                  onChange={handleDaysChange}
                />
              </Form.Item>
              <Form.Item
                name="nights"
                label="Số đêm:"
                className="font-normal"
                style={{ flex: "1", marginRight: "50px" }} // Adjust the margin as needed
              >
                <InputNumber
                  readOnly
                  min={1}
                  value={nights}
                  placeholder={nights}
                  className="text-right"
                />
              </Form.Item>
            </div>
          </Form.Item>

          <div className="flex justify-around">
            <Form.Item
              name="adult"
              label={
                <span>
                  Số người lớn: &nbsp;
                  <Tooltip title="Người lớn tính từ 1m4 trở lên và 16 tuổi trở lên">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              className="w-1/2 font-semibold"
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Vui lòng nhập số lượng!
                    </div>
                  ),
                },
              ]}
            >
              <InputNumber min={1} onChange={calculateTotalRooms} />
            </Form.Item>

            <Form.Item
              name="children"
              label={
                <span>
                  Số trẻ em: &nbsp;
                  <Tooltip title="Trẻ em tính từ 1m4 trở xuống và 16 tuổi trở xuống">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              className="font-semibold w-1/2"
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Vui lòng nhập số lượng!
                    </div>
                  ),
                },
              ]}
            >
              <InputNumber min={0} onChange={calculateTotalRooms} />
            </Form.Item>
          </div>
          <div>
            <p className="font-semibold text-lg mb-4">Loại phòng mong muốn:</p>
            <RoomTypeSection
              form={form}
              onRoomTypeChange={calculateTotalRooms}
            />
          </div>

          <Form.Item
            label={
              <span>
                URL tour đề xuất (nếu có): &nbsp;
                <Tooltip title="URL tour đề xuất bởi Cóc Travel hoặc nguồn khác">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            name="recommnendedTourUrl"
            className="font-semibold "
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="budget"
            label={
              <span>
                Ngân sách: &nbsp;
                <Tooltip title="Ngân sách của bạn cho tour yêu cầu tính trên đầu người (người lớn).">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            className="font-semibold w-1/2"
            rules={[
              {
                required: true,
                message: (
                  <div>
                    <WarningFilled /> Vui lòng nhập ngân sách của bạn!
                  </div>
                ),
              },
            ]}
          >
            <div className="flex align-items-center">
              <InputNumber min={0} className="w-[40%]" />
              <span className="ml-2">VND / Người</span>
            </div>
          </Form.Item>

          <Flex vertical gap={32}>
            <Form.Item
              label="Yêu cầu khác:"
              className="font-semibold"
              name="note"
            >
              <TextArea
                rows={6}
                showCount
                maxLength={225}
                className="h-10"
                placeholder="Nhập yêu cầu khác (VD: Vé máy bay di chuyển khứ hồi, Phương tiện di chuyển trong tour, phòng mấy người, loại phòng lưu trú, ...)"
                style={{
                  height: 120,
                  //   resize: 'none',
                }}
              />
            </Form.Item>
          </Flex>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("You must agree to the terms and conditions")
                      ),
              },
            ]}
          >
            <Checkbox onChange={onCheckboxChange}>
              Tôi đã đọc và đồng ý với các điều khoản, chính sách liên quan tới
              Tour riêng tư.
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-2"
              disabled={!isChecked}
            >
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default TourRequestForm;
