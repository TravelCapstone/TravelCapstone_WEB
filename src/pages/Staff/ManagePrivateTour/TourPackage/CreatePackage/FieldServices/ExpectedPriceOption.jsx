import { Table } from "antd";
import React from "react";

const EstimatedPriceTable = ({ numberOfPassengers, prices }) => {
  console.log("prices", prices);

  const columns = [
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (text, record) => {
        return (
          <span className={record.isParent ? "font-bold " : ""}>{text}</span>
        );
      },
    },
    {
      title: "Đơn giá ( khoảng giá) / người",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (text) =>
        `${
          text?.min.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          }) ?? 0
        } ~ ${
          text?.max.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          }) ?? 0
        }`,
    },
    {
      title: "Số lượng người",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) =>
        `${
          text?.min.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          }) ?? 0
        } ~ ${
          text?.max.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          }) ?? 0
        }`,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
  ];

  const getChildData = (price, prefix) => [
    {
      key: `${prefix}-1`,
      content: "Phí hướng dẫn viên",
      unitPrice: {
        min: price.minTourguideCost / numberOfPassengers,
        max: price.maxTourguideCost / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: { min: price.minTourguideCost, max: price.maxTourguideCost },
      note: "",
    },
    {
      key: `${prefix}-2`,
      content: "Phí tài xế",
      unitPrice: {
        min: price.minDriverCost / numberOfPassengers,
        max: price.maxDriverCost / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: { min: price.minDriverCost, max: price.maxDriverCost },
      note: "",
    },
    {
      key: `${prefix}-3`,
      content: "Phí nước lọc, khăn lạnh",
      unitPrice: {
        min: price.materialCost / numberOfPassengers,
        max: price.materialCost / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: { min: price.materialCost, max: price.materialCost },
      note: "",
    },
    {
      key: `${prefix}-4`,
      content: "Phí bảo hiểm",
      unitPrice: {
        min: price.assuranceCost / numberOfPassengers,
        max: price.assuranceCost / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: { min: price.assuranceCost, max: price.assuranceCost },
      note: "",
    },
    {
      key: `${prefix}-5`,
      content: "Phí hướng dẫn viên",
      unitPrice: {
        min: price.escortFee / numberOfPassengers,
        max: price.escortFee / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: { min: price.escortFee, max: price.escortFee },
      note: "",
    },
    {
      key: `${prefix}-6`,
      content: "Phí dự phòng",
      unitPrice: {
        min: price.contingencyFee / numberOfPassengers,
        max: price.contingencyFee / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: { min: price.contingencyFee, max: price.contingencyFee },
      note: "",
    },
    {
      key: `${prefix}-7`,
      content: "Phí vận hành",
      unitPrice: {
        min: price.operatingFee / numberOfPassengers,
        max: price.operatingFee / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: { min: price.operatingFee, max: price.operatingFee },
      note: "",
    },
    {
      key: `${prefix}-8`,
      content: "Phí tổ chức",
      unitPrice: {
        min: price.organizationCost / numberOfPassengers,
        max: price.organizationCost / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: { min: price.organizationCost, max: price.organizationCost },
      note: "",
    },
    {
      key: `${prefix}-9`,
      content: "Phí xe",
      unitPrice: {
        min: price.minVehicleCost / numberOfPassengers,
        max: price.maxVehicleCost / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: { min: price.minVehicleCost, max: price.maxVehicleCost },
      note: "",
    },
    {
      key: `${prefix}-10`,
      content: "Phí sự kiện",
      unitPrice: {
        min: price.minEventCost / numberOfPassengers,
        max: price.maxEventCost / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: { min: price.minEventCost, max: price.maxEventCost },
      note: "",
    },
  ];

  const getIndividualData = (price, prefix) => [
    {
      key: `${prefix}-1`,
      content: "Phí khách sạn",
      unitPrice: {
        min: price.minHotelCost / numberOfPassengers,
        max: price.maxHotelCost / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: { min: price.minHotelCost, max: price.maxHotelCost },
      note: "",
    },
    {
      key: `${prefix}-2`,
      content: "Phí nhà hàng",
      unitPrice: {
        min: price.minRestaurantCost / numberOfPassengers,
        max: price.maxRestaurantCost / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: {
        min: price.minRestaurantCost,
        max: price.maxRestaurantCost,
      },
      note: "",
    },
    {
      key: `${prefix}-3`,
      content: "Phí giải trí",
      unitPrice: {
        min: price.minEntertainmentCost / numberOfPassengers,
        max: price.maxEntertainmentCost / numberOfPassengers,
      },
      quantity: numberOfPassengers,
      totalPrice: {
        min: price.minEntertainmentCost,
        max: price.maxEntertainmentCost,
      },
      note: "",
    },
  ];

  const calculateTotal = (items) =>
    items.reduce(
      (total, item) => ({
        min: total.min + (item.totalPrice.min || 0),
        max: total.max + (item.totalPrice.max || 0),
      }),
      { min: 0, max: 0 }
    );

  const dataSource = prices.map((price, index) => {
    const commonCosts = getChildData(price, `${index}-common`);
    const individualCosts = getIndividualData(price, `${index}-individual`);

    const totalCommonCosts = calculateTotal(commonCosts);
    const totalIndividualCosts = calculateTotal(individualCosts);

    const totalServiceCost = totalCommonCosts.max + totalIndividualCosts.max;
    const vat = totalServiceCost * 0.08;
    const finalPrice = totalServiceCost * 1.08;
    const pricePerPerson = finalPrice / numberOfPassengers;

    return {
      key: index,
      packageName:
        price.optionClass === 0
          ? "Gói Tiết Kiệm"
          : price.optionClass === 1
            ? "Gói Cơ Bản"
            : "Gói Nâng Cao",
      children: [
        {
          key: `${index}-1`,
          content: "Tổng phí dịch vụ chung",
          unitPrice: {
            min: totalCommonCosts.min / numberOfPassengers,
            max: totalCommonCosts.max / numberOfPassengers,
          },
          quantity: numberOfPassengers,
          totalPrice: totalCommonCosts,
          note: "",
          children: commonCosts,
          isParent: true,
        },
        {
          key: `${index}-2`,
          content: "Tổng phí dịch vụ riêng",
          unitPrice: {
            min: totalIndividualCosts.min / numberOfPassengers,
            max: totalIndividualCosts.max / numberOfPassengers,
          },
          quantity: numberOfPassengers,
          totalPrice: totalIndividualCosts,
          note: "",
          children: individualCosts,
          isParent: true,
        },
      ],
      totalPriceAll: totalServiceCost,
      vat,
      finalPrice,
      pricePerPerson,
    };
  });

  const rowClassName = (record) => {
    return record.isParent ? "bg-[#6bd9ce30]" : "";
  };

  return (
    <div className="my-4">
      {dataSource.map((data, index) => (
        <div key={index} className="mb-8">
          <h4 className="font-bold text-xl my-4">{data.packageName}</h4>
          <Table
            dataSource={data.children}
            columns={columns}
            pagination={false}
            className="mb-4"
            rowClassName={rowClassName}
            expandable={{
              childrenColumnName: "children",
              defaultExpandAllRows: false,
            }}
          />
          <div className="mt-2 text-right">
            <p>
              <strong>Tổng thành tiền:</strong>{" "}
              {data.totalPriceAll.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </p>
            <p>
              <strong>VAT (8%):</strong>{" "}
              {data.vat.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </p>
            <p>
              <strong>Tổng giá cuối cùng:</strong>{" "}
              {data.finalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </p>
            <p>
              <strong>Giá trên đầu người:</strong>{" "}
              {data.pricePerPerson.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
              / Pax
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EstimatedPriceTable;
