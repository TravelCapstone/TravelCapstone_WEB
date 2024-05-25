import React, { useState } from "react";
import { Select, Button, Space } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

function TourguideAssignment(props) {
  const [tourGuides, setTourGuides] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "SĐT: ...",
      cost: "500.000/ngày",
      location: "Lâm Đồng",
    },
  ]);

  const handleAddTourGuide = () => {
    setTourGuides([
      ...tourGuides,
      {
        id: tourGuides.length + 1,
        name: "",
        phone: "",
        cost: "",
        location: "",
      },
    ]);
  };

  const handleRemoveTourGuide = (id) => {
    setTourGuides((prevTourGuides) =>
      prevTourGuides.filter((guide) => guide.id !== id)
    );
  };

  const handleChangeTourGuideInfo = (id, field, value) => {
    setTourGuides(
      tourGuides.map((guide) =>
        guide.id === id ? { ...guide, [field]: value } : guide
      )
    );
  };

  const handleGetData = () => {
    console.log("Tour Guides:", tourGuides);
  };

  return (
    <div className="my-16">
      <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
        THÔNG TIN HƯỚNG DẪN VIÊN
      </h2>
      <div className="flex flex-col justify-center items-center">
        {tourGuides.map((guide) => (
          <div
            key={guide.id}
            className="relative flex flex-col mb-4 w-full max-w-lg"
          >
            <div className="flex flex-col justify-evenly items-center">
              <div className="flex items-center justify-evenly w-full mb-2">
                <span className="font-bold w-1/2 text-center">
                  Tên hướng dẫn viên
                </span>
                <p className="font-bold w-1/2 text-center">
                  Nơi hướng dẫn du lịch
                </p>
              </div>
              <div className="flex items-center w-full">
                <Select
                  className="w-1/2"
                  value={`${guide.name} ${guide.phone} Tiền công: ${guide.cost}`}
                  onChange={(value) =>
                    handleChangeTourGuideInfo(guide.id, "name", value)
                  }
                >
                  <Select.Option
                    value={`${guide.name} ${guide.phone} Tiền công: ${guide.cost}`}
                  >
                    {`${guide.name} ${guide.phone} Tiền công: ${guide.cost}`}
                  </Select.Option>
                </Select>
                <Select
                  className="w-1/2 ml-4"
                  value={guide.location}
                  onChange={(value) =>
                    handleChangeTourGuideInfo(guide.id, "location", value)
                  }
                >
                  <Select.Option value={guide.location}>
                    {guide.location}
                  </Select.Option>
                </Select>
              </div>
            </div>
            <Button
              className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
              icon={<CloseOutlined />}
              onClick={() => handleRemoveTourGuide(guide.id)}
            />
          </div>
        ))}
      </div>
      <Space className="mt-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddTourGuide}
        >
          Thêm hướng dẫn viên
        </Button>
        <Button onClick={handleGetData}>Log dữ liệu</Button>
      </Space>
    </div>
  );
}

export default TourguideAssignment;
