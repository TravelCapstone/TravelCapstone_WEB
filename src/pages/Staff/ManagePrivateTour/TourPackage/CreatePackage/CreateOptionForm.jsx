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
      optionClass: values.classification,
      privateTourRequestId: request?.privateTourResponse?.id,
      locations: [
        {
          districtId: "id huyện", //  Lấy tên tỉnh => GET /location/get-province-by-name/{provinceName}
          //  => lấy id Tỉnh => GET /location/get-all-district-by-provinceId/{provinceId} => lấy id Huyện/TP với name = values.districtId
          hotels: [
            {
              numOfDay: values.numOfDay,
              startDate: values.stayDates,
              endDate: values.stayDates,
              rating: 0,
              servingQuantity: 0,
              numOfRoom: values.roomType,
            },
          ],
          restaurants: [], // Thêm dữ liệu thu thập từ RestaurantSection
          entertainment: {
            quantityLocation: 0, // Thu thập từ EntertainmentSection
          },
        },
      ],
      vehicles: [], // Thu thập từ các phần phương tiện
    };

    setLoading(true);
    try {
      const response = await createOptionsPrivateTour(values);
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
