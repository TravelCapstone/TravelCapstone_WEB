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
  List,
  Card,
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
import ExpectedPriceOption from "./FieldServices/ExpectedPriceOption";
import dayjs from "dayjs";
import CustomSurchangeSection from "./FieldServices/CustomSurchangeSection";
import EventGalasSection from "./FieldServices/eventGalasSection";
import LoadingOverlay from "../../../../../components/Loading/LoadingOverlay";
import { usePrice } from "../../../../../context/PriceContext";

const { RangePicker } = DatePicker;
const { Option } = Select;

function CreateOptionForm({ request }) {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
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
  const [numOfDaysLoging, setNumOfDaysLoging] = useState(0);

  const [startDateChange, setStartDateChange] = useState(null);
  const [endDateChange, setEndDateChange] = useState(null);

  console.log("endDateChange", endDateChange);
  console.log("startDateChange", startDateChange);

  // Get giá Verhicle
  const [priceInfo, setPriceInfo] = useState({});

  const { updateCommonPrice, commonPrices } = usePrice();

  useEffect(() => {
    if (salaryInfo) {
      const priceATourGuide = salaryInfo.result / quantityTourGuide;
      const commonService = {
        item: "Hướng dẫn viên cả tour",
        price: priceATourGuide,
        quantity: quantityTourGuide,
        total: salaryInfo.result,
      };
      // Kiểm tra nếu dịch vụ đã tồn tại trong danh sách
      const existingServiceIndex = commonPrices.findIndex(
        (service) => service.item === commonService.item
      );
      if (existingServiceIndex !== -1) {
        // Cập nhật giá trị dịch vụ
        commonPrices[existingServiceIndex] = commonService;
      } else {
        // Thêm dịch vụ mới vào danh sách
        updateCommonPrice(commonService);
      }
    }
  }, [salaryInfo, updateCommonPrice, commonPrices]);

  console.log("salaryInfo", salaryInfo);
  console.log("numOfDaysLoging", numOfDaysLoging);

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [formValues]);

  const onValuesChange = (changedValues, allValues) => {
    setFormValues(allValues);
  };

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
            updatePrice(response.data.result);
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
    const quantity =
      request?.privateTourResponse?.numOfAdult +
      request?.privateTourResponse?.numOfChildren;
    const values = form.getFieldValue("transportation")[index];
    if (
      !values.startPoint ||
      !values.endPoint ||
      !values.vehicleType ||
      !values.dateRange ||
      !quantity
    ) {
      return;
    }
    const startDate = values.dateRange[0].toISOString();
    const endDate = values.dateRange[1].toISOString();

    try {
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

  const handleProvinceChange2 = (value, name) => {
    // Update selected provinces
    const newSelectedProvinces2 = form.getFieldValue("provinces") || [];
    newSelectedProvinces2[name] = value;
    setSelectedProvinces(newSelectedProvinces2);
    setSelectedProvince(value);
  };

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

  const buildVehiclesPayload = (transportation, travelOptions) => {
    let vehicles = transportation.map((vehicle) => ({
      vehicleType: vehicle.vehicleType,
      startPoint: vehicle.startPoint,
      startPointDistrict: vehicle.startPointDistrict,
      endPoint: vehicle.endPoint,
      endPointDistrict: vehicle.endPointDistrict,
      startDate: vehicle.dateRange[0],
      endDate: vehicle.dateRange[1],
      numOfVehicle: vehicle.numOfVehicle,
    }));

    travelOptions.forEach((option) => {
      vehicles.push({
        vehicleType: option.vehicleType,
        startPoint: option.provinceId,
        startPointDistrict: null, // Assuming value to be filled or left blank
        endPoint: null, // Assuming value to be filled or left blank
        endPointDistrict: null, // Assuming value to be filled or left blank
        startDate: option.dateRange[0],
        endDate: option.dateRange[1],
        numOfVehicle: option.numOfVehicle,
      });
    });

    return vehicles;
  };

  const adjustFormToAPI = (values) => {
    console.log("VALUE", values);

    const vehicles = buildVehiclesPayload(
      values.transportation,
      values.travelOptions
    );

    // Create a unified array for all tour guide costs
    const tourGuideCosts = [];

    // Add the special case for quantityTourGuide if it's 1
    if (quantityTourGuide) {
      const numOfDays = request?.privateTourResponse?.numOfDay; // Number of days from another part of the form
      tourGuideCosts.push({
        quantity: quantityTourGuide,
        numOfDay: numOfDays,
        provinceId: null, // Explicitly set to null or omit if not needed
      });
    }

    // Add other tour guide costs from formData
    values.tourGuideCosts.forEach((guide) => {
      tourGuideCosts.push({
        quantity: guide.quantity,
        numOfDay: guide.numOfDay,
        provinceId: guide.provinceId,
      });
    });

    const filterNumOfSingleRoom =
      request.privateTourResponse?.roomDetails.filter(
        (room) => room.quantityPerRoom === 2
      );

    const filterNumOfDoubleRoom =
      request.privateTourResponse?.roomDetails.filter(
        (room) => room.quantityPerRoom === 4
      );

    const apiPayload = {
      startDate: values.tourDate[0], //ok
      endDate: values.tourDate[1], //ok
      tourGuideCosts: tourGuideCosts, //ok
      materialCosts: values.materialCosts.map((material) => ({
        materialPriceHistoryId: material.materialId, //ok
        quantity: material.quantity, //ok
      })),
      assurancePriceHistoryOptionId: values.insurance, // OK

      organizationCost: values?.organizationCost || 0, // ok
      contingencyFee: values.contigencyFeePerPerson || 0, // ok
      escortFee: values.escortFee || 0, // ok
      operatingFee: values.operatingFee || 0, // ok
      assurancePricePerPerson: values.assurancePricePerPerson || 0, // ok
      privateTourRequestId: request?.privateTourResponse?.id, // ok
      eventGalas: [
        {
          date: values.eventGala.date,
          eventId: values.eventGala.eventId,
          customEvent: "string",
        },
      ],
      provinceServices: values.provinceServices.map((service) => ({
        hotels: service?.hotels?.map((hotel) => ({
          districtId: service.districtId, //ok
          startDate: hotel.stayDatesLoging[0], //ok
          endDate: hotel.stayDatesLoging[1], //ok
          numOfDoubleRoom: filterNumOfDoubleRoom[0].totalRoom,
          numOfSingleRoom: filterNumOfSingleRoom[0].totalRoom,
          hotelOptionRatingOption1: hotel.hotelOptionRatingOption1, //ok
          hotelOptionRatingOption2: hotel.hotelOptionRatingOption2, //ok
          hotelOptionRatingOption3: hotel.hotelOptionRatingOption3, //ok
        })),

        restaurants: service?.restaurants?.map((restaurant) => {
          const menuQuotations = restaurant.days.reduce((acc, day) => {
            const date = restaurant.date;
            ["economyMenu", "basicMenu", "advancedMenu"].forEach(
              (menuType, index) => {
                if (day[menuType] && day[menuType].length > 0) {
                  acc.push({
                    date,
                    option: index,
                    menuIds: day[menuType],
                  });
                }
              }
            );
            return acc;
          }, []);

          return {
            districtId: service.districtId,
            menuQuotations: menuQuotations,
          };
        }),

        entertainments: service?.entertainments?.map((enter) => ({
          districtId: service.districtId, //ok
          quantityLocationOption1: enter?.quantityLocation1, //ok
          quantityLocationOption2: enter?.quantityLocation2, //ok
          quantityLocationOption3: enter?.quantityLocation3, //ok
        })),
      })),
      vehicles: vehicles, // ok
    };

    console.log("API PAYLOAD", apiPayload);

    return apiPayload;
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    // Generate the API payload from the form values
    const payload = adjustFormToAPI(values);

    console.log("Payload to be sent to the API: ", payload);

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
  const startDate = request?.privateTourResponse?.startDate;
  const endDate = request?.privateTourResponse?.endDate;
  const parsedStartDate = startDate ? dayjs(startDate) : null;
  const parsedEndDate = endDate ? dayjs(endDate) : null;

  const getDefaultPickerValue = () => {
    if (!parsedStartDate || !parsedEndDate) {
      return moment(); // Nếu không có tourDate, sử dụng ngày hiện tại
    }
    return parsedStartDate; // Sử dụng ngày bắt đầu của tourDate
  };

  const handleStartDateChange = (dates) => {
    if (dates && dates[0]) {
      const start = dates[0];
      setStartDateChange(start);
      const numOfDays =
        request?.privateTourResponse?.numOfNight + (start.hour() >= 14 ? 1 : 0);
      setEndDateChange(start.clone().add(numOfDays, "day"));
    } else {
      setStartDateChange(null);
      setEndDateChange(null);
    }
  };

  const disableDates = (current) => {
    if (!parsedStartDate || !parsedEndDate) {
      return false;
    } else {
      if (!startDateChange) {
        return (
          current && (current < parsedStartDate || current > parsedEndDate)
        );
      } else {
        if (endDateChange < parsedEndDate)
          return (
            current && (current < startDateChange || current > endDateChange)
          );
      }
      return current && (current < startDateChange || current > parsedEndDate);
    }
  };

  return (
    <div className="p-4 shadow-xl rounded-xl w-full max-h-lvh overflow-y-auto">
      {/* <LoadingOverlay isLoading={loading} /> */}
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
            <div className="mb-3 flex flex-wrap items-center">
              <p>
                <span className="font-bold ">Số người lớn:</span>
                <span className="font-normal ml-3">
                  {request?.privateTourResponse?.numOfAdult}
                </span>
              </p>
              <p>
                <span className="font-bold ml-5">Số trẻ em:</span>
                <span className="font-normal ml-3">
                  {request?.privateTourResponse?.numOfChildren}
                </span>
              </p>
              <div className="ml-10 flex items-center">
                <span className="font-bold text-lg mr-4 ">
                  Yêu cầu lưu trú:
                </span>
                <List
                  dataSource={request.privateTourResponse?.roomDetails}
                  renderItem={(item) => (
                    <List.Item>
                      <Card className="mr-4 bg-teal-100">
                        <Card.Meta
                          title={`Phòng ${item.quantityPerRoom === 4 ? "đôi" : "đơn"} `}
                          description={`Tổng số phòng: ${item.totalRoom}`}
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
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
              <RangePicker
                showTime
                className="!min-w-[300px] mr-10"
                onCalendarChange={handleStartDateChange}
                disabledDate={disableDates}
                defaultPickerValue={getDefaultPickerValue()}
                format={"DD/MM/YYYY"}
                onOpenChange={(status) => {
                  // Additional handling if needed when picker opens/closes
                  if (!status) {
                    // status false when picker closes
                    handleStartDateChange(null); // Reset on picker close if needed
                  }
                }}
              />
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
                request={request}
                priceInfo={priceInfo}
                setPriceInfo={setPriceInfo}
                form={form}
                provinces={provinces}
                districts={districts}
                onProvinceChange={handleProvinceChange}
                setProvinces={setProvinces}
                fetchVehiclePriceRange={fetchVehiclePriceRange}
                handleFieldChange={handleFieldChange}
                startProvince={request?.privateTourResponse?.startLocation}
                selectedProvince={selectedProvince}
              />
            </div>

            {/* PHƯƠNG TIỆN DU LỊCH*/}
            <div>
              <h3 className="font-bold text-lg my-2 text-mainColor">
                Phương tiện du lịch trong tỉnh
              </h3>
              <VerhicleTravelSection
                request={request}
                form={form}
                provinces={provinces}
                districts={districts}
                onProvinceChange={handleProvinceChange}
                setProvinces={setProvinces}
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
                request={request}
                form={form}
                provinces={provinces}
                onProvinceChange={handleProvinceChange2}
                setProvinces={setProvinces}
              />
            </div>

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
                onProvinceChange={handleProvinceChange2}
                setProvinces={setProvinces}
              />
            </div>
            <div>
              <h3 className="font-bold text-lg my-6 text-mainColor">
                Gói GALA/ TEAMBULDING
              </h3>
              <EventGalasSection
                request={request}
                form={form}
                provinces={provinces}
                districts={districts}
                setProvinces={setProvinces}
              />
            </div>
            {/* MATERIAL COST */}
            <div>
              <h3 className="font-bold text-lg my-2 text-mainColor">
                Dịch vụ khác
              </h3>
              <MaterialCostsSection
                request={request}
                form={form}
                provinces={provinces}
                onProvinceChange={handleProvinceChange2}
                setProvinces={setProvinces}
              />
            </div>
            <div>
              <h3 className="font-bold text-lg my-2 text-mainColor">
                Phụ phí tuỳ chỉnh
              </h3>
              <CustomSurchangeSection
                request={request}
                form={form}
                quantity={
                  request?.privateTourResponse.numOfAdult +
                  request?.privateTourResponse.numOfChildren
                }
              />
            </div>
          </div>
        </div>
        {/* DỊCH VỤ RIÊNG TỪNG GÓI */}
        <div className="px-20 my-10 ">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            DỊCH VỤ RIÊNG TỪNG GÓI
          </h2>
          {/* <div className="mt-10">
            <h3>Form Data:</h3>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </div> */}

          <div className=" mx-4">
            <EachServiceSection
              form={form}
              provinces={provinces}
              onProvinceChange={handleProvinceChange2}
              setProvinces={setProvinces}
              request={request}
              districts={districts}
              onDistrictChange={handleDistrictChange}
              selectedProvinces={selectedProvinces}
              selectedProvince={selectedProvince}
              selectedDistricts={selectedDistricts}
              selectedDistrict={selectedDistrict}
              loadingDistricts={loadingDistricts}
              getAllDistrictsByProvinceId={getAllDistrictsByProvinceId}
              setLoadingDistricts={setLoadingDistricts}
              setDistricts={setDistricts}
              numOfDaysLoging={numOfDaysLoging}
              setNumOfDaysLoging={setNumOfDaysLoging}
            />
          </div>

          <hr />

          <div className="my-12 ">
            <h3 className="font-bold text-2xl  ">GIÁ DỰ KIẾN CỦA GÓI</h3>
            <ExpectedPriceOption request={request} />
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
