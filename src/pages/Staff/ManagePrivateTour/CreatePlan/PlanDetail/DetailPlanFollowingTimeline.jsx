import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select, Button, Row, Col } from "antd";
import moment from "moment";
import "../../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";
import { useDispatch } from "react-redux";
import { pushSignal } from "../../../../../redux/features/createPlanSlice";
import { getFacilityAndPortInformation } from "../../../../../api/FacilityApi";
const { Option } = Select;

const DetailPlanFollowingTimeline = ({
  location,
  optionQuotation,
  privateTourResponse,
}) => {
  const [port, setPort] = useState([]);
  const fetchLocation = async () => {
    const response = await getFacilityAndPortInformation({
      optionId: optionQuotation.id,
      planLocations: location,
    });
    if (response.isSuccess) {
      setPort(response?.result);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    fetchLocation();
  }, [location]);
  console.log("port", location);

  return (
    <>
      <Form.List name="detailPlanRoutes">
        {(fields, { add, remove }) => (
          <>
            <div className="my-16">
              <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
                TẠO KẾ HOẠCH CHI TIẾT CHO TOUR
              </h2>
            </div>
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
                    onClick={() => {
                      dispatch(pushSignal(false));
                      remove(name);
                    }}
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
                    <DatePicker
                      id={`date-${fields.key}`}
                      disabledDate={(current) =>
                        current &&
                        (current <
                          moment(privateTourResponse.startDate).startOf(
                            "day"
                          ) ||
                          current >
                            moment(privateTourResponse.endDate).endOf("day"))
                      }
                      format={"DD/MM/YYYY"}
                    />
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
                              <DatePicker.RangePicker
                                showTime
                                disabledDate={(current) =>
                                  current &&
                                  (current <
                                    moment(
                                      privateTourResponse.startDate
                                    ).startOf("day") ||
                                    current >
                                      moment(privateTourResponse.endDate).endOf(
                                        "day"
                                      ))
                                }
                                format={"DD/MM/YYYY HH:mm"}
                              />
                            </Form.Item>
                            <div className="grid grid-cols-2">
                              <Form.Item
                                {...innerField}
                                name={[innerField.key, "startId"]}
                                key={`startPoint-${innerField.key}`}
                                label="Điểm xuất phát"
                                required
                              >
                                <Select>
                                  {port.length > 0 &&
                                    port.map((item) => (
                                      <Option value={item.id} key={item.id}>
                                        {`${item.name} - ${item.address}`}
                                      </Option>
                                    ))}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                {...innerField}
                                name={[innerField.key, "endId"]}
                                key={`endPoint-${innerField.key}`}
                                label="Điểm kết thúc"
                                required
                              >
                                <Select>
                                  {port.length > 0 &&
                                    port.map((item) => (
                                      <Option value={item.id} key={item.id}>
                                        {`${item.name} - ${item.address}`}
                                      </Option>
                                    ))}
                                </Select>
                              </Form.Item>
                            </div>
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
              onClick={() => {
                add();
                dispatch(pushSignal(true));
              }}
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
