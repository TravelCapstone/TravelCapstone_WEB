import React, { useEffect, useState } from "react";
import { Table, InputNumber, Button, Form, Input } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const ExpectedPriceOption = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      item: "Tổng phí dịch vụ trong gói",
      price: 5000000,
      quantity: 12,
      total: 2500000,
    },
    {
      key: "2",
      item: "Dự phòng phí",
      price: 50000,
      quantity: 12,
      total: 2500000,
    },
    {
      key: "3",
      item: "Khăn lạnh - cty chuẩn bị",
      price: 565,
      quantity: 150,
      total: 84750,
    },
    {
      key: "4",
      item: "Nước (Thùng)",
      price: 65000,
      quantity: 7,
      note: "Nước number 1",
      total: 455000,
    },
    {
      key: "5",
      item: "Bảo hiểm - gói 7 ngày - mức 50 triệu",
      price: 2000,
      quantity: 55,
      note: "BH mức 10 triệu/vụ",
      total: 110000,
    },
    {
      key: "6",
      item: "Phí dịch vụ tổ chức của T&T",
      price: 15000000,
      quantity: 1,
      total: 15000000,
    },
  ]);

  const columns = [
    {
      title: "Nội dung",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
  ];

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData = {
      key: Date.now(),
      item: "",
      price: 0,
      quantity: 0,
    };
    setDataSource([...dataSource, newData]);
  };

  const handleFieldChange = (value, key, column) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, [column]: value });
      setDataSource(newData);
    }
  };

  const totalCost = dataSource.reduce((sum, record) => sum + record.total, 0);
  const vat = totalCost * 0.08;
  const finalPrice = totalCost + vat;

  return (
    <>
      <div>
        <h3 className="font-bold text-lg my-2 text-mainColor">Gói Tiết Kiệm</h3>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
        <div className="total text-right">
          <p>Total Cost: {totalCost.toLocaleString()} VND</p>
          <p>VAT (8%): {vat.toLocaleString()} VND</p>
          <p>Final Price: {finalPrice.toLocaleString()} VND</p>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg my-2 text-mainColor">Gói Cơ Bản</h3>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
        <div className="total text-right">
          <p>Total Cost: {totalCost.toLocaleString()} VND</p>
          <p>VAT (8%): {vat.toLocaleString()} VND</p>
          <p>Final Price: {finalPrice.toLocaleString()} VND</p>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg my-2 text-mainColor">Gói Nâng Cao</h3>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
        <div className="total text-right">
          <p>Total Cost: {totalCost.toLocaleString()} VND</p>
          <p>VAT (8%): {vat.toLocaleString()} VND</p>
          <p>Final Price: {finalPrice.toLocaleString()} VND</p>
        </div>
      </div>
    </>
  );
};

export default ExpectedPriceOption;
