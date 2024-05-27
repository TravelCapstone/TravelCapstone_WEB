import { useEffect, useState } from "react";
import { getPriceForVehicle } from "../../../../../api/VehicleApi";
import { formatPrice } from "../../../../../utils/Util";
import { DatePicker, Select, Typography, Space, Input } from "antd";
import { getAvailableDriver } from "../../../../../api/HumanResourceSalaryApi";

const { Option } = Select;
const { Text } = Typography;
const { RangePicker } = DatePicker;

const VehicleSelect = ({ startPoint, endPoint, vehicleType }) => {
  const [listVehiclePrice, setListVehiclePrice] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const [startDate, endDate] = dateRange;
    const data = await getPriceForVehicle(1, 10, {
      firstLocation: {
        provinceId: startPoint,
        districtId: null,
      },
      secondLocation: {
        provinceId: endPoint,
        districtId: null,
      },
      vehicleType: vehicleType,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });
    if (data.isSuccess) {
      setListVehiclePrice(data.result.items);
    }

    const driverData = await getAvailableDriver(
      new Date(startDate).toISOString(),
      new Date(endDate).toISOString()
    );
    if (driverData.isSuccess) {
      setAvailableDrivers(driverData.result?.items);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      fetchData();
    }
  }, [startPoint, endPoint, vehicleType, dateRange]);

  return (
    <>
      {vehicleType === 4 && (
        <div>
          <div className="flex flex-col">
            <div className="flex mb-4">
              <Text className="mr-32">Ngày bắt đầu và kết thúc</Text>
              <RangePicker
                onChange={(dates) => setDateRange(dates)}
                value={dateRange}
              />
            </div>
          </div>
          <div className="flex my-4">
            <Text className="w-3/12">Chọn hãng máy bay</Text>
            <Select className="w-9/12" defaultValue={0}>
              <Option value={0}>VietnamAirline</Option>
              <Option value={1}>VietJet</Option>
              <Option value={2}>Bamboo Airline</Option>
            </Select>
          </div>
          <div className="flex my-4">
            <Text className="w-3/12">Chọn chuyến máy bay</Text>
            <Select
              className="w-9/12"
              onChange={(value) => setSelectedVehicle(value)}
              value={selectedVehicle}
              loading={isLoading}
            >
              {Array.isArray(listVehiclePrice) &&
                listVehiclePrice.length > 0 &&
                listVehiclePrice.map((item, index) => (
                  <Option key={index} value={item.id}>
                    Hãng bay {item.providerName} {item.departure?.name} -{" "}
                    {item.arrival?.name} Giá người lớn:{" "}
                    {formatPrice(item.adultPrice)} Giá trẻ em{" "}
                    {formatPrice(item.childPrice)}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
      )}
      {vehicleType !== 4 && vehicleType !== 5 && (
        <>
          <div>
            <Text>Số lượng xe</Text>
            <Text className="mx-2">1</Text>
          </div>
          <div className="flex my-4">
            <Text className="w-3/12">Ngày di chuyển</Text>
            <Space>
              <RangePicker
                onChange={(dates) => setDateRange(dates)}
                value={dateRange}
              />
            </Space>
          </div>
          <div className="flex my-4">
            <Text className="w-3/12">Chọn tài xế</Text>
            <Select className="w-9/12" loading={availableDrivers.length < 0}>
              {availableDrivers &&
                availableDrivers.length > 0 &&
                availableDrivers.map((driver) => (
                  <Option key={driver.id} value={driver.id}>
                    {driver.name} - SĐT: {driver.phoneNumber} - Tiền công:{" "}
                    {formatPrice(driver.fixDriverSalary)}/ngày
                  </Option>
                ))}
            </Select>
          </div>
        </>
      )}
    </>
  );
};

export default VehicleSelect;
