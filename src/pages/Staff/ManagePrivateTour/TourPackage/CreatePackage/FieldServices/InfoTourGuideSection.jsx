import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Select, Space, DatePicker } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { servingVehiclesQuantity } from "../../../../../../settings/globalStatus";
import { postHumanResourceSalaryWithIsForTourguide } from "../../../../../../api/HumanResourceSalaryApi";
import { usePrice } from "../../../../../../context/PriceContext";

const { Option } = Select;
const { RangePicker } = DatePicker;

const InfoTourGuideSection = ({
  request,
  form,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
}) => {
  const [salaryInfo, setSalaryInfo] = useState({});
  const [numOfDay, setNumOfDay] = useState(null);
  const [quantityTourGuide, setQuantityTourGuide] = useState(null);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [availableProvinces, setAvailableProvinces] = useState([]);
  console.log("availableProvinces", availableProvinces);

  const { updateCommonPrice, commonPrices } = usePrice();

  useEffect(() => {
    // debugger;
    const tourGuideCosts = form.getFieldValue("tourGuideCosts");
    if (
      salaryInfo &&
      typeof salaryInfo === "object" &&
      !Array.isArray(salaryInfo) &&
      Array.isArray(tourGuideCosts)
    ) {
      tourGuideCosts.forEach((_, index) => {
        if (salaryInfo[index]) {
          const quantity =
            request?.privateTourResponse?.numOfAdult +
            request?.privateTourResponse?.numOfChildren;
          const perPrice = salaryInfo[index].result / quantity;
          const commonService = {
            item: `Phí hướng dẫn viên cho tour ${index + 1}`,
            price: perPrice,
            quantity: 1,
            total: salaryInfo[index].result,
          };

          // Kiểm tra nếu dịch vụ đã tồn tại trong danh sách
          const existingServiceIndex = commonPrices.findIndex(
            (service) => service.item === commonService.item
          );
          if (existingServiceIndex !== -1) {
            // Cập nhật giá trị dịch vụ
            commonPrices[existingServiceIndex] = commonService;
          } else {
            // Thêm dịch vụ mới vào danh sách
            updateCommonPrice(commonService);
          }
        }
      });
    }
  }, [salaryInfo, form, request, commonPrices, updateCommonPrice]);

  const handleQuantityChange = (index, value) => {
    form.setFieldsValue({
      tourGuideCosts: form
        .getFieldValue("tourGuideCosts")
        .map((item, idx) =>
          idx === index ? { ...item, quantity: value } : item
        ),
    });
    fetchSalaries();
  };

  const handleNumOfDayChange = (index, value) => {
    form.setFieldsValue({
      tourGuideCosts: form
        .getFieldValue("tourGuideCosts")
        .map((item, idx) =>
          idx === index ? { ...item, numOfDay: value } : item
        ),
    });
    fetchSalaries();
  };

  const handleProvinceChange = (index, value) => {
    const currentValues = form.getFieldValue("tourGuideCosts");
    const newValues = currentValues.map((item, idx) =>
      idx === index ? { ...item, provinceId: value } : item
    );
    form.setFieldsValue({ tourGuideCosts: newValues });
    setSelectedProvinces(newValues.map((item) => item.provinceId));
    fetchSalaries();
  };

  const fetchSalaries = async () => {
    // // Assuming your form fields are named appropriately
    // const values = await form.validateFields(["tourGuideCosts"]);
    // const updates = {};

    try {
      const values = await form.validateFields(["tourGuideCosts"]);
      const updates = {};
      for (const [index, item] of values.tourGuideCosts.entries()) {
        if (item.quantity && item.numOfDay && item.provinceId) {
          const data = [
            {
              quantity: item.quantity,
              numOfDay: item.numOfDay,
              provinceId: item.provinceId,
            },
          ];
          try {
            const response = await postHumanResourceSalaryWithIsForTourguide(
              true,
              data
            );
            if (response.data.isSuccess) {
              updates[index] = response.data;
            } else {
              notification.error({ message: "Failed to fetch salary data" });
            }
          } catch (error) {
            console.error("Failed to fetch salary data for an item:", error);
            notification.error({ message: "Failed to fetch salary data" });
          }
        }
      }
      setSalaryInfo(updates);
    } catch (error) {
      console.error(
        "Validation failed, ensure all fields are correctly filled:",
        error
      );
      notification.error({
        message: "Validation failed, check the form fields.",
      });
    }
  };

  // Fetch salaries when numOfDay or quantityTourGuide change
  useEffect(() => {
    fetchSalaries();
  }, [numOfDay, quantityTourGuide]);
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

  const handleRemove = (index) => {
    const currentValues = form.getFieldValue("tourGuideCosts");
    const newValues = currentValues.filter((_, idx) => idx !== index);
    form.setFieldsValue({ tourGuideCosts: newValues });
    setSelectedProvinces(newValues.map((item) => item.provinceId));
    setSalaryInfo((prev) => {
      const newSalaries = { ...prev };
      delete newSalaries[index];
      return newSalaries;
    });
  };

  useEffect(() => {
    setAvailableProvinces(provinces);
  }, [provinces]);

  useEffect(() => {
    setAvailableProvinces(
      provinces.filter((province) => !selectedProvinces.includes(province.id))
    );
  }, [selectedProvinces]);

  return (
    <>
      <Form.List name="tourGuideCosts">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }, index) => (
              <Space
                key={key}
                align="baseline"
                className="mb-4 flex justify-between"
              >
                <div className="flex flex-wrap">
                  <div className="text-center font-bold mr-14">{index + 1}</div>
                  <div>
                    <div className="flex flex-wrap">
                      <Form.Item
                        label="Tỉnh:"
                        name={[name, "provinceId"]}
                        className="flex font-semibold"
                        rules={[
                          { required: true, message: "Missing province" },
                        ]}
                      >
                        <Select
                          placeholder="Tỉnh"
                          onChange={(value) =>
                            handleProvinceChange(index, value)
                          }
                          className="!w-[200px] mr-10"
                        >
                          {availableProvinces?.map((province) => (
                            <Option key={province.id} value={province.id}>
                              {province.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Số ngày:"
                        className=" font-semibold"
                        name={[name, "numOfDay"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter number of days",
                          },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          max={30}
                          onChange={(value) =>
                            handleNumOfDayChange(index, value)
                          }
                          placeholder="Số ngày"
                          className="!w-[200px] mr-10"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Số lượng hướng dẫn viên:"
                        className=" font-semibold"
                        name={[name, "quantity"]}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng điền số lượng hướng dẫn viên",
                          },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          max={30}
                          onChange={(value) =>
                            handleQuantityChange(index, value)
                          }
                          placeholder="Số lượng hướng dẫn viên"
                          className="!w-[200px] mr-10"
                        />
                      </Form.Item>
                    </div>
                    <div className="w-full">
                      <div className="flex font-semibold text-gray-500 mr-10">
                        {salaryInfo[index] && (
                          <p>
                            {" "}
                            Phí hướng dẫn viên:{" "}
                            {salaryInfo[index].result.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <DeleteOutlined onClick={() => handleRemove(index)} />
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
                Thêm tỉnh
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};
export default InfoTourGuideSection;
