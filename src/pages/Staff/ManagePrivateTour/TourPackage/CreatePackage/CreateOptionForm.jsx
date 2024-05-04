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

function CreateOptionForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const payload = {
      optionClass: values.classification,
      privateTourRequestId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      locations: [
        {
          districtId: values.locations,
          hotels: [
            {
              numOfDay: values.stayDates.length,
              startDate: values.stayDates[0].format(
                "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
              ),
              endDate: values.stayDates[1].format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
              rating: 0,
              servingQuantity: 0,
              numOfRoom: 0,
            },
          ],
          restaurants: [],
          entertainment: {
            quantityLocation: 0,
          },
        },
      ],
      vehicles: [],
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
            <LodgingSection form={form} />
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
