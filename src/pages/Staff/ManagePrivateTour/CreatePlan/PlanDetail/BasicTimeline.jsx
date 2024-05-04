import React, { useState, useEffect } from "react";

function BasicTimeline(props) {
  const [timelineItems, setTimelineItems] = useState([]);

  const handleAddTimeline = () => {
    setTimelineItems([
      ...timelineItems,
      {
        key: timelineItems.length,
        location: "",
        date: "",
      },
    ]);
  };

  const handleChangeLocation = (index, location) => {
    setTimelineItems(
      timelineItems.map((item, i) =>
        i === index ? { ...item, location } : item
      )
    );
  };

  const handleChangeDate = (index, date) => {
    setTimelineItems(
      timelineItems.map((item, i) => (i === index ? { ...item, date } : item))
    );
  };

  const handleRemoveTimeline = (index) => {
    setTimelineItems(timelineItems.filter((_, i) => i !== index));
  };

  const handleLogData = () => {
    console.log("Dữ liệu timelineItems:", timelineItems);
  };

  useEffect(() => {
    // Log dữ liệu khi component được render
    handleLogData();
  }, []);

  return (
    <>
      <div>
        <h3 className="font-bold text-base my-2 text-mainColor">
          LỊCH TRÌNH CƠ BẢN
        </h3>
        <div className="flex flex-wrap justify-center">
          {timelineItems.map((item, index) => (
            <div key={index} className="mr-4 mb-4 relative flex flex-col">
              <select
                name=""
                id=""
                className="select select-bordered"
                value={item.location}
                onChange={(e) => handleChangeLocation(index, e.target.value)}
              >
                <option value="">TP. Hồ Chí Minh</option>
              </select>
              <div className="hidden md:flex md:items-center">
                <div className="hidden md:flex md:items-end">
                  <i className="fa-solid fa-minus"></i>
                  <i className="fa-solid fa-minus"></i>
                  <i className="fa-solid fa-minus"></i>
                  <i className="fa-solid fa-minus"></i>
                  <i className="fa-solid fa-minus"></i>
                  <i className="fa-solid fa-minus"></i>
                  <i className="fa-solid fa-map-pin text-4xl text-center"></i>
                  <i className="fa-solid fa-minus"></i>
                  <i className="fa-solid fa-minus"></i>
                  <i className="fa-solid fa-minus"></i>
                  <i className="fa-solid fa-minus"></i>
                  <i className="fa-solid fa-minus"></i>
                  <i className="fa-solid fa-minus"></i>
                </div>
              </div>
              <input
                type="date"
                value={item.date}
                onChange={(e) => handleChangeDate(index, e.target.value)}
              />
              <button
                className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
                onClick={() => handleRemoveTimeline(index)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))}
        </div>
        <button
          className="btn bg-mainColor text-white rounded-lg mt-4"
          onClick={handleAddTimeline}
          disabled={timelineItems.length >= 16}
        >
          Thêm mốc thời gian
        </button>
        <button
          className="btn bg-gray-500 text-white rounded-lg mt-4 ml-4"
          onClick={handleLogData}
        >
          Log dữ liệu
        </button>
      </div>
    </>
  );
}

export default BasicTimeline;
