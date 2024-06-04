import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Space, Select } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getAttractionSellPriceRange } from "../../../../../../api/SellPriceHistoryApi";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

const EntertainmentSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
  basePath,
  selectedDistrict,
}) => {
  const [priceRanges, setPriceRanges] = useState({
    quantityLocation1: { minPrice: 0, maxPrice: 0 },
    quantityLocation2: { minPrice: 0, maxPrice: 0 },
    quantityLocation3: { minPrice: 0, maxPrice: 0 },
  });

  const fetchPriceRange = async (quantityLocation, fieldName) => {
    const privateTourRequestId = request?.privateTourResponse?.id;
    const districtId = selectedDistrict;
    const pageNumber = 1;
    const pageSize = 10;
    if (privateTourRequestId && districtId && quantityLocation) {
      const data = await getAttractionSellPriceRange(
        districtId,
        privateTourRequestId,
        quantityLocation,
        pageNumber,
        pageSize
      );
      if (data.result.items.length > 0) {
        const { minPrice, maxPrice } = data.result.items[0];
        setPriceRanges((prev) => ({
          ...prev,
          [fieldName]: { minPrice, maxPrice },
        }));
      }
    }
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
  }, [request, setProvinces]);

  const handleLocationChange = (value, quantityField) => {
    fetchPriceRange(value, quantityField);
    form.setFieldsValue({ [quantityField]: value });
  };

  return (
    <Form.List name={[...basePath, "entertainments"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Space
              direction="vertical"
              size="large"
              className="flex justify-between"
              align="baseline"
            >
              <div className="flex justify-between">
                <div>
                  <div className="Options my-4">
                    {[
                      "quantityLocation1",
                      "quantityLocation2",
                      "quantityLocation3",
                    ].map((quantityField, i) => (
                      <div
                        key={quantityField}
                        className={`Option${i + 1} my-4`}
                      >
                        <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                          {`Gói ${["Tiết Kiệm", "Cơ Bản", "Nâng Cao"][i]}:`}
                        </li>
                        <div className=" flex flex-wrap">
                          <Form.Item
                            className=" font-semibold my-2"
                            {...field}
                            name={[field.name, quantityField]}
                            label="Số lượng địa điểm du lịch:"
                          >
                            <InputNumber
                              min={1}
                              className="!w-[200px] mr-10"
                              max={100}
                              placeholder="Số lượng địa điểm du lịch"
                              onChange={(value) =>
                                handleLocationChange(value, quantityField)
                              }
                            />
                          </Form.Item>
                          <div className="flex font-semibold text-gray-500 items-center">
                            <h3 className="text-lg mr-3">
                              Khu du lịch/Khu vui chơi -{" "}
                            </h3>
                            <h3 className="text-lg mr-3">Tổng giá vé: </h3>
                            <p className="text-lg">{`${priceRanges[
                              quantityField
                            ].minPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })} ~ ${priceRanges[
                              quantityField
                            ].maxPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}/người`}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <DeleteOutlined
                  onClick={() => remove(field.name)}
                  className="self-start ml-4"
                />
              </div>
            </Space>
          ))}
          {fields.length < 1 && (
            <Form.Item>
              <Button
                onClick={() =>
                  add({
                    key: uuidv4(),
                  })
                }
                className="bg-teal-600 font-semibold text-white"
                type="dashed"
                style={{ marginTop: 16 }}
                icon={<PlusOutlined />}
              >
                Tạo Gói dịch vụ giải trí
              </Button>
            </Form.Item>
          )}
        </>
      )}
    </Form.List>
  );
};
export default EntertainmentSection;
