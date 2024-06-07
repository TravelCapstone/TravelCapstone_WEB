import { Input, Typography, Collapse, Form } from "antd";
import { formatPrice, getTimePeriod } from "../../../../utils/Util";
import { ratingLabels } from "../../../../settings/globalStatus";
import { useEffect, useState } from "react";
import { getSellPriceByMenuId } from "../../../../api/SellPriceHistoryApi";
const { Text } = Typography;
const { Panel } = Collapse;
const FoodAndBevarageAssignment = ({
  data,
  privateTourResponse,
  form,
  setFieldsValue,
  getFieldValue,
}) => {
  console.log(data);

  const [restaurent, setRestaurent] = useState(Array(data.length).fill([]));
  const fetchMenu = async () => {
    data?.forEach(async (item, index) => {
      const menuId = item.menuId;

      const response = await getSellPriceByMenuId(menuId, item.quantity);
      console.log("response", response);

      setRestaurent((prevRestaurent) => {
        const newRestaurent = [...prevRestaurent];
        newRestaurent[index] = response.result;
        return newRestaurent;
      });
    });
  };
  useEffect(() => {
    const fetchMenu = async () => {
      data?.forEach(async (item, index) => {
        const menuId = item.menuId;

        const response = await getSellPriceByMenuId(menuId, item.quantity);
        console.log("response", response);

        setRestaurent((prevRestaurent) => {
          const newRestaurent = [...prevRestaurent];
          newRestaurent[index] = response.result;
          return newRestaurent;
        });

        // Set form fields after updating restaurent state
        form.setFieldsValue({
          [`restaurentSellPriceHistoryId[${index}]`]:
            response.result?.sellPriceHistory?.id,
          [`restaurentStartDate[${index}]`]: data[index].startDate,
          [`restaurentEndDate[${index}]`]: data[index].endDate,
          [`restaurentNumOfServiceUse[${index}]`]: data[index].quantity,
        });
      });
    };

    fetchMenu();
  }, [data]);

  return (
    <>
      {data.map((item, index) => (
        <>
          <div className="mb-2  p-4 ">
            <Text strong>Loại hình ăn uống:</Text>
            <div className="flex justify-start">
              <Text className="font-bold mr-2">
                {ratingLabels[item.facilityRating?.rating?.id]}:
              </Text>
              <Text className="text-red-600 font-bold">
                {formatPrice(item.minPrice)} - {formatPrice(item.maxPrice)}
              </Text>
            </div>
            <div className="flex flex-wrap">
              <p className="">
                <Text strong>Số lượng bàn:</Text> {item.quantity} bàn
              </p>
              <p className="mx-2">
                <Text strong>Bàn:</Text> {item.servingQuantity} người
              </p>
              <p className="mx-2">
                <Text strong>Bữa:</Text> {getTimePeriod(item.startDate)}
              </p>
            </div>
            <p>
              <strong> Địa điểm ăn uống: </strong>
              {
                restaurent[0]?.sellPriceHistory?.menu?.facilityService?.facility
                  ?.name
              }{" "}
            </p>
            <p>
              <strong> Menu: </strong>
              {restaurent[index]?.sellPriceHistory?.menu?.name}
            </p>
            <p>
              <strong>Món ăn chi tiết: </strong>
              {restaurent[index]?.menuResponse?.dishes?.map(
                (menuItem, idx, arr) => (
                  <span
                    key={menuItem.id}
                    style={{
                      display: "inline-block",
                      marginRight: "5px",
                    }}
                  >
                    {menuItem.name}
                    {idx !== arr.length - 1 && " -"}
                  </span>
                )
              )}
            </p>
          </div>

          <Form.Item name={`restaurentSellPriceHistoryId[${index}]`} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={`restaurentStartDate[${index}]`} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={`restaurentEndDate[${index}]`} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={`restaurentNumOfServiceUse[${index}]`} hidden>
            <Input />
          </Form.Item>
        </>
      ))}
    </>
  );
};

export default FoodAndBevarageAssignment;
