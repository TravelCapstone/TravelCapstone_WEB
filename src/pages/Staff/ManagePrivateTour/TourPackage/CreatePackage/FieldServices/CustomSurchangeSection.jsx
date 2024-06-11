import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Space, Select, Tooltip } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { getOperationFees } from "../../../../../../api/FeeApi";
import { formatPrice } from "../../../../../../utils/Util";

const CustomSurchangeSection = ({ form, quantity, request, insurances }) => {
  const [fees, setFees] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  console.log("fees", fees);
  console.log("insurances", insurances);

  const fetchData = async () => {
    const data = await getOperationFees(quantity);
    if (data.isSuccess) {
      setFees(data.result);
      form.setFieldsValue({
        organizationCost: data.result.minOrganizationCost,
        contigencyFeePerPerson: data.result.minContingencyFee,
        escortFee: data.result.minEscortFee,
        operatingFee: data.result.minOperatingFee,
        assurancePricePerPerson: insurances.price,
      });
      calculateTotalCost();
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
      contigencyFeePerPerson +
      escortFee +
      operatingFee +
      assurancePricePerPerson;
    setTotalCost(total);
  };

  useEffect(() => {
    calculateTotalCost();
  }, [quantity, form]);

  const minAssurancePricePerPerson = insurances.price;

  return (
    <>
      <Form.Item
        name="organizationCost"
        label={
          <span>
            Phí dịch vụ tổ chức: &nbsp;
            <Tooltip
              title={`Phí dịch vụ tổ chức phải nằm trong khoảng từ ${formatPrice(fees?.minOrganizationCost)} đến ${formatPrice(fees?.maxOrganizationCost)}`}
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
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
          value={fees?.minOrganizationCost}
          placeholder={fees?.minOrganizationCost}
          defaultValue={fees.minOrganizationCost}
        />
      </Form.Item>
      <Form.Item
        label={
          <span>
            Phí dự phòng mỗi người: &nbsp;
            <Tooltip
              title={`Phí dự phòng mỗi người phải nằm trong khoảng từ ${formatPrice(fees?.minContingencyFee)} đến ${formatPrice(fees?.maxContingencyFee)}`}
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
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
          value={fees?.minContingencyFee}
          placeholder={fees?.minContingencyFee}
          defaultValue={fees.minContingencyFee}
        />
      </Form.Item>
      <Form.Item
        label={
          <span>
            Phí khác: &nbsp;
            <Tooltip
              title={`Phí khác phải nằm trong khoảng từ ${formatPrice(fees?.minEscortFee)} đến ${formatPrice(fees?.maxEscortFee)}`}
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        name="escortFee"
        rules={[
          {
            type: "number",
            min: fees?.minEscortFee,
            max: fees.maxEscortFee,
            message: `Phí khác phải nằm trong khoảng từ ${formatPrice(fees?.minEscortFee)} đến ${formatPrice(fees?.maxEscortFee)}`,
          },
        ]}
      >
        <InputNumber
          min={fees?.minEscortFee}
          max={fees?.maxEscortFee}
          onChange={() => calculateTotalCost()}
          value={fees?.minEscortFee}
          placeholder={fees?.minEscortFee}
          defaultValue={fees.minEscortFee}
        />
      </Form.Item>
      <Form.Item
        label={
          <span>
            Phí vận hành: &nbsp;
            <Tooltip
              title={`Phí vận hành phải nằm trong khoảng từ ${formatPrice(fees?.minOperatingFee)} đến ${formatPrice(fees?.maxOperatingFee)}`}
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
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
          value={fees?.minOperatingFee}
          placeholder={fees?.minOperatingFee}
          defaultValue={fees.minOperatingFee}
        />
      </Form.Item>
      {minAssurancePricePerPerson && (
        <Form.Item
          label={
            <span>
              Phí bảo hiểm trên đầu người: &nbsp;
              <Tooltip
                title={`Phí vận hành phải nằm trong khoảng từ ${formatPrice(fees?.minAssurancePricePerPerson)} đến ${formatPrice(fees?.maxAssurancePricePerPerson)}`}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="assurancePricePerPerson"
          rules={[
            {
              type: "number",
              min: minAssurancePricePerPerson,
              message: `Phí vận hành phải nằm trong khoảng từ ${formatPrice(minAssurancePricePerPerson)} đến ${formatPrice(fees?.maxAssurancePricePerPerson)}`,
            },
          ]}
        >
          <InputNumber
            min={minAssurancePricePerPerson}
            onChange={() => calculateTotalCost()}
            value={minAssurancePricePerPerson}
            placeholder={minAssurancePricePerPerson}
            defaultValue={minAssurancePricePerPerson}
          />
        </Form.Item>
      )}
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
