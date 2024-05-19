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
    <Form.Item>
      <Space
        direction="vertical"
        size="large"
        className="flex my-8  justify-between"
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
      </Space>
    </Form.Item>
  );
};
export default EntertainmentSection;
