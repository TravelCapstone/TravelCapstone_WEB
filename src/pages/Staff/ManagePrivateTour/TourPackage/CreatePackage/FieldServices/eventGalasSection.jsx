import React, { useEffect } from "react";
import { Form, InputNumber, Button, Space, Select } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const EventGalasSection = ({
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
    <Form.List name={[...basePath, "eventGalas"]}>
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
                  <div className="Options my-4">
                    <div className="Option1 my-4">
                      <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                        Gói Tiết Kiệm:
                      </li>
                      <div className="flex">
                        <Form.Item
                          className=" font-semibold my-2"
                          name={[...basePath, "option1EventId"]}
                          label="Gói Event/Game:"
                        >
                          <Select
                            placeholder="Gói Event/Game"
                            className="!w-[200px] mr-10"
                          >
                            <Option value="gala1">Gala 1</Option>
                            <Option value="gala2">Gala 2</Option>
                          </Select>
                        </Form.Item>

                        <div className="flex font-semibold text-gray-500">
                          <h3 className="text-lg mr-3">Khoảng giá: </h3>
                          <p className="text-lg"> 40.000 ~ 180.000/vé</p>
                        </div>
                      </div>
                    </div>

                    <div className="Option2 my-4">
                      <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                        Gói Cơ Bản:
                      </li>
                      <div className="flex">
                        <Form.Item
                          className=" font-semibold my-2"
                          name={[...basePath, "option2EventId"]}
                          label="Gói Event/Game:"
                        >
                          <Select
                            placeholder="Gói Event/Game"
                            className="!w-[200px] mr-10"
                          >
                            <Option value="gala1">Gala 1</Option>
                            <Option value="gala2">Gala 2</Option>
                          </Select>
                        </Form.Item>

                        <div className="flex font-semibold text-gray-500">
                          <h3 className="text-lg mr-3">Khoảng giá: </h3>
                          <p className="text-lg"> 40.000 ~ 180.000/vé</p>
                        </div>
                      </div>
                    </div>

                    <div className="Option3 my-4">
                      <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                        Gói Nâng Cao:
                      </li>
                      <div className="flex">
                        <Form.Item
                          className=" font-semibold my-2"
                          name={[...basePath, "option3EventId"]}
                          label="Gói Event/Game:"
                        >
                          <Select
                            placeholder="Gói Event/Game"
                            className="!w-[200px] mr-10"
                          >
                            <Option value="gala1">Gala 1</Option>
                            <Option value="gala2">Gala 2</Option>
                          </Select>
                        </Form.Item>

                        <div className="flex font-semibold text-gray-500">
                          <h3 className="text-lg mr-3">Khoảng giá: </h3>
                          <p className="text-lg"> 40.000 ~ 180.000/vé</p>
                        </div>
                      </div>
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
              Tạo Gói Event/Teambulding
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
export default EventGalasSection;
