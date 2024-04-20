import React, { useState } from "react";
import { AutoComplete } from "antd";

function AddressSearch() {
  const [options, setOptions] = useState([]);

  const searchAddress = async (value) => {
    const fakeData = [
      { value: "1 Lê Duẩn, Quận 1, Hồ Chí Minh" },
      { value: "5 Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội" },
      { value: "72 Lê Thánh Tôn, Quận 1, Hồ Chí Minh" },
      { value: "128 Trần Quang Khải, Quận 1, Hồ Chí Minh" },
      { value: "360 Kim Mã, Ba Đình, Hà Nội" },
    ];

    const filteredData = value
      ? fakeData.filter((option) =>
          option.value.toLowerCase().includes(value.toLowerCase())
        )
      : [];

    setOptions(filteredData);
  };

  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  const onChange = (data) => {
    searchAddress(data);
  };

  return (
    <>
      <AutoComplete
        options={options}
        onSelect={onSelect}
        onSearch={onChange}
        placeholder="Tìm địa chỉ ..."
        style={{ width: "100%" }}
      />
    </>
  );
}

export default AddressSearch;
