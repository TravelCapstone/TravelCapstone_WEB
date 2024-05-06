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
  servingHotelsQuantity,
} from "../../../../../../settings/globalStatus";

const { Option } = Select;
const { RangePicker } = DatePicker;

const LodgingSection = ({
  form,
  districts,
  onProvinceChange,
  request,
  setProvinces,
  provinces,
}) => {
  const [lodgingDetails, setLodgingDetails] = useState({});

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

  const handleLodgingTypeChange = useCallback(
    (selectedType, name) => {
      const newDetails = { ...lodgingDetails, [name]: [selectedType] }; // Store as an array
      setLodgingDetails(newDetails);
    },
    [lodgingDetails]
  );

  // Define the keys you want to include in the dropdown
  const keysToShow = [0, 1, 2, 3, 4, 10];

  // Filter ratingLabels to only include the specified keys
  const filteredLabels = Object.fromEntries(
    Object.entries(ratingLabels).filter(([key]) =>
      keysToShow.includes(parseInt(key))
    )
  );

  return (
    <>
      <Form.List name="locations" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Space
                key={key}
                className="flex my-8  justify-between"
                align="baseline"
              >
                <div className="text-center font-bold mr-2">{index + 1}</div>
                <div className="flex flex-col flex-grow w-full">
                  <div className="flex flex-wrap ">
                    <div className="flex flex-wrap">
                      <Form.Item
                        {...restField}
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
                        {...restField}
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
                    </div>

                    <Form.Item
                      {...restField}
                      label="Ngày lưu trú:"
                      className=" font-semibold"
                      name={[name, "stayDates"]}
                      rules={[
                        {
                          required: true,
                          message: "Please choose the stay dates!",
                        },
                      ]}
                    >
                      <RangePicker showTime className="!min-w-[300px] mr-10" />
                    </Form.Item>
                  </div>
                  <div className="flex flex-wrap">
                    <Form.Item
                      name={[name, "ratingHotel"]} // Updated to use 'ratingHotel'
                      label="Loại hình lưu trú:"
                      className="font-semibold"
                      rules={[
                        {
                          required: true,
                          message: "Please select a lodging type!",
                        },
                      ]}
                    >
                      <Select
                        className="!w-[250px] mr-10"
                        placeholder="Chọn loại hình lưu trú"
                        onChange={(selectedType) =>
                          handleLodgingTypeChange(selectedType, name)
                        }
                      >
                        {Object.entries(filteredLabels).map(([key, label]) => (
                          <Option key={key} value={parseInt(key, 10)}>
                            {label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <div className="flex font-semibold text-gray-500">
                      <h3 className="text-lg mr-3">Khoảng giá: </h3>
                      <p className="text-lg"> 1.300.000 ~ 1.600.000 /người</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <Form.Item
                      className=" font-semibold"
                      name={[name, "roomType"]}
                      label="Loại phòng:"
                      rules={[
                        { required: true, message: "Please select room type!" },
                      ]}
                    >
                      <Select
                        placeholder="Chọn loại phòng"
                        className="!w-[200px] mr-10"
                      >
                        {Object.entries(servingHotelsQuantity).map(
                          ([key, value]) => (
                            <Option key={key} value={parseInt(key, 10)}>
                              {value}
                            </Option>
                          )
                        )}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={[name, "numOfDay"]}
                      className=" font-semibold"
                      label="Số lượng ngày/đêm:"
                      rules={[
                        {
                          required: true,
                          message: "Please input number of days!",
                        },
                      ]}
                    >
                      <InputNumber min={1} max={30} className=" mr-10" />
                    </Form.Item>

                    <Form.Item
                      className=" font-semibold"
                      name={[name, "numOfRoom"]}
                      label="Số lượng phòng:"
                      rules={[
                        {
                          required: true,
                          message: "Please input number of rooms!",
                        },
                      ]}
                    >
                      <InputNumber min={1} max={30} className=" mr-10" />
                    </Form.Item>
                  </div>
                </div>
                <DeleteOutlined
                  onClick={() => {
                    remove(name);
                    const newDetails = { ...lodgingDetails };
                    delete newDetails[name];
                    setLodgingDetails(newDetails);
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
                Thêm khu vực
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default LodgingSection;
