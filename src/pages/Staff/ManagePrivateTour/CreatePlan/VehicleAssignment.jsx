import { Form, Input, Select, DatePicker, Button } from "antd";
import { formatPrice } from "../../../../utils/Util";
import { vehicleTypeLabels } from "../../../../settings/globalStatus";

const { Option } = Select;

const VehicleAssignment = ({ data }) => {
  console.log(data);

  return (
    <Form layout="vertical">
      <p>
        Địa điểm đón khách: <strong>TP. HCM</strong>
      </p>
      {data &&
        data.map((item, index) => (
          <Form.List name={`vehicles[${index}]`} key={index}>
            {(fields) =>
              fields.map((field, fieldIndex) => (
                <div key={field.key}>
                  <Form.Item
                    name={[field.name, "id"]}
                    label={`${index + 1}`}
                    style={{ marginBottom: 0 }}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "region"]}
                    label="Khu vực"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span>
                      {item.startPoint?.name} - {item.endPoint?.name}
                    </span>
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "departureDate"]}
                    label="Ngày đi"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "vehicleType"]}
                    label={
                      <span>
                        Phương tiện di chuyển từ{" "}
                        <strong>{item.startPoint?.name}</strong> đến{" "}
                        <strong>{item.endPoint?.name}</strong>
                      </span>
                    }
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Select
                      style={{ width: 200 }}
                      value={vehicleTypeLabels[item.vehicleType]}
                    >
                      {Object.entries(vehicleTypeLabels).map(
                        ([value, label]) => (
                          <Option key={value} value={value}>
                            {label}
                          </Option>
                        )
                      )}
                    </Select>
                    <span className="ml-2 text-red-600 font-bold">
                      {formatPrice(item.minPrice)} -{" "}
                      {formatPrice(item.maxPrice)}
                    </span>
                  </Form.Item>
                  {item.vehicleType === 4 && (
                    <VehicleSelect
                      startPoint={item.startPointId}
                      endPoint={item.endPointId}
                      vehicleType={item.vehicleType}
                    />
                  )}
                  {item.vehicleType !== 4 && item.vehicleType !== 5 && (
                    <VehicleSelect
                      startPoint={item.startPointId}
                      endPoint={item.endPointId}
                      vehicleType={item.vehicleType}
                    />
                  )}
                </div>
              ))
            }
          </Form.List>
        ))}
      <Form.Item>
        <Button type="primary">Tạo kế hoạch tour</Button>
      </Form.Item>
    </Form>
  );
};

export default VehicleAssignment;
