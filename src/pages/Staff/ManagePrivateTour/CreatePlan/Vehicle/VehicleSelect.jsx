import { useEffect, useState } from "react";
import { getPriceForVehicle } from "../../../../../api/VehicleApi";
import { formatPrice } from "../../../../../utils/Util";
import { DatePicker, Select, Typography, Space, Input } from "antd";

const { Option } = Select;
const { Text } = Typography;

const VehicleSelect = ({ startPoint, endPoint, vehicleType }) => {
  const [listVehiclePrice, setListVehiclePrice] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, [startPoint, endPoint, vehicleType, startDate, endDate]);

  return (
    <>
      {vehicleType === 4 && (
        <div>
          <div className="flex flex-col">
            <div className="flex mb-4">
              <Text className="mr-32">Ngày bắt đầu</Text>
              <DatePicker onChange={(date) => setStartDate(date)} />
            </div>
            <div className="flex mb-4">
              <Text className="mr-32">Ngày kết thúc</Text>
              <DatePicker onChange={(date) => setEndDate(date)} />
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
              <DatePicker />
              <Text>-</Text>
              <DatePicker />
            </Space>
          </div>
          <div>
            <div className="flex my-4">
              <Text className="w-3/12">Nhà cung cấp xe</Text>
              <Select className="w-9/12">
                <Option value="">Mon</Option>
              </Select>
            </div>
            <div className="flex my-4">
              <Text className="w-3/12">Chọn tài xế</Text>
              <Select className="w-9/12">
                <Option value="">
                  Phạm Bùi Minh Khang SĐT: 0336678864 - Tiền công:
                  1.000.000/ngày
                </Option>
              </Select>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VehicleSelect;
