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
import { getAllDistrictsByProvinceId } from "../../../../../api/LocationApi";

const { Option } = Select;

function CreateOptionForm({ request }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(undefined);

  useEffect(() => {
    if (request?.privateTourResponse?.otherLocation) {
      setProvinces(
        request.privateTourResponse.otherLocation.map((loc) => ({
          id: loc.provinceId,
          name: loc.province.name,
        }))
      );
    }
  }, [request]);

  useEffect(() => {
    if (selectedProvince) {
      const loadDistricts = async () => {
        try {
          const response = await getAllDistrictsByProvinceId(selectedProvince);
          setDistricts(response);
        } catch (error) {
          message.error("Failed to fetch districts");
        }
      };
      loadDistricts();
    } else {
      setDistricts([]); // Clear districts when no province is selected
    }
  }, [selectedProvince]);

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const hotels = values.locations.map((location) => ({
      districtId: location.districtId,
      numOfDay: location.numOfDay,
      startDate: location.stayDates[0].format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      endDate: location.stayDates[1].format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      rating: location.ratingHotel,
      servingQuantity: location.roomType,
      numOfRoom: location.numOfRoom,
    }));
    // debugger;

    const restaurants = values.diningOptions.map((restaurants) => ({
      districtId: restaurants.districtId,
      startDate: restaurants.mealDates[0].format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      endDate: restaurants.mealDates[1].format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      rating: restaurants.diningType,
      mealPerDay: restaurants.mealPerDay,
      numOfDay: restaurants.numOfDay,
      servingQuantity: restaurants.servingQuantity,
      serviceAvailability: restaurants.serviceAvailability,
    }));

    const entertainment = values.entertainment.map((entertainment) => ({
      districtId: entertainment.districtId,
      quantityLocation: entertainment.quantityLocation,
    }));

    const vehicle = values.transportation.map((vehicle) => ({
      vehicleType: vehicle.vehicleType, // Assuming vehicleType is collected from VerhicleTravelSection
      startPoint: vehicle.startPoint,
      startPointDistrict: vehicle.startPointDistrict,
      endPoint: vehicle.endPoint,
      endPointDistrict: vehicle.endPointDistrict,
      numOfRentingDay: vehicle?.numOfRentingDay,
      numOfVehicle: vehicle?.numOfVehicle,
      // startDate: vehicle.dateRange[0].format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    }));

    const payload = {
      optionClass: values.classification, // ok
      privateTourRequestId: request?.privateTourResponse?.id, // ok
      hotels: hotels,
      restaurants: restaurants,
      entertainments: entertainment,
      vehicles: vehicle,
    };

    setLoading(true);
    try {
      const response = await createOptionsPrivateTour(payload);
      console.log("response", response);
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
              {!request.option1 && <Option value={0}>Gói Tiết Kiệm</Option>}
              {!request.option2 && <Option value={1}>Gói Cơ Bản</Option>}
              {!request.option3 && <Option value={2}>Gói Nâng Cao</Option>}
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
            <LodgingSection
              form={form}
              provinces={provinces}
              districts={districts}
              onProvinceChange={handleProvinceChange}
              setProvinces={setProvinces}
            />
          </div>

          {/* DỊCH VỤ ĂN UỐNG */}
          <div>
            <h3 className="font-bold text-lg my-2 text-mainColor">
              Dịch vụ ăn uống:
            </h3>
            <RestaurantSection
              form={form}
              provinces={provinces}
              districts={districts}
              onProvinceChange={handleProvinceChange}
              setProvinces={setProvinces}
            />
          </div>

          {/* PHƯƠNG TIỆN DI CHUYỂN */}
          <div>
            <h3 className="font-bold text-lg my-2 text-mainColor">
              Phương tiện di chuyển
            </h3>
            <TransportationSection
              form={form}
              provinces={provinces}
              districts={districts}
              onProvinceChange={handleProvinceChange}
              setProvinces={setProvinces}
            />
          </div>

          {/* PHƯƠNG TIỆN DU LỊCH*/}
          <div>
            <h3 className="font-bold text-lg my-2 text-mainColor">
              Phương tiện du lịch trong tỉnh
            </h3>
            <VerhicleTravelSection
              form={form}
              provinces={provinces}
              districts={districts}
              onProvinceChange={handleProvinceChange}
              setProvinces={setProvinces}
            />
          </div>

          {/* GIẢI TRÍ */}
          <div>
            <h3 className="font-bold text-lg my-6 text-mainColor">
              Giải trí (Địa điểm du lịch)
            </h3>
            <EntertainmentSection
              form={form}
              provinces={provinces}
              districts={districts}
              onProvinceChange={handleProvinceChange}
              setProvinces={setProvinces}
            />
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
