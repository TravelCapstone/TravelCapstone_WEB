import {
  Input,
  Select,
  DatePicker,
  Typography,
  Form,
  Space,
  Button,
} from "antd";
import { formatDateToISOString, formatPrice } from "../../../../utils/Util";
import { vehicleTypeLabels } from "../../../../settings/globalStatus";
import "../../../../settings/setupDayjs";
import { useState } from "react";
import {
  getAvailableVehicle,
  getPriceForVehicle,
} from "../../../../api/VehicleApi";
import { getAvailableDriver } from "../../../../api/HumanResourceSalaryApi";

const { Option } = Select;
const { Text } = Typography;
import locale from "antd/es/date-picker/locale/vi_VN";
import moment from "moment-timezone";
import { DeleteOutlined } from "@ant-design/icons";

const VehicleAssignment = ({
  data,
  form,
  setFieldsValue,
  getFieldValue,
  privateTourResponse,
}) => {
  const [vehicle, setVehicle] = useState([[]]);
  const [driver, setDriver] = useState([[]]);
  const [sellPriceHistory, setSellPriceHistory] = useState([]);
  const [disabledSelect, setDisabledSelect] = useState(data.map(() => true)); // Initialize with true values
  console.log("dataVehicle", data);
  const handleChange = async (index, item) => {
    debugger;
    let newDisabledSelect = [...disabledSelect];
    newDisabledSelect[index] = false;
    setDisabledSelect(newDisabledSelect);
    const dateRange = getFieldValue(`dateRange[${index}]`);
    const date1 = formatDateToISOString(new Date(dateRange[0]));
    const date2 = formatDateToISOString(new Date(dateRange[1]));
    // debugger;
    setFieldsValue({ [`startDate[${index}]`]: date1 });
    setFieldsValue({ [`endDate[${index}]`]: date2 });
    const vehiclePromise = getAvailableVehicle(
      item.vehicleType,
      date1,
      date2,
      1,
      100
    );

    const driverPromise = getAvailableDriver(date1, date2);

    let sellPriceHistoryPromise;
    if (item.vehicleType !== 4 && item.vehicleType !== 5) {
      sellPriceHistoryPromise = getPriceForVehicle({
        firstLocation: {
          provinceId: item.startPointId,
          districtId: null,
        },
        secondLocation: {
          provinceId: item.endPointId ? item.endPointId : item.startPointId,
          districtId: null,
        },
        vehicleType: item.vehicleType,
        startDate: date1,
        endDate: date2,
        numOfServiceUse: item.numOfVehicle,
      });
    }

    const [data, dataDriver, sellPriceHistoryResponse] = await Promise.all([
      vehiclePromise,
      driverPromise,
      sellPriceHistoryPromise,
    ]);

    if (
      data.isSuccess &&
      dataDriver.isSuccess &&
      sellPriceHistoryResponse?.isSuccess
    ) {
      // Create a new array from the current state
      let newVehicle = [...vehicle];
      let newDriver = [...driver];
      let newSellPriceHistory = [...sellPriceHistory];
      newVehicle[index] = data.result.items;
      newDriver[index] = dataDriver.result.items;
      newSellPriceHistory[index] = sellPriceHistoryResponse?.result;
      // Set the state with the new array
      setVehicle(newVehicle);
      setDriver(newDriver);
      setSellPriceHistory(newSellPriceHistory);
      setFieldsValue({
        [`sellPriceHistoryId[${index}]`]: sellPriceHistoryResponse?.result.id,
      });
      setFieldsValue({ [`numOfVehicle[${index}]`]: item.numOfVehicle });
    }
  };
  return (
    <div>
      <h3 className="font-bold text-primary text-xl">Phương tiện di chuyển</h3>

      {data &&
        data.map((item, index) => (
          <div className="rounded-md shadow-md p-4 m-2">
            <div key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <Text strong className="mr-2">
                  {index + 1}.
                </Text>
                <Form.Item
                  name={["vehicleType", index]}
                  key={`vehicleType[${index}]`}
                  hidden
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["startPoint", index]}
                  key={`startPoint[${index}]`}
                  hidden
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["endPoint", index]}
                  key={`endPoint[${index}]`}
                  hidden
                >
                  <Input />
                </Form.Item>

                <strong>
                  {item.startPoint?.name} - {item.endPoint?.name}
                </strong>
              </div>
              <div className="flex items-center mb-2">
                <Text strong className="mr-2">
                  {item.endPoint ? (
                    <>
                      Phương tiện di chuyển từ{" "}
                      <strong>{item.startPoint?.name}</strong> đến{" "}
                      <strong>{item.endPoint?.name}</strong>
                    </>
                  ) : (
                    <>
                      Phương tiện di chuyển trong tỉnh
                      <strong> {item.startPoint?.name}</strong>
                    </>
                  )}
                </Text>
                <Text strong className="mr-2">
                  {vehicleTypeLabels[item.vehicleType]}
                </Text>
                <Text className="ml-2 text-red-600 font-bold">
                  {formatPrice(item.minPrice)} - {formatPrice(item.maxPrice)}
                </Text>
              </div>
              <div className="flex flex-col">
                <Text strong className="mr-2">
                  <strong>Số lượng ngày thuê:</strong> {item.numOfRentingDay}
                </Text>
                <Text strong className="mr-2">
                  <strong>Số lượng xe:</strong>
                  {item.numOfVehicle}
                </Text>
              </div>
              {item.vehicleType === 4 && <></>}
              <div className="flex flex-wrap">
                <Form.Item
                  name={`dateRange[${index}]`}
                  label="Ngày bắt đầu và kết thúc"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn khoảng ngày",
                    },
                  ]}
                >
                  <DatePicker.RangePicker
                    onChange={() => handleChange(index, item)}
                    locale={locale}
                    format={"DD/MM/YYYY"}
                    disabledDate={(current) =>
                      current &&
                      (current <
                        moment(privateTourResponse.startDate).startOf("day") ||
                        current >
                          moment(privateTourResponse.endDate).endOf("day"))
                    }
                  />
                </Form.Item>
              </div>
              {item.vehicleType !== 4 && item.vehicleType !== 5 ? (
                <>
                  <Form.Item
                    name={`sellPriceHistoryId[${index}]`}
                    label="Thông tin xe"
                    className="mx-2"
                  >
                    <Input hidden />
                    {sellPriceHistory[index] ? (
                      <Text>
                        {`${vehicleTypeLabels[sellPriceHistory[index]?.transportServiceDetail?.vehicleTypeId]} - Giá: ${formatPrice(sellPriceHistory[index]?.price)}`}
                      </Text>
                    ) : (
                      <Text>Loading....</Text>
                    )}
                  </Form.Item>
                  <Form.Item
                    name={`numOfVehicle[${index}]`}
                    label="Số lượng"
                    className="mx-2"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số lượng",
                      },
                    ]}
                    hidden
                  >
                    <Input
                      type="number"
                      disabled={disabledSelect[index]}
                      hidden
                    />
                  </Form.Item>

                  <Form.List name={`vehicles[${index}]`}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, outerIndex) => (
                          <div key={`vehicles-${field.key}`}>
                            <div className="flex">
                              <Form.Item
                                {...field}
                                name={[field.name, "driverId"]}
                                fieldKey={[`vehicles${outerIndex}`, "driverId"]}
                                label="Tài xế"
                                className="mx-2"
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng chọn tài xế",
                                  },
                                ]}
                              >
                                <Select
                                  loading={
                                    driver[index] && driver[index].length === 0
                                  }
                                  disabled={disabledSelect[index]}
                                  placeholder="Chọn tài xế"
                                >
                                  {driver[index] &&
                                    driver[index].length > 0 &&
                                    driver[index].map((item, innerIndex) => (
                                      <Select.Option
                                        key={`${outerIndex}-${innerIndex}`}
                                        value={item.id}
                                      >
                                        {`${item.name} - ${formatPrice(item.fixDriverSalary)}- ${item.phoneNumber}`}
                                      </Select.Option>
                                    ))}
                                </Select>
                              </Form.Item>
                              <DeleteOutlined
                                onClick={() => remove(field.name)}
                                className="self-start mt-2 ml-4"
                              />
                            </div>
                            <Form.Item
                              {...field}
                              name={[field.name, "vehicleId"]}
                              fieldKey={[`vehicles${outerIndex}`, "vehicleId"]}
                              label="Phương tiện"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn phương tiện",
                                },
                              ]}
                            >
                              <Select
                                loading={
                                  vehicle[index] && vehicle[index].length === 0
                                }
                                disabled={disabledSelect[index]}
                                placeholder="Chọn phương tiện"
                              >
                                {vehicle[index] &&
                                  vehicle[index].length > 0 &&
                                  vehicle[index].map((item, innerIndex) => (
                                    <Select.Option
                                      key={`${outerIndex}-${innerIndex}`}
                                      value={item.id}
                                    >
                                      {`${item.brand} - ${item.owner} - ${item.plate}`}
                                    </Select.Option>
                                  ))}
                              </Select>
                            </Form.Item>
                          </div>
                        ))}
                        <Form.Item>
                          <Button
                            className="bg-primary text-white"
                            onClick={() => add()}
                          >
                            Thêm phương tiện
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </>
              ) : (
                <>
                  <Form.Item
                    name={["portStartPoint", index]}
                    key={`portStartPoint[${index}]`}
                    hidden
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["portEndPoint", index]}
                    key={`portEndPoint[${index}]`}
                    hidden
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["referencePriceId", index]}
                    key={`referencePriceId[${index}]`}
                    hidden
                  >
                    <Select>
                      <Option value="1">Xe 1</Option>
                    </Select>
                  </Form.Item>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default VehicleAssignment;
