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
    <Form.List name="entertainment" initialValue={[{}]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name }, index) => (
            <Space
              key={key}
              align="baseline"
              className="mb-8 flex justify-between"
            >
              <div className="flex">
                <div className="text-center font-bold mr-14">{index + 1}</div>
                <div>
                  <div className="flex ">
                    <div className="flex flex-wrap">
                      <Form.Item
                        label="Khu vực:"
                        name={[name, "provinceId"]}
                        className="flex font-semibold"
                        rules={[
                          { required: true, message: "Missing province" },
                        ]}
                      >
                        <Select
                          placeholder="Tỉnh"
                          onChange={onProvinceChange}
                          className="!w-[200px] mr-10"
                        >
                          {provinces.map((province) => (
                            <Option key={province.id} value={province.id}>
                              {province.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={[name, "districtId"]}
                        className="flex font-semibold"
                        placeholder="Huyện/TP"
                        rules={[
                          { required: true, message: "Missing district" },
                        ]}
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.province !== currentValues.province
                        }
                      >
                        <Select
                          placeholder="Huyện/TP"
                          className="!w-[200px] mr-10"
                          // disabled={!districtEnabled}
                        >
                          {districts.map((district) => (
                            <Option key={district.id} value={district.id}>
                              {district.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <div className="flex font-semibold text-gray-500">
                        <h3 className="text-lg mr-3">Khu du lịch - </h3>
                        <h3 className="text-lg mr-3">Giá vé: </h3>
                        <p className="text-lg"> 40.000 ~ 180.000/vé</p>
                      </div>
                    </div>
                  </div>

                  <Form.Item
                    className=" font-semibold my-4"
                    name={[name, "quantityLocation"]}
                    label="Số lượng địa điểm du lịch:"
                    rules={[
                      {
                        required: true,
                        message: "Missing number of locations",
                      },
                    ]}
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
              <DeleteOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item className="w-1/3 ">
            <Button
              className="bg-teal-600 font-semibold text-white"
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Thêm khu vực giải trí
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
export default EntertainmentSection;
