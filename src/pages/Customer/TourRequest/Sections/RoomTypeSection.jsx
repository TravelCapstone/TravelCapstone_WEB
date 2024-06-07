import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Space, Select, Modal, Table } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const RoomTypeSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
  basePath,
  onRoomTypeChange,
}) => {
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

  const handleRoomTypeChange = (value, index) => {
    const updatedRoomTypes = [...selectedRoomTypes];
    updatedRoomTypes[index] = value;
    setSelectedRoomTypes(updatedRoomTypes);
    onRoomTypeChange();
  };

  const handleRemove = (field) => {
    const updatedRoomTypes = selectedRoomTypes.filter(
      (_, i) => i !== field.key
    );
    setSelectedRoomTypes(updatedRoomTypes);
    onRoomTypeChange();
  };

  useEffect(() => {
    onRoomTypeChange();
  }, [selectedRoomTypes]);

  const allRoomTypesSelected =
    selectedRoomTypes.includes(2) && selectedRoomTypes.includes(4);

  return (
    <Form.List name="roomTypes" initialValue={[{}]}>
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
                <div className="font-semibold mr-5 text-lg">{index + 1}.</div>
                <div className="flex flex-wrap">
                  <Form.Item
                    name={[field.name, "RoomType"]}
                    className="font-semibold"
                  >
                    <Select
                      className="!w-full mr-10"
                      placeholder="Chọn loại phòng"
                      onChange={(value) => handleRoomTypeChange(value, index)}
                      value={selectedRoomTypes[index]}
                    >
                      <Option
                        value={2}
                        disabled={selectedRoomTypes.includes(2)}
                      >
                        Phòng đơn
                      </Option>
                      <Option
                        value={4}
                        disabled={selectedRoomTypes.includes(4)}
                      >
                        Phòng đôi
                      </Option>
                    </Select>
                  </Form.Item>
                  <div className="flex  ml-10 ">
                    <p className="font-semibold text-lg items-center">
                      Tổng số phòng:
                    </p>
                    <Form.Item
                      className=" font-semibold ml-5 items-center"
                      name={[field.name, "totalRoom"]}
                    >
                      <InputNumber
                        min={1}
                        className="!w-[200px] mr-10"
                        max={100}
                        placeholder="Tổng số phòng"
                        onChange={() => onRoomTypeChange()}
                      />
                    </Form.Item>
                  </div>
                </div>
                <DeleteOutlined
                  onClick={() => {
                    remove(field.name);
                    handleRemove(field);
                  }}
                  className="self-start mt-2 ml-4"
                />
              </div>
            </Space>
          ))}
          {!allRoomTypesSelected && fields.length < 2 && (
            <Form.Item className="w-1/3">
              <Button
                className="bg-teal-600 font-semibold text-white"
                onClick={() => {
                  add();
                  setSelectedRoomTypes([...selectedRoomTypes, undefined]);
                }}
                block
                icon={<PlusOutlined />}
              >
                Thêm Loại phòng
              </Button>
            </Form.Item>
          )}
        </>
      )}
    </Form.List>
  );
};
export default RoomTypeSection;
