import React, { useState, useEffect, useRef } from "react";
import { Table, Input, Button, Form, Space } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function MaterialAssignment(props) {
  const [data, setData] = useState([]);

  const [editing, setEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [newItem, setNewItem] = useState({
    name: "",
    level: "",
    unit: "",
    quantity: "",
  });

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (editing && currentItem.id === data.length) {
      nameInputRef.current.focus();
    }
  }, [editing, currentItem.id, data.length]);

  const handleEdit = (item) => {
    setEditing(true);
    setCurrentItem(item);
  };

  const handleUpdate = (id, updatedItem) => {
    setEditing(false);
    setData(data.map((item) => (item.id === id ? updatedItem : item)));
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const item = { ...newItem, id: newId };
    setData([...data, item]);
    setNewItem({ name: "", level: "", unit: "", quantity: "" });
    handleEdit(item);
  };

  const logData = () => {
    console.log(data);
  };

  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên dụng cụ",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        editing && currentItem.id === record.id ? (
          <Input
            value={currentItem.name}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, name: e.target.value })
            }
            ref={
              editing && currentItem.id === data.length ? nameInputRef : null
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Mức độ cần thiết",
      dataIndex: "level",
      key: "level",
      render: (text, record) =>
        editing && currentItem.id === record.id ? (
          <Input
            value={currentItem.level}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, level: e.target.value })
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      render: (text, record) =>
        editing && currentItem.id === record.id ? (
          <Input
            value={currentItem.unit}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, unit: e.target.value })
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) =>
        editing && currentItem.id === record.id ? (
          <Input
            value={currentItem.quantity}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, quantity: e.target.value })
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) =>
        editing && currentItem.id === record.id ? (
          <Space size="middle">
            <Button
              icon={<CheckOutlined />}
              onClick={() => handleUpdate(record.id, currentItem)}
            />
            <Button
              icon={<CloseOutlined />}
              onClick={() => setEditing(false)}
            />
          </Space>
        ) : (
          <Space size="middle">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Space>
        ),
    },
  ];

  return (
    <div className="my-16">
      <h2 className="font-bold text-xl text-mainColor border-b-2 my-2">
        NHỮNG DỤNG CỤ CẦN THIẾT MANG THEO TOUR
      </h2>
      <div className="overflow-x-auto my-10 rounded-md shadow-md">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="id"
          footer={() => (
            <Space size="middle" align="start">
              <Input
                placeholder="Tên dụng cụ"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
              <Input
                placeholder="Mức độ cần thiết"
                value={newItem.level}
                onChange={(e) =>
                  setNewItem({ ...newItem, level: e.target.value })
                }
              />
              <Input
                placeholder="Đơn vị"
                value={newItem.unit}
                onChange={(e) =>
                  setNewItem({ ...newItem, unit: e.target.value })
                }
              />
              <Input
                placeholder="Số lượng"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: e.target.value })
                }
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                Thêm dòng
              </Button>
            </Space>
          )}
        />
      </div>
      <Button onClick={logData}>Log dữ liệu</Button>
    </div>
  );
}

export default MaterialAssignment;
