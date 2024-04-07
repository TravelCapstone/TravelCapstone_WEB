import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Select, Spin, Radio } from "antd";
import Highlighter from "react-highlight-words";
import { callApi } from "../../../../../hook/useCallApi";
import { LoadingOutlined } from "@ant-design/icons";
import { getAllProvince } from "../../../../../api/privateTourRequestApi";
const { Option } = Select;

function TableComponent({
  type,
  option,
  addHotelToList1,
  addRestaurentToList1,
  addVehicleToList1,
  addEntertainmentToList1,
  addHotelToList2,
  addRestaurentToList2,
  addVehicleToList2,
  addEntertainmentToList2,
}) {
  const [selectionType, setSelectionType] = useState("radio");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [loading, setLoading] = useState(true);
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log(selectedKeys);
    console.log(confirm);
    console.log(dataIndex);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const [data, setData] = useState([]);
  const [locationID, setLocationID] = useState();
  const fetch = async () => {
    setLoading(true);
    // const response = await callApi(
    //   "GET",
    //   "/get-all-province-by-private-tour-request-id/C8DE0D2A-D6EC-468A-993F-27A6F19F009D"
    // );
    const response = await getAllProvince(
     "C8DE0D2A-D6EC-468A-993F-27A6F19F009D"
    );
    console.log(response);
    setLocationID(response.result[0].id);
    setData(response?.result);
    setLoading(false);
  };

  //console.log(type);

  useEffect(() => {
    fetch();
  }, []);

  const handleSelectClass = (value) => {
    console.log(value);
    setLocationID(value);
  };
  console.log(locationID);

  const [listService, setListService] = useState([]);

  const getListService = async () => {
    setLoading(true);
    const res = await callApi(
      "GET",
      `/get-service-by-province-id/${locationID}/${type}`
    );
    console.log(res.result?.items);
    setListService(res.result?.items);
    setLoading(false);
  };

  useEffect(() => {
    getListService();
  }, [locationID]);
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      if (option == "1") {
        if (type == "0") {
          addHotelToList1(selectedRows);
        } 
         if (type == "1") {
          addRestaurentToList1(selectedRows);
        }
        if (type == "2") {
          addEntertainmentToList1(selectedRows);
        }
        if (type == "3") {
          addVehicleToList1(selectedRows);
        }
      }else if(option== "2"){
        if (type == "0") {
          addHotelToList2(selectedRows);
        } 
         if (type == "1") {
          addRestaurentToList2(selectedRows);
        }
        if (type == "2") {
          addEntertainmentToList2(selectedRows);
        }
        if (type == "3") {
          addVehicleToList2(selectedRows);
        }
      }
    },
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 44 }} spin />}
        spinning={loading}
        fullscreen
      />
      <Select value={locationID} onChange={(value) => handleSelectClass(value)}>
        {data &&
          data.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
      </Select>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={
          listService && listService.map((item) => ({ ...item, key: item.id }))
        }
      />
    </>
  );
}

export default TableComponent;
