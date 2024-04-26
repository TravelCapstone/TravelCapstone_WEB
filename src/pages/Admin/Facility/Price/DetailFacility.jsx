import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DetailFacilityService from "./DetailFacilityService";
import DetailPrice from "./DetailPrice";
function DetailFacility() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    console.log(index);
    setActiveTab(index);
  };
  const tabs = [
    {
      label: "Dịch vụ",
      content: <DetailFacilityService id={id} />,
    },
    {
      label: "Quản lí giá nhập xuất",
      content: <DetailPrice id={id} />,
    },
  ];

  return (
    <>
      <div className="tabs">
        <div className="tab-headers mx-10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`mx-2 tab-header ${activeTab === index ? "font-bold border-b-2" : ""}`}
              onClick={() => handleTabChange(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {tabs[activeTab].content}
      </div>
    </>
  );
}

export default DetailFacility;
