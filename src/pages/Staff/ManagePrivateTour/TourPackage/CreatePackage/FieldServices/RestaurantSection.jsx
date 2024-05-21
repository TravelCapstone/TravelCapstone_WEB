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

const DaySection = ({ basePath, name, form, mealTime, remove }) => {
  const columns = [
    {
      title: "Bữa",
      dataIndex: "meal",
      width: 100,
      render: (_, record) => (
        <Form.Item
          name={[record.name, "meal"]}
          rules={[{ required: true, message: "Please select a meal!" }]}
          style={{ margin: 0 }}
        >
          <Select
            placeholder="Chọn Bữa"
            value={record.meal || mealTime}
            disabled={!mealTime}
          >
            {/* {mealTime === "breakfast" && ( */}
            <Option value="breakfast">Sáng</Option>
            {/* )} */}
            {/* {(mealTime === "breakfast" || mealTime === "lunch") && ( */}
            <Option value="lunch">Trưa</Option>
            {/* )} */}
            <Option value="dinner">Tối</Option>
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
      title: "Tên Quán",
      dataIndex: "name",
      width: 300,
      render: (_, record) => (
        <Form.Item
          name={[record.name, "name"]}
          rules={[{ required: true, message: "Please select a name!" }]}
          style={{ margin: 0 }}
        >
          <Select placeholder="Tên quán ăn">
            <Option value="Bích Phương">Bích Phương</Option>
            <Option value="Mạnh Cường">Mạnh Cường</Option>
            <Option value="Gia Khiêm">Gia Khiêm</Option>
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
          <Select placeholder="Select menu">
            <Option value="menu1">Menu 1 - Bàn 5 người</Option>
            <Option value="menu2">Menu 2 - Bàn 10 người</Option>
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
          <Select placeholder="Select menu">
            <Option value="menu1">Menu 1 - Bàn 5 người</Option>
            <Option value="menu2">Menu 2 - Bàn 10 người</Option>
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
          <Select placeholder="Select menu">
            <Option value="menu1">Menu 1 - Bàn 5 người</Option>
            <Option value="menu2">Menu 2 - Bàn 10 người</Option>
          </Select>
        </Form.Item>
      ),
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
          <Table
            dataSource={fields.map((field) => ({ ...field, key: field.key }))}
            columns={columns}
            pagination={false}
            components={{ body: { cell: EditableCell } }}
          />
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

const RestaurantSection = ({ form, basePath }) => {
  const [mealTime, setMealTime] = useState(null);

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
              <div className="flex justify-between">
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
