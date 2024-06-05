import React from "react";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BreadcrumbWithBackButton = ({ breadcrumbItems, currentTab }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex justify-between items-center mb-4 font-semibold">
      <div className="flex items-center space-x-2 text-mainColor">
        <a href="/" className="flex items-center text-mainColor">
          <HomeOutlined className="mr-1" />
        </a>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className="mx-2 text-gray-400">›</span>
            <a href={item.url} className="hover:underline">
              {item.name}
            </a>
          </React.Fragment>
        ))}
        <span className="mx-2 text-gray-400">›</span>
        <span className="text-gray-500">{currentTab}</span>
      </div>
      <Button onClick={handleBack} className="font-semibold">
        Back
      </Button>
    </div>
  );
};

export default BreadcrumbWithBackButton;
