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
} from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const DetailFamilySection = ({ form, adultLimit, childrenLimit }) => {
  const [totalFamilyCounts, setTotalFamilyCounts] = useState({});
  const [alertInfo, setAlertInfo] = useState({ visible: false, message: "" });

  // Function to update totalFamily when numOfAdultInFamily or numOfChildrenInFamily changes
  const updateTotalFamily = (fieldIndex) => {
    const numOfAdults =
      form.getFieldValue(["familyDetails", fieldIndex, "numOfAdultInFamily"]) ||
      0;
    const numOfChildren =
      form.getFieldValue([
        "familyDetails",
        fieldIndex,
        "numOfChildrenInFamily",
      ]) || 0;

    // Calculate total number of adults and children already entered in all other sections
    const otherTotals = form.getFieldValue("familyDetails").reduce(
      (acc, curr, idx) => {
        if (idx !== fieldIndex) {
          acc.adults += curr.numOfAdultInFamily || 0;
          acc.children += curr.numOfChildrenInFamily || 0;
        }
        return acc;
      },
      { adults: 0, children: 0 }
    );

    // Check if the new totals exceed the limits
    if (numOfAdults + otherTotals.adults > adultLimit) {
      setAlertInfo({
        visible: true,
        message: `Tổng số người lớn không quá ${adultLimit} người. Vui lòng điều chỉnh lại số lượng người lớn!`,
      });
      form.setFieldsValue({
        ["familyDetails"]: {
          [fieldIndex]: {
            numOfAdultInFamily: 0, // Clearing or resetting the input
          },
        },
      });
      return; // Prevent the update for adults
    }

    if (numOfChildren + otherTotals.children > childrenLimit) {
      setAlertInfo({
        visible: true,
        message: `Tổng số trẻ em không quá ${childrenLimit} người. Vui lòng điều chỉnh lại số lượng trẻ em!`,
      });
      form.setFieldsValue({
        ["familyDetails"]: {
          [fieldIndex]: {
            numOfChildrenInFamily: 0, // Clearing or resetting the input
          },
        },
      });
      return; // Prevent the update for children
    }

    const totalFamily = numOfAdults + numOfChildren;
    setTotalFamilyCounts((prev) => ({
      ...prev,
      [fieldIndex]: totalFamily,
    }));

    form.setFieldsValue({
      ["familyDetails"]: {
        [fieldIndex]: {
          totalFamily: totalFamily,
        },
      },
    });
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

  // Calculate the grand total of all family members
  const totalAllFamilies = Object.values(totalFamilyCounts).reduce(
    (acc, current) => acc + current,
    0
  );

  return (
    <>
      {alertInfo.visible && (
        <Alert
          message="Lưu ý:"
          description={alertInfo.message}
          type="error"
          closable
          onClose={() => setAlertInfo({ visible: false, message: "" })}
          showIcon
          className="my-4"
        />
      )}
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
                  <li className="list-disc font-semibold mx-5 text-lg">
                    Gia đình thứ {getVietnameseOrdinal(index + 1)}:
                  </li>
                  <div className="flex flex-wrap">
                    <div className="flex flex-wrap ml-2">
                      <Form.Item
                        className=" font-semibold ml-2 items-center"
                        name={[field.name, "numOfAdultInFamily"]}
                        label="Số người lớn: "
                      >
                        <InputNumber
                          min={1}
                          className="!w-[150px] mr-4"
                          max={100}
                          disabled={!adultLimit}
                          placeholder="Tổng số người lớn"
                          onChange={() => updateTotalFamily(index)}
                        />
                      </Form.Item>
                      <Form.Item
                        className=" font-semibold ml-5 items-center"
                        name={[field.name, "numOfChildrenInFamily"]}
                        label="Số trẻ em: "
                      >
                        <InputNumber
                          min={0}
                          className="!w-[150px] mr-10"
                          max={100}
                          placeholder="Tổng số trẻ em"
                          onChange={() => updateTotalFamily(index)}
                          disabled={!childrenLimit}
                        />
                      </Form.Item>
                      {totalFamilyCounts[index] && (
                        <Form.Item
                          className="font-semibold ml-5 items-center"
                          name={[field.name, "totalFamily"]}
                          label="Tổng:"
                        >
                          <div className="flex">
                            <p className="hidden">
                              <InputNumber
                                value={totalFamilyCounts[index]}
                                disabled={true} // This field is now automatically calculated and not manually editable
                              />
                            </p>
                            <p>
                              {totalFamilyCounts[index]} người / Gia đình thứ{" "}
                              {getVietnameseOrdinal(index + 1)}
                            </p>
                          </div>
                        </Form.Item>
                      )}
                    </div>
                  </div>
                </div>
              </Space>
            ))}
          </>
        )}
      </Form.List>
      <div className="my-4 text-lg font-semibold text-right text-mainColor">
        Tổng số người trong tất cả các gia đình: {totalAllFamilies} người
      </div>
    </>
  );
};
export default DetailFamilySection;
