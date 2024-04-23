import React, { useState } from "react";
import { AutoComplete, Tag } from "antd";
import { getAutoCompleteSuggestions } from "../LocationApi";

const AddressSearchMultiple = ({ onChange }) => {
  const [options, setOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSearch = async (searchText) => {
    if (!searchText.trim()) {
      setOptions([]);
      return;
    }
    // Assume getAutoCompleteSuggestions is already defined
    setTimeout(async () => {
      const suggestions = await getAutoCompleteSuggestions(searchText);
      const formattedSuggestions = suggestions.map((suggestion) => ({
        value: suggestion.description,
        label: (
          <div>
            {suggestion.compound.commune}, {suggestion.compound.district},{" "}
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
    }, 2000);

    setOptions(formattedSuggestions);
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
        placeholder="Enter an address..."
      />
    </>
  );
};

export default AddressSearchMultiple;
