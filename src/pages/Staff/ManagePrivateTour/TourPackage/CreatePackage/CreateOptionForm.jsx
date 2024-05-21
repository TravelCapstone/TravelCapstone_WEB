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
  notification,
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
import InsuranceSection from "./FieldServices/InsuranceSection";
import { postHumanResourceSalaryWithIsForTourguide } from "../../../../../api/HumanResourceSalaryApi";
import { getVehiclePriceRange } from "../../../../../api/SellPriceHistoryApi";
import MaterialCostsSection from "./FieldServices/materialCostsSection";

const { RangePicker } = DatePicker;
const { Option } = Select;

function CreateOptionForm({ request }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(undefined);
  const [selectedDistrict, setSelectedDistrict] = useState(undefined);

  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  const [salaryInfo, setSalaryInfo] = useState(null);
  const [quantityTourGuide, setQuantityTourGuide] = useState(null);

  // Get giá Verhicle
  const [priceInfo, setPriceInfo] = useState({});

  console.log("salaryInfo", salaryInfo);

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const values = await form.validateFields(["quantityTourGuide"]);
        const numOfDays = request?.privateTourResponse?.numOfDay;

        if (values.quantityTourGuide && numOfDays) {
          const data = [
            {
              quantity: values.quantityTourGuide,
              numOfDay: numOfDays,
            },
          ];

          const response = await postHumanResourceSalaryWithIsForTourguide(
            true,
            data
          );
          if (response && response.data) {
            setSalaryInfo(response.data);
          } else {
            throw new Error("No data received");
          }
        }
      } catch (error) {
        console.error(error.message || "Failed to fetch salary data");
      }
    };

    // Only fetch salary if both values are present
    if (
      quantityTourGuide !== null &&
      request?.privateTourResponse?.numOfDay !== undefined
    ) {
      fetchSalary();
    }

    // Call fetchSalary if both values are present
  }, [quantityTourGuide, , request?.privateTourResponse?.numOfDay]); // Dependency array

  // Update state when form field changes
  const handleQuantityChange = (value) => {
    setQuantityTourGuide(value);
  };

  // get giá verhicle
  const fetchVehiclePriceRange = async (index) => {
    debugger;

    const quantity =
      request?.privateTourResponse?.numOfAdult +
      request?.privateTourResponse?.numOfChildren;
    const values = form.getFieldValue("transportation")[index];
    if (
      !values.startPoint ||
      !values.endPoint ||
      !values.vehicleType ||
      !values.dateRange ||
      !values.numOfVehicle ||
      !quantity
    ) {
      return;
    }
    const startDate = values.dateRange[0].toISOString();
    const endDate = values.dateRange[1].toISOString();

    try {
      debugger;
      const response = await getVehiclePriceRange(
        values.startPoint,
        values.endPoint,
        values.vehicleType,
        quantity,
        startDate,
        endDate
      );
      console.log("responseVerhicle", response);
      if (response && response.result) {
        setPriceInfo((prev) => ({
          ...prev,
          [index]: {
            minCostperPerson: response.result.minCostperPerson,
            maxCostperPerson: response.result.maxCostperPerson,
          },
        }));
      } else {
        message.error("Failed to fetch vehicle price range");
      }
    } catch (error) {
      console.error("Failed to fetch vehicle price range:", error);
      message.error("Failed to fetch vehicle price range");
    }
  };

  // Get giá verhicle change
  const handleFieldChange = (index) => {
    fetchVehiclePriceRange(index);
  };

  console.log("request", request);
  console.log("selectedProvince", selectedProvince);

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
    const loadDistricts = async () => {
      setLoadingDistricts(true);
      try {
        const response = await getAllDistrictsByProvinceId(selectedProvince);
        setDistricts(response);
      } catch (error) {
        message.error("Failed to fetch districts");
      } finally {
        setLoadingDistricts(false);
      }
    };

    if (selectedProvince) {
      loadDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  const handleProvinceChange = (index, value, name) => {
    // Update selected provinces
    const newSelectedProvinces = form.getFieldValue("provinces") || [];
    newSelectedProvinces[name] = value;
    fetchVehiclePriceRange(index);

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

  const adjustFormToAPI = (values) => {
    const apiPayload = {
      startDate: values.startDate,
      endDate: values.endDate,
      tourGuideCosts: values.InfoTourGuide.map((guide) => ({
        quantity: guide.numOfGuide,
        numOfDay: guide.numOfRentingDay,
        provinceId: guide.provinceId,
      })),
      materialCosts: [], // Include actual fields from your form if any
      assurancePriceHistoryId: "", // Assume a value or add a field in your form
      organizationCost: 0, // Static or from form
      contigencyFeePerPerson: 0, // Static or from form
      escortFee: 0, // Static or from form
      operatingFee: 0, // Static or from form
      privateTourRequestId: "", // From form or preset
      provinceServices: values.provinceServices.map((service) => ({
        hotels: [
          {
            districtId: service.districtId,
            startDate: service.hotelStartDate,
            endDate: service.hotelEndDate,
            servingQuantity: service.servingQuantity,
            numOfRoom: service.numOfRoom,
            hotelOptionRatingOption1: service.hotelOption1,
            hotelOptionRatingOption2: service.hotelOption2,
            hotelOptionRatingOption3: service.hotelOption3,
          },
        ],
        restaurants: [
          {
            districtId: service.districtId,
            menuQuotations: [
              {
                date: service.menuDate, // Assuming a date field for simplicity
                breakfastMenuOption1: service.breakfastOption1,
                breakfastMenuOption2: service.breakfastOption2,
                breakfastMenuOption3: service.breakfastOption3,
                lunchMenuOption1: service.lunchOption1,
                lunchMenuOption2: service.lunchOption2,
                lunchMenuOption3: service.lunchOption3,
                dinnerMenuOption1: service.dinnerOption1,
                dinnerMenuOption2: service.dinnerOption2,
                dinnerMenuOption3: service.dinnerOption3,
              },
            ],
          },
        ],
        entertainments: [
          {
            districtId: service.districtId,
            quantityLocationOption1: service.entertainmentOption1,
            quantityLocationOption2: service.entertainmentOption2,
            quantityLocationOption3: service.entertainmentOption3,
          },
        ],
        eventGalas: [
          {
            date: service.galaDate,
            option1EventId: service.galaOption1,
            option2EventId: service.galaOption2,
            option3EventId: service.galaOption3,
          },
        ],
      })),
      vehicles: values.transportation.map((vehicle) => ({
        vehicleType: vehicle.vehicleType,
        startPoint: vehicle.startPoint,
        startPointDistrict: vehicle.startPointDistrict,
        endPoint: vehicle.endPoint,
        endPointDistrict: vehicle.endPointDistrict,
        startDate: vehicle.startDate,
        endDate: vehicle.endDate,
        numOfVehicle: vehicle.numOfVehicle,
        optionClass1: vehicle.optionClass1,
        optionClass2: vehicle.optionClass2,
        optionClass3: vehicle.optionClass3,
      })),
    };

    return apiPayload;
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const payload = {};

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
              name="tourDate"
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
                priceInfo={priceInfo}
                setPriceInfo={setPriceInfo}
                form={form}
                provinces={provinces}
                districts={districts}
                onProvinceChange={handleProvinceChange}
                setProvinces={setProvinces}
                fetchVehiclePriceRange={fetchVehiclePriceRange}
                handleFieldChange={handleFieldChange}
              />
            </div>

            {/* PHƯƠNG TIỆN DU LỊCH*/}
            <div>
              <h3 className="font-bold text-lg my-2 text-mainColor">
                Phương tiện du lịch trong tỉnh
              </h3>
              <VerhicleTravelSection
                priceInfo={priceInfo}
                setPriceInfo={setPriceInfo}
                form={form}
                provinces={provinces}
                districts={districts}
                onProvinceChange={handleProvinceChange}
                setProvinces={setProvinces}
                fetchVehiclePriceRange={fetchVehiclePriceRange}
                handleFieldChange={handleFieldChange}
              />
            </div>

            <div>
              <h3 className="font-bold text-lg my-2 text-mainColor">
                Thông tin hướng dẫn viên cả tour
              </h3>
              <div className="flex flex-wrap">
                <Form.Item
                  label="Số lượng hướng dẫn viên:"
                  className=" font-semibold"
                  name="quantityTourGuide"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền số lượng hướng dẫn viên",
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={30}
                    onChange={handleQuantityChange}
                    placeholder="Số lượng hướng dẫn viên"
                    className="!w-[200px] mr-10"
                  />
                </Form.Item>
                <div className="flex font-semibold text-gray-500 ml-10">
                  {salaryInfo && (
                    <p>
                      Phí hướng dẫn viên:{" "}
                      {salaryInfo.result.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  )}{" "}
                  {/* Adjust based on actual response structure */}
                </div>
              </div>
            </div>
            {/* THÔNG TIN HƯỚNG DẪN VIÊN TRONG TỈNH */}
            <div>
              <h3 className="font-bold text-lg my-2 text-mainColor">
                Thông tin hướng dẫn viên trong tỉnh
              </h3>
              <InfoTourGuideSection
                form={form}
                provinces={provinces}
                onProvinceChange={handleProvinceChange}
                setProvinces={setProvinces}
              />
            </div>
            {/* MATERIAL COST */}
            <div>
              <h3 className="font-bold text-lg my-2 text-mainColor">
                Dịch vụ khác
              </h3>
              <MaterialCostsSection
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
          <div className="mt-10">
            <h3>Form Data:</h3>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </div>
          {/* BẢO HIỂM */}
          <div>
            <h3 className="font-bold text-lg my-6 text-mainColor">
              Gói Bảo Hiểm
            </h3>
            <InsuranceSection
              // basePath={[field.name]}
              request={request}
              form={form}
              provinces={provinces}
              districts={districts}
              onProvinceChange={handleProvinceChange}
              setProvinces={setProvinces}
            />
          </div>
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
              selectedProvince={selectedProvince}
              selectedDistricts={selectedDistricts}
              loadingDistricts={loadingDistricts}
              getAllDistrictsByProvinceId={getAllDistrictsByProvinceId}
              setLoadingDistricts={setLoadingDistricts}
              setDistricts={setDistricts}
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
