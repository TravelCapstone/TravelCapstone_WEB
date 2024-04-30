import React, { useState, useEffect } from "react";
import {
  getAllCommunesByDistrictId,
  getAllDistrictsByProvinceId,
  getAllProvince,
} from "../../../api/LocationApi";
import LoadingComponent from "../../Loading/LoadingComponent";

const LocationSelect = ({
  log,
  isFlex = false,
  isReset = false,
  handleReset,
}) => {
  const [selectedProvince, setSelectedProvince] = useState("default");
  const [selectedDistrict, setSelectedDistrict] = useState("default");
  const [selectedCommune, setSelectedCommunce] = useState("default");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchProvinces = async () => {
    setIsLoading(true);
    const data = await getAllProvince();
    if (data.isSuccess) {
      setProvinces(data.result.items);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProvinces();
  }, []);
  const handleProvinceChange = async (event) => {
    setIsLoading(true);

    const provinceId = event.target.value;
    if (provinceId !== null || provinceId !== "") {
      const data = await getAllDistrictsByProvinceId(provinceId);
      if (data.isSuccess) {
        setDistricts(data.result.items);
      }
      setIsLoading(false);

      setSelectedProvince(provinceId);
      setSelectedDistrict("default");
      setSelectedCommunce("default");
    }
  };
  const handleDistrictChange = async (event) => {
    setIsLoading(true);

    const districtId = event.target.value;
    if (districtId !== null || districtId !== "") {
      const data = await getAllCommunesByDistrictId(districtId);
      if (data.isSuccess) {
        setCommunes(data.result.items);
      }
      setIsLoading(false);
      setSelectedDistrict(districtId);
      setSelectedCommunce("default");
    }
  };

  const handleCommunceChange = (event) => {
    if (event.target.value !== null && event.target.value !== "") {
      setSelectedCommunce(event.target.value);
    }
  };

  const logData = () => {
    const data = {
      provinceId: selectedProvince === "default" ? null : selectedProvince,
      districtId: selectedDistrict === "default" ? null : selectedDistrict,
      communeId: selectedCommune === "default" ? null : selectedCommune,
    };
    log(data);
  };

  const handleResetComponent = () => {
    setSelectedProvince("default");
    setSelectedDistrict("default");
    setSelectedCommunce("default");
    handleReset();
    logData();
  };
  useEffect(() => {
    if (isReset === true) {
      handleResetComponent();
    }
  }, [isReset]);
  useEffect(() => {
    logData();
  }, [selectedProvince, selectedDistrict, selectedCommune]);
  return (
    <>
      <LoadingComponent isLoading={isLoading} />
      <div
        className={isFlex ? "flex gap-4" : "flex justify-evenly md:flex-col"}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tỉnh/Thành phố</span>
          </label>
          <select
            className="select select-bordered"
            value={selectedProvince}
            onChange={async (e) => handleProvinceChange(e)}
          >
            <option value="default">Chọn Tỉnh/Thành phố</option>
            {provinces.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Quận/Huyện</span>
          </label>
          <select
            className="select select-bordered"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={selectedProvince === "default" ? true : false}
          >
            <option value="">Chọn Quận/Huyện</option>
            {selectedProvince &&
              districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Phường/Xã</span>
          </label>
          <select
            className="select select-bordered"
            value={selectedCommune}
            onChange={handleCommunceChange}
            disabled={selectedDistrict === "default" ? true : false}
          >
            <option value="default">Chọn Phường/Xã</option>
            {selectedDistrict &&
              communes.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default LocationSelect;
