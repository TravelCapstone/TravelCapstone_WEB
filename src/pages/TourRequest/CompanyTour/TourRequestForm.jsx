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
  Radio,Modal
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

function TourRequestForm() {
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onFinish = (e) => {
    setFormData(e);
    setCheck(true);
  };

 

  const prefixSelector = <span style={{ paddingRight: 5 }}>+84</span>;
  return (
    <div className="mt-32 container">
      <div className="text-2xl text-center font-semibold uppercase my-6">
        Đặt tour theo yêu cầu
      </div>
      <div className="w-[500px] mx-auto mb-12">
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
              {
                max: 50,
                message: (
                  <div>
                    <WarningFilled /> Độ dài vượt quá 50 kí tự!
                  </div>
                ),
              },
            ]}
          >
            <Input className="h-10" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại liên hệ"
            name="phone"
            className=""
            rules={[
              {
                required: true,
                message: (
                  <div>
                    <WarningFilled /> Vui lòng nhập số điện thoại!
                  </div>
                ),
              },
              {
                min: 9,
                message: (
                  <div>
                    <WarningFilled /> Số điện thoại bao gồm ít nhất 9 số!
                  </div>
                ),
              },
              {
                max: 10,
                message: (
                  <div>
                    <WarningFilled /> Số điện thoại vượt quá 10 số!
                  </div>
                ),
              },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          

          <div className="font-semibold border-b-2 mt-8 mb-4 ">
            <h4 className="pb-2 uppercase">Thông tin tour yêu cầu</h4>
          </div>

          <Form.Item label="Phân loại tour:" name="type" className="">
            <Radio.Group onChange={onChange} defaultValue={value}>
              <Radio value={1}>Tour gia đình</Radio>
              <Radio value={2}>Tour đoàn thể (doanh nghiệp)</Radio>
            </Radio.Group>
          </Form.Item>

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
              showCount
              maxLength={450}
                
                className="h-10"
                placeholder="Nhập thông tin mô tả yêu cầu về chuyến đi..."
                style={{
                  height: 120,
               //   resize: 'none',
                }}
              />
            </Form.Item>
          </Flex>

          <div className="flex justify-around">
            <Form.Item
              label="Số người lớn"
              name="adult"
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
              name="children"
              className="w-1/2"              
            >
              <InputNumber min={0} defaultValue={0} />
            </Form.Item>
          </div>

          <Form.List name="location">
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
                    <Form.Item {...restField} name={[name, "địa điểm"]}>
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

        
          <Button className="w-full mt-2" htmlType="submit">
            Gửi yêu cầu
          </Button>
        </Form>

      
      </div>
    </div>
  );
}

export default TourRequestForm;
