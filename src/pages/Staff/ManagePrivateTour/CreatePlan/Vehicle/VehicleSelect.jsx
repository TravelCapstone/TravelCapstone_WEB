import { useEffect, useState } from "react";
import { getReferenceTransportByProvince } from "../../../../../api/SellPriceHistoryApi";

const VehicleSelect = ({ startPoint, endPoint, vehicleType }) => {
  const [listVehiclePrice, setListVehiclePrice] = useState();
  const fetchData = async () => {
    const data = await getReferenceTransportByProvince(
      startPoint,
      endPoint,
      vehicleType,
      1,
      100
    );
    if (data.isSuccess) {
      setListVehiclePrice(data.result?.items);
    }
    console.log(data.result?.items);
  };

  useEffect(() => {
    fetchData();
  }, [startPoint, endPoint, vehicleType]);
  return (
    <>
      {vehicleType === 4 && (
        <div>
          <div>
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
              <select name="" id="" className="select select-bordered w-9/12">
                <option value="">
                  Khách sạn 1 sao - Khách sạn Phương Nam: 800000/1 phòng
                </option>
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
