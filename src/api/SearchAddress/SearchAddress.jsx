import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import {
  getAutoCompleteSuggestions,
  getLocationAllProvince,
} from "../LocationApi";

const AddressSearch = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);
  console.log("options", options);

  const handleSearch = async (searchText) => {
    if (!searchText.trim()) {
      setOptions([]);
      return;
    }
    try {
      const suggestions = await getAutoCompleteSuggestions(searchText);
      const formattedSuggestions = suggestions.map((suggestion) => ({
        value: suggestion.description, // Assuming 'description' is the string to be displayed
        label: (
          <div>
            <strong>{suggestion.compound.province}</strong> -{" "}
            {suggestion.compound.district}, {suggestion.compound.commune}
          </div>
        ),
        data: {
          districtName: suggestion.compound.district,
          communeName: suggestion.compound.commune,
        },
      }));
      setOptions(formattedSuggestions);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setOptions([]);
    }
  };

  const handleSelect = (selectedValue, option) => {
    console.log("Selected option:", option); // Check what's actually in the option
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
