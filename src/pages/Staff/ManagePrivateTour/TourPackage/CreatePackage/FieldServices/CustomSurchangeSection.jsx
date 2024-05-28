import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Space, Select } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getOperationFees } from "../../../../../../api/FeeApi";
import { formatPrice } from "../../../../../../utils/Util";
import { usePrice } from "../../../../../../context/PriceContext";
const CustomSurchangeSection = ({ form, quantity, request }) => {
  const [fees, setFees] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  const { updateCommonPrice, commonPrices } = usePrice();

  useEffect(() => {
    if (totalCost) {
      const quantity =
        request?.privateTourResponse?.numOfAdult +
        request?.privateTourResponse?.numOfChildren;
      const perInsurance = totalCost / quantity;
      const commonService = {
        item: "Phí dịch vụ tổ chức",
        price: perInsurance,
        quantity: 1,
        total: totalCost,
      };
      // Kiểm tra nếu dịch vụ đã tồn tại trong danh sách
      const existingServiceIndex = commonPrices.findIndex(
        (service) => service.item === commonService.item
      );
      if (existingServiceIndex !== -1) {
        // Cập nhật giá trị dịch vụ
        commonPrices[existingServiceIndex] = commonService;
      } else {
        // Thêm dịch vụ mới vào danh sách
        updateCommonPrice(commonService);
      }
    }
  }, [totalCost, updateCommonPrice]);

  const fetchData = async () => {
    const data = await getOperationFees(quantity);
    if (data.isSuccess) {
      setFees(data.result);
    }
  };

  useEffect(() => {
    fetchData();
  }, [quantity]);

  const calculateTotalCost = () => {
    const values = form.getFieldsValue();
    const {
      organizationCost = 0,
      contigencyFeePerPerson = 0,
      escortFee = 0,
      operatingFee = 0,
      assurancePricePerPerson = 0,
    } = values;
    const total =
      organizationCost +
      contigencyFeePerPerson * quantity +
      escortFee +
      operatingFee +
      assurancePricePerPerson * quantity;
    setTotalCost(total);
  };

  useEffect(() => {
    calculateTotalCost();
  }, [quantity, form]);

  return (
    <>
      <Form.Item
        label="Phí dịch vụ tổ chức"
        name="organizationCost"
        rules={[
          {
            type: "number",
            min: fees?.minOrganizationCost,
            max: fees?.maxOrganizationCost,
            message: `Phí dịch vụ tổ chức phải nằm trong khoảng từ ${formatPrice(fees?.minOrganizationCost)} đến ${formatPrice(fees?.maxOrganizationCost)}`,
          },
        ]}
      >
        <InputNumber
          min={fees?.minOrganizationCost}
          max={fees?.maxOrganizationCost}
          onChange={() => calculateTotalCost()}
        />
      </Form.Item>
      <Form.Item
        label="Phí dự phòng mỗi người"
        name="contigencyFeePerPerson"
        rules={[
          {
            type: "number",
            min: fees?.minContingencyFee,
            max: fees?.maxContingencyFee,
            message: `Phí dự phòng mỗi người phải nằm trong khoảng từ ${formatPrice(fees?.minContingencyFee)} đến ${formatPrice(fees?.maxContingencyFee)}`,
          },
        ]}
      >
        <InputNumber
          min={fees?.minContingencyFee}
          max={fees?.maxContingencyFee}
          onChange={() => calculateTotalCost()}
        />
      </Form.Item>
      <Form.Item
        label="Phí khác"
        name="escortFee"
        rules={[
          {
            type: "number",
            min: fees?.minEscortFee,
            max: fees?.maxEscortFee,
            message: `Phí khác phải nằm trong khoảng từ ${formatPrice(fees?.minEscortFee)} đến ${formatPrice(fees?.maxEscortFee)}`,
          },
        ]}
      >
        <InputNumber
          min={fees?.minEscortFee}
          max={fees?.maxEscortFee}
          onChange={() => calculateTotalCost()}
        />
      </Form.Item>
      <Form.Item
        label="Phí vận hành"
        name="operatingFee"
        rules={[
          {
            type: "number",
            min: fees?.minOperatingFee,
            max: fees?.maxOperatingFee,
            message: `Phí vận hành phải nằm trong khoảng từ ${formatPrice(fees?.minOperatingFee)} đến ${formatPrice(fees?.maxOperatingFee)}`,
          },
        ]}
      >
        <InputNumber
          min={fees?.minOperatingFee}
          max={fees?.maxOperatingFee}
          onChange={() => calculateTotalCost()}
        />
      </Form.Item>
      <Form.Item
        label="Phí bảo hiểm trên đầu người"
        name="assurancePricePerPerson"
        rules={[
          {
            type: "number",
            min: fees?.minAssurancePricePerPerson,
            max: fees?.maxAssurancePricePerPerson,
            message: `Phí vận hành phải nằm trong khoảng từ ${formatPrice(fees?.minAssurancePricePerPerson)} đến ${formatPrice(fees?.maxAssurancePricePerPerson)}`,
          },
        ]}
      >
        <InputNumber
          min={fees?.minAssurancePricePerPerson}
          max={fees?.maxAssurancePricePerPerson}
          onChange={() => calculateTotalCost()}
        />
      </Form.Item>
      <div className="font-bold text-lg mt-4">
        Tổng giá:{" "}
        {totalCost.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </div>
    </>
  );
};
export default CustomSurchangeSection;
