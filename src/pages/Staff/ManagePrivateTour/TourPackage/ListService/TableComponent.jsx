import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

function TableComponent({ data , onSelectRecord }) {
  const [selectionType, setSelectionType] = useState("radio");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
  };

  const clearAll = () => {
    setSearchText("");
    setSearchedColumn("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 70,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Làm mới
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Loại dịch vụ",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      onSelectRecord(selectedRows[0]); 
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <>
      <Button onClick={clearAll} className="">
        Xoá bộ lọc
      </Button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      ;
    </>
  );
}

export default TableComponent;