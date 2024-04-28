import React, { useState, useEffect } from "react";
import {
  getAllCommunesByDistrictId,
  getAllDistrictsByProvinceId,
  getAllProvince,
} from "../../../api/LocationApi";

const LocationSelect = ({ log, isFlex = false }) => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCommunce, setSelectedCommunce] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communces, setCommunces] = useState([]);

  const fetchProvinces = async () => {
    const data = await getAllProvince();
    if (data.isSuccess) {
      setProvinces(data.result.items);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (event) => {
    const provinceId = event.target.value;
    const data = await getAllDistrictsByProvinceId(provinceId);
    if (data.isSuccess) {
      setDistricts(data.result.items);
    }
    setSelectedProvince(provinceId);
    setSelectedDistrict(null);
    setSelectedCommunce(null);
  };

  const handleDistrictChange = async (event) => {
    const districtId = event.target.value;
    const data = await getAllCommunesByDistrictId(districtId);
    if (data.isSuccess) {
      setCommunces(data.result.items);
    }
    setSelectedDistrict(districtId);
    setSelectedCommunce(null);
  };

  const handleCommunceChange = (event) => {
    setSelectedCommunce(event.target.value);
  };

  const logData = () => {
    const data = {
      provinceId: selectedProvince,
      districtId: selectedDistrict,
      communceId: selectedCommunce,
    };
    log(data);
  };

  useEffect(() => {
    logData();
  }, [selectedProvince, selectedDistrict, selectedCommunce]);
  return (
    <div className={isFlex ? "flex gap-4" : ""}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Tỉnh/Thành phố</span>
        </label>
        <select
          className="select select-bordered"
          value={selectedProvince}
          onChange={async (e) => handleProvinceChange(e)}
        >
          <option value="">Chọn Tỉnh/Thành phố</option>
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
          disabled={!selectedProvince}
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
          value={selectedCommunce}
          onChange={handleCommunceChange}
          disabled={!selectedDistrict}
        >
          <option value="">Chọn Phường/Xã</option>
          {selectedDistrict &&
            communces.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSelect;
