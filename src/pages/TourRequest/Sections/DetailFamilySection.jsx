import React, { useEffect, useState } from "react";
import {
  Form,
  InputNumber,
  Button,
  Space,
  Select,
  Modal,
  Table,
  Alert,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const DetailFamilySection = ({
  form,
  adultLimit,
  childrenLimit,
  totalLimitFamily,
  totalAdults,
  totalChildren,
  setTotalAdults,
  setTotalChildren,
  setTotalAllFamily,
  totalAllFamily,
}) => {
  const [totalAllFamilies, setTotalAllFamilies] = useState(0);
  const [alertInfo, setAlertInfo] = useState({ visible: false, message: "" });

  console.log("totalAdults", totalAdults);
  console.log("totalChildren", totalChildren);

  const updateTotalFamily = () => {
    const familyDetails = form.getFieldValue("familyDetails") || [];

    let adults = 0;
    let children = 0;
    let totalAllFamilies = 0;
    let totalAllFamily = 0;

    familyDetails.forEach((family, index) => {
      const numOfAdults = family.numOfAdultInFamily || 0;
      const numOfChildren = family.numOfChildrenInFamily || 0;
      const totalFamily = family.totalFamily || 0;

      adults += numOfAdults * totalFamily;
      children += numOfChildren * totalFamily;
      totalAllFamilies += (numOfAdults + numOfChildren) * totalFamily;
      totalAllFamily += totalFamily;
    });

    setTotalAdults(adults);
    setTotalChildren(children);
    setTotalAllFamilies(totalAllFamilies);
    setTotalAllFamily(totalAllFamily);
  };

  // Function to get Vietnamese ordinal number
  const getVietnameseOrdinal = (index) => {
    const ordinals = [
      "nhất",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
      "mười",
    ];
    return ordinals[index - 1] || `${index + 1}`; // Fallback to numeric if index exceeds predefined ordinals
  };

  return (
    <>
      <Form.List name="familyDetails" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space
                key={field.key}
                direction="vertical"
                size="large"
                className="flex justify-between"
                align="baseline"
              >
                <div className="flex">
                  <li className="list-disc font-semibold mx-5 text-sm">
                    Kiểu gia đình thứ {getVietnameseOrdinal(index + 1)}:
                  </li>
                  <div className="flex flex-wrap">
                    <div className="flex flex-wrap ml-2">
                      <Form.Item
                        className=" font-semibold ml-2 items-center"
                        name={[field.name, "numOfAdultInFamily"]}
                        label={
                          <span>
                            Số người lớn: &nbsp;
                            <Tooltip title="Người lớn tính từ 1m4 trở lên và 16 tuổi trở lên">
                              <QuestionCircleOutlined />
                            </Tooltip>
                          </span>
                        }
                      >
                        <InputNumber
                          min={1}
                          className="!w-[150px] mr-6"
                          max={100}
                          // disabled={!adultLimit}
                          placeholder="Tổng số người lớn"
                          onChange={() => updateTotalFamily(index)}
                        />
                      </Form.Item>
                      <Form.Item
                        className=" font-semibold items-center"
                        name={[field.name, "numOfChildrenInFamily"]}
                        label={
                          <span>
                            Số trẻ em: &nbsp;
                            <Tooltip title="Trẻ em tính từ 1m4 trở xuống và 16 tuổi trở xuống">
                              <QuestionCircleOutlined />
                            </Tooltip>
                          </span>
                        }
                      >
                        <InputNumber
                          min={0}
                          className="!w-[150px] mr-6"
                          max={100}
                          placeholder="Tổng số trẻ em"
                          onChange={() => updateTotalFamily(index)}
                          // disabled={!childrenLimit}
                        />
                      </Form.Item>
                      <Form.Item
                        className="font-semibold  items-center"
                        name={[field.name, "totalFamily"]}
                        label={
                          <span>
                            Tổng gia đình: &nbsp;
                            <Tooltip title="Tổng số gia đình có số người lớn và trẻ em như bạn đã điền">
                              <QuestionCircleOutlined />
                            </Tooltip>
                          </span>
                        }
                      >
                        <InputNumber
                          className="!w-[150px] mr-2 "
                          onChange={() => updateTotalFamily(index)}
                          min={0}
                          // disabled={!TotalLimit}
                          placeholder="Tổng gia đình"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <DeleteOutlined
                    onClick={() => remove(field.name)}
                    className="self-center mt-2"
                  />
                </div>
              </Space>
            ))}

            <Form.Item className="w-1/3">
              <Button
                className="bg-teal-600 font-semibold text-white"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Thêm Kiểu Gia Đình
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      {totalAllFamilies > 0 && (
        <div className="my-4 text-sm font-semibold text-right text-mainColor">
          Tổng số người trong tất cả các gia đình: {totalAllFamilies} người
        </div>
      )}
    </>
  );
};
export default DetailFamilySection;
