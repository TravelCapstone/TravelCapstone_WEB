import {
  Button,
  Dropdown,
  Space,
  Form,
  Menu,
  message,
  Select,
  DatePicker,
  TreeSelect,
  InputNumber,
} from "antd";
import React, { useEffect, useState } from "react";
import { createOptionsPrivateTour } from "../../../../../api/OptionsApi";
import LodgingSection from "./FieldServices/LodgingSection";
import RestaurantSection from "./FieldServices/RestaurantSection";
import TransportationSection from "./FieldServices/TransportationSection";
import EntertainmentSection from "./FieldServices/EntertaimentSection";
import VerhicleTravelSection from "./FieldServices/VerhicleTravelSection";

const { Option } = Select;

function CreateOptionForm({ request }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  console.log("request", request);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const payload = {
      optionClass: values.classification, // ok
      privateTourRequestId: request?.privateTourResponse?.id, // ok
      hotels: [
        {
          districtId: values.locations[0].districtId, //Lấy từ tỉnh request nhả ra tỉnh select rồi chọn district => lấy được districtId
          numOfDay: values.numOfDay, // Số lượng ngày đêm
          startDate: values.stayDates[0].format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          endDate: values.stayDates[1].format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          rating: values.hotelRating, // rating lấy theo số enum (0-4: khách sạn(có thể ngủ, ăn, thuê xe); 10: resort(ăn, ngủ, chơi, thuê xe)) :
          // 0: Khách sạn 1 sao, 1: 2 sao, 2: 3 sao, 3: 4 sao, 4: 5 sao  , 10: Resort
          // rồi  GET /sell-price/get-min-max-price-of-hotel/{districtId}/{privatetourRequestId}/{ratingId}/{pageNumber}/{pageSize}
          // => lấy được giá min và max
          servingQuantity: values.hotelServingQuantity, // Loại phòng
          numOfRoom: values.numOfRoom, // Số lượng phòng
        },
      ],
      restaurants: [
        {
          districtId: values.restaurantDistrictId, //Lấy từ tỉnh request nhả ra tỉnh select rồi chọn district => lấy được districtId
          startDate: values.restaurantDates[0].format(
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          ),
          endDate: values.restaurantDates[1].format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          rating: values.restaurantRating, // rating lấy theo số enum (5-9: nhà hàng(chỉ ăn)) :
          // 5: Nhà hàng 1 sao, 6: 2 sao, 7: 3 sao, 8: 4 sao, 9: 5 sao
          mealPerDay: values.mealPerDay,
          numOfDay: values.restaurantNumOfDay,
          servingQuantity: values.restaurantServingQuantity,
          serviceAvailability: values.restaurantServiceAvailability,
        },
      ],
      entertainments: [
        {
          districtId: values.entertainmentDistrictId, // Assuming entertainmentDistrictId is collected from EntertainmentSection
          quantityLocation: values.entertainmentQuantityLocation,
        },
      ],
      vehicles: [
        {
          vehicleType: values.vehicleType, // Assuming vehicleType is collected from VerhicleTravelSection
          startPoint: values.vehicleStartPoint,
          startPointDistrict: values.vehicleStartPointDistrict,
          endPoint: values.vehicleEndPoint,
          endPointDistrict: values.vehicleEndPointDistrict,
          numOfRentingDay: values.numOfRentingDay,
          numOfVehicle: values.numOfVehicle,
        },
      ],
    };

    setLoading(true);
    try {
      const response = await createOptionsPrivateTour(payload);
      message.success("Tour plan created successfully!");
      form.resetFields();
    } catch (error) {
      message.error(error.message || "Failed to create tour plan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Form form={form} onFinish={onFinish}>
        <h3 className="font-bold text-mainColor text-xl text-center">
          TẠO GÓI TOUR
        </h3>
        <div className="py-6 px-20 shadow-xl rounded-xl w-full max-h-lvh overflow-y-auto">
          {/* PHÂN LOẠI TOUR*/}
          <Form.Item
            name="classification"
            className="font-semibold"
            label="Phân loại:"
            rules={[
              { required: true, message: "Please select a classification!" },
            ]}
          >
            <Select placeholder="Chọn loại tour" style={{ width: "100%" }}>
              <Option value={0}>Gói Tiết Kiệm</Option>
              <Option value={1}>Gói Cơ Bản</Option>
              <Option value={2}>Gói Nâng Cao</Option>
            </Select>
          </Form.Item>

          {/* NƠI LƯU TRÚ */}
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            TẠO CÁC DỊCH VỤ TRONG TOUR
          </h2>
          <div>
            <h3 className="font-bold text-lg my-2 text-mainColor">
              Nơi lưu trú:
            </h3>
            <LodgingSection form={form} request={request} />
          </div>

          {/* DỊCH VỤ ĂN UỐNG */}
          <div>
            <h3 className="font-bold text-lg my-2 text-mainColor">
              Dịch vụ ăn uống:
            </h3>
            <RestaurantSection form={form} />
          </div>

          {/* PHƯƠNG TIỆN DI CHUYỂN */}
          <div>
            <h3 className="font-bold text-lg my-2 text-mainColor">
              Phương tiện di chuyển
            </h3>
            <TransportationSection form={form} />
          </div>

          {/* PHƯƠNG TIỆN DU LỊCH*/}
          <div>
            <h3 className="font-bold text-lg my-2 text-mainColor">
              Phương tiện du lịch trong tỉnh
            </h3>
            <VerhicleTravelSection form={form} />
          </div>

          {/* GIẢI TRÍ */}
          <div>
            <h3 className="font-bold text-lg my-6 text-mainColor">
              Giải trí (Địa điểm du lịch)
            </h3>
            <EntertainmentSection form={form} />
          </div>

          <hr />
          <div className="my-12 flex flex-wrap justify-between">
            <h3 className="font-bold text-2xl  ">GIÁ DỰ KIẾN CỦA GÓI</h3>
            <p className="font-bold text-2xl ">
              {" "}
              <span className="text-orange-600">11.500.000</span>/người ~{" "}
              <span className="text-orange-600">12.500.000</span>/người
            </p>
          </div>
          <div className="flex justify-center my-4">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className=" bg-teal-600 font-semibold text-white"
              >
                TẠO GÓI TOUR
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default CreateOptionForm;
