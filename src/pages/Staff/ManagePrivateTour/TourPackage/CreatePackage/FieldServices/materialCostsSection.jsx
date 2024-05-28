import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Space, Select, Checkbox } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { fetchMaterialList } from "../../../../../../api/MaterialApi";
import { usePrice } from "../../../../../../context/PriceContext";

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
  const [totalCost, setTotalCost] = useState(0);
  const [selectedPrices, setSelectedPrices] = useState({});

  const { updateCommonPrice, commonPrices } = usePrice();

  useEffect(() => {
    if (totalCost) {
      const quantity =
        request?.privateTourResponse?.numOfAdult +
        request?.privateTourResponse?.numOfChildren;
      debugger;
      const perMaterials = totalCost / quantity;
      const commonService = {
        item: "Nước chai và vật liệu khác",
        price: perMaterials,
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

  const quantity =
    (request?.privateTourResponse?.numOfAdult || 0) +
    (request?.privateTourResponse?.numOfChildren || 0);

  const numOfDays = request?.privateTourResponse?.numOfDay || 1;

  const totalQuantity = quantity * numOfDays;
  // console.log("quantity", quantity);
  // console.log("numOfDays", numOfDays);
  // console.log("totalQuantity", totalQuantity);

  // console.log("materials", materials);

  useEffect(() => {
    const loadMaterials = async () => {
      const materialList = await fetchMaterialList();
      setMaterials(materialList);
    };

    loadMaterials();
  }, []);

  const calculateTotalCost = () => {
    const materialCosts = form.getFieldValue("materialCosts") || [];
    let total = 0;
    materialCosts.forEach((cost, index) => {
      if (cost.materialId && cost.quantity) {
        const material = materials.find((m) => m.id === cost.materialId);
        if (material) {
          total += material.price * cost.quantity;
        }
      }
    });
    setTotalCost(total);
  };

  const handleCheckboxChange = (index, checked) => {
    const materialCosts = form.getFieldValue("materialCosts") || [];
    if (checked) {
      materialCosts[index] = {
        materialId: materials[index].id,
        quantity: totalQuantity,
      };
      setSelectedPrices((prev) => ({
        ...prev,
        [materials[index].id]: materials[index].price * totalQuantity,
      }));
    } else {
      materialCosts[index] = { materialId: undefined, quantity: undefined };
      setSelectedPrices((prev) => {
        const newPrices = { ...prev };
        delete newPrices[materials[index].id];
        return newPrices;
      });
    }
    form.setFieldsValue({ materialCosts });
    calculateTotalCost();
  };

  const handleQuantityChange = (index, value) => {
    const materialCosts = form.getFieldValue("materialCosts") || [];
    materialCosts[index].quantity = value;
    form.setFieldsValue({ materialCosts });
    calculateTotalCost();
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
                        onChange={(value) => handleQuantityChange(index, value)}
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
          <div className="font-semibold text-gray-500 ml-5 mb-4 ">
            <p className="ml-14 items-start">
              Giá tổng:{" "}
              {totalCost.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </p>
          </div>
        </>
      )}
    </Form.List>
  );
};
export default MaterialCostsSection;
