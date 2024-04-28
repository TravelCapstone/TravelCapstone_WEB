import React, { useState, useEffect } from "react";
import MenuTable from "./MenuTable";

function FoodModal(props) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    console.log(index);
    setActiveTab(index);
  };

  useEffect(() => {
    return () => {};
  }, []);
  const tabs = [
    {
      label: "Ăn sáng",
      content: <MenuTable />,
    },
    {
      label: "Ăn trưa",
      content: <MenuTable />,
    },
    {
      label: "Ăn tối",
      content: <MenuTable />,
    },
  ];

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="bg-mainColor text-white rounded-md p-2"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Chọn
      </button>
      <dialog id="my_modal_4" className=" modal ">
        <div className="modal-box w-11/12 max-w-7xl">
          <h3 className="font-bold text-lg">Chọn nhà hàng</h3>
          <p className="py-4">
            <div className="tabs">
              <div className="tab-headers">
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
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>{" "}
    </>
  );
}

export default FoodModal;
