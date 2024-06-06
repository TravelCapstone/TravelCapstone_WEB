import {
  Input,
  Select,
  DatePicker,
  Typography,
  ConfigProvider,
  Form,
} from "antd";
import { formatPrice } from "../../../../utils/Util";
import { vehicleTypeLabels } from "../../../../settings/globalStatus";
import VehicleSelect from "../CreatePlan/Vehicle/VehicleSelect";
import "../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";
import { useEffect } from "react";

const { Option } = Select;
const { Text } = Typography;

const VehicleAssignment = ({ data, form, setFieldsValue, getFieldValue }) => {
  console.log("datavehicle", data);
  useEffect(() => {}, [data]);

  return (
    <div>
      {data &&
        data.map((item, index) => (
          <div>
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
                  Phương tiện di chuyển từ{" "}
                  <strong>{item.startPoint?.name}</strong> đến{" "}
                  <strong>{item.endPoint?.name}</strong>:
                </Text>
                <Text strong className="mr-2">
                  {vehicleTypeLabels[item.vehicleType]}
                </Text>
                <Text className="ml-2 text-red-600 font-bold">
                  {formatPrice(item.minPrice)} - {formatPrice(item.maxPrice)}
                </Text>
              </div>
              <Text strong className="mr-2">
                <strong>Số lượng ngày thuê:</strong> {item.numOfRentingDay}
              </Text>
              {item.vehicleType === 4 && (
                <VehicleSelect
                  startPoint={item.startPointId}
                  endPoint={item.endPointId}
                  vehicleType={item.vehicleType}
                />
              )}
              <div className="flex flex-wrap">
                <Form.Item
                  name={`startDate[${index}]`}
                  label="Ngày bắt đầu"
                  required
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  name={`endDate[${index}]`}
                  label="Ngày kết thúc"
                  className="mx-2"
                  required
                >
                  <DatePicker />
                </Form.Item>
              </div>

              {item.vehicleType !== 4 && item.vehicleType !== 5 ? (
                // <VehicleSelect
                //   startPoint={item.startPointId}
                //   endPoint={item.endPointId}
                //   vehicleType={item.vehicleType}
                // />
                <>
                  <Form.Item
                    name={`numOfVehicle[${index}]`}
                    label="Số lượng"
                    className="mx-2"
                    required
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    name={`sellPriceHistoryId[${index}]`}
                    label="Cơ sở thuê"
                    className="mx-2"
                    required
                  >
                    <Select>
                      <Option value="1">Xe 1</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={`driverId[${index}]`}
                    label="Tài xế"
                    className="mx-2"
                    required
                  >
                    <Select>
                      <Option value="1">Nguyễn Văn A</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name={`$vehicleId[${index}]`} label="Phương tiện">
                    <Select>
                      <Select.Option value="1">Xe 1</Select.Option>
                    </Select>
                  </Form.Item>
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
