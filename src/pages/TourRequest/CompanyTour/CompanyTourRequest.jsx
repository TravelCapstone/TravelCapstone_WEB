import React, { useState } from "react";
import {
  Flex,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Space,
  Select,
} from "antd";
import {
  WarningFilled,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { alertFail, alertSuccess } from "../../../hook/useNotification";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

function CompanyTourRequest() {
  const onFinish = (e) => {
    setFormData(e);
    setCheck(true);
  };

  return (
    <div className="mt-24 container">
      <div className="text-2xl text-center font-semibold uppercase mt-6 mb-12">
        Yêu cầu tạo tour cho doanh nghiệp
      </div>
      <div className="w-[500px] mx-auto">
        <Form onFinish={onFinish} className="" layout="vertical">
          <Form.Item
            label="Họ tên người đại diện"
            name="username"
            className=""
            rules={[
              {
                required: true,
                message: (
                  <div>
                    <WarningFilled /> Vui lòng nhập họ và tên!
                  </div>
                ),
              },
            ]}
          >
            <Input className="h-10" />
          </Form.Item>

          <Form.Item
            label="Tên doanh nghiệp"
            name="company"
            className=""
            rules={[
              {
                required: true,
                message: (
                  <div>
                    <WarningFilled /> Vui lòng nhập tên doanh nghiệp!
                  </div>
                ),
              },
            ]}
          >
            <Input className="h-10" />
          </Form.Item>

          <div className="font-semibold border-b-2 mt-8 mb-4 ">
            <h4 className="pb-2 uppercase">Thông tin tour yêu cầu</h4>
          </div>

          <Form.Item label="Tên tour" name="tourname" className="">
            <Input className="h-10" readOnly />
          </Form.Item>

          <Form.Item
            name="range-picker"
            label="Thời gian"
            rules={[
              {
                type: "array",
                required: true,
                message: (
                  <div>
                    <WarningFilled /> Vui lòng chọn thời gian!
                  </div>
                ),
              },
            ]}
          >
            <RangePicker />
          </Form.Item>
          <Flex vertical gap={32}>
            <Form.Item
              label="Mô tả yêu cầu"
              name="description"
              className=""
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Vui lòng nhập mô tả!
                    </div>
                  ),
                },
              ]}
            >
              <TextArea
                rows={6}
                className="h-10"
                placeholder="Nhập thông tin mô tả yêu cầu về chuyến đi..."
              />
            </Form.Item>
          </Flex>

          <div className="flex justify-around">
            <Form.Item
              label="Số người lớn"
              name="company"
              className="w-1/2"
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Vui lòng nhập số lượng!
                    </div>
                  ),
                },
              ]}
            >
              <InputNumber min={5} defaultValue={5} />
            </Form.Item>

            <Form.Item
              label="Số trẻ em"
              name="company"
              className="w-1/2"
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Vui lòng nhập số lượng!
                    </div>
                  ),
                },
              ]}
            >
              <InputNumber min={0} defaultValue={0} />
            </Form.Item>
          </div>

          <Form.List name="location" >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item {...restField} name={[name, "địa điểm"]} >
                      <Select placeholder="Chọn địa điểm mong muốn">
                        {" "}
                        <Option value="location1">Location 1</Option>
                        <Option value="location2">Location 2</Option>
                        <Option value="location3">Location 3</Option>
                      </Select>
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm địa điểm mong muốn
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
              label="Ghi chú (nếu có)"
              name="note"
              className=""             
            >
              <TextArea
              showCount
              maxLength={100}
                rows={6}
                className="h-10"
                placeholder="Nội dung cần lưu ý cho chuyến đi..."
                style={{
                    height: 120,
                    resize: 'none',
                  }}
              />
            </Form.Item>
          <Button className="" htmlType="submit">
            Gửi yêu cầu
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CompanyTourRequest;
