import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Space, Select } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getAvailableAssurancesWithNumOfDays } from "../../../../../../api/AssuranceApi";
import { optionClassLabels } from "../../../../../../settings/globalStatus";

const { Option } = Select;

const InsuranceSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
  basePath,
}) => {
  const [insurances, setInsurances] = useState([]);
  const numOfDays = request?.privateTourResponse?.numOfDay;

  console.log("insurances", insurances);
  console.log("numOfDays", numOfDays);

  useEffect(() => {
    if (request?.privateTourResponse?.otherLocation) {
      setProvinces(
        request.privateTourResponse.otherLocation.map((loc) => ({
          id: loc.provinceId,
          name: loc.province.name,
        }))
      );
    }

    const fetchInsurances = async () => {
      const response = await getAvailableAssurancesWithNumOfDays(numOfDays);
      console.log("response", response);
      if (response.data.isSuccess) {
        setInsurances(response.data.result.flat()); // Flatten the array if nested
      }
    };

    if (numOfDays) {
      fetchInsurances();
    }
  }, [request, numOfDays]);

  return (
    <Form.List name="insurance" initialValue={[{}]}>
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
                  {Object.values(optionClassLabels).map((label, idx) => (
                    <div className="Options my-4">
                      <div key={idx} className="Option1 my-4">
                        <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                          {label}:
                        </li>
                        <div className="flex">
                          <Form.Item
                            {...field}
                            className=" font-semibold my-2"
                            name={[field.name, `insurance${idx}`]}
                            label="Gói Bảo Hiểm:"
                          >
                            <Select
                              placeholder="Chọn gói bảo hiểm"
                              className="!w-full mr-10"
                            >
                              {insurances.map((insurance) => (
                                <Option
                                  key={insurance.assuranceId}
                                  value={insurance.assuranceId}
                                >
                                  {`${insurance.assurance.name} - ${insurance.price.toLocaleString()} VND / Người`}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Space>
          ))}
        </>
      )}
    </Form.List>
  );
};
export default InsuranceSection;
