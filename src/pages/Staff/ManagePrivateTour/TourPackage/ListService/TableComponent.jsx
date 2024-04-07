import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Select } from "antd";
import Highlighter from "react-highlight-words";
import useCallApi from "../../../../../hook/useCallApi";
import api from "../../../../../config/axios";

const { Option } = Select;

function TableComponent({ type, onSelectRecord }) {
  const [selectionType, setSelectionType] = useState("radio");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log(selectedKeys);
    console.log(confirm);
    console.log(dataIndex);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const { loading, error, callApi, resetError } = useCallApi();
  const [data, setData] = useState();
  const [locationID, setLocationID] = useState();
  const fetch = async () => {
    const response = await api.get(
      "/get-all-province-by-private-tour-request-id/C8DE0D2A-D6EC-468A-993F-27A6F19F009D"
    );
    setLocationID(response.data.result[0].id);
    setData(response.data);
  };

  //console.log(type);

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    alertFail(error);
    resetError();
  }
  const handleSelectClass = (value) =>{
    console.log(value)
    setLocationID(value)
  }
  console.log(locationID)

  const [listService, setListService] = useState([]);
  
const getListService =  async ()  =>{
  const res = await api.get(`/get-service-by-province-id/${locationID}/${type}`)
  console.log(res.data.result.items)
  setListService(res.data.result.items)
}

  
  useEffect(() =>{
    getListService();


  },[locationID])
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
  };

  const handleClearAll = (selectedKeys, confirm, dataIndex, clearFilters) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
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
          <div>
            <Button
              onClick={() =>
                clearFilters &&
                handleClearAll(selectedKeys, confirm, dataIndex, clearFilters)
              }
              size="small"
              style={{
                width: 90,
              }}
            >
              Clear all
            </Button>
          </div>

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
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
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
      <Select
        value= {locationID}
        onChange={(value) => handleSelectClass(value)}
      >
        {data &&
          data.result &&
          data.result.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
      </Select>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={listService}
      />
      
    </>
  );
}

export default TableComponent;
