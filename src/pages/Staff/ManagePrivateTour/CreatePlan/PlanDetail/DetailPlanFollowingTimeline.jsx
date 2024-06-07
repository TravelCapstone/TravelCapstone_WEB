import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select, Button, Row, Col } from "antd";
import moment from "moment";
import "../../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";
const { Option } = Select;

const DetailPlanFollowingTimeline = ({}) => {
  return (
    <>
      <Form.List name="detailPlanRoutes">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ name, ...restField }, index) => (
              <div
                key={`plan- ${index}`}
                className="shadow-md rounded-md p-4 my-10"
              >
                <h1 className="text-primary font-bold text-xl text-center">
                  KẾ HOẠCH THEO NGÀY
                </h1>
                <div className="flex justify-end">
                  <Button
                    onClick={() => remove(name)}
                    className="bg-red-700 text-white my-2"
                  >
                    Xóa kế hoạch
                  </Button>
                </div>
                <div className="grid grid-cols-1 mt-10">
                  <Form.Item
                    {...restField}
                    name={[name, "date"]}
                    key={`date-${fields.key}`}
                    rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
                    label="Ngày"
                  >
                    <DatePicker id={`date-${fields.key}`} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    key={`description-${fields.key}`}
                    rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                    label="Mô tả"
                  >
                    <Input.TextArea
                      id={`description-${fields.key}`}
                      placeholder="Nhập mô tả"
                    />
                  </Form.Item>
                </div>

                <Form.List name={[name, "detailDayPlanRoutes"]}>
                  {(innerFields, { add, remove }) => (
                    <>
                      {innerFields.map((innerField) => (
                        <div key={`${name}-${innerField.key}`}>
                          <div className="flex flex-wrap justify-between items-center">
                            <h1 className="text-primary text-bold text-xl">
                              Lộ trình
                            </h1>
                            <Button
                              onClick={() => remove(innerField.name)}
                              className="bg-red-700 text-white my-2"
                            >
                              Xóa lộ trình
                            </Button>
                          </div>
                          <div>
                            <Form.Item
                              {...innerField}
                              name={[innerField.key, "dateRange"]}
                              key={`dateRange-${innerField.key}`}
                              label="Thời gian"
                              required
                            >
                              <DatePicker.RangePicker showTime />
                            </Form.Item>
                            <Form.Item
                              {...innerField}
                              name={[innerField.key, "note"]}
                              key={`note-${innerField.key}`}
                              label="Ghi chú"
                              required
                            >
                              <Input.TextArea />
                            </Form.Item>
                          </div>
                          {/* ... */}
                        </div>
                      ))}
                      <Button
                        className="bg-primary text-white"
                        onClick={() => add()}
                      >
                        Thêm lộ trình
                      </Button>
                    </>
                  )}
                </Form.List>
                <br />
              </div>
            ))}
            <Button
              onClick={() => add()}
              className="bg-primary text-white mt-10"
            >
              Thêm kế hoạch
            </Button>
          </>
        )}
      </Form.List>
    </>
  );
};

export default DetailPlanFollowingTimeline;
