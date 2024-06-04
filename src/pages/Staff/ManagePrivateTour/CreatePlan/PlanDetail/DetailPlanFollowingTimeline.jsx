import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, ConfigProvider } from "antd";
import moment from "moment";
import "../../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";

function DetailPlanFollowingTimeline(props) {
  const [milestones, setMilestones] = useState([]);
  const [phases, setPhases] = useState([]);

  const handleGetData = () => {
    console.log("Milestones:", milestones);
    console.log("Phases:", phases);
  };

  return (
    <Form>
      <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
        LỊCH TRÌNH TỪNG THỜI GIAN
      </h2>
      <Form.List name="milestones">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} className="flex justify-between mt-2">
                <ConfigProvider locale={viVN}>
                  <Form.Item
                    {...restField}
                    name={[name, "date"]}
                    fieldKey={[fieldKey, "date"]}
                    rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
                  >
                    <DatePicker />
                  </Form.Item>
                </ConfigProvider>
                <Form.Item
                  {...restField}
                  name={[name, "content"]}
                  fieldKey={[fieldKey, "content"]}
                  rules={[
                    { required: true, message: "Vui lòng nhập nội dung" },
                  ]}
                >
                  <Input placeholder="Nội dung" />
                </Form.Item>
                <Button danger onClick={() => remove(name)}>
                  Xóa
                </Button>
              </div>
            ))}
            <Button type="dashed" onClick={() => add()}>
              Thêm mốc thời gian
            </Button>
          </>
        )}
      </Form.List>

      <Form.List name="phases">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} className="flex flex-col mt-4">
                <div className="flex items-center relative">
                  <div className="bg-red-700 text-white w-12 h-12 text-center flex justify-center items-center">
                    <span className="font-bold">{key + 1}</span>
                  </div>
                  <span className="mx-2 font-bold">{`Giai đoạn ${key + 1}`}</span>
                  <Button
                    type="primary"
                    danger
                    shape="circle"
                    icon={<i className="fa-solid fa-xmark"></i>}
                    onClick={() => remove(name)}
                  />
                </div>
                <ConfigProvider locale={viVN}>
                  <Form.Item
                    {...restField}
                    name={[name, "fromDate"]}
                    fieldKey={[fieldKey, "fromDate"]}
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày bắt đầu" },
                    ]}
                  >
                    <DatePicker className="w-full mt-1" placeholder="Từ ngày" />
                  </Form.Item>
                </ConfigProvider>
                <ConfigProvider locale={viVN}>
                  <Form.Item
                    {...restField}
                    name={[name, "toDate"]}
                    fieldKey={[fieldKey, "toDate"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ngày kết thúc",
                      },
                    ]}
                  >
                    <DatePicker
                      className="w-full mt-1"
                      placeholder="Đến ngày"
                    />
                  </Form.Item>
                </ConfigProvider>
                <Form.Item
                  {...restField}
                  name={[name, "title"]}
                  fieldKey={[fieldKey, "title"]}
                  rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
                >
                  <Input placeholder="Tiêu đề" />
                </Form.Item>

                <Form.List name={[name, "milestones"]}>
                  {(
                    milestoneFields,
                    { add: addMilestone, remove: removeMilestone }
                  ) => (
                    <>
                      {milestoneFields.map(
                        ({
                          key: milestoneKey,
                          name: milestoneName,
                          fieldKey: milestoneFieldKey,
                          ...restMilestoneField
                        }) => (
                          <div
                            key={milestoneKey}
                            className="flex justify-between mt-2"
                          >
                            <ConfigProvider locale={viVN}>
                              <Form.Item
                                {...restMilestoneField}
                                name={[milestoneName, "date"]}
                                fieldKey={[milestoneFieldKey, "date"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng chọn ngày",
                                  },
                                ]}
                              >
                                <DatePicker />
                              </Form.Item>
                            </ConfigProvider>
                            <Form.Item
                              {...restMilestoneField}
                              name={[milestoneName, "content"]}
                              fieldKey={[milestoneFieldKey, "content"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập nội dung",
                                },
                              ]}
                            >
                              <Input placeholder="Nội dung" />
                            </Form.Item>
                            <Button
                              danger
                              onClick={() => removeMilestone(milestoneName)}
                            >
                              Xóa
                            </Button>
                          </div>
                        )
                      )}
                      <Button type="dashed" onClick={() => addMilestone()}>
                        Thêm mốc thời gian
                      </Button>
                    </>
                  )}
                </Form.List>
              </div>
            ))}
            <Button type="dashed" onClick={() => add()} className="mt-4">
              Thêm giai đoạn
            </Button>
          </>
        )}
      </Form.List>

      <Button onClick={handleGetData} className="mt-4">
        Log dữ liệu
      </Button>
    </Form>
  );
}

export default DetailPlanFollowingTimeline;
