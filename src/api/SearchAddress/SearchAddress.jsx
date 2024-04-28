import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { getAutoCompleteSuggestions } from "../LocationApi";

const AddressSearch = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  console.log("options", options);

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimeout); // Xóa timeout khi component bị unmount
    };
  }, [debounceTimeout]);

  const handleSearch = async (searchText) => {
    clearTimeout(debounceTimeout); // Xóa timeout hiện tại

    // Nếu không có văn bản tìm kiếm, đặt options về mảng rỗng và trả về
    if (!searchText.trim()) {
      setOptions([]);
      return;
    }

    try {
      // Thiết lập một timeout mới để gọi API sau một khoảng thời gian nhất định (ví dụ: 300ms)
      const newDebounceTimeout = setTimeout(async () => {
        const suggestions = await getAutoCompleteSuggestions(searchText);
        if (suggestions.isSuccess) {
          const formattedSuggestions = suggestions.map((suggestion) => ({
            value: suggestion.description,
            label: (
              <div>
                {suggestion.description} {suggestion.compound.commune},{" "}
                {suggestion.compound.district},{" "}
                <strong>{suggestion.compound.province}</strong>
              </div>
            ),
            data: {
              provinceName: suggestion.compound.province,
              districtName: suggestion.compound.district,
              communeName: suggestion.compound.commune,
            },
          }));
          setOptions(formattedSuggestions);
        }
      }, 300);

      setDebounceTimeout(newDebounceTimeout);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setOptions([]);
    }
  };

  const handleSelect = (selectedValue, option) => {
    console.log("Selected option:", option);
    // Check what's actually in the option
    if (option && option.data) {
      onChange(selectedValue, option.data);
    } else {
      onChange(selectedValue, null); // Ensure calling component knows that there's no details
      console.log("No details available for selected option");
    }
  };

  const handleChange = (data) => {
    onChange(data); // Cho phép người dùng sửa đổi input sau khi chọn một gợi ý
  };

  return (
    <AutoComplete
      options={options}
      onSelect={handleSelect}
      onSearch={handleSearch}
      onChange={handleChange}
      placeholder="Enter an address..."
      style={{ width: "100%" }}
      value={value}
    />
  );
};

export default AddressSearch;
