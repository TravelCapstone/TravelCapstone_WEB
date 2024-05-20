import React, { useEffect } from "react";
import { Form, InputNumber, Button, Space, Select } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const EntertainmentSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
  basePath,
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
              <div className="flex">
                <div>
                  <div className="flex ">
                    <div className="flex flex-wrap">
                      <div className="flex font-semibold text-gray-500">
                        <h3 className="text-lg mr-3">Khu du lịch - </h3>
                        <h3 className="text-lg mr-3">Giá vé: </h3>
                        <p className="text-lg"> 40.000 ~ 180.000/vé</p>
                      </div>
                    </div>
                  </div>

                  <div className="Options my-4">
                    <div className="Option1 my-4">
                      <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                        Gói Tiết Kiệm:
                      </li>
                      <Form.Item
                        className=" font-semibold my-2"
                        name={[...basePath, "quantityLocation1"]}
                        label="Số lượng địa điểm du lịch:"
                      >
                        <InputNumber
                          min={1}
                          className="!w-[200px] mr-10"
                          max={100}
                          placeholder="Số lượng địa điểm du lịch"
                        />
                      </Form.Item>
                    </div>

                    <div className="Option2 my-4">
                      <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                        Gói Cơ Bản:
                      </li>
                      <Form.Item
                        className=" font-semibold my-2"
                        name={[...basePath, "quantityLocation2"]}
                        label="Số lượng địa điểm du lịch:"
                      >
                        <InputNumber
                          min={1}
                          className="!w-[200px] mr-10"
                          max={100}
                          placeholder="Số lượng địa điểm du lịch"
                        />
                      </Form.Item>
                    </div>

                    <div className="Option3 my-4">
                      <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                        Gói Nâng Cao:
                      </li>
                      <Form.Item
                        className=" font-semibold my-2"
                        name={[...basePath, "quantityLocation3"]}
                        label="Số lượng địa điểm du lịch:"
                      >
                        <InputNumber
                          min={1}
                          className="!w-[200px] mr-10"
                          max={100}
                          placeholder="Số lượng địa điểm du lịch"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </Space>
          ))}
          <Form.Item>
            <Button
              onClick={() => add()}
              className="bg-teal-600 font-semibold text-white"
              type="dashed"
              style={{ marginTop: 16 }}
              icon={<PlusOutlined />}
            >
              Tạo Gói dịch vụ giải trí
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
export default EntertainmentSection;
