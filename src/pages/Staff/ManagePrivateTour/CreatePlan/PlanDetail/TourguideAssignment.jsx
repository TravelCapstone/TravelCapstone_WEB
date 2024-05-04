import React, { useState } from "react";

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
    <>
      <div className="my-16">
        <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
          THÔNG TIN HƯỚNG DẪN VIÊN
        </h2>
        <div className="flex  justify-center item-center flex-col">
          {tourGuides.map((guide) => (
            <div key={guide.id} className="relative flex flex-col">
              <div className="flex flex-col justify-evenly item-center">
                <div className="flex items-center justify-evenly">
                  <span className="m-6 font-bold">Tên hướng dẫn viên</span>
                  <p className="mx-5 font-bold">Nơi hướng dẫn du lịch</p>
                </div>
                <div className="flex items-center">
                  <select
                    name=""
                    className="select select-bordered w-6/12"
                    id=""
                    value={`${guide.name} ${guide.phone} Tiền công: ${guide.cost}`}
                    onChange={(e) =>
                      handleChangeTourGuideInfo(
                        guide.id,
                        "name",
                        e.target.value
                      )
                    }
                  >
                    <option
                      value={`${guide.name} ${guide.phone} Tiền công: ${guide.cost}`}
                    >
                      {`${guide.name} ${guide.phone} Tiền công: ${guide.cost}`}
                    </option>
                  </select>
                  <select
                    name=""
                    className="select select-bordered w-5/12 mx-4"
                    id=""
                    value={guide.location}
                    onChange={(e) =>
                      handleChangeTourGuideInfo(
                        guide.id,
                        "location",
                        e.target.value
                      )
                    }
                  >
                    <option value={guide.location}>{guide.location}</option>
                  </select>
                </div>
              </div>
              <button
                className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full"
                onClick={() => handleRemoveTourGuide(guide.id)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ))}
        </div>
        <button
          className="btn bg-mainColor w46 text-white rounded-lg mt-4"
          onClick={handleAddTourGuide}
        >
          Thêm hướng dẫn viên
        </button>
        <button className="btn rounded-lg mt-4" onClick={handleGetData}>
          Log dữ liệu
        </button>
      </div>
    </>
  );
}

export default TourguideAssignment;
