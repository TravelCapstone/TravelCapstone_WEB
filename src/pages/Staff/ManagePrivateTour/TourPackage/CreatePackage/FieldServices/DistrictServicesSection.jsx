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
  servingActor,
  servingHotelsQuantity,
} from "../../../../../../settings/globalStatus";
import { getMinMaxPriceOfHotel } from "../../../../../../api/SellPriceHistoryApi";

const { Option } = Select;
const { RangePicker } = DatePicker;

const DistrictServicesSection = ({
  form,
  districts,
  onProvinceChange,
  request,
  setProvinces,
  provinces,
  onDistrictChange,
  selectedDistrict,
}) => {
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  console.log("Districts: ", districts);
  console.log("Selected Districts: ", selectedDistrict);
  console.log("form.getFieldValue(district) ", form.getFieldValue("district"));
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
    const allDistrictEntries = form.getFieldValue("district") || [];
    setSelectedDistricts(
      allDistrictEntries.map((d) => d.districtId).filter((id) => !!id)
    );
  }, [form]);

  return (
    <>
      <Form.List name="district" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => {
              const currentDistrictId = form.getFieldValue([
                "district",
                name,
                "districtId",
              ]);
              return (
                <Space
                  key={currentDistrictId || key}
                  className="flex justify-between my-8"
                  align="baseline"
                >
                  <div className="flex">
                    <div className="font-semibold mr-5 text-xl">
                      {index + 1}.
                    </div>
                    <div className="flex flex-col flex-grow w-full">
                      <Form.Item
                        {...restField}
                        name={[name, "districtId"]}
                        label="Huyện/ TP:"
                        className="flex font-semibold"
                        rules={[
                          { required: true, message: "Missing district" },
                        ]}
                      >
                        <Select
                          onChange={(value) => onDistrictChange(value, name)}
                          placeholder="Huyện/TP"
                          className="!w-[200px] mr-10"
                        >
                          {districts.map((district) => (
                            <Option key={district.id} value={district.id}>
                              {district.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                  <DeleteOutlined
                    onClick={() => remove(name)}
                    className="self-end mt-2"
                  />
                </Space>
              );
            })}
            <Form.Item className="w-1/2">
              <Button
                className="bg-teal-600 font-semibold text-white"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Thêm Huyện/TP
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      {/* Debugging Block */}
      {/* <div className="mt-10">
        <h3>Form Data:</h3>
        <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
      </div> */}
    </>
  );
};

export default DistrictServicesSection;
