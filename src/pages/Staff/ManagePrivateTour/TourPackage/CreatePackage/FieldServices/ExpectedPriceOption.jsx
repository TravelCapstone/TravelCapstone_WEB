import React, { useEffect, useState } from "react";
import { Table, InputNumber, Button, Form, Input } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { usePrice } from "../../../../../../context/PriceContext";

const ExpectedPriceOption = ({ request }) => {
  const {
    getTotalCost,
    commonPrices,
    packagePrices,
    updateCommonPrice,
    updatePackagePrice,
  } = usePrice();

  const [basicPrices, setBasicPrices] = useState({});
  const [standardPrices, setStandardPrices] = useState({});
  const [premiumPrices, setPremiumPrices] = useState({});

  const { common, basic, standard, premium } = getTotalCost();

  const packageColumns = [
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

  const calculateTotalWithVAT = (total) => {
    const vat = total * 0.08;
    return {
      total,
      vat,
      finalPrice: total + vat,
    };
  };

  useEffect(() => {
    setBasicPrices(calculateTotalWithVAT(basic));
    setStandardPrices(calculateTotalWithVAT(standard));
    setPremiumPrices(calculateTotalWithVAT(premium));
  }, [basic, standard, premium]);

  const quantity =
    request?.privateTourResponse?.numOfAdult +
      request?.privateTourResponse?.numOfChildren || 1;

  const pricePerPaxBasic = basicPrices.finalPrice / quantity;
  const pricePerPaxStandard = standardPrices.finalPrice / quantity;
  const pricePerPaxPremium = premiumPrices.finalPrice / quantity;

  return (
    <>
      <div>
        <h3 className="font-bold text-lg my-2 text-mainColor">Gói Tiết Kiệm</h3>
        <Table
          columns={packageColumns}
          dataSource={[
            {
              key: "common",
              item: "Tổng phí dịch vụ chung",
              price: common,
              quantity: 1,
              total: common,
              note: "",
            },
            ...packagePrices.basic,
          ]}
          pagination={false}
        />
        <div className="total text-right">
          <p>Tổng thành tiền: {basicPrices.total?.toLocaleString()} VND</p>
          <p>VAT (8%): {basicPrices.vat?.toLocaleString()} VND</p>
          <p>
            Tổng giá cuối cùng: {basicPrices.finalPrice?.toLocaleString()} VND
          </p>

          <p className="text-lg font-semibold my-4">
            Giá trên đầu người:{" "}
            <span className="text-mainColor font-bold">
              {" "}
              {pricePerPaxBasic?.toLocaleString()} VND / Pax
            </span>
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg my-2 text-mainColor">Gói Cơ Bản</h3>
        <Table
          columns={packageColumns}
          dataSource={[
            {
              key: "common",
              item: "Tổng phí dịch vụ chung",
              price: common,
              quantity: 1,
              total: common,
              note: "",
            },
            ...packagePrices.standard,
          ]}
          pagination={false}
        />
        <div className="total text-right">
          <p>Tổng thành tiền: {standardPrices.total?.toLocaleString()} VND</p>
          <p>VAT (8%): {standardPrices.vat?.toLocaleString()} VND</p>
          <p>
            Tổng giá cuối cùng: {standardPrices.finalPrice?.toLocaleString()}{" "}
            VND
          </p>

          <p className="text-lg font-semibold my-4">
            Giá trên đầu người:{" "}
            <span className="text-mainColor font-bold">
              {" "}
              {pricePerPaxStandard?.toLocaleString()} VND / Pax
            </span>
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg my-2 text-mainColor">Gói Nâng Cao</h3>
        <Table
          columns={packageColumns}
          dataSource={[
            {
              key: "common",
              item: "Tổng phí dịch vụ chung",
              price: common,
              quantity: 1,
              total: common,
              note: "",
            },
            ...packagePrices.premium,
          ]}
          pagination={false}
        />
        <div className="total text-right">
          <p>Tổng thành tiền: {premiumPrices.total?.toLocaleString()} VND</p>
          <p>VAT (8%): {premiumPrices.vat?.toLocaleString()} VND</p>
          <p>
            Tổng giá cuối cùng: {premiumPrices.finalPrice?.toLocaleString()} VND
          </p>
          <p className="text-lg font-semibold my-4">
            Giá trên đầu người:{" "}
            <span className="text-mainColor font-bold">
              {" "}
              {pricePerPaxPremium?.toLocaleString()} VND / Pax
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ExpectedPriceOption;
