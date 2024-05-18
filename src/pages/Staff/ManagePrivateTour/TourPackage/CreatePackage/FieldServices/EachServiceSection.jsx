import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Space,
  Form,
  Menu,
  message,
  Select,
  DatePicker,
  TreeSelect,
  InputNumber,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ratingLabels,
  ratingLabelsAPI,
  servingActor,
  servingHotelsQuantity,
} from "../../../../../../settings/globalStatus";
import { getMinMaxPriceOfHotel } from "../../../../../../api/SellPriceHistoryApi";
import DistrictServicesSection from "./DistrictServicesSection";

const { Option } = Select;
const { RangePicker } = DatePicker;

const EachServiceSection = ({
  form,
  districts,
  onProvinceChange,
  request,
  setProvinces,
  provinces,
  onDistrictChange,
  selectedDistrict,
  selectedProvinces,
  selectedDistricts,
}) => {
  // Lấy dữ liệu provinceId và province name từ request để hiển thị lên form
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
    <>
      <Form.List name="provinces" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Space
                key={key}
                className="flex justify-between my-8"
                align="baseline"
              >
                <div className="flex">
                  <div className=" font-semibold mr-5 text-xl">
                    {index + 1}.
                  </div>
                  <div className="flex flex-col flex-grow w-full">
                    <div className="flex flex-wrap ">
                      <div>
                        <Form.Item
                          {...restField}
                          label="ĐỊA ĐIỂM:"
                          name={[name, "provinceId"]}
                          className="flex font-semibold"
                          rules={[
                            { required: true, message: "Missing province" },
                          ]}
                        >
                          <Select
                            placeholder="Tỉnh"
                            // onChange={onProvinceChange}
                            onChange={(value) => onProvinceChange(value, name)}
                            className="!w-[200px] mr-10"
                          >
                            {provinces
                              .filter(
                                (province) =>
                                  !selectedProvinces.includes(province.id) ||
                                  selectedProvinces[name] === province.id
                              )
                              .map((province) => (
                                <Option key={province.id} value={province.id}>
                                  {province.name}
                                </Option>
                              ))}
                          </Select>
                        </Form.Item>
                        <div>
                          <DistrictServicesSection
                            form={form}
                            provinces={provinces}
                            onProvinceChange={onProvinceChange}
                            setProvinces={setProvinces}
                            request={request}
                            districts={districts}
                            onDistrictChange={onDistrictChange}
                            selectedDistricts={selectedDistricts}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DeleteOutlined
                  onClick={() => {
                    remove(name);
                  }}
                  className="self-end mt-2"
                />
              </Space>
            ))}
            <Form.Item className="w-1/3 ">
              <Button
                className="bg-teal-600 font-semibold text-white"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Thêm Địa Điểm
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default EachServiceSection;
