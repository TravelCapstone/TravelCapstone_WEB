import React, { useState } from "react";
import {
  Select,
  Button,
  Space,
  DatePicker,
  Card,
  Typography,
  ConfigProvider,
} from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import "../../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

function TourguideAssignment({ provinceList }) {
  const [record, setRecord] = useState([]);
  const [data, setData] = useState({}); // Store fetched data by province ID

  const addTourGuide = (provinceId) => {
    setRecord((prevTourGuides) => [
      ...prevTourGuides,
      {
        provinceId,
        id: prevTourGuides.length + 1,
        dateRange: [null, null],
        selectedGuide: null,
      },
    ]);
  };

  const removeTourGuide = (id) => {
    setRecord((prevTourGuides) =>
      prevTourGuides.filter((guide) => guide.id !== id)
    );
  };

  const handleChangeTourGuideInfo = async (id, field, value) => {
    setRecord((prevTourGuides) =>
      prevTourGuides.map((guide) =>
        guide.id === id ? { ...guide, [field]: value } : guide
      )
    );

    if (field === "dateRange") {
      const [startDate, endDate] = value;
      if (startDate && endDate) {
        const provinceId = record.find((guide) => guide.id === id).provinceId;
        const response = await fetchAvailableTourGuides(
          startDate.toISOString(),
          endDate.toISOString(),
          provinceId
        );

        if (response) {
          setData((prevData) => ({
            ...prevData,
            [provinceId]: response.result.items,
          }));
        }
      }
    }
  };
  const logData = () => {
    console.log("Current records:", record);
  };
  const fetchAvailableTourGuides = async (startDate, endDate, provinceId) => {
    try {
      const response = await axios.get(
        `https://travel-be.azurewebsites.net/tour-guide-assignment/get-available-tour-guide/5CDE5BFC-B286-459B-8CD1-1E560F87936A
        ?pageNumber=1&pageSize=10&startDate=${startDate}&endDate=${endDate}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching available tour guides:", error);
      return null;
    }
  };

  return (
    <div className="my-16">
      <h3 className="text-mainColor font-bold text-xl border-b-2">
        THÔNG TIN HƯỚNG DẪN VIÊN
      </h3>
      <div className="flex flex-wrap justify-center">
        {provinceList.map((province) => (
          <Card
            key={province.provinceId}
            className="m-4 w-full"
            title={province.provinceName}
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => addTourGuide(province.provinceId)}
              >
                Thêm hướng dẫn viên
              </Button>
            }
          >
            {(
              record.filter(
                (guide) => guide.provinceId === province.provinceId
              ) || []
            ).map((guide) => (
              <div
                key={guide.id}
                className="mb-4 grid grid-cols-1 md:grid-cols-3"
              >
                <div className="md:px-10">
                  <strong>Thời gian: </strong>
                  <ConfigProvider locale={viVN}>
                    <RangePicker
                      placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                      value={guide.dateRange}
                      onChange={(dates) =>
                        handleChangeTourGuideInfo(guide.id, "dateRange", dates)
                      }
                    />
                  </ConfigProvider>
                </div>
                <div>
                  <strong>Hướng dẫn viên: </strong>
                  <Select
                    placeholder="Chọn hướng dẫn viên"
                    value={guide.selectedGuide}
                    onChange={(value) =>
                      handleChangeTourGuideInfo(
                        guide.id,
                        "selectedGuide",
                        value
                      )
                    }
                  >
                    {(data[province.provinceId] || []).length > 0 &&
                      data[province.provinceId].map((item, index) => (
                        <Option key={index} value={item.id}>
                          {`${item.firstName} ${item.lastName} - Tiền lương: 300.000đ/ngày`}
                        </Option>
                      ))}
                  </Select>
                </div>
                <Button
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => removeTourGuide(guide.id)}
                />
              </div>
            ))}
          </Card>
        ))}
      </div>
      <Space className="mt-4">
        <Button onClick={logData}>Log dữ liệu</Button>
      </Space>
    </div>
  );
}

export default TourguideAssignment;
