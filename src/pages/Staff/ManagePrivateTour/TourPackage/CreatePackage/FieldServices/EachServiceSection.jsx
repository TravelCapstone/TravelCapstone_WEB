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
import LodgingSection from "./LodgingSection";
import RestaurantSection from "./RestaurantSection";
import EntertainmentSection from "./EntertaimentSection";
import { v4 as uuidv4 } from "uuid";
import EventGalasSection from "./eventGalasSection";
import InsuranceSection from "./InsuranceSection";

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
  selectedProvince,
  selectedDistricts,
  loadingDistricts,
  getAllDistrictsByProvinceId,
  setLoadingDistricts,
  setDistricts,
}) => {
  console.log("selectedProvinces: ", selectedProvinces);
  console.log("selectedProvince: ", selectedProvince);
  console.log("selectedDistrict: ", selectedDistrict);
  console.log("selectedDistricts: ", selectedDistricts);
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

  useEffect(() => {
    const loadDistricts = async () => {
      setLoadingDistricts(true);
      try {
        const response = await getAllDistrictsByProvinceId(selectedProvince);
        setDistricts(response);
      } catch (error) {
        message.error("Failed to fetch districts");
      } finally {
        setLoadingDistricts(false);
      }
    };

    if (selectedProvince) {
      loadDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  return (
    <>
      <Form.List name="provinceServices" initialValue={[{}]}>
        {(fields, { add, remove, move }) => (
          <>
            {fields.map((field, index) => {
              return (
                <Space
                  key={field.key} // Use provinceId if available, otherwise fallback to field.key
                  className="flex justify-between my-8"
                  align="baseline"
                >
                  <div className="flex">
                    <div className="font-semibold mr-5 text-xl">
                      {index + 1}.
                    </div>
                    <div className="flex flex-col flex-grow w-full">
                      <div className="flex flex-wrap ">
                        <div>
                          <Form.Item
                            {...field}
                            label="ĐỊA ĐIỂM:"
                            name={[field.name, "provinceId"]}
                            className="flex font-semibold"
                            rules={[
                              { required: true, message: "Missing province" },
                            ]}
                          >
                            <Select
                              placeholder="Tỉnh"
                              onChange={(value) =>
                                onProvinceChange(value, field.name)
                              }
                              className="!w-[200px] mr-10"
                            >
                              {provinces.map((province) => (
                                <Option
                                  key={`${province.id}_${index}`}
                                  value={province.id}
                                >
                                  {province.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>

                          {/* Chọn tỉnh */}
                          <div className=" mx-4">
                            {/* Chọn Huyện */}
                            <div className=" ml-4">
                              <Form.Item
                                name={[field.name, "districtId"]}
                                label="Huyện/ TP:"
                                className="flex font-semibold"
                                placeholder="Huyện/TP"
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing district",
                                  },
                                ]}
                                shouldUpdate={(prevValues, currentValues) =>
                                  prevValues.province !== currentValues.province
                                }
                              >
                                <Select
                                  onChange={onDistrictChange}
                                  loading={loadingDistricts}
                                  disabled={
                                    loadingDistricts || !selectedProvince
                                  }
                                  placeholder="Huyện/TP"
                                  className="!w-[200px] mr-10"
                                  // disabled={!districtEnabled}
                                >
                                  {districts.map((district) => (
                                    <Option
                                      key={`${district.id}_${selectedProvince}`}
                                      value={district.id}
                                    >
                                      {district.name}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              {/* Chọn các dịch vụ */}
                              <div className=" ml-4">
                                {/* NƠI LƯU TRÚ */}
                                <div>
                                  <h3 className="font-bold text-lg my-2 text-mainColor">
                                    Nơi lưu trú:
                                  </h3>
                                  <LodgingSection
                                    basePath={[field.name]}
                                    form={form}
                                    provinces={provinces}
                                    districts={districts}
                                    onProvinceChange={onProvinceChange}
                                    onDistrictChange={onDistrictChange}
                                    setProvinces={setProvinces}
                                    selectedDistrict={selectedDistrict}
                                    request={request}
                                  />
                                </div>
                                {/* DỊCH VỤ ĂN UỐNG */}
                                <div>
                                  <h3 className="font-bold text-lg my-2 text-mainColor">
                                    Dịch vụ ăn uống:
                                  </h3>
                                  <RestaurantSection
                                    request={request}
                                    basePath={[field.name]}
                                    form={form}
                                    index={index}
                                  />
                                </div>
                                {/* GIẢI TRÍ */}
                                <div>
                                  <h3 className="font-bold text-lg my-6 text-mainColor">
                                    Gói dịch vụ giải trí:
                                  </h3>
                                  <EntertainmentSection
                                    basePath={[field.name]}
                                    form={form}
                                    provinces={provinces}
                                    districts={districts}
                                    onProvinceChange={onProvinceChange}
                                    setProvinces={setProvinces}
                                  />
                                </div>

                                {/* GALA/TEAMBULDING */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DeleteOutlined
                    onClick={() => remove(field.name)}
                    className="self-end mt-2"
                  />
                </Space>
              );
            })}
            <Form.Item className="w-1/3">
              <Button
                className="bg-teal-600 font-semibold text-white"
                onClick={() => add({ key: uuidv4() })}
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
