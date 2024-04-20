import React, { useState } from "react";
import { AutoComplete } from "antd";

const AddressSearch = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);

  const searchAddress = async (searchText) => {
    const fakeData = [
      { value: "1 Lê Duẩn, Quận 1, Hồ Chí Minh" },
      { value: "5 Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội" },
      { value: "72 Lê Thánh Tôn, Quận 1, Hồ Chí Minh" },
      { value: "128 Trần Quang Khải, Quận 1, Hồ Chí Minh" },
      { value: "360 Kim Mã, Ba Đình, Hà Nội" },
    ];

    const filteredData = searchText
      ? fakeData.filter((option) =>
          option.value.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

    setOptions(filteredData);
  };

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
  };

  const handleSearch = (searchText) => {
    searchAddress(searchText);
  };

  return (
    <AutoComplete
      options={options}
      onSelect={handleSelect}
      onSearch={handleSearch}
      placeholder="Tìm địa chỉ ..."
      style={{ width: "100%" }}
      value={value}
    />
  );
};

export default AddressSearch;
