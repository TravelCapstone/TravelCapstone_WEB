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
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ratingLabels } from "../../../../../../settings/globalStatus";
import { getAllDistrictsByProvinceId } from "../../../../../../api/LocationApi";

const { Option } = Select;
const { RangePicker } = DatePicker;

const LodgingSection = ({ form, add, remove, request }) => {
  const [lodgingDetails, setLodgingDetails] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [districtEnabled, setDistrictEnabled] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(undefined);

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

  const handleProvinceChange = async (provinceId) => {
    // Check if the newly selected province is different from the previously selected one
    if (provinceId !== selectedProvince) {
      setSelectedProvince(provinceId); // Update the selected province
      setDistricts([]); // Clear previous districts
      form.setFieldsValue({ ["locations[0].district"]: undefined });

      setDistrictEnabled(true); // Enable district dropdown after province is selected

      try {
        const response = await getAllDistrictsByProvinceId(provinceId);
        setDistricts(
          response.result.items.map((district) => ({
            id: district.id,
            name: district.name,
          }))
        );
      } catch (error) {
        message.error("Failed to fetch districts");
        console.error("Error fetching districts by province ID:", error);
        setDistrictEnabled(false); // Disable again in case of error
      }
    }
  };

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

  // const handleProvinceClear = () => {
  //   setSelectedProvince(undefined);
  //   setDistricts([]);
  //   setDistrictEnabled(false);
  //   form.setFieldsValue({ ["locations[0].district"]: undefined });
  // };

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
                        placeholder="Tỉnh"
                        name={[name, "province"]}
                        className="flex font-semibold"
                        rules={[
                          { required: true, message: "Missing province" },
                        ]}
                      >
                        <Select
                          placeholder="Tỉnh"
                          onChange={handleProvinceChange}
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
                        name={[name, "district"]}
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
                          disabled={!districtEnabled}
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
                          <Option key={key} value={key}>
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
                        <Option value="4">Phòng 4 người</Option>
                        <Option value="2">Phòng 2 người</Option>
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
