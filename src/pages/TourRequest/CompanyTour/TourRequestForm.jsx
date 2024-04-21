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
import { getCommuneByDistrictAndCommuneName } from "../../../api/LocationApi";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

function TourRequestForm() {
  const [value, setValue] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [days, setDays] = useState(1);
  const [nights, setNights] = useState(0);
  const [form] = Form.useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [startCommuneId, setStartCommuneId] = useState("");

  const handleAddressSelect = async (value, details) => {
    form.setFieldsValue({ startLocation: value });
    if (details) {
      const { districtName, communeName } = details;
      try {
        const communeData = await getCommuneByDistrictAndCommuneName(
          districtName,
          communeName
        );
        if (communeData && communeData.length > 0) {
          setStartCommuneId(communeData[0].id);
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
    console.log("startLocation", formValues["startLocation"]);
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
      tourId: "591b4a71-d561-46a5-8057-84fe72ce1185",
      recommnendedTourUrl: formValues["recommnendedTourUrl"],
      note: formValues["note"],
      isEnterprise: formValues["isEnterprise"],
      mainDestinationId: "1c5d0447-52fc-4881-9d0a-0477136623bd", // Id địa điểm chính
      otherLocationIds: [
        {
          address: "Phú Thọ",
          provinceId: "c686939b-480a-4ca9-a9d3-00f5bb53fb15",
        },
        {
          address: "Nghệ An",
          provinceId: "1c5d0447-52fc-4881-9d0a-0477136623bd",
        },
      ], // các Id địa điểm muốn đi
      accountId: "0d7e46a6-fa95-4a9f-b26a-aa0e7ad5d7f8", // accoundId
      // mainDestinationName: formValues["mainLocation"], // Id địa điểm chính
      // otherLocationNames: formValues["locations"],
    };
    console.log("tourData", tourData);
    try {
      const response = await createPrivateTour(tourData);

      if (response?.data?.isSuccess) {
        alertSuccess("Tour created successfully!");
      } else {
        alertFail("Failed to create tour. Please try again later.");
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

  // Hàm cập nhật state khi có sự thay đổi trong Select
  const handleLocationsChange = (value) => {
    setSelectedLocations(value);
  };

  const onChange = (e) => {
    setValue(e.target.value);
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
            label="Địa điểm mong muốn:"
            className="font-semibold"
            rules={[
              {
                required: true,
                message: "Chọn ít nhất 1 địa điểm mà bạn muốn thăm",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn địa điểm"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onChange={handleLocationsChange} // Cập nhật state khi địa điểm thay đổi
            >
              <Option value="Hà Nội">Hà Nội</Option>
              <Option value="Thành phố Hồ Chí Minh">
                Thành phố Hồ Chí Minh
              </Option>
              <Option value="Đà Nẵng">Đà Nẵng</Option>
            </Select>
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
                style={{ width: "40%  " }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {selectedLocations.map((location) => (
                  <Option key={location} value={location}>
                    {location}
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
            rules={[
              {
                required: true,
                message: (
                  <div>
                    <WarningFilled /> Vui lòng chọn địa chỉ xuất phát hoặc tập
                    trung!
                  </div>
                ),
              },
            ]}
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
                className="font-normal"
                style={{ flex: "1", marginRight: "50px" }} // Adjust the margin as needed
              >
                <InputNumber min={1} value={days} onChange={handleDaysChange} />
              </Form.Item>

              <Form.Item
                name="nights"
                label="Số đêm:"
                className="font-normal"
                style={{ flex: "1", marginLeft: "8px" }}
              >
                <Input readOnly placeholder={nights} value={nights} />
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
              <InputNumber min={1} />
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
              <InputNumber min={0} />
            </Form.Item>
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
