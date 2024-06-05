import React, { useEffect, useState } from "react";
import {
  dietaryPreferenceLabels,
  statusPrivateTourLabels,
} from "../../../../../settings/globalStatus";
import { formatPrice, formatDate } from "../../../../../utils/Util";
import { Button, Card, List } from "antd";
import { useNavigate } from "react-router-dom";
import { getRoomSuggestion } from "../../../../../api/privateTourRequestApi";
import { LISTING_TOUR_REQUEST_STAFF } from "../../../../../settings/constant";

function TourRequestSection({ request }) {
  const navigate = useNavigate();

  const [numOfRoom, setNumOfRoom] = useState([]);

  console.log("numOfRoom", numOfRoom);

  const fetchGetRoomSuggestion = async (data) => {
    const response = await getRoomSuggestion(data);
    setNumOfRoom(response.data.result);
  };

  useEffect(() => {
    const data = {
      numOfSingleMale: request?.privateTourResponse?.numOfSingleMale,
      numOfSingleFemale: request?.privateTourResponse?.numOfSingleFemale,
      familyDetails: request?.privateTourResponse?.roomDetails?.map(
        (family) => ({
          numOfAdult: family.numOfAdult,
          numOfChildren: family.numOfChildren,
          totalFamily: family.totalFamily,
        })
      ),
    };
    fetchGetRoomSuggestion(data);
  }, [
    request?.privateTourResponse?.numOfSingleMale,
    request?.privateTourResponse?.numOfSingleFemale,
    request?.privateTourResponse?.roomDetails,
  ]);

  const handleCreateTour = () => {
    const TourId = request?.privateTourResponse?.id;
    navigate(`/staff/view-list-tour-private/${TourId}?tab=1`);
  };

  const tagStatusStyles = {
    0: { backgroundColor: "#FFFAE5", color: "#FFA500" }, // Light yellow bg, orange text
    1: { backgroundColor: "#E5F1FF", color: "#007BFF" }, // Light blue bg, blue text
    2: { backgroundColor: "#E5FFE5", color: "#28A745" }, // Light green bg, green text
    3: { backgroundColor: "#FFE5E5", color: "#FF0000" }, // Light red bg, red text
  };

  const renderOtherLocations = (locations) => {
    return (
      <div className="flex flex-wrap">
        {locations?.map((location, index) => (
          <div key={location.id} className="pr-2 mb-4">
            <div className="flex items-center">
              <h2 className=" mr-2">{location.province?.name}</h2>
              {index !== locations.length - 1 && <span className="">-</span>}
              <p>{location.address}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFoodRequest = (food) => {
    return dietaryPreferenceLabels[food] || "Không yêu cầu";
  };

  return (
    <>
      <div className="p-5 mx-10 py-10 shadow-inner rounded-3xl  bg-white">
        <h1 className="text-center font-bold text-xl mb-5 text-mainColor">
          THÔNG TIN YÊU CẦU TOUR
        </h1>
        <div className="   ">
          <div className="flex flex-row mt-10 p-5 rounded-4xl ">
            {/* Thông tin khách hàng */}
            <div className="w-4/12 border-r border-solid border-gray-300">
              <h2 className="text-start font-semibold text-mainColor text-lg mb-5">
                Thông tin khách hàng
              </h2>
              <div className="mb-3">
                <span className="font-bold text-sm">Khách hàng</span>
                <span className="font-normal text-sm ml-3">
                  {request?.privateTourResponse?.name}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm">Điện thoại liên hệ</span>
                <span className="font-normal text-sm ml-3">
                  {request?.privateTourResponse?.account.phoneNumber}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm">Ngày tạo yêu cầu</span>
                <span className="font-normal text-sm ml-3">
                  {formatDate(request?.privateTourResponse?.createDate)}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm">Trạng thái</span>
                <span
                  className="font-medium text-sm ml-3"
                  style={
                    request?.privateTourResponse?.status === "all"
                      ? {}
                      : {
                          ...tagStatusStyles[
                            request?.privateTourResponse?.status
                          ],
                          borderRadius: "5px",
                          padding: "5px 10px",
                        }
                  }
                >
                  {
                    statusPrivateTourLabels[
                      request?.privateTourResponse?.status
                    ]
                  }
                </span>
              </div>
            </div>

            {/* Chi tiết yêu cầu */}
            <div className="w-8/12 px-2">
              <h2 className="text-start font-semibold text-mainColor text-lg mb-5">
                Chi tiết yêu cầu
              </h2>
              <div className="mb-3">
                <span className="font-bold text-sm">Loại tour:</span>
                <span className="font-normal text-sm ml-3">
                  {request?.privateTourResponse?.isEnterprise
                    ? "Doanh nghiệp"
                    : "Gia đình"}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm">Mô tả yêu cầu:</span>
                <span className="font-normal text-sm ml-3">
                  {request?.privateTourResponse?.description}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm">Yêu cầu về đồ ăn:</span>
                <span className="font-normal text-sm ml-3">
                  {renderFoodRequest(
                    request?.privateTourResponse?.dietaryPreference
                  )}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm">Yêu cầu lưu trú:</span>
                <List
                  dataSource={numOfRoom}
                  renderItem={(item) => (
                    <List.Item>
                      <Card className="mr-4 bg-teal-100">
                        <Card.Meta
                          title={`Phòng ${item.roomSize === 4 ? "đôi" : "đơn"} `}
                          description={`Tổng số phòng: ${item.numOfRoom}`}
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm">
                  Ngân sách dự tính trên đầu người:
                </span>
                <span className="font-normal text-sm ml-3">
                  {formatPrice(request?.privateTourResponse?.wishPrice)}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm">Số người lớn:</span>
                <span className="font-normal text-sm ml-3">
                  {request?.privateTourResponse?.numOfAdult} người
                </span>
                <span className="font-bold text-sm ml-5">Số trẻ em:</span>
                <span className="font-normal text-sm ml-3">
                  {request?.privateTourResponse?.numOfChildren} người
                </span>
              </div>
              <div className="mb-3 flex">
                <p className="font-bold text-sm mr-5"> Khách đi lẻ:</p>
                <span className="font-semibold text-sm">
                  Số lượng người nam:
                </span>
                <span className="font-normal text-sm ml-3">
                  {request?.privateTourResponse?.numOfSingleMale} người
                </span>
                <span className="font-semibold text-sm ml-5">
                  Số lượng người nữ:
                </span>
                <span className="font-normal text-sm ml-3">
                  {request?.privateTourResponse?.numOfSingleFemale} người
                </span>
              </div>
              <div className="mb-3 flex">
                <p className="font-bold text-sm mr-5"> Khách gia đình:</p>

                <span className="font-semibold text-sm">Số gia đình:</span>
                <span className="font-normal text-sm ml-3">
                  {request?.privateTourResponse?.numOfFamily} gia đình
                </span>
              </div>
              <div className="ml-5">
                <span className="font-semibold text-sm ">
                  Chi tiết từng gia đình:
                </span>
                <span className="font-normal text-sm ml-3">
                  {request?.privateTourResponse?.roomDetails.map(
                    (item, index) => (
                      <div className="flex flex-wrap my-2 ml-4">
                        <li className="font-semibold list-disc mr-2">
                          Kiểu gia đình thứ {index + 1}.
                        </li>
                        <div>
                          <p>
                            <span className="font-semibold mr-2">
                              Số lượng người lớn:
                            </span>{" "}
                            {item.numOfAdult} người
                          </p>
                          <p>
                            <span className="font-semibold mr-2">
                              Số lượng trẻ em:
                            </span>{" "}
                            {item.numOfChildren} người
                          </p>
                          <p>
                            <span className="font-semibold mr-2">
                              Số gia đình:
                            </span>{" "}
                            {item.totalFamily} người
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm">Địa điểm xuất phát:</span>
                <span className="font-normal text-sm ml-3">
                  {request?.privateTourResponse?.startLocation}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm">Địa điểm yêu cầu:</span>
                <span className="font-normal text-sm ml-3">
                  {renderOtherLocations(
                    request?.privateTourResponse?.otherLocation
                  )}
                </span>
              </div>
              <div className="flex text-sm">
                <div className="mb-3">
                  <span className="font-bold ">Khoảng thời gian:</span>
                  <span className="font-normal  ml-3">
                    {request?.privateTourResponse?.numOfDay} ngày{" "}
                    {request?.privateTourResponse?.numOfNight} đêm
                  </span>
                </div>
                <div className="ml-10">
                  <span className="font-bold ">Thời gian rảnh dự kiến:</span>
                  <span className="font-normal  ml-3">
                    {formatDate(request?.privateTourResponse?.startDate)} -{" "}
                    {formatDate(request?.privateTourResponse?.endDate)}
                  </span>
                </div>
              </div>
              {/* Các thông tin khác */}
            </div>
          </div>

          {/* Nút tạo tour */}
          <div className="text-right my-4 w-5/6">
            {request.privateTourResponse?.status === 0 && !request.option1 && (
              <Button
                className="bg-mainColor text-white font-semibold"
                onClick={handleCreateTour}
              >
                TẠO GÓI TOUR
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TourRequestSection;
