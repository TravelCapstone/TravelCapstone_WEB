import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Select, Spin, Checkbox } from "antd";
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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [loading, setLoading] = useState(true);
  const searchInput = useRef(null);
  const [checkedListHotelOption1, setCheckedListHotelOption1] = useState([]);
  const [checkedListHotelOption2, setCheckedListHotelOption2] = useState([]);
  const [checkedListHotelOption3, setCheckedListHotelOption3] = useState([]);

  const [checkedListRestaurentOption1, setCheckedListRestaurentOption1] =
    useState([]);
  const [checkedListRestaurentOption2, setCheckedListRestaurentOption2] =
    useState([]);
  const [checkedListRestaurentOption3, setCheckedListRestaurentOption3] =
    useState([]);

  const [checkedListVehicleOption1, setCheckedListVehicleOption1] = useState(
    []
  );
  const [checkedListVehicleOption2, setCheckedListVehicleOption2] = useState(
    []
  );
  const [checkedListVehicleOption3, setCheckedListVehicleOption3] = useState(
    []
  );

  const [checkedListEntertaimentOption1, setCheckedListEntertaimentOption1] =
    useState([]);
  const [checkedListEntertaimentOption2, setCheckedListEntertaimentOption2] =
    useState([]);
  const [checkedListEntertaimentOption3, setCheckedListEntertaimentOption3] =
    useState([]);

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
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllProvince("C8DE0D2A-D6EC-468A-993F-27A6F19F009D");
      if (response?.data?.result?.length >0) {
        setLocationID(response.data.result[0].id);
        setData(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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
  const handleCheckboxChange = (record) => {
    if (option === "1") {
      if (type === "0") {
        const index = checkedListHotelOption1.findIndex(
          (item) => item.key === record.key
        );
        if (index === -1) {
          setCheckedListHotelOption1([...checkedListHotelOption1, record]);
        } else {
          setCheckedListHotelOption1(
            checkedListHotelOption1.filter((item) => item.key !== record.key)
          );
        }
      } else if (type === "1") {
        const index = checkedListRestaurentOption1.findIndex(
          (item) => item.key === record.key
        );
        if (index === -1) {
          setCheckedListRestaurentOption1([
            ...checkedListRestaurentOption1,
            record,
          ]);
        } else {
          setCheckedListRestaurentOption1(
            checkedListRestaurentOption1.filter(
              (item) => item.key !== record.key
            )
          );
        }
      } else if (type === "2") {
        const index = checkedListEntertaimentOption1.findIndex(
          (item) => item.key === record.key
        );
        if (index === -1) {
          setCheckedListEntertaimentOption1([
            ...checkedListEntertaimentOption1,
            record,
          ]);
        } else {
          setCheckedListEntertaimentOption1(
            checkedListEntertaimentOption1.filter(
              (item) => item.key !== record.key
            )
          );
        }
      } else if (type === "3") {
        const index = checkedListVehicleOption1.findIndex(
          (item) => item.key === record.key
        );
        if (index === -1) {
          setCheckedListVehicleOption1([...checkedListVehicleOption1, record]);
        } else {
          setCheckedListVehicleOption1(
            checkedListVehicleOption1.filter((item) => item.key !== record.key)
          );
        }
      }
    }else if (option === "2") {
      if (type === "0") {
        const index = checkedListHotelOption2.findIndex(
          (item) => item.key === record.key
        );
        if (index === -1) {
          setCheckedListHotelOption2([...checkedListHotelOption2, record]);
        } else {
          setCheckedListHotelOption2(
            checkedListHotelOption2.filter((item) => item.key !== record.key)
          );
        }
      } else if (type === "1") {
        const index = checkedListRestaurentOption2.findIndex(
          (item) => item.key === record.key
        );
        if (index === -1) {
          setCheckedListRestaurentOption2([
            ...checkedListRestaurentOption2,
            record,
          ]);
        } else {
          setCheckedListRestaurentOption2(
            checkedListRestaurentOption2.filter(
              (item) => item.key !== record.key
            )
          );
        }
      } else if (type === "2") {
        const index = checkedListEntertaimentOption2.findIndex(
          (item) => item.key === record.key
        );
        if (index === -1) {
          setCheckedListEntertaimentOption2([
            ...checkedListEntertaimentOption2,
            record,
          ]);
        } else {
          setCheckedListEntertaimentOption2(
            checkedListEntertaimentOption2.filter(
              (item) => item.key !== record.key
            )
          );
        }
      } else if (type === "3") {
        const index = checkedListVehicleOption2.findIndex(
          (item) => item.key === record.key
        );
        if (index === -1) {
          setCheckedListVehicleOption2([...checkedListVehicleOption2, record]);
        } else {
          setCheckedListVehicleOption2(
            checkedListVehicleOption2.filter((item) => item.key !== record.key)
          );
        }
      }
    }
  };
  useEffect(() => {
    if (type === "0" && option === "1") {
      addHotelToList1(checkedListHotelOption1);
    }
  }, [checkedListHotelOption1]);
  useEffect(() => {
    if (type === "1"&& option === "1") {
      addRestaurentToList1(checkedListRestaurentOption1);
    }
  }, [checkedListRestaurentOption1]);

  useEffect(() => {
    if (type === "3"&& option === "1") {
      addVehicleToList1(checkedListVehicleOption1);
    }
  }, [checkedListVehicleOption1]);

  useEffect(() => {
    if (type === "2" &&  option === "1") {
      addEntertainmentToList1(checkedListEntertaimentOption1);
    }
  }, [checkedListEntertaimentOption1]);



  useEffect(() => {
    if (type === "0" && option === "2") {
      addHotelToList2(checkedListHotelOption2);
    }
  }, [checkedListHotelOption2]);
  useEffect(() => {
    if (type === "1"&& option === "2") {
      addRestaurentToList2(checkedListRestaurentOption2);
    }
  }, [checkedListRestaurentOption2]);

  useEffect(() => {
    if (type === "3"&& option === "2") {
      addVehicleToList2(checkedListVehicleOption2);
    }
  }, [checkedListVehicleOption2]);

  useEffect(() => {
    if (type === "2" &&  option === "2") {
      addEntertainmentToList2(checkedListEntertaimentOption2);
    }
  }, [checkedListEntertaimentOption2]);
  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      width: "5%",
      render: (_, record) => (
        <Checkbox
          checked={
            checkedListHotelOption1.some((item) => item.key === record.key) ||
            checkedListRestaurentOption1.some(
              (item) => item.key === record.key
            ) ||
            checkedListVehicleOption1.some((item) => item.key === record.key) ||
            checkedListEntertaimentOption1.some(
              (item) => item.key === record.key
            )||


            checkedListHotelOption2.some((item) => item.key === record.key) ||
            checkedListRestaurentOption2.some(
              (item) => item.key === record.key
            ) ||
            checkedListVehicleOption2.some((item) => item.key === record.key) ||
            checkedListEntertaimentOption2.some(
              (item) => item.key === record.key
            )
          }
          onChange={() => handleCheckboxChange(record)}
        />
      ),
    },
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
        columns={columns}
        dataSource={
          listService && listService.map((item) => ({ ...item, key: item.id }))
        }
      />
    </>
  );
}

export default TableComponent;
