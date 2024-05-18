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
import { formatDate } from "../../../../../utils/Util";
import InfoTourGuideSection from "./FieldServices/InfoTourGuideSection";
import EachServiceSection from "./FieldServices/EachServiceSection";

const { RangePicker } = DatePicker;
const { Option } = Select;

function CreateOptionForm({ request }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(undefined);
  const [selectedDistrict, setSelectedDistrict] = useState(undefined);

  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  console.log("request", request);

  const renderOtherLocations = (locations) => {
    return locations?.map((location) => (
      <div key={location.id}>
        <div className="flex">
          <h2 className="font-semibold mx-2">{location.province?.name}</h2>
          <p>{location.address}</p>
        </div>
      </div>
    ));
  };

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

  const handleProvinceChange = (value, name) => {
    // Update selected provinces
    const newSelectedProvinces = form.getFieldValue("provinces") || [];
    newSelectedProvinces[name] = value;
    setSelectedProvinces(newSelectedProvinces);
    setSelectedProvince(value);
  };

  const handleDistrictChange = (value, name) => {
    // Update selected districts
    const newSelectedDistricts = form.getFieldValue("districts") || [];
    newSelectedDistricts[name] = value;
    setSelectedDistricts(newSelectedDistricts);
    setSelectedDistrict(value);
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

    const vehicleTransportation = values.transportation.map((vehicle) => ({
      vehicleType: vehicle.vehicleType,
      startPointDistrict: vehicle.startPointDistrict,
      endPoint: vehicle.endPoint,
      endPointDistrict: vehicle.endPointDistrict,
      numOfRentingDay: vehicle?.numOfRentingDay,
      numOfVehicle: vehicle?.numOfVehicle,
      // startDate: vehicle.dateRange[0].format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    }));
    const vehicleTravel = values.travelOptions.map((vehicle) => ({
      vehicleType: vehicle.vehicleType,
      startPoint: vehicle.provinceId,
      startPointDistrict: vehicle.districtId,
      numOfRentingDay: vehicle?.numOfRentingDay,
      numOfVehicle: vehicle?.numOfVehicle,
      // startDate: vehicle.dateRange[0].format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    }));

    const vehicles = vehicleTransportation.concat(vehicleTravel);
    console.log("vehicles", vehicles);

    const payload = {
      optionClass: values.classification, // ok
      privateTourRequestId: request?.privateTourResponse?.id, // ok
      hotels: hotels,
      restaurants: restaurants,
      entertainments: entertainment,
      vehicles: vehicles,
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
    <div className="p-4 shadow-xl rounded-xl w-full max-h-lvh overflow-y-auto">
      <Form form={form} onFinish={onFinish}>
        <h3 className="font-bold text-mainColor text-xl text-center">
          TẠO GÓI TOUR
        </h3>
        {/* THÔNG TIN YÊU CẦU CHUNG */}
        <div className="text-lg px-20 my-10">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            THÔNG TIN YÊU CẦU CHUNG
          </h2>
          <div className="mx-4">
            <div className="mb-3 flex">
              <span className="font-bold ">Địa điểm xuất phát:</span>
              <div className="font-normal  ml-3">
                {request?.privateTourResponse?.startLocation}
              </div>
            </div>
            <div className="flex ">
              <div className="flex mb-3">
                <span className="font-bold ">Địa điểm mong muốn:</span>
                <span className="font-normal  ml-3">
                  {renderOtherLocations(
                    request?.privateTourResponse?.otherLocation
                  )}
                </span>
              </div>
              <div className="ml-4">
                <span className="font-bold ">Địa điểm mong muốn chính:</span>
                <span className="font-normal  ml-3">
                  {request?.privateTourResponse?.mainDestination?.name}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <span className="font-bold ">Số người lớn:</span>
              <span className="font-normal ml-3">
                {request?.privateTourResponse?.numOfAdult}
              </span>
              <span className="font-bold ml-5">Số trẻ em:</span>
              <span className="font-normal ml-3">
                {request?.privateTourResponse?.numOfChildren}
              </span>
            </div>
            <div className="flex">
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

            <Form.Item
              label="Chọn ngày diễn ra tour:  "
              className=" font-bold"
              name={[name, "stayDates"]}
              rules={[
                {
                  required: true,
                  message: "Please choose the stay dates!",
                },
              ]}
            >
              <RangePicker showTime className="!min-w-[300px] mr-10" />
            </Form.Item>
          </div>
        </div>
        {/* DỊCH VỤ CHUNG */}
        <div className="text-lg px-20 my-10">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            DỊCH VỤ CHUNG
          </h2>
          <div className=" mx-4">
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
            <div>
              <h3 className="font-bold text-lg my-2 text-mainColor">
                Thông tin hướng dẫn viên
              </h3>
              <InfoTourGuideSection
                form={form}
                provinces={provinces}
                onProvinceChange={handleProvinceChange}
                setProvinces={setProvinces}
              />
            </div>
          </div>
        </div>
        {/* DỊCH VỤ RIÊNG TỪNG GÓI */}
        <div className="px-20 my-10 ">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            DỊCH VỤ RIÊNG TỪNG GÓI
          </h2>
          <div className=" mx-4">
            <EachServiceSection
              form={form}
              provinces={provinces}
              onProvinceChange={handleProvinceChange}
              setProvinces={setProvinces}
              request={request}
              districts={districts}
              onDistrictChange={handleDistrictChange}
              selectedProvinces={selectedProvinces}
              selectedDistricts={selectedDistricts}
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
