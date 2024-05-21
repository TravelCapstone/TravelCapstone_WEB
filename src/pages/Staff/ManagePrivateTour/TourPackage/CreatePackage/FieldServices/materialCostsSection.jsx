import React, { useEffect } from "react";
import { Form, InputNumber, Button, Space, Select, Checkbox } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const MaterialCostsSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
}) => {
  useEffect(() => {
    if (request?.privateTourResponse?.otherLocation) {
      setProvinces(
        request.privateTourResponse.otherLocation.map((loc) => ({
          id: loc.provinceId,
          name: loc.province.name,
        }))
      );
    }
  }, [request]);

  return (
    <Form.List name="materialCosts" initialValue={[{}]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Space
              direction="vertical"
              size="large"
              className="flex justify-between"
              align="baseline"
            >
              <div className="flex">
                <div>
                  <Form.Item
                    label="Name:"
                    name="{name}"
                    className="flex font-semibold"
                  >
                    <Checkbox />
                  </Form.Item>
                </div>
              </div>
            </Space>
          ))}
        </>
      )}
    </Form.List>
  );
};
export default MaterialCostsSection;
