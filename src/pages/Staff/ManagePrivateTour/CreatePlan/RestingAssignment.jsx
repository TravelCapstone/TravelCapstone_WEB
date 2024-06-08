import { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select } from "antd";
import {
  differenceInDays,
  formatDate,
  formatPrice,
} from "../../../../utils/Util";
import { ratingLabels } from "../../../../settings/globalStatus";
import moment from "moment-timezone";
import { getLatestHotelPrice } from "../../../../api/SellPriceHistoryApi";

const RestingAssignment = ({
  data,
  privateTourResponse,
  form,
  setFieldsValue,
  getFieldValue,
}) => {
  const [hotel, setHotel] = useState(Array(data.length).fill([]));

  const fetchHotelPrices = async () => {
    data?.forEach(async (item, index) => {
      const districtId = item.district?.id;
      const ratingId = item.facilityRatingId;
      const servingQuantity = item.servingQuantity;
      const numOfServiceUse = item.quantity; // assuming 'quantity' is the number of service uses
      const response = await getLatestHotelPrice(
        districtId,
        ratingId,
        servingQuantity,
        numOfServiceUse,
        1,
        10
      );

      setHotel((prevHotel) => {
        const newHotel = [...prevHotel];
        newHotel[index] = response.result?.items;

        return newHotel;
      });
    });
  };

  useEffect(() => {
    fetchHotelPrices();
  }, [data]);
  const handleHotelChange = (e, index, dataIndex, itemData) => {
    const selectedItem = hotel[dataIndex].find((item) => item.id === e);
    if (selectedItem) {
      const hotelForm = getFieldValue(`hotel`);
      const startDate = (hotelForm[dataIndex][index].startDate = moment(
        itemData.startDate,
        "YYYY-MM-DD"
      ));
      const endDate = (hotelForm[dataIndex][index].endDate = moment(
        itemData.endDate,
        "YYYY-MM-DD"
      ));
      const serviceType = (hotelForm[dataIndex][index].serviceType =
        itemData.serviceTypeId);

      setFieldsValue({
        hotel: hotelForm.map((hotel, idx) => {
          if (idx === dataIndex) {
            return hotel.map((field, fieldIndex) => {
              if (fieldIndex === index) {
                return {
                  ...field,
                  startDate: startDate,
                  endDate: endDate,
                  serviceType: serviceType,
                  numOfServiceUse: itemData.quantity,
                };
              }
              return field;
            });
          }
          return hotel;
        }),
      });
    }
  };

  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((itemData, dataIdx) => (
          <div key={dataIdx}>
            <div className="flex">
              <strong className="w-1/12 block">{dataIdx + 1}</strong>
              <div className="flex flex-col justify-between w-11/12">
                <div className="flex justify-between">
                  <div className="flex  w-6/12">
                    <strong>Khu vực: </strong>
                    <div className="mx-2">
                      {itemData.district?.name} -{" "}
                      {itemData.district?.province?.name}
                    </div>
                  </div>
                  <div className="flex justify-end w-6/12">
                    <strong>Ngày lưu trú: </strong>
                    <span className="mx-2">
                      {formatDate(itemData.startDate)} -{" "}
                      {formatDate(itemData.endDate)}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <p className="font-bold my-3">Loại hình lưu trú</p>
                </div>
                <div>
                  <div className="mx-6">
                    <div className="flex justify-between">
                      <div>
                        <strong className="mr-2">
                          {ratingLabels[itemData.facilityRating?.rating?.id]}:
                        </strong>
                        <span className="text-red-600 font-bold">
                          {formatPrice(itemData.minPrice)} -{" "}
                          {formatPrice(itemData.maxPrice)}
                        </span>
                      </div>
                      <p>
                        Số lượng ngày/đêm:{" "}
                        {differenceInDays(itemData.startDate, itemData.endDate)}
                      </p>
                    </div>
                    <p className="my-2">
                      <strong>Số lượng : </strong> {itemData.quantity} phòng{" "}
                      {itemData.servingQuantity === 2
                        ? "đơn"
                        : itemData.servingQuantity === 4
                          ? "đôi"
                          : "không xác định"}
                      (1 phòng: {itemData.servingQuantity} người)
                    </p>
                    <div className="flex my-4">
                      <p className="w-3/12 font-bold">Chọn nơi lưu trú</p>

                      <Form.List name={["hotel", dataIdx]}>
                        {(fields, { add, remove }) => (
                          <div className="grid grid-cols-1">
                            {fields.map((field, index) => (
                              <div
                                key={field.key}
                                className="flex flex-wrap my-2"
                              >
                                <div className="mr-4">
                                  <strong>{index + 1}.</strong>
                                </div>
                                <div>
                                  <div className="flex">
                                    <Form.Item
                                      {...field}
                                      name={[field.name, "sellPriceHistoryId"]}
                                      key={`${field.key}-sellPriceHistoryId`}
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Missing sell price history ID",
                                        },
                                      ]}
                                    >
                                      <Select
                                        placeholder={"Chọn nơi lưu trú"}
                                        loading={hotel[dataIdx]?.length === 0}
                                        onChange={(e) =>
                                          handleHotelChange(
                                            e,
                                            index,
                                            dataIdx,
                                            itemData
                                          )
                                        }
                                      >
                                        {hotel[dataIdx] &&
                                          hotel[dataIdx].length > 0 &&
                                          hotel[dataIdx].map((item) => (
                                            <Select.Option
                                              key={item.id}
                                              value={item.id}
                                            >
                                              {`${item.facilityService?.facility?.name} - ${item.facilityService?.name}- ${formatPrice(item.price)}`}
                                            </Select.Option>
                                          ))}
                                      </Select>
                                    </Form.Item>

                                    <Button
                                      onClick={() => remove(field.name)}
                                      className="bg-red-500 text-white"
                                    >
                                      Xoá
                                    </Button>
                                  </div>

                                  <div className="hidden">
                                    <Form.Item
                                      {...field}
                                      name={[field.name, "startDate"]}
                                      key={`${field.key}-startDate`}
                                    >
                                      <DatePicker />
                                    </Form.Item>
                                    <Form.Item
                                      {...field}
                                      name={[field.name, "endDate"]}
                                      key={`${field.key}-endDate`}
                                    >
                                      <DatePicker />
                                    </Form.Item>
                                  </div>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "numOfServiceUse"]}
                                    key={`${field.key}-numOfServiceUse`}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing service type",
                                      },
                                    ]}
                                    label="Số lượng phòng"
                                  >
                                    <Input
                                      placeholder="Số lượng"
                                      type="number"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "serviceType"]}
                                    key={`${field.key}-serviceType`}
                                    hidden
                                  >
                                    <Input
                                      placeholder="Service Type"
                                      defaultValue={itemData.serviceTypeId}
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                            ))}

                            <Button
                              onClick={() => add()}
                              className="bg-primary text-white"
                            >
                              Thêm địa điểm lưu trú
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default RestingAssignment;
