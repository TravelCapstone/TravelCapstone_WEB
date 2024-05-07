import React, { useState, useEffect } from "react";
import { getAveragePriceOfService } from "../../../../../api/SellPriceHistoryApi";
import { unitLabels } from "../../../../../settings/globalStatus";
import { formatPrice } from "../../../../../utils/Util";

const EntertainmentModal = ({
  districtId,
  privateTourRequestId,
  servingQuantity,
  serviceType,
  ratingId,
  log,
}) => {
  const [listEntertainment, setListEntertainment] = useState([]);
  const [selectedEntertainment, setSelectedEntertainment] = useState([]); // Thay đổi thành một mảng

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
      setListEntertainment(data.result.items);
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
    const index = selectedEntertainment.findIndex(
      (selectedItem) =>
        selectedItem.sellPriceHistory?.id === item.sellPriceHistory?.id
    );
    if (index === -1) {
      setSelectedEntertainment([...selectedEntertainment, item]);
    } else {
      const updatedSelection = [...selectedEntertainment];
      updatedSelection.splice(index, 1);
      setSelectedEntertainment(updatedSelection);
    }
  };
  useEffect(() => {
    log(selectedEntertainment);
  }, [selectedEntertainment]);
  return (
    <>
      <button
        className="btn bg-mainColor text-white"
        onClick={() =>
          document.getElementById("entertainment_modal").showModal()
        }
      >
        Chọn
      </button>
      <dialog id="entertainment_modal" className="modal">
        <div className="modal-box w-11/12 max-w-6xl">
          <h3 className="font-bold text-lg">Chọn địa điểm vui chơi</h3>

          <div className="overflow-x-auto rounded-xl shadow-xl my-4">
            <table className="table w-full ">
              <thead className="bg-mainColor text-white h-14">
                <tr>
                  <th>STT</th>
                  <th>Địa điểm</th>
                  <th>Địa chỉ</th>
                  <th>Dịch vụ </th>
                  <th>Đơn vị</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {listEntertainment &&
                  listEntertainment.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        selectedEntertainment.some(
                          (selectedItem) =>
                            selectedItem.sellPriceHistory?.id ===
                            item.sellPriceHistory?.id
                        )
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
                onClick={() => setSelectedEntertainment([])}
              >
                Clear
              </button>
              <button
                className="mx-2 btn"
                onClick={() =>
                  document.getElementById("entertainment_modal").close()
                }
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

export default EntertainmentModal;
