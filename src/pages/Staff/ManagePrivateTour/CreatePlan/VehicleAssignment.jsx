import { Input, Select, DatePicker, Typography } from "antd";
import { formatPrice } from "../../../../utils/Util";
import { vehicleTypeLabels } from "../../../../settings/globalStatus";
import VehicleSelect from "../CreatePlan/Vehicle/VehicleSelect";
const { Option } = Select;
const { Text } = Typography;

const VehicleAssignment = ({ data }) => {
  return (
    <div>
      {data &&
        data.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <Text strong className="mr-2">
                {index + 1}.
              </Text>
              <strong>
                {item.startPoint?.name} - {item.endPoint?.name}
              </strong>
            </div>
            <div className="flex items-center mb-2">
              <Text strong className="mr-2">
                Ngày đi:
              </Text>
              <DatePicker />
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
            {item.vehicleType !== 4 && item.vehicleType !== 5 && (
              <VehicleSelect
                startPoint={item.startPointId}
                endPoint={item.endPointId}
                vehicleType={item.vehicleType}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default VehicleAssignment;
