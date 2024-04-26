import React, { useState, useEffect } from "react";
import TablePrice from "../TablePrice/TablePrice";

function DetailPrice({ id }) {
  const [listServiceCostHistory, setListServiceCostHistory] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Dịch vụ lưu trú",
      content: <TablePrice id={id} serviceType={0} />,
    },
    {
      label: "Dịch vụ ăn uống",
      content: <TablePrice id={id} serviceType={1} />,
    },
    {
      label: "Dịch vụ vui chơi giải trí",
      content: <TablePrice id={id} serviceType={2} />,
    },
    {
      label: "Dịch vụ cung cấp phương tiện",
      content: <TablePrice id={id} serviceType={3} />,
    },
    {
      label: "Dịch vụ cung cấp vé máy bay",
      content: <TablePrice id={id} serviceType={4} />,
    },
  ];
  useEffect(() => {
    return () => {};
  }, []);
  const handleTabChange = (index) => {
    console.log(index);
    setActiveTab(index);
  };
  return (
    <>
      <h3 className="font-bold text-xl text-center text-primary">
        QUẢN LÍ GIÁ NHẬP XUẤT
      </h3>
      <div className=" ">
        <div className="flex tabs mt-16 justify-center">
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
        </div>
        {tabs[activeTab].content}
      </div>
    </>
  );
}

export default DetailPrice;
