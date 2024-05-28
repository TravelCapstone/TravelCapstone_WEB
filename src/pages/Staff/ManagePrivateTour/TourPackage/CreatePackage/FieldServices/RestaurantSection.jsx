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
  EyeOutlined,
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
  const [selectedMealTypes, setSelectedMealTypes] = useState([]);
  const [selfServeStates, setSelfServeStates] = useState({});

  console.log("menuStates", menuStates);
  console.log("selectedMeals", selectedMeals);
  console.log("selfServeStates", selfServeStates);

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

    const facility = facilities.find((f) => f.id === facilityId);
    const ratingId = facility ? facility.facilityRating.id : null;

    if (!ratingId) return;

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

  const handleMealTypeChange = (value, fieldKey, index) => {
    // Update selectedMeals
    setSelectedMeals((prevStates) => ({
      ...prevStates,
      [fieldKey]: value,
    }));

    // Update selectedMealTypes
    const updatedMealTypes = [...selectedMealTypes];
    updatedMealTypes[index] = value;
    setSelectedMealTypes(updatedMealTypes);
  };

  const handleRemove = (field, remove) => {
    // Remove from selectedMealTypes
    const updatedMealTypes = selectedMealTypes.filter(
      (_, i) => i !== field.index
    );
    setSelectedMealTypes(updatedMealTypes);

    // Remove from selectedMeals
    setSelectedMeals((prevMeals) => {
      const newMeals = { ...prevMeals };
      delete newMeals[field.key];
      return newMeals;
    });

    // Remove item
    remove(field.name);
  };

  const handleServingQuantityChange = (fieldKey, servingQuantity) => {
    setServingQuantities((prevStates) => ({
      ...prevStates,
      [fieldKey]: servingQuantity,
    }));
  };

  const handleSelfServeChange = (fieldKey, value) => {
    setSelfServeStates((prevStates) => ({
      ...prevStates,
      [fieldKey]: value,
      value,
    }));

    if (value) {
      // Set facilityId to null
      setSelectedFacilities((prevStates) => ({
        ...prevStates,
        [fieldKey]: null,
      }));
      form.setFieldsValue({
        [fieldKey]: {
          facilityId: null,
        },
      });
    }
  };

  const filteredRatingLabels = Object.entries(ratingLabels).filter(
    ([key, value]) => key >= 5 && key <= 9
  );
  const columns = (remove) => [
    {
      title: "Bữa",
      dataIndex: "mealTypeId",
      fixed: "left",
      width: 100,
      render: (_, record, index) => (
        <Form.Item
          name={[record.name, "mealTypeId"]}
          rules={[{ required: true, message: "Please select a meal!" }]}
          style={{ margin: 0 }}
        >
          <Select
            placeholder="Chọn Bữa"
            className="!w-[100px]"
            value={
              record.meal || mealTime || selectedMeals[record.key] || undefined
            }
            disabled={!mealTime}
            onChange={(value) => handleMealTypeChange(value, record.key, index)}
          >
            {[0, 1, 2].map((type) => (
              <Option
                key={type}
                value={type}
                disabled={selectedMealTypes.includes(type)}
              >
                {type === 0 ? "Sáng" : type === 1 ? "Trưa" : "Tối"}
              </Option>
            ))}
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
          <Checkbox
            onChange={(e) =>
              handleSelfServeChange(record.key, e.target.checked)
            }
          />
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
          rules={
            !selfServeStates.value
              ? [{ required: true, message: "Please select a RatingId!" }]
              : []
          }
          style={{ margin: 0 }}
        >
          <Select
            placeholder="Chọn hạng quán ăn"
            className="!w-[200px]"
            onChange={(value) => setRatingId(value)}
            disabled={selfServeStates[record.key]}
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
          rules={
            !selfServeStates.value
              ? [{ required: true, message: "Please select name!" }]
              : []
          }
          style={{ margin: 0 }}
        >
          <Select
            placeholder="Chọn quán ăn"
            className="!w-[200px]"
            onChange={(value) => {
              form.setFieldValue([record.name, "facilityId"], value);
              handleFacilityChange(record.key, value);
            }}
            disabled={selfServeStates[record.key]}
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
          rules={
            !selfServeStates.value
              ? [{ required: true, message: "Please select servingQuantity!" }]
              : []
          }
          style={{ margin: 0 }}
        >
          <Select
            placeholder="Chọn loại bàn ăn"
            className="!w-[200px]"
            disabled={selfServeStates[record.key]}
            onChange={(value) => {
              form.setFieldValue([record.name, "servingQuantity"], value);
              handleServingQuantityChange(record.key, value);
            }}
          >
            <Option value={1}>Bàn lẻ 1 người</Option>
            <Option value={10}>Bàn 10 người</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Khoảng giá",
      dataIndex: "priceRange",
      width: 400,
      render: (_, record) => {
        const prices = priceRanges[record.key] || [];
        const isLoading = !prices.length;
        const servingQuantity = servingQuantities[record.key];
        if (!selfServeStates[record.key]) {
          if (isLoading) {
            return <div>Loading...</div>;
          }
        }
        const filteredPrices = prices.filter(
          (price) => price.servingQuantity === servingQuantity
        );
        return (
          <div className="w-[150px]">
            {!selfServeStates[record.key] && filteredPrices.length > 0
              ? filteredPrices.map((price) => (
                  <div key={price.serviceTypeId}>
                    {price.servingQuantity === 1
                      ? "Bàn lẻ 1 người: "
                      : "Bàn 10 người: "}
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
                ))
              : prices.map((price) => (
                  <div key={price.serviceTypeId}>
                    {price.servingQuantity === 1
                      ? "Bàn lẻ 1 người: "
                      : "Bàn 10 người: "}
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
      title: "Menu Gói Tiết Kiệm",
      width: 300,
      dataIndex: "economyMenu",
      render: (_, record) => (
        <Form.Item name={[record.name, "economyMenu"]} style={{ margin: 0 }}>
          <Select
            placeholder="Select menu"
            className="!w-[200px]"
            mode="multiple"
            disabled={selfServeStates[record.key]}
          >
            {(menuStates[record.key] || menus)
              .filter(
                (menu) =>
                  menu.menu &&
                  menu.menu.mealTypeId === selectedMeals[record.key]
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
            disabled={selfServeStates[record.key]}
          >
            {(menuStates[record.key] || menus)
              .filter(
                (menu) =>
                  menu.menu &&
                  menu.menu.mealTypeId === selectedMeals[record.key]
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
            disabled={selfServeStates[record.key]}
            mode="multiple"
          >
            {(menuStates[record.key] || menus)
              .filter(
                (menu) =>
                  menu.menu &&
                  menu.menu.mealTypeId === selectedMeals[record.key]
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
      title: "Hành Động",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="flex justify-around">
          <Button
            type="link"
            onClick={() => {
              handleRemove(record, remove);
            }}
            icon={<DeleteOutlined />}
          />

          <Button type="link" icon={<EyeOutlined />} />
        </div>
      ),
    },
  ];

  return (
    <Form.List name={name} initialValue={[{}]}>
      {(fields, { add, remove }) => (
        <>
          <div className="overflow-x-auto rounded-xl max-w-[1100px]">
            <Table
              dataSource={fields.map((field, index) => ({
                ...field,
                key: field.key,
                index,
              }))}
              pagination={false}
              components={{ body: { cell: EditableCell } }}
              columns={columns(remove)}
            />
          </div>
          {fields.length < 3 && (
            <Button
              onClick={() => {
                const newKey = uuidv4();
                add({
                  key: newKey,
                  meal: null,
                  selfServe: false,
                  tableType: null,
                  economyMenu: [],
                  basicMenu: [],
                  advancedMenu: [],
                  priceRange: "",
                  facilityId: null,
                });
                setSelectedMealTypes([...selectedMealTypes, undefined]);
                form.setFieldsValue({ [newKey]: {} });
                setMenuStates((prevStates) => ({
                  ...prevStates,
                  [newKey]: [],
                }));
                setSelectedMeals((prevStates) => ({
                  ...prevStates,
                  [newKey]: null,
                }));
                setPriceRanges((prevStates) => ({
                  ...prevStates,
                  [newKey]: [],
                }));
                setSelectedFacilities((prevStates) => ({
                  ...prevStates,
                  [newKey]: null,
                }));
                setServingQuantities((prevStates) => ({
                  ...prevStates,
                  [newKey]: null,
                }));
              }}
              icon={<PlusOutlined />}
              type="dashed"
              style={{ width: "100%", marginTop: 16 }}
            >
              Thêm bữa ăn
            </Button>
          )}
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
                    name={[field.name, "days"]}
                    mealTime={mealTime}
                    ratingId={RatingId}
                    setRatingId={setRatingId}
                    facilities={facilities}
                    fetchMenus={fetchMenus}
                    menus={menus}
                    districtId={selectedDistrict}
                    request={request}
                    basePath={basePath}
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
