import { useEffect, useState } from "react";
import { getAveragePriceOfService } from "../../../../../api/SellPriceHistoryApi";
import { unitLabels } from "../../../../../settings/globalStatus";
import { formatPrice } from "../../../../../utils/Util";

const HotelModal = ({
  districtId,
  privateTourRequestId,
  servingQuantity,
  serviceType,
  ratingId,
  log,
}) => {
  const [listHotel, setListHotel] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // State để lưu trữ hàng được chọn

  const fetchData = async () => {
    const data = await getAveragePriceOfService(
      districtId,
      privateTourRequestId,
      ratingId,
      serviceType,
      servingQuantity,
      1,
      10
    );
    if (data.isSuccess) {
      setListHotel(data.result.items);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    districtId,
    privateTourRequestId,
    servingQuantity,
    serviceType,
    ratingId,
  ]);

  const handleSelectHotel = (item) => {
    if (
      selectedHotel &&
      item.sellPriceHistory?.id === selectedHotel.sellPriceHistory?.id
    ) {
      setSelectedHotel(null);
    } else {
      setSelectedHotel(item);
    }
    log(item);
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn bg-mainColor text-white"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Chọn
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-6xl">
          <h3 className="font-bold text-lg">Chọn khách sạn</h3>

          <div className="overflow-x-auto rounded-xl shadow-xl my-4">
            <table className="table w-full ">
              <thead className="bg-mainColor text-white h-14">
                <tr>
                  <th>STT</th>
                  <th>Khách sạn</th>
                  <th>Địa chỉ</th>
                  <th>Dịch vụ </th>
                  <th>Đơn vị</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {listHotel &&
                  listHotel.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        item.sellPriceHistory?.id ===
                        selectedHotel?.sellPriceHistory?.id
                          ? "bg-yellow-100 text-black"
                          : ""
                      }
                      onClick={() => handleSelectHotel(item)}
                    >
                      <td>{index + 1}</td>
                      <td>
                        {item.sellPriceHistory?.facilityService?.facility.name}
                      </td>
                      <td>
                        {
                          item.sellPriceHistory?.facilityService?.facility
                            .address
                        }
                        ,{" "}
                        {
                          item.sellPriceHistory?.facilityService?.facility
                            .communce?.name
                        }
                        ,{" "}
                        {
                          item.sellPriceHistory?.facilityService?.facility
                            .communce?.district?.name
                        }
                        ,{" "}
                        {
                          item.sellPriceHistory?.facilityService?.facility
                            .communce?.district.province?.name
                        }
                      </td>
                      <td>{item.sellPriceHistory?.facilityService?.name}</td>

                      <td>
                        {
                          unitLabels[
                            item.sellPriceHistory?.facilityService?.unitId
                          ]
                        }
                      </td>
                      <td>{formatPrice(item.sellPriceHistory?.price)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              {<button className="btn  bg-mainColor text-white">Chọn</button>}
              <button
                className="mx-2 btn"
                onClick={() => setSelectedHotel(null)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default HotelModal;
