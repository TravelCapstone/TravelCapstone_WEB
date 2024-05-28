import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Space, Select, Checkbox } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { fetchMaterialList } from "../../../../../../api/MaterialApi";

const { Option } = Select;

const MaterialCostsSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
}) => {
  const [materials, setMaterials] = useState([]);

  const quantity =
    (request?.privateTourResponse?.numOfAdult || 0) +
    (request?.privateTourResponse?.numOfChildren || 0);
  const numOfDays = request?.privateTourResponse?.numOfDay || 1;
  const totalQuantity = quantity * numOfDays;
  console.log("quantity", quantity);
  console.log("numOfDays", numOfDays);
  console.log("totalQuantity", totalQuantity);

  console.log("materials", materials);

  useEffect(() => {
    const loadMaterials = async () => {
      const materialList = await fetchMaterialList();
      setMaterials(materialList);
    };

    loadMaterials();
  }, []);

  const handleCheckboxChange = (index, checked) => {
    const materialCosts = form.getFieldValue("materialCosts") || [];
    if (checked) {
      materialCosts[index] = {
        materialId: materials[index].id,
        quantity: totalQuantity,
      };
    } else {
      materialCosts[index] = { materialId: undefined, quantity: undefined };
    }
    form.setFieldsValue({ materialCosts });
  };

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
          {materials.map((material, index) => (
            <Space
              key={material.id}
              direction="vertical"
              size="large"
              className="flex justify-between"
              align="baseline"
            >
              <div className="flex">
                <div>
                  <Form.Item
                    name={[index, "materialId"]}
                    valuePropName="checked"
                    className="flex font-semibold"
                  >
                    <Checkbox
                      onChange={(e) =>
                        handleCheckboxChange(index, e.target.checked)
                      }
                    >
                      <p className="text-lg">{material.material.name}</p>
                    </Checkbox>
                  </Form.Item>
                </div>
                {form.getFieldValue(["materialCosts", index, "materialId"]) && (
                  <div className="flex flex-wrap">
                    <Form.Item
                      label="Số lượng:"
                      name={[index, "quantity"]}
                      className="font-semibold ml-10"
                      rules={[
                        { required: true, message: "Vui lòng nhập số lượng" },
                      ]}
                    >
                      <InputNumber
                        min={totalQuantity}
                        value={
                          form.getFieldValue([
                            "materialCosts",
                            index,
                            "quantity",
                          ]) || totalQuantity
                        }
                        className="!w-[200px] mr-10"
                      />
                    </Form.Item>
                    <div className="flex font-semibold text-gray-500 ml-10">
                      <p>
                        Giá:{" "}
                        {material.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}{" "}
                        / Cái
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Space>
          ))}
        </>
      )}
    </Form.List>
  );
};
export default MaterialCostsSection;
