import React, { useState } from "react";
import {
  Select,
  Button,
  Space,
  DatePicker,
  Input,
  Card,
  Typography,
} from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const { Title } = Typography;

function TourguideAssignment({ provinceList }) {
  const [tourGuides, setTourGuides] = useState([]);

  const addTourGuide = (provinceId) => {
    setTourGuides((prevTourGuides) => [
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
    setTourGuides((prevTourGuides) =>
      prevTourGuides.filter((guide) => guide.id !== id)
    );
  };

  const handleChangeTourGuideInfo = async (id, field, value) => {
    setTourGuides((prevTourGuides) =>
      prevTourGuides.map((guide) =>
        guide.id === id ? { ...guide, [field]: value } : guide
      )
    );

    if (field === "dateRange") {
      const [startDate, endDate] = value;
      if (startDate && endDate) {
        const response = await fetchAvailableTourGuides(
          startDate.toISOString(),
          endDate.toISOString()
        );
        console.log("Guide:", guide);
        console.log("Response:", response);
      }
    }
  };

  const fetchAvailableTourGuides = async (startDate, endDate) => {
    try {
      const response = await axios.get(
        `https://travel-be.azurewebsites.net/tour-guide-assignment/get-available-tour-guide/3f09967f-7a83-4084-9e21-ca0ac723b603?pageNumber=1&pageSize=10&startDate=${startDate}&endDate=${endDate}`
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
            className="m-4 w-full "
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
              tourGuides.filter(
                (guide) => guide.provinceId === province.provinceId
              ) || []
            ).map((guide) => (
              <div key={guide.id} className="mb-4 flex justify-between">
                <DatePicker.RangePicker
                  placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                  value={guide.dateRange}
                  onChange={(dates) =>
                    handleChangeTourGuideInfo(guide.id, "dateRange", dates)
                  }
                />
                <Select
                  placeholder="Chọn hướng dẫn viên"
                  value={guide.selectedGuide}
                  onChange={(value) =>
                    handleChangeTourGuideInfo(guide.id, "selectedGuide", value)
                  }
                >
                  {/* Options for selecting guides */}
                </Select>
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
        <Button>Log dữ liệu</Button>
      </Space>
    </div>
  );
}

export default TourguideAssignment;
