import { useEffect, useState } from "react";
import { getReferenceTransportByProvince } from "../../../../../api/SellPriceHistoryApi";
import { getPriceForVehicle } from "../../../../../api/VehicleApi";
import { formatPrice } from "../../../../../utils/Util";

const VehicleSelect = ({ startPoint, endPoint, vehicleType }) => {
  const [listVehiclePrice, setListVehiclePrice] = useState();
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
          <div>
            <div className="flex flex-col">
              <div className="flex">
                <strong className="mr-32">Ngày bắt đầu</strong>
                <input
                  type="date"
                  onChange={(e) => setStartDate(e.target?.value)}
                />
              </div>
              <div className="flex">
                <strong className="mr-32">Ngày kết thúc</strong>
                <input
                  type="date"
                  onChange={(e) => setEndDate(e.target?.value)}
                />
              </div>
            </div>
            <div className="flex my-4">
              <p className="w-3/12">Chọn hãng máy bay</p>
              <select name="" id="" className="select select-bordered w-9/12">
                <option value={0}>VietnamAirline</option>
                <option value={1}>VietJet</option>
                <option value={2}>Bamboo Airline</option>
              </select>
            </div>

            <div className="flex my-4">
              <p className="w-3/12">Chọn chuyến máy bay</p>
              <select
                name=""
                id=""
                className="select select-bordered w-9/12"
                onChange={(e) => setSelectedVehicle(e.target.value)}
                value={selectedVehicle}
              >
                {Array.isArray(listVehiclePrice) &&
                  listVehiclePrice.length > 0 &&
                  listVehiclePrice.map((item, index) => (
                    <option key={index} value={item.id}>
                      Hãng bay {item.providerName} {item.departure?.name} -{" "}
                      {item.arrival?.name} Giá người lớn:{" "}
                      {formatPrice(item.adultPrice)} Giá trẻ em{" "}
                      {formatPrice(item.childPrice)}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      )}
      {vehicleType !== 4 && vehicleType !== 5 && (
        <>
          <div>
            <strong>Số lượng xe </strong>
            <span className="mx-2">1</span>
          </div>
          <div className="flex my-4">
            <p className="w-3/12">Ngày di chuyển</p>
            <div className="flex">
              <input type="date" />
              -
              <input type="date" />
            </div>
          </div>
          <div>
            <div>
              <div className="flex my-4">
                <p className="w-3/12">Nhà cung cấp xe</p>
                <select name="" id="" className="select select-bordered w-9/12">
                  <option value="">Mon</option>
                </select>
              </div>

              <div className="flex my-4">
                <p className="w-3/12">Chọn tài xế</p>
                <select name="" id="" className="select select-bordered w-9/12">
                  <option value="">
                    Phạm Bùi Minh Khang SĐT: 0336678864 - Tiền công:
                    1.000.000/ngày
                  </option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default VehicleSelect;
