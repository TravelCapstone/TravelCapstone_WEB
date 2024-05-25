import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Form,
  Select,
  DatePicker,
  Space,
  TreeSelect,
  InputNumber,
  Table,
  Popconfirm,
  Input,
  Checkbox,
  Typography,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  ratingLabels,
  servingActor,
  servingFoodsQuantity,
} from "../../../../../../settings/globalStatus";
import { v4 as uuidv4 } from "uuid";
import { getAllFacilityByLocationAndRatingId } from "../../../../../../api/FacilityApi";
import { getMenuByFacilityId } from "../../../../../../api/MenuApi";
import { getPriceOfMeal } from "../../../../../../api/SellPriceHistoryApi";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item style={{ margin: 0 }} name={[record.name, dataIndex]}>
          {children}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const DaySection = ({
  basePath,
  name,
  form,
  mealTime,
  remove,
  ratingId,
  setRatingId,
  facilities,
  fetchMenus,
  menus,
  districtId,
  request,
}) => {
  const [menuStates, setMenuStates] = useState({});
  const [selectedMeals, setSelectedMeals] = useState({});
  const [priceRanges, setPriceRanges] = useState({});
  const [selectedFacilities, setSelectedFacilities] = useState({});
  const [servingQuantities, setServingQuantities] = useState({});

  console.log("menuStates", menuStates);

  const handleFacilityChange = async (fieldKey, facilityId) => {
    const fetchedMenus = await fetchMenus(facilityId);
    setMenuStates((prevStates) => ({
      ...prevStates,
      [fieldKey]: fetchedMenus,
    }));
    setSelectedFacilities((prevStates) => ({
      ...prevStates,
      [fieldKey]: facilityId,
    }));
  };

  const handleMealChange = (fieldKey, mealTypeId) => {
    setSelectedMeals((prevStates) => ({
      ...prevStates,
      [fieldKey]: mealTypeId,
    }));
  };

  const handleServingQuantityChange = async (fieldKey, servingQuantity) => {
    setServingQuantities((prevStates) => ({
      ...prevStates,
      [fieldKey]: servingQuantity,
    }));

    const facilityId = selectedFacilities[fieldKey];
    if (!facilityId) return;

    const facility = facilities.find((f) => f.id === facilityId);
    const ratingId = facility ? facility.facilityRating.id : null;

    if (!ratingId) return;
    debugger;
    const prices = await getPriceOfMeal(
      districtId,
      request.privateTourResponse.id,
      ratingId,
      1,
      1,
      10
    );
    setPriceRanges((prevStates) => ({
      ...prevStates,
      [fieldKey]: prices,
    }));
  };

  const filteredRatingLabels = Object.entries(ratingLabels).filter(
    ([key, value]) => key >= 5 && key <= 9
  );
  const columns = [
    {
      title: "Bữa",
      dataIndex: "mealTypeId",
      fixed: "left",
      width: 100,
      render: (_, record) => (
        <Form.Item
          name={[record.name, "mealTypeId"]}
          rules={[{ required: true, message: "Please select a meal!" }]}
          style={{ margin: 0 }}
        >
          <Select
            placeholder="Chọn Bữa"
            className="!w-[100px]"
            value={record.meal || mealTime}
            disabled={!mealTime}
            onChange={(value) => handleMealChange(record.key, value)}
          >
            <Option value={0}>Sáng</Option>
            <Option value={1}>Trưa</Option>
            <Option value={2}>Tối</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Tự túc",
      dataIndex: "selfServe",
      render: (_, record) => (
        <Form.Item
          name={[record.name, "selfServe"]}
          valuePropName="checked"
          style={{ margin: 0 }}
        >
          <Checkbox />
        </Form.Item>
      ),
    },
    {
      title: "Hạng quán ăn",
      dataIndex: "RatingId",
      width: 300,
      render: (_, record) => (
        <Form.Item
          name={[record.name, "RatingId"]}
          rules={[{ required: true, message: "Please select a RatingId!" }]}
          style={{ margin: 0 }}
        >
          <Select
            placeholder="Chọn hạng quán ăn"
            className="!w-[200px]"
            onChange={(value) => setRatingId(value)}
          >
            {filteredRatingLabels.map(([key, label]) => (
              <Option key={key} value={key}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Tên Quán",
      dataIndex: "facilityId",
      width: 300,
      render: (_, record) => (
        <Form.Item
          name={[record.name, "facilityId"]}
          rules={[{ required: true, message: "Please select a name!" }]}
          style={{ margin: 0 }}
        >
          <Select
            placeholder="Chọn quán ăn"
            className="!w-[200px]"
            onChange={(value) => {
              form.setFieldValue([record.name, "facilityId"], value);
              handleFacilityChange(record.key, value);
            }}
          >
            {facilities.map((facility) => {
              const facilityInfo = `${facility.name} - ${facility.address}, ${facility.communce.name}, ${facility.communce.district.name}, ${facility.communce.district.province.name}`;
              return (
                <Option key={facility.id} value={facility.id}>
                  <Tooltip title={facilityInfo}>{facilityInfo}</Tooltip>
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Loại bàn ăn",
      dataIndex: "servingQuantity",
      width: 300,
      render: (_, record) => (
        <Form.Item
          name={[record.name, "servingQuantity"]}
          rules={[
            { required: true, message: "Please select a serving quantity!" },
          ]}
          style={{ margin: 0 }}
        >
          <Select
            placeholder="Chọn loại bàn ăn"
            className="!w-[200px]"
            onChange={(value) => {
              form.setFieldValue([record.name, "servingQuantity"], value);
              handleServingQuantityChange(record.key, value);
            }}
          >
            <Option value={1}>Bàn lẻ người</Option>
            <Option value={10}>Bàn 10 người</Option>
          </Select>
        </Form.Item>
      ),
    },

    {
      title: "Menu Gói Tiết Kiệm",
      width: 300,
      dataIndex: "economyMenu",
      render: (_, record) => (
        <Form.Item name={[record.name, "economyMenu"]} style={{ margin: 0 }}>
          <Select
            placeholder="Select menu"
            className="!w-[200px]"
            mode="multiple"
          >
            {(menuStates[record.key] || menus)
              .filter(
                (menu) => menu.menu.mealTypeId === selectedMeals[record.key]
              )
              .map((menu) => {
                const MenuInfo = `${menu.menu.name} - ${menu.menu.facilityService.name}`;
                return (
                  <Option key={menu.menu.id} value={menu.menu.id}>
                    <Tooltip title={MenuInfo}>{MenuInfo}</Tooltip>
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Menu Gói Cơ Bản",
      width: 300,
      dataIndex: "basicMenu",
      render: (_, record) => (
        <Form.Item name={[record.name, "basicMenu"]} style={{ margin: 0 }}>
          <Select
            placeholder="Select menu"
            className="!w-[200px]"
            mode="multiple"
          >
            {(menuStates[record.key] || menus)
              .filter(
                (menu) => menu.menu.mealTypeId === selectedMeals[record.key]
              )
              .map((menu) => {
                const MenuInfo = `${menu.menu.name} - ${menu.menu.facilityService.name}`;
                return (
                  <Option key={menu.menu.id} value={menu.menu.id}>
                    <Tooltip title={MenuInfo}>{MenuInfo}</Tooltip>
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Menu Gói Nâng Cao",
      width: 300,
      dataIndex: "advancedMenu",
      render: (_, record) => (
        <Form.Item name={[record.name, "advancedMenu"]} style={{ margin: 0 }}>
          <Select
            placeholder="Select menu"
            className="!w-[200px]"
            mode="multiple"
          >
            {(menuStates[record.key] || menus)
              .filter(
                (menu) => menu.menu.mealTypeId === selectedMeals[record.key]
              )
              .map((menu) => {
                const MenuInfo = `${menu.menu.name} - ${menu.menu.facilityService.name}`;
                return (
                  <Option key={menu.menu.id} value={menu.menu.id}>
                    <Tooltip title={MenuInfo}>{MenuInfo}</Tooltip>
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Khoảng giá",
      dataIndex: "priceRange",
      width: 300,
      render: (_, record) => {
        const prices = priceRanges[record.key] || [];
        console.log("prices", prices);
        return (
          <div>
            {prices.map((price) => (
              <div key={price.serviceTypeId}>
                {price.minPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
                ~{" "}
                {price.maxPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Xoá",
      dataIndex: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => remove(record.name)}
          icon={<DeleteOutlined />}
        ></Button>
      ),
    },
  ];

  return (
    <Form.List name={name} initialValue={[{}]}>
      {(fields, { add, remove }) => (
        <>
          <div className="overflow-x-auto rounded-xl max-w-[1100px]">
            <Table
              dataSource={fields.map((field) => ({ ...field, key: field.key }))}
              columns={columns}
              pagination={false}
              components={{ body: { cell: EditableCell } }}
            />
          </div>
          <Button
            onClick={() =>
              add({
                key: uuidv4(),
                meal: "",
                selfServe: false,
                name: "",
                tableType: "",
                economyMenu: "",
                basicMenu: "",
                advancedMenu: "",
              })
            }
            icon={<PlusOutlined />}
            type="dashed"
            style={{ width: "100%", marginTop: 16 }}
          >
            Thêm bữa ăn
          </Button>
        </>
      )}
    </Form.List>
  );
};

const RestaurantSection = ({
  form,
  basePath,
  selectedDistrict,
  selectedProvince,
  request,
}) => {
  const [mealTime, setMealTime] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [RatingId, setRatingId] = useState(null);
  const [menus, setMenus] = useState([]);

  console.log("CHỌN THỊ TRẤN", selectedDistrict);
  console.log("CHỌN TỈNH", selectedProvince);
  console.log("RatingId", RatingId);
  console.log("Facilities Nè", facilities);
  console.log("menus Nè", menus);

  const fetchFacilities = async (ratingId, data) => {
    const response = await getAllFacilityByLocationAndRatingId(
      ratingId,
      data,
      1,
      10
    );
    setFacilities(response.result.items);
  };

  const fetchMenus = async (facilityId) => {
    try {
      const response = await getMenuByFacilityId(facilityId, 1, 10);
      setMenus(response.result.items);
      return response.result.items || []; // Return an empty array if no items
    } catch (error) {
      console.error("Error fetching menus:", error);
      return [];
    }
  };

  useEffect(() => {
    const ratingId = RatingId; // replace with dynamic ratingId if needed
    const data = {
      provinceId: selectedProvince,
      districtId: selectedDistrict,
    };
    fetchFacilities(ratingId, data);
  }, [RatingId, selectedProvince, selectedDistrict]);

  const handleDateChange = (date, dateString) => {
    const hour = date.hour();
    if (hour < 9) {
      setMealTime("breakfast");
    } else if (hour >= 9 && hour < 14) {
      setMealTime("lunch");
    } else {
      setMealTime("dinner");
    }
  };

  const indexToAlpha = (index) => {
    // Converts 0 to 'a', 1 to 'b', etc.
    return String.fromCharCode(97 + index);
  };

  return (
    <Form.List name={[...basePath, "restaurants"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <div key={field.key}>
              <div className="flex justify-between ">
                <div className="font-semibold mr-5 text-lg">
                  {indexToAlpha(index)}.
                </div>
                <div>
                  <Form.Item
                    name={[field.name, "date"]}
                    className=" font-semibold"
                    label="Ngày"
                    rules={[
                      {
                        required: true,
                        message: "Please choose the stay dates!",
                      },
                    ]}
                  >
                    <DatePicker
                      showTime
                      className="!min-w-[300px]"
                      onChange={handleDateChange}
                    />
                  </Form.Item>
                  <DaySection
                    form={form}
                    remove={remove}
                    name={[field.name, "days"]}
                    mealTime={mealTime}
                    ratingId={RatingId}
                    setRatingId={setRatingId}
                    facilities={facilities}
                    fetchMenus={fetchMenus}
                    menus={menus}
                    districtId={selectedDistrict}
                    request={request}
                  />
                </div>
                <DeleteOutlined
                  onClick={() => remove(field.name)}
                  className="self-start mt-2"
                />
              </div>
            </div>
          ))}
          <Form.Item>
            <Button
              onClick={() => add({ key: uuidv4() })}
              className="bg-teal-600 font-semibold text-white"
              type="dashed"
              style={{ marginTop: 16 }}
              icon={<PlusOutlined />}
            >
              Thêm ngày dùng bữa
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default RestaurantSection;
