import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Space, Select } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getOperationFees } from "../../../../../../api/FeeApi";
import { formatPrice } from "../../../../../../utils/Util";
const CustomSurchangeSection = ({ form, quantity }) => {
  const [fees, setFees] = useState({});
  const fetchData = async () => {
    const data = await getOperationFees(quantity);
    if (data.isSuccess) {
      setFees(data.result);
    }
  };
  useEffect(() => {
    fetchData();
  }, [quantity]);
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
        <InputNumber />
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
        <InputNumber />
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
        <InputNumber />
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
        <InputNumber />
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
        <InputNumber />
      </Form.Item>
    </>
  );
};
export default CustomSurchangeSection;
