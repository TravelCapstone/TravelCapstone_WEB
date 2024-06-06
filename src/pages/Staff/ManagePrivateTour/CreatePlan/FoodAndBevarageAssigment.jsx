import {
  Input,
  Typography,
  Collapse,
  Form,
  Select,
  DatePicker,
  Button,
} from "antd";
import { formatPrice, formatDate, getTimePeriod } from "../../../../utils/Util";
import { ratingLabels } from "../../../../settings/globalStatus";
import FoodModal from "./FoodModal/FoodModal";
import { useEffect, useState } from "react";
import moment from "moment";
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
  console.log(restaurent);
  useEffect(() => {
    fetchMenu();
    restaurent.forEach((item, index) => {
      debugger;
      setFieldsValue({
        [`restaurent-sellPriceHistoryId[${index}]`]: item?.sellPriceHistory?.id,
      });
      setFieldsValue({
        [`restaurent-startDate[${index}]`]: data[index].startDate,
      });
      setFieldsValue({ [`restaurent-endDate[${index}]`]: data[index].endDate });
      setFieldsValue({
        [`restaurent-numOfServiceUse[${index}]`]: data[index].quantity,
      });
    });
  }, [data]);
  return (
    <Collapse
      defaultActiveKey={data.map((_, dataIdx) => dataIdx)}
      bordered={false}
    >
      {data.map((item, index) => (
        <Panel
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Text strong className="mr-2">
                  {index + 1}.
                </Text>
                <Text className="font-bold">
                  {item.district?.name} - {item.district?.province?.name}
                </Text>
              </div>
              <Text>
                {formatDate(item.startDate)} - {formatDate(item.endDate)}
              </Text>
            </div>
          }
          key={`panel-${index}`}
          className="bg-white"
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
            {restaurent[index].sellPriceHistory?.menu?.name}
          </p>
          <p>
            <strong>Món ăn chi tiết: </strong>
            {restaurent[index].menuResponse?.dishes?.map(
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
          <Form.Item name={`restaurent-sellPriceHistoryId[${index}]`} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={`restaurent-startDate[${index}]`} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={`restaurent-endDate[${index}]`} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={`restaurent-numOfServiceUse[${index}]`} hidden>
            <Input />
          </Form.Item>
        </Panel>
      ))}
    </Collapse>
  );
};

export default FoodAndBevarageAssignment;
