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
  ConfigProvider,
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
import { alertFail, alertSuccess } from "../../../../../hook/useNotification";
import "../../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";
import moment from "moment";
import { getRoomSuggestion } from "../../../../../api/privateTourRequestApi";

const { RangePicker } = DatePicker;
const { Option } = Select;

const convertDateFormat = (dateString) => {
  if (!dateString) return null; // Kiểm tra nếu dateString là null hoặc undefined
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-");

  const isoDate = `${year}-${month}-${day}T${timePart}.000Z`;
  // debugger;
  return isoDate;
};

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

  const [endDateChange, setEndDateChange] = useState(null);
  const [startDateTourChange, setStartDateTourChange] = useState(null);
  const [startDateChange, setStartDateChange] = useState(null); // theo dõi value thay đổi của thời gian tour

  const [endDateFinal, setEndDateFinal] = useState(null); // tourDate
  const [startDateFinal, setStartDateFinal] = useState(null); // tourDate

  const [insurances, setInsurances] = useState({});

  console.log("startDateFinal", startDateFinal);
  console.log("endDateFinal", endDateFinal);

  const startDate = request?.privateTourResponse?.startDate;

  const [endDateTour, setEndDateTour] = useState(
    moment(startDate).add(request?.privateTourResponse?.numOfDay + 1, "days")
  );
  const [jsonCustomEventJsonString, setJsonCustomEventJsonString] =
    useState(null);

  // Get giá Verhicle
  const [priceInfo, setPriceInfo] = useState({});

  const { updateCommonPrice, commonPrices } = usePrice();
  const [numOfRoom, setNumOfRoom] = useState([]);

  console.log("numOfRoom", numOfRoom);

  const fetchGetRoomSuggestion = async (data) => {
    const response = await getRoomSuggestion(data);
    setNumOfRoom(response.data.result);
  };

  useEffect(() => {
    const data = {
      numOfSingleMale: request?.privateTourResponse?.numOfSingleMale,
      numOfSingleFemale: request?.privateTourResponse?.numOfSingleFemale,
      familyDetails: request?.privateTourResponse?.roomDetails?.map(
        (family) => ({
          numOfAdult: family.numOfAdult,
          numOfChildren: family.numOfChildren,
          totalFamily: family.totalFamily,
        })
      ),
    };
    fetchGetRoomSuggestion(data);
  }, [
    request?.privateTourResponse?.numOfSingleMale,
    request?.privateTourResponse?.numOfSingleFemale,
    request?.privateTourResponse?.roomDetails,
  ]);

  useEffect(() => {
    if (startDateChange === null) {
      form.setFieldsValue({ startDateTour: moment(startDate).add(1, "days") });
    } else {
      form.setFieldsValue({ startDateTour: startDateChange });
    }
  }, [form, startDate, startDateChange]);

  const hasDuplicates = (provinces) => {
    // Use a Set to efficiently store unique values and check for duplicates
    const uniqueProvinces = new Set();
    const modifiedProvinces = []; // Array to store the modified provinces (without duplicates)

    for (const province of provinces) {
      // Check if the current province's ID already exists in the Set
      if (uniqueProvinces.has(province.id)) {
        // Duplicate found, skip adding to modifiedProvinces
        continue; // Move to the next iteration
      }
      uniqueProvinces.add(province.id); // Add the province's ID to the Set
      modifiedProvinces.push(province); // Add the province to the modified array
    }
    // debugger;
    // If duplicates were found, update the provinces state
    if (modifiedProvinces.length !== provinces.length) {
      setProvinces(modifiedProvinces);
    }

    return modifiedProvinces.length !== provinces.length; // Return true if duplicates were removed
  };

  // Example usage
  const hasDuplicatesResult = hasDuplicates(provinces);
  console.log("Provinces have duplicates:", hasDuplicatesResult); // Output: Provinces have duplicates: true (assuming duplicates exist)

  const startDateTour = form.getFieldValue("startDateTour");

  const endDate = request?.privateTourResponse?.endDate;
  const parsedStartDate = startDate ? dayjs(startDate) : null;
  const parsedEndDate = endDate ? dayjs(endDate) : null;

  useEffect(() => {
    const numOfDays = request?.privateTourResponse?.numOfDay || 0;
    const numOfNight = request?.privateTourResponse?.numOfNight || 0;
    const newStartDate = startDateTour
      ? startDateTour.format("DD-MM-YYYY HH:mm:ss")
      : moment(startDate).format("DD-MM-YYYY HH:mm:ss");

    let adjustedStartDate = moment(newStartDate, "DD-MM-YYYY HH:mm:ss");
    let adjustedEndDate = moment(newStartDate, "DD-MM-YYYY HH:mm:ss").add(
      numOfDays,
      "days"
    );

    if (numOfDays === numOfNight) {
      // Ngày bắt đầu từ 6hAM - 12h PM
      if (adjustedStartDate.hour() < 6) {
        adjustedStartDate.hour(6).minute(0).second(0);
      } else if (adjustedStartDate.hour() > 12) {
        adjustedStartDate.hour(12).minute(0).second(0);
      }
      // Ngày kết thúc từ 12hPM - 21hPM
      if (adjustedEndDate.hour() < 12) {
        adjustedEndDate.hour(12).minute(0).second(0);
      } else if (adjustedEndDate.hour() > 21) {
        adjustedEndDate.hour(21).minute(0).second(0);
      }
    } else if (numOfDays === numOfNight + 1) {
      // debugger;
      // Ngày bắt đầu từ 12hPM - 18hPM
      if (adjustedStartDate.hour() < 12) {
        adjustedStartDate.hour(12).minute(0).second(0);
      } else if (adjustedStartDate.hour() > 18) {
        adjustedStartDate.hour(18).minute(0).second(0);
      }
      // Ngày kết thúc từ 12hPM - 21hPM
      if (adjustedEndDate.hour() < 12) {
        adjustedEndDate.hour(12).minute(0).second(0);
      } else if (adjustedEndDate.hour() > 21) {
        adjustedEndDate.hour(21).minute(0).second(0);
      }
    }

    setStartDateTourChange(adjustedStartDate.format("DD-MM-YYYY HH:mm:ss"));
    setEndDateChange(adjustedEndDate.format("DD-MM-YYYY HH:mm:ss"));
  }, [startDateTour, startDate, request]);

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
    const values = form?.getFieldValue("transportation")[index];
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
        log.error("Failed to fetch districts");
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

  useEffect(() => {
    const startDateFinalChange = startDateTourChange
      ? convertDateFormat(startDateTourChange)
      : null; // "2024-06-19T12:00:00"
    const endDateFinalChange = endDateChange
      ? convertDateFormat(endDateChange)
      : null; // "2024-06-20T18:00:00"

    if (startDateFinalChange && endDateFinalChange) {
      setEndDateFinal(endDateFinalChange);
      setStartDateFinal(startDateFinalChange);
    }
  }, [startDateTourChange, endDateChange]); // Chỉ chạy lại effect khi startDateTourChange hoặc endDateChange thay đổi

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
    values?.tourGuideCosts?.forEach((guide) => {
      tourGuideCosts.push({
        quantity: guide.quantity,
        numOfDay: guide.numOfDay,
        provinceId: guide.provinceId,
      });
    });

    const filterNumOfSingleRoom = numOfRoom.filter(
      (room) => room.roomSize === 2
    );

    const filterNumOfDoubleRoom = numOfRoom.filter(
      (room) => room.roomSize === 4
    );

    const apiPayload = {
      startDate: startDateFinal, //ok
      endDate: endDateFinal, //ok
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
          customEvent: jsonCustomEventJsonString,
        },
      ],
      provinceServices: values.provinceServices.map((service) => ({
        hotels: service?.hotels?.map((hotel) => ({
          districtId: service.districtId, //ok
          startDate: hotel.stayDatesLoging[0], //ok
          endDate: hotel.stayDatesLoging[1], //ok
          numOfDoubleRoom: filterNumOfDoubleRoom[0].numOfRoom,
          numOfSingleRoom: filterNumOfSingleRoom[0].numOfRoom,
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

  const onFinishFailed = (errorInfo) => {
    message.error(
      "Có lỗi xảy ra. Bạn vui lòng kiểm tra lại các trường thông tin đã điền đầy đủ chưa.",
      3
    ); // Hiển thị thông báo lỗi trong 3 giây
    console.log("Failed:", errorInfo);
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

      if (response?.isSuccess) {
        alertSuccess("Tạo Gói Tour Thành Công!");
        form.resetFields(); // Reset all fields in the form
      } else {
        for (const message in response.messages) {
          alertFail(message);
        }
      }
    } catch (error) {
      alertFail(
        "An error occurred while creating the tour. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = (date) => {
    if (date) {
      const calculatedEndDate = date.add(
        request?.privateTourResponse?.numOfDay,
        "days"
      );
      setEndDateTour(calculatedEndDate);
      setStartDateChange(date);
    } else {
      setEndDateTour(null);
    }
  };
  const disableStartDates = (current) => {
    if (!parsedStartDate || !parsedEndDate) {
      return false;
    }
    return (
      current &&
      (current < parsedStartDate || current > parsedEndDate.subtract(4, "days"))
    );
  };

  const disableEndDates = (current) => {
    if (!startDateTour && !parsedEndDate) {
      return false;
    }
    return (
      current &&
      (current <
        moment(startDateTour).add(
          request?.privateTourResponse?.numOfDay,
          "days"
        ) ||
        current > parsedEndDate)
    );
  };

  // Lấy giá trị defaultPickerValue từ tourDate
  const getDefaultPickerValue = () => {
    if (!parsedStartDate || !parsedEndDate) {
      return moment(); // Nếu không có tourDate, sử dụng ngày hiện tại
    }
    console.log("parsedStartDate,getDefaultPickerValue", parsedStartDate);
    return parsedStartDate; // Sử dụng ngày bắt đầu của tourDate
  };

  return (
    <>
      <LoadingOverlay isLoading={loading} />
      <div className="p-4 shadow-xl rounded-xl w-full max-h-lvh overflow-y-auto">
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                    dataSource={numOfRoom}
                    renderItem={(item) => (
                      <List.Item>
                        <Card className="mr-4 bg-teal-100">
                          <Card.Meta
                            title={`Phòng ${item.roomSize === 4 ? "đôi" : "đơn"} `}
                            description={`Tổng số phòng: ${item.numOfRoom}`}
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

              <p className="font-bold my-4">Chọn ngày diễn ra tour: </p>
              <ConfigProvider locale={viVN}>
                <div className="flex flex-wrap">
                  <Form.Item
                    label="Từ ngày "
                    className=" font-bold"
                    name="startDateTour"
                    rules={[
                      {
                        required: true,
                        message: "Please choose the stay dates!",
                      },
                    ]}
                  >
                    <DatePicker
                      showTime
                      className="!min-w-[300px] mr-10"
                      onCalendarChange={handleStartDateChange}
                      disabledDate={disableStartDates}
                      defaultPickerValue={getDefaultPickerValue()}
                      format="DD-MM-YYYY HH:mm:ss"
                      defaultValue={moment(startDate).add(1, "days")} // Maintain existing behavior
                      onOpenChange={(status) => {
                        // Additional handling if needed when picker opens/closes
                        if (!status) {
                          // Reset on picker close if needed
                          handleStartDateChange(null);
                        }
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Đến ngày "
                    className=" font-bold"
                    name="endDateTour"
                  >
                    <p className="hidden">
                      <DatePicker
                        showTime
                        className="!min-w-[300px] mr-10"
                        disabledDate={disableEndDates}
                        defaultPickerValue={getDefaultPickerValue()}
                        format="DD-MM-YYYY HH:mm:ss"
                        value={endDateTour}
                      />
                    </p>
                    <span>{endDateChange}</span>
                  </Form.Item>
                </div>
              </ConfigProvider>
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
                  startDateFinal={startDateFinal}
                  endDateFinal={endDateFinal}
                  startDateTourChange={startDateTourChange}
                  endDateChange={endDateChange}
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
                  startDateFinal={startDateFinal}
                  endDateFinal={endDateFinal}
                  startDateTourChange={startDateTourChange}
                  endDateChange={endDateChange}
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
                  insurances={insurances}
                  setInsurances={setInsurances}
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
                  jsonCustomEventJsonString={jsonCustomEventJsonString}
                  setJsonCustomEventJsonString={setJsonCustomEventJsonString}
                  form={form}
                  provinces={provinces}
                  districts={districts}
                  setProvinces={setProvinces}
                  startDateTourChange={startDateTourChange}
                  endDateChange={endDateChange}
                  startDateFinal={startDateFinal}
                  endDateFinal={endDateFinal}
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
                  insurances={insurances}
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
            <div className="mt-10">
              <h3>Form Data:</h3>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </div>

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
                numOfRoom={numOfRoom}
                startDateTourChange={startDateTourChange}
                endDateChange={endDateChange}
                startDateFinal={startDateFinal}
                endDateFinal={endDateFinal}
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
    </>
  );
}

export default CreateOptionForm;
