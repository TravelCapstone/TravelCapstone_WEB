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

const DaySection = ({ basePath, name }) => {
  const columns = [
    {
      title: "Bữa",
      dataIndex: "meal",
      render: (_, record) => (
        <Form.Item
          name={[record.name, "meal"]}
          rules={[{ required: true, message: "Please select a meal!" }]}
          style={{ margin: 0 }}
        >
          <Select>
            <Option value="breakfast">Sáng</Option>
            <Option value="lunch">Trưa</Option>
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
      render: (_, record) => (
        <Form.Item
          name={[record.name, "name"]}
          rules={[{ required: true, message: "Please select a name!" }]}
          style={{ margin: 0 }}
        >
          <Select>
            <Option value="Bích Phương">Bích Phương</Option>
            <Option value="Mạnh Cường">Mạnh Cường</Option>
            <Option value="Gia Khiêm">Gia Khiêm</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Loại bàn",
      dataIndex: "tableType",
      render: (_, record) => (
        <Form.Item
          name={[record.name, "tableType"]}
          rules={[{ required: true, message: "Please select a table type!" }]}
          style={{ margin: 0 }}
        >
          <Select placeholder="Chọn loại bàn">
            <Option value="type1">Bàn loại 1</Option>
            <Option value="type2">Bàn loại 2</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Menu Gói Tiết Kiệm",
      dataIndex: "economyMenu",
      render: (_, record) => (
        <Form.Item name={[record.name, "economyMenu"]} style={{ margin: 0 }}>
          <Select placeholder="Select menu">
            <Option value="menu1">Menu 1</Option>
            <Option value="menu2">Menu 2</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Menu Gói Cơ Bản",
      dataIndex: "basicMenu",
      render: (_, record) => (
        <Form.Item name={[record.name, "basicMenu"]} style={{ margin: 0 }}>
          <Select placeholder="Select menu">
            <Option value="menu1">Menu 1</Option>
            <Option value="menu2">Menu 2</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Menu Gói Nâng Cao",
      dataIndex: "advancedMenu",
      render: (_, record) => (
        <Form.Item name={[record.name, "advancedMenu"]} style={{ margin: 0 }}>
          <Select placeholder="Select menu">
            <Option value="menu1">Menu 1</Option>
            <Option value="menu2">Menu 2</Option>
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
  const indexToAlpha = (index) => {
    // Converts 0 to 'a', 1 to 'b', etc.
    return String.fromCharCode(97 + index);
  };
  return (
    <Form.List name={[...basePath, "restaurants"]} initialValue={[{}]}>
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
                    <DatePicker className="!min-w-[300px]" />
                  </Form.Item>
                  <DaySection form={form} name={[field.name, "days"]} />
                </div>
                <DeleteOutlined
                  onClick={() => remove(field.name)}
                  className="self-start mt-2"
                />
              </div>
            </div>
          ))}
          <Form.Item className="w-1/3">
            <Button
              onClick={() => add({ key: uuidv4() })}
              className="bg-teal-600 font-semibold text-white"
              type="dashed"
              style={{ marginTop: 16 }}
              icon={<PlusOutlined />}
            >
              Thêm ngày
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default RestaurantSection;
