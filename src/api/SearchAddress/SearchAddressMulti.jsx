import React, { useState, useEffect } from "react";
import { AutoComplete, Tag } from "antd";
import { getAutoCompleteSuggestions } from "../LocationApi";

const AddressSearchMultiple = ({ onChange }) => {
  const [options, setOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

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

    let formattedSuggestions = [];

    // Thiết lập một timeout mới để gọi API sau một khoảng thời gian nhất định (ví dụ: 300ms)
    const newDebounceTimeout = setTimeout(async () => {
      const suggestions = await getAutoCompleteSuggestions(searchText);
      console.log("suggestions", suggestions);
      if (suggestions.isSuccess) {
        formattedSuggestions = suggestions.result.map((suggestion) => ({
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
            location: suggestion.description,
            districtName: suggestion.compound.district,
            communeName: suggestion.compound.commune,
          },
        }));
        setOptions(formattedSuggestions);
      } else {
        setOptions([]); // Set to empty array if there is no success
      }
    }, 300);

    setDebounceTimeout(newDebounceTimeout);
  };

  const handleSelect = (value, option) => {
    const detailedItem = {
      description: value,
      ...option.data,
    };
    if (
      !selectedItems.find(
        (item) => item.description === detailedItem.description
      )
    ) {
      const newSelectedItems = [...selectedItems, detailedItem];
      setSelectedItems(newSelectedItems);
      onChange(newSelectedItems); // Pass complete data to parent
    }
  };

  const handleClose = (removedItem) => {
    const newSelectedItems = selectedItems.filter(
      (item) => item.location !== removedItem.location
    );
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems); // Notify parent about the change
  };

  return (
    <>
      {selectedItems.map((item) => (
        <Tag
          className="my-4"
          key={item.location}
          closable
          onClose={() => handleClose(item)}
        >
          {item.description}
        </Tag>
      ))}
      <AutoComplete
        options={options}
        onSelect={handleSelect}
        onSearch={handleSearch}
        style={{ width: "100%" }}
        placeholder="Nhập địa chỉ chi tiết..."
      />
    </>
  );
};

export default AddressSearchMultiple;
