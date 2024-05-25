import { Form, Input, Select, DatePicker, Button, Typography } from "antd";
import { formatPrice, formatDate } from "../../../../utils/Util";
import { ratingLabels } from "../../../../settings/globalStatus";

const { Option } = Select;
const { Text } = Typography;

const FoodAndBevarageAssignment = ({ data, privateTourResponse }) => {
  console.log(data);
  const [selectedRestaurent, setSelectedRestaurent] = useState([]);

  const log = (data) => {
    const filter = selectedRestaurent.filter(
      (item) => item.sellPriceHistory?.id === data.sellPriceHistory?.id
    );
    if (filter.length === 0) {
      setSelectedRestaurent([...selectedRestaurent, data]);
    } else {
      const list = selectedRestaurent.filter(
        (item) => item.sellPriceHistory?.id !== data.sellPriceHistory?.id
      );
      setSelectedRestaurent(list);
    }
  };

  return (
    <Form layout="vertical">
      {data &&
        data.map((item, index) => (
          <Form.List name={`foodAndBeverage[${index}]`} key={index}>
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
                    <Text>
                      {item.district?.name} - {item.district?.province?.name}
                    </Text>
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "date"]}
                    label="Ngày"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span>
                      {formatDate(item.startDate)} - {formatDate(item.endDate)}
                    </span>
                  </Form.Item>
                  <Form.Item label="Loại hình ăn uống">
                    <div className="mx-6">
                      <div className="flex justify-start">
                        <Text className="font-bold mr-2">
                          {ratingLabels[item.facilityRating?.rating?.id]}:
                        </Text>
                        <Text className="text-red-600 font-bold">
                          {formatPrice(item.minPrice)} -{" "}
                          {formatPrice(item.maxPrice)}
                        </Text>
                      </div>
                      <p className="my-2">
                        <Text strong>Số lượng bữa:</Text> {item.mealPerDay}
                      </p>
                      <p className="my-2">
                        <Text strong>Bàn:</Text> {item.servingQuantity} người
                      </p>
                      <Form.Item
                        name={[field.name, "restaurant"]}
                        label="Chọn quán ăn"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <FoodModal
                          districtId={item.districtId}
                          servingQuantity={item.servingQuantity}
                          serviceType={0}
                          ratingId={item.facilityRating?.id}
                          privateTourRequestId={
                            privateTourResponse?.privateTourResponse?.id
                          }
                          log={log}
                        />
                      </Form.Item>
                      {selectedRestaurent.length > 0 &&
                        selectedRestaurent.map((restaurent, index) => (
                          <div key={index}>
                            <div className="flex">
                              <Text strong className="mr-2">
                                Tên nhà hàng:
                              </Text>
                              <Text>
                                {restaurent.facilityServices?.facility?.name}
                              </Text>
                            </div>
                            <div className="flex">
                              <Text strong className="mr-2">
                                Địa chỉ:
                              </Text>
                              <Text>
                                {restaurent.facilityServices?.facility?.address}
                                ,{" "}
                                {
                                  restaurent.facilityServices?.facility
                                    ?.communce?.name
                                }
                                ,{" "}
                                {
                                  restaurent.facilityServices?.facility
                                    ?.communce?.district?.name
                                }
                                ,{" "}
                                {
                                  restaurent.facilityServices?.facility
                                    ?.communce?.district.province?.name
                                }
                              </Text>
                            </div>
                            <div className="flex">
                              <Text strong>
                                Thực đơn{" "}
                                {restaurent.sellPriceHistory?.menu
                                  .mealTypeId === 0
                                  ? "ăn sáng"
                                  : restaurent.sellPriceHistory?.menu
                                        .mealTypeId === 1
                                    ? " ăn trưa"
                                    : "ăn tối"}
                              </Text>
                              <Text className="mx-2">
                                {restaurent.menuDishes
                                  .map((dish) => dish.dish.name)
                                  .join(", ")}
                              </Text>
                            </div>
                            <div className="flex">
                              <Text strong className="mr-2">
                                Giá:
                              </Text>
                              <Text>
                                {formatPrice(
                                  restaurent.sellPriceHistory?.price
                                )}
                              </Text>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Form.Item>
                </div>
              ))
            }
          </Form.List>
        ))}
    </Form>
  );
};

export default FoodAndBevarageAssignment;
