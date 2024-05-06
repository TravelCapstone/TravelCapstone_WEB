import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Select,
  DatePicker,
  Space,
  TreeSelect,
  InputNumber,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  ratingLabels,
  servingActor,
  servingFoodsQuantity,
} from "../../../../../../settings/globalStatus";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;

const RestaurantSection = ({
  form,
  provinces,
  districts,
  onProvinceChange,
  setProvinces,
  request,
}) => {
  const [diningDetails, setDiningDetails] = useState({});

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

  const handleDiningTypeChange = (selectedType, name) => {
    const newDetails = { ...diningDetails, [name]: [selectedType] }; // Store as an array for future multi-selection
    setDiningDetails(newDetails);
  };

  const keysToShow = [5, 6, 7, 8, 9];

  // Filter ratingLabels to only include the specified keys
  const filteredLabels = Object.fromEntries(
    Object.entries(ratingLabels).filter(([key]) =>
      keysToShow.includes(parseInt(key))
    )
  );

  return (
    <Form.List name="diningOptions" initialValue={[{}]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <Space
              key={key}
              className="flex my-8 justify-between"
              align="baseline"
            >
              <div className="text-center font-bold mr-2">{index + 1}</div>
              <div className="flex flex-col flex-grow w-full">
                <div className="flex flex-wrap">
                  <div className="flex flex-wrap">
                    <Form.Item
                      {...restField}
                      label="Khu vực:"
                      placeholder="Tỉnh"
                      name={[name, "provinceId"]}
                      className="flex font-semibold"
                      rules={[{ required: true, message: "Missing province" }]}
                    >
                      <Select
                        placeholder="Tỉnh"
                        className="!w-[200px] mr-10"
                        onChange={onProvinceChange}
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
                      rules={[{ required: true, message: "Missing district" }]}
                    >
                      <Select
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

                  <Form.Item
                    {...restField}
                    label="Ngày dùng bữa:"
                    className="font-semibold"
                    name={[name, "mealDates"]}
                    rules={[
                      {
                        required: true,
                        message: "Please choose the meal dates!",
                      },
                    ]}
                  >
                    <RangePicker showTime className="!min-w-[300px] mr-10" />
                  </Form.Item>
                </div>
                <div className="flex flex-wrap">
                  <Form.Item
                    {...restField}
                    className="font-semibold"
                    label="Loại hình ăn uống:"
                    name={[name, "diningType"]}
                    rules={[
                      {
                        required: true,
                        message: "Please select a dining type!",
                      },
                    ]}
                  >
                    <Select
                      className="!w-[250px] mr-10"
                      onChange={(selectedType) =>
                        handleDiningTypeChange(selectedType, name)
                      }
                      placeholder="Chọn loại hình ăn uống"
                    >
                      {Object.entries(filteredLabels).map(([key, label]) => (
                        <Option key={key} value={parseInt(key, 10)}>
                          {label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <div className="flex font-semibold text-gray-500 mr-10">
                    <h3 className="text-lg mr-3">Khoảng giá: </h3>
                    <p className="text-lg"> 1.300.000 ~ 1.600.000 /người</p>
                  </div>
                  <Form.Item
                    className=" font-semibold"
                    name={[name, "servingQuantity"]}
                    label="Loại bàn:"
                    rules={[
                      { required: true, message: "Vui lòng chọn loại bàn!" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn loại bàn"
                      className="!w-[200px] mr-10"
                    >
                      {Object.entries(servingFoodsQuantity).map(
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
                    label="Số lượng ngày dùng bữa:"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng điền số lượng ngày dùng bữa",
                      },
                    ]}
                  >
                    <InputNumber min={1} max={30} className=" mr-10" />
                  </Form.Item>

                  <Form.Item
                    name={[name, "mealPerDay"]}
                    className=" font-semibold"
                    label="Số lượng bữa ăn dùng trong 1 ngày:"
                    rules={[
                      {
                        required: true,
                        message:
                          "Vui lòng điền số lượng bữa ăn dùng trong 1 ngày",
                      },
                    ]}
                  >
                    <InputNumber min={1} max={30} className=" mr-10" />
                  </Form.Item>
                  <Form.Item
                    className=" font-semibold"
                    name={[name, "serviceAvailability"]}
                    label="Đối tượng:"
                    rules={[
                      { required: true, message: "Vui lòng chọn đối tượng!" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn đối tượng"
                      className="!w-[200px] mr-10"
                    >
                      {Object.entries(servingActor).map(([key, value]) => (
                        <Option key={key} value={parseInt(key, 10)}>
                          {value}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <DeleteOutlined
                onClick={() => {
                  remove(name);
                  const newDetails = { ...diningDetails };
                  delete newDetails[name];
                  setDiningDetails(newDetails);
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
  );
};

export default RestaurantSection;
