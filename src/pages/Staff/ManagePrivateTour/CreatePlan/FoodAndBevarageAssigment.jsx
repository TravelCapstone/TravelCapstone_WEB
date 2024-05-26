import { Input, Typography, Collapse } from "antd";
import { formatPrice, formatDate, getTimePeriod } from "../../../../utils/Util";
import { ratingLabels } from "../../../../settings/globalStatus";
import FoodModal from "./FoodModal/FoodModal";
import { useState } from "react";
const { Text } = Typography;
const { Panel } = Collapse;

const FoodAndBevarageAssignment = ({ data, privateTourResponse }) => {
  const [selectedRestaurent, setSelectedRestaurent] = useState([[]]);
  const log = (restaurant, index, restaurantIndex) => {
    console.log(index, restaurantIndex);
    const updatedSelectedRestaurants = [...selectedRestaurent];
    if (!updatedSelectedRestaurants[index]) {
      updatedSelectedRestaurants[index] = [];
    }
    updatedSelectedRestaurants[index][restaurantIndex] = restaurant;
    setSelectedRestaurent(updatedSelectedRestaurants);
  };

  console.log("a", selectedRestaurent);
  return (
    <Collapse defaultActiveKey={data.map((_, index) => index)} bordered={false}>
      {data.map((item, index) => (
        <Panel
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Text strong className="mr-2">
                  {index + 1}.
                </Text>
                <Text>
                  {item.district?.name} - {item.district?.province?.name}
                </Text>
              </div>
              <Text>
                {formatDate(item.startDate)} - {formatDate(item.endDate)}
              </Text>
            </div>
          }
          key={index}
        >
          <div className="mb-2">
            <Text strong>Loại hình ăn uống:</Text>
            <div className="flex justify-start">
              <Text className="font-bold mr-2">
                {ratingLabels[item.facilityRating?.rating?.id]}:
              </Text>
              <Text className="text-red-600 font-bold">
                {formatPrice(item.minPrice)} - {formatPrice(item.maxPrice)}
              </Text>
            </div>
            <p className="my-2">
              <Text strong>Số lượng bàn:</Text> {item.quantity} bàn
            </p>
            <p className="my-2">
              <Text strong>Bàn:</Text> {item.servingQuantity} người
            </p>
            <p className="my-2">
              <Text strong>Bữa:</Text> {getTimePeriod(item.startDate)}
            </p>
          </div>
          <FoodModal
            districtId={item.districtId}
            servingQuantity={item.servingQuantity}
            serviceType={0}
            ratingId={item.facilityRating?.id}
            privateTourRequestId={privateTourResponse?.privateTourResponse?.id}
            log={(restaurant) => log(restaurant, index, 0)}
          />

          {selectedRestaurent[index] &&
            selectedRestaurent[index].map((restaurant, restaurantIndex) => (
              <div key={restaurantIndex}>
                <div className="flex">
                  <Text strong className="mr-2">
                    Tên nhà hàng:
                  </Text>
                  <Text>{restaurant?.name}</Text>
                </div>
                <div className="flex">
                  <Text strong className="mr-2">
                    Địa chỉ:
                  </Text>
                  <Text>{restaurant?.address}</Text>
                </div>
                <div className="flex">
                  <Text strong>
                    Thực đơn{" "}
                    {restaurant.mealType === 0
                      ? "ăn sáng"
                      : restaurant.mealType === 1
                        ? "ăn trưa"
                        : "ăn tối"}
                  </Text>
                  <Text className="mx-2">
                    {restaurant.menu.map((dish) => dish.dish.name).join(", ")}
                  </Text>
                </div>
                <div className="flex">
                  <Text strong className="mr-2">
                    Giá:
                  </Text>
                  <Text>{formatPrice(restaurant?.price)}</Text>
                </div>
              </div>
            ))}
        </Panel>
      ))}
    </Collapse>
  );
};

export default FoodAndBevarageAssignment;
