import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Space,
  Select,
  Radio,
  Modal,
  Tooltip,
  Checkbox,
  ConfigProvider,
  message,
} from "antd";
import {
  WarningFilled,
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { alertFail, alertSuccess } from "../../../../hook/useNotification";
import { createPrivateTour } from "../../../../api/privateTourRequestApi";
import AddressSearch from "../../../../api/SearchAddress/SearchAddress";
import {
  getCommuneByDistrictAndCommuneName,
  getProvinceByName,
} from "../../../../api/LocationApi";
import AddressSearchMultiple from "../../../../api/SearchAddress/SearchAddressMulti";
import { getAllFacilityRating } from "../../../../api/FacilityApi";
import moment from "moment-timezone";
import DetailFamilySection from "../Sections/DetailFamilySection";

import "../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";
import LoadingOverlay from "../../../../components/Loading/LoadingOverlay";
import { useNavigate } from "react-router-dom";
import {
  LISTING_TOUR_PRIVATE,
  VIEW_OPTIONS_TOUR_PRIVATE,
} from "../../../../settings/constant";
import { useSelector } from "react-redux";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

function TourRequestForm() {
  let navigate = useNavigate();
  const user = useSelector((state) => state.user.user || {});
  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [valueFoodType, setValueFoodType] = useState();
  const [days, setDays] = useState(1);
  const [maxDays, setMaxDays] = useState(1);
  const [nights, setNights] = useState(0);
  const [form] = Form.useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [startCommuneId, setStartCommuneId] = useState("");
  const [mainLocation, setMainLocation] = useState("");
  const [mainDestinationId, setMainDestinationId] = useState("");
  const [totalRooms, setTotalRooms] = useState(0);

  const [hotelRatings, setHotelRatings] = useState([]);
  const [restaurantRatings, setRestaurantRatings] = useState([]);

  const [totalAdults, setTotalAdults] = useState(0);
  const [totalChildren, setTotalChildren] = useState(0);
  const [totalAllFamily, setTotalAllFamily] = useState(0);

  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);
  const [numOfAdultsTour, setNumOfAdultsTour] = useState(0);
  const [numOfChildrenTour, setNumOfChildrenTour] = useState(0);

  console.log("hotelRatings", hotelRatings);
  console.log("restaurantRatings", restaurantRatings);

  //Giới hạn tổng số người lớn và trẻ em cho từng Gia đình
  const [adultLimit, setAdultLimit] = useState(0);
  const [childrenLimit, setChildrenLimit] = useState(0);

  //  Theo dõi tổng số người để giới hạn giới tính
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [singleMaleCount, setSingleMaleCount] = useState(0);
  const [singleFemaleCount, setSingleFemaleCount] = useState(0);

  const [numOfSingleMale, setNumOfSingleMale] = useState(0);
  const [numOfSingleFemale, setNumOfSingleFemale] = useState(0);

  const [totalLimitFamily, setTotalLimitFamily] = useState(0);

  console.log("totalLimitFamily", totalLimitFamily);

  useEffect(() => {
    let calculatedLimit;
    if (adultLimit > childrenLimit) {
      calculatedLimit = Math.floor((adultLimit + childrenLimit) / 2);
    } else {
      calculatedLimit = adultLimit;
    }
    setTotalLimitFamily(calculatedLimit);
  }, [adultLimit, childrenLimit]); // Update when limits change

  const handleAdultChange = (value) => {
    setAdultLimit(value);
    setAdultCount(value);
    calculateFemaleCount(value, childrenCount, singleMaleCount);
  };

  const handleChildrenChange = (value) => {
    setChildrenLimit(value);
    setChildrenCount(value);
    calculateFemaleCount(adultCount, value, singleMaleCount);
  };

  const calculateFemaleCount = (adults, children, males) => {
    const totalParticipants = adults + children;
    const females = totalParticipants - males;
    setSingleFemaleCount(females >= 0 ? females : 0);
  };

  useEffect(() => {
    if (selectedLocations.length === 1) {
      // debugger;
      setMainLocation(selectedLocations[0]);
      setMainDestinationId(selectedLocations[0].provinceId);
    } else {
      setMainLocation(null);
      setMainDestinationId(null);
    }
  }, [selectedLocations]);

  const transformRatings = (ratings) => {
    const hotelRatings = [];
    const restaurantRatings = [];
    const ratingMap = {};

    ratings.forEach((rating) => {
      let name = "";
      switch (rating.ratingId) {
        case 0:
          name = "Nhà Nghỉ";
          break;
        case 1:
          name = "Khách sạn 2 sao";
          break;
        case 2:
          name = "Khách sạn 3 sao";
          break;
        case 3:
          name = "Khách sạn 4 sao";
          break;
        case 4:
          name = "Khách sạn 5 sao";
          break;
        case 5:
          name = "Nhà hàng gia đình";
          restaurantRatings.push({
            value: rating.id,
            label: name,
            key: `${rating.ratingId}-${rating.id}`,
          });
          break;
        case 6:
          name = "Nhà hàng 2 sao";
          restaurantRatings.push({
            value: rating.id,
            label: name,
            key: `${rating.ratingId}-${rating.id}`,
          });
          break;
        case 7:
          name = "Nhà hàng 3 sao";
          restaurantRatings.push({
            value: rating.id,
            label: name,
            key: `${rating.ratingId}-${rating.id}`,
          });
          break;
        case 8:
          name = "Nhà hàng 4 sao";
          restaurantRatings.push({
            value: rating.id,
            label: name,
            key: `${rating.ratingId}-${rating.id}`,
          });
          break;
        case 9:
          name = "Nhà hàng 5 sao";
          restaurantRatings.push({
            value: rating.id,
            label: name,
            key: `${rating.ratingId}-${rating.id}`,
          });
          break;

        default:
          name = rating.rating.name;
      }

      // Check if the ratingId already exists in the map
      if (!ratingMap[rating.ratingId]) {
        ratingMap[rating.ratingId] = true;
        if (![5, 6, 7, 8, 9].includes(rating.ratingId)) {
          hotelRatings.push({
            value: rating.id,
            label: name,
            key: `${rating.ratingId}-${rating.id}`,
          });
        }
      }
    });

    return { hotelRatings, restaurantRatings };
  };

  useEffect(() => {
    const fetchRatings = async () => {
      const idHotel = 0; // Hotel
      const idRestaurant = 1; // Restaurant

      let hotelData = await getAllFacilityRating(idHotel);
      let restaurantData = await getAllFacilityRating(idRestaurant);

      const { hotelRatings, restaurantRatings } = transformRatings([
        ...hotelData,
        ...restaurantData,
      ]);

      setHotelRatings(hotelRatings);
      setRestaurantRatings(restaurantRatings);
    };

    fetchRatings();
  }, []);

  const disabledStartDate = (current) => {
    // Disable dates before today + 10 days
    return current && current < moment().add(10, "days").endOf("day");
  };

  const disabledEndDate = (current) => {
    return (
      current && startDate && current < startDate.add(2, "days").endOf("day")
    );
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null); // Reset end date when start date changes
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const calculateTotalRooms = () => {
    const values = form.getFieldsValue();
    const { adult, children, roomTypes } = values;

    if (!adult || !children || !roomTypes) {
      form.setFieldsValue({
        roomTypes: roomTypes.map((room) => ({ ...room, totalRoom: 0 })),
      });
      return;
    }

    let totalPeople = adult + children;
    let roomsNeeded = { 2: 0, 4: 0 };

    roomTypes.forEach((room) => {
      if (room && room.RoomType) {
        const roomCapacity = room.RoomType;
        roomsNeeded[roomCapacity] = room.totalRoom || 0;
      }
    });

    // Calculate rooms for type 4 (Phòng đôi) first
    let remainingPeople = totalPeople - roomsNeeded[4] * 4;
    if (remainingPeople < 0) remainingPeople = 0;

    // Calculate rooms for type 2 (Phòng đơn) with the remaining people
    let singleRoomsNeeded = Math.ceil(remainingPeople / 2);

    // Update the form values
    const updatedRoomTypes = roomTypes.map((room) => {
      if (room && room.RoomType === 2) {
        return { ...room, totalRoom: singleRoomsNeeded };
      } else if (room && room.RoomType === 4) {
        return { ...room, totalRoom: roomsNeeded[4] };
      }
      return room;
    });

    form.setFieldsValue({
      roomTypes: updatedRoomTypes,
    });
  };

  useEffect(() => {
    form.setFieldsValue({ totalRooms });
  }, [totalRooms, form]);

  const handleMainLocationSelect = async (location) => {
    try {
      const provinceData = await getProvinceByName(location);
      if (provinceData.isSuccess) {
        setMainLocation(location);
        setMainDestinationId(provinceData.result?.id);
      }
    } catch (error) {
      alertFail(
        "Failed to fetch province ID. Please check the location and try again."
      );
    }
  };

  const handleAddressSelect = async (value, details) => {
    form.setFieldsValue({ startLocation: value });
    console.log("Address details received:", details);
    if (details) {
      const { districtName, communeName } = details;
      try {
        const communeData = await getCommuneByDistrictAndCommuneName(
          districtName,
          communeName
        );
        // debugger;
        if (communeData && communeData.result.items.length > 0) {
          setStartCommuneId(communeData.result.items[0].id);
        } else {
          console.log("No communes found with the provided names");
        }
      } catch (error) {
        console.error(
          "Error fetching commune ID:",
          error.message,
          error.response
        );
      }
    }
  };

  const onCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const onFinishFailed = (errorInfo) => {
    message.error(
      "Có lỗi xảy ra. Bạn vui lòng kiểm tra lại các trường thông tin đã điền đầy đủ chưa.",
      3
    ); // Hiển thị thông báo lỗi trong 3 giây
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (formValues) => {
    if (!isChecked) {
      alertFail("Please agree to the terms and conditions before submitting.");
      return;
    }

    // Ensuring the date values exist and are correctly formatted
    // const startDate = formValues.startDate
    //   ? formValues.startDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
    //   : null;
    // const endDate = formValues.endDate
    //   ? formValues.endDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
    //   : null;

    if (!startDate || !endDate) {
      // debugger;
      alertFail("Start date and end date must be provided.");
      return;
    }
    const tourData = {
      startDate,
      endDate,
      description: formValues["description"],
      numOfAdult: totalAdults + totalSingleGuests,
      numOfChildren: totalChildren,
      numOfFamily: totalAllFamily,
      numOfSingleMale: formValues["numOfSingleMale"],
      numOfSingleFemale: formValues["numOfSingleFemale"],
      numOfDay: days,
      numOfNight: nights,
      startLocation: formValues["startLocation"],
      startCommuneId: startCommuneId,
      tourId: "591b4a71-d561-46a5-8057-84fe72ce1185", // Tour ID Gốc
      recommnendedTourUrl: formValues["recommnendedTourUrl"],
      note: formValues["note"],
      isEnterprise: formValues["isEnterprise"],
      minimumHotelRatingId: formValues["minimumHotelRatingId"],
      minimumRestaurantRatingId: formValues["minimumRestaurantRatingId"],
      familyDetails: formValues["familyDetails"].map((family) => ({
        numOfChildren: family.numOfChildrenInFamily,
        numOfAdult: family.numOfAdultInFamily,
        totalFamily: family.totalFamily,
      })),
      otherLocation: selectedLocations.map((loc) => ({
        address: loc.location,
        provinceId: loc.provinceId,
      })),
      mainDestinationId: mainDestinationId,
      accountId: user?.id, // accoundId
      dietaryPreference: valueFoodType,
    };
    console.log("tourData", tourData);

    const totalPassengers = tourData.numOfChildren + tourData.numOfAdult;

    const showModal = () => {
      Modal.confirm({
        title: "Số lượng hành khách trong tour đang dưới 10 người",
        content: (
          <>
            <p>
              Bạn có thể xem qua danh sách tour phù hợp nhất với bạn dưới đây:
            </p>
            <ul>
              <li>
                <a href="link1" target="_blank" rel="noopener noreferrer">
                  link 1
                </a>
              </li>
              <li>
                <a href="link2" target="_blank" rel="noopener noreferrer">
                  link 2
                </a>
              </li>
            </ul>
            <p>
              Nếu bạn vẫn mong muốn tạo tour yêu cầu thì hãy gửi đơn để chúng
              tôi hỗ trợ bạn!
            </p>
          </>
        ),
        onOk: () => proceedWithTourCreation(),
        onCancel: () => console.log("Tour creation canceled by user"),
      });
    };

    const proceedWithTourCreation = async () => {
      setIsLoading(true);
      try {
        const response = await createPrivateTour(tourData);

        if (response?.data?.isSuccess) {
          alertSuccess("Tour created successfully!");
          form.resetFields(); // Reset all fields in the form
          setSelectedLocations([]); // Reset state if needed for locations
          setMainLocation(""); // Reset main location
          setIsChecked(false); // Uncheck the terms and conditions box
          navigate(`${LISTING_TOUR_PRIVATE}`);
        } else {
          for (const message in response.messages) {
            // alertFail(message);
          }
        }
      } catch (error) {
        console.error("Error creating tour:", error);
        alertFail(
          "An error occurred while creating the tour. Please try again later."
        );
      } finally {
        setIsLoading(false); // Set loading to false after the form submission is complete
      }
    };

    if (totalPassengers < 10) {
      showModal();
    } else {
      proceedWithTourCreation();
    }
  };

  useEffect(() => {
    if (days) {
      setNights(days - 1);
    }
  }, [days]);

  const handleDaysChange = (value) => {
    setDays(value);
  };

  const handleLocationsChange = async (selectedItems) => {
    try {
      const detailedItemsWithIds = await Promise.all(
        selectedItems.map(async (item) => {
          const provinceData = await getProvinceByName(item.provinceName);
          return { ...item, provinceId: provinceData.result.id };
        })
      );

      setSelectedLocations(detailedItemsWithIds); // This includes province IDs now
    } catch (error) {
      console.error("Error fetching province IDs:", error);
      alertFail("Failed to fetch province IDs. Please try again.");
    }
  };

  const handleMainLocationChange = (location) => {
    if (location) {
      handleMainLocationSelect(location);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onChangeFoodType = (e) => {
    setValueFoodType(e.target.value);
  };

  const prefixSelector = <span style={{ paddingRight: 5 }}>+84</span>;

  const getDefaultPickerValueEndDate = () => {
    if (!startDate) {
      return moment(); // Nếu không có tourDate, sử dụng ngày hiện tại
    }
    return startDate; // Sử dụng ngày bắt đầu của tourDate
  };

  useEffect(() => {
    if (startDate && endDate) {
      const timeDiff = Math.abs(new Date(endDate) - new Date(startDate));
      const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 để bao gồm cả ngày bắt đầu
      setMaxDays(dayDiff);
    }
  }, [startDate, endDate]);

  console.log("maxDays", maxDays);

  // const handleValuesChange = (changedValues, allValues) => {
  //   if ("numOfFamily" in changedValues) {
  //     const numOfFamily = changedValues.numOfFamily || 0;
  //     const currentItems = form.getFieldValue("familyDetails") || [];
  //     setNumOfFamily(changedValues.numOfFamily);
  //     if (numOfFamily !== currentItems.length) {
  //       const newItems = Array(numOfFamily)
  //         .fill()
  //         .map((_, index) => currentItems[index] || {});
  //       form.setFieldsValue({ familyDetails: newItems });
  //     }
  //   }
  // };
  const TotalLimit = adultLimit + childrenLimit;
  // const TotalLimitFamily = Math.floor((adultLimit + childrenLimit) / 2);

  const handleStartDateBlur = () => {
    form.validateFields(["startDate"]);
    if (!startDate) {
      setEndDate(null); // Reset end date if start date is cleared
      form.resetFields(["endDate"]); // Reset end date field
    }
  };

  const handleEndDateBlur = () => {
    form.validateFields(["endDate"]);
  };

  const handleMaleChange = (value) => {
    setNumOfSingleMale(value || 0); // nếu value là undefined hoặc null, đặt thành 0
  };

  const handleFemaleChange = (value) => {
    setNumOfSingleFemale(value || 0); // nếu value là undefined hoặc null, đặt thành 0
  };

  const totalSingleGuests = numOfSingleMale + numOfSingleFemale;
  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <div className="mt-32 container">
        <div className="text-3xl text-center font-bold uppercase my-6">
          Đặt tour theo yêu cầu
        </div>
        <div className="max-w-[800px] mx-auto mb-12">
          <Form form={form} onFinish={onFinish}  onFinishFailed={onFinishFailed} className="" layout="vertical">
            <Form.Item
              label="Họ tên người đại diện:"
              name="username"
              className="font-semibold"
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Vui lòng nhập họ và tên!
                    </div>
                  ),
                },
                {
                  max: 50,
                  message: (
                    <div>
                      <WarningFilled /> Độ dài vượt quá 50 kí tự!
                    </div>
                  ),
                },
              ]}
            >
              <Input className="h-10" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại liên hệ:"
              name="phone"
              className="font-semibold"
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Vui lòng nhập số điện thoại!
                    </div>
                  ),
                },
                {
                  min: 9,
                  message: (
                    <div>
                      <WarningFilled /> Số điện thoại bao gồm ít nhất 9 số!
                    </div>
                  ),
                },
                {
                  max: 10,
                  message: (
                    <div>
                      <WarningFilled /> Số điện thoại vượt quá 10 số!
                    </div>
                  ),
                },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
            <div className="font-semibold border-b-2 mt-8 mb-4 text-xl">
              <h4 className="pb-2 uppercase">Thông tin tour yêu cầu</h4>
            </div>
            <Form.Item
              label="Phân loại tour:"
              name="isEnterprise"
              className="font-semibold"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group onChange={onChange} defaultValue={value}>
                <Radio className="font-normal" value={true}>
                  Tour gia đình
                </Radio>
                <Radio className="font-normal" value={false}>
                  Tour đoàn thể (doanh nghiệp)
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="range-picker"
              label={
                <span>
                  Khoảng thời gian rảnh để diễn ra tour: &nbsp;
                  <Tooltip title="Nên cho chúng tôi khoảng thời gian rảnh của bạn để diễn ra tour để chúng tôi sắp xếp tour tốt nhất cho bạn.">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              className="font-semibold"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="ml-3 w-[70%] flex-wrap"
              >
                <ConfigProvider locale={viVN}>
                  <Form.Item
                    name="startDate"
                    label={
                      <span>
                        Từ ngày: &nbsp;
                        <Tooltip title="Bạn được chọn trong khoảng từ 10 ngày sau ngày hiện tại trở đi để chúng tôi sắp xếp tour cho bạn tốt nhất!">
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </span>
                    }
                    rules={[
                      { required: true, message: " Vui lòng chọn thời gian!" },
                    ]}
                  >
                    <DatePicker
                      showTime
                      disabledDate={disabledStartDate}
                      onChange={handleStartDateChange}
                      onBlur={handleStartDateBlur}
                      format="DD-MM-YYYY HH:mm:ss"
                    />
                  </Form.Item>
                </ConfigProvider>

                <ConfigProvider locale={viVN}>
                  <Form.Item
                    name="endDate"
                    label={
                      <span>
                        Đến ngày: &nbsp;
                        <Tooltip title="Ngày kết thúc ít nhất sau 2 ngày bắt đầu">
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </span>
                    }
                    rules={[
                      { required: true, message: " Vui lòng chọn thời gian!" },
                    ]}
                  >
                    <DatePicker
                      showTime
                      disabledDate={disabledEndDate}
                      disabled={!startDate}
                      onChange={handleEndDateChange}
                      defaultPickerValue={getDefaultPickerValueEndDate()}
                      onBlur={handleEndDateBlur}
                      format="DD-MM-YYYY HH:mm:ss"
                    />
                  </Form.Item>
                </ConfigProvider>
              </div>
            </Form.Item>

            <Form.Item
              name="daysTour"
              label="Số ngày diễn ra tour:"
              className="flex flex-wrap font-semibold items-center"
              rules={[{ required: true, message: "Vui lòng nhập số ngày!" }]}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="ml-3 flex flex-wrap "
              >
                <Form.Item
                  name="days"
                  label="Số ngày:"
                  className="font-normal mr-20 "
                  // style={{ flex: "1", marginRight: "50px" }} // Adjust the margin as needed
                >
                  <InputNumber
                    className="text-right"
                    min={2}
                    max={maxDays}
                    // value={days}
                    onChange={handleDaysChange}
                  />
                </Form.Item>
                <Form.Item
                  name="nights"
                  label="Số đêm:"
                  className="font-normal"
                  style={{ flex: "1", marginRight: "50px" }} // Adjust the margin as needed
                >
                  <InputNumber
                    value={nights}
                    // defaultValue={nights}
                    placeholder={nights}
                    min={nights}
                    max={nights + 1}
                    className="text-right"
                  />
                </Form.Item>
              </div>
            </Form.Item>

           
            <Form.Item
              name="startLocation"
              label={
                <span>
                  Địa chỉ xuất phát hoặc tập trung: &nbsp;
                  <Tooltip
                    title="Nếu điền địa chỉ xuất phát hoặc tập trung thì chúng tôi sẽ chuẩn bị cho bạn phương tiện đưa đón phù hợp 
                  tới điểm bắt đầu chuyến tour!"
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              className="font-semibold"
            >
              <AddressSearch onChange={handleAddressSelect} />
            </Form.Item>
            

            <Form.Item
              name="locations"
              label={
                <span>
                  Địa điểm mong muốn: &nbsp;
                  <Tooltip title="Bạn có thể chọn nhiều địa điểm trên thanh tìm kiếm!">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              className="font-semibold"
              rules={[
                {
                  required: true,
                  message: "Chọn ít nhất 1 địa điểm mà bạn muốn thăm",
                },
              ]}
            >
              <AddressSearchMultiple onChange={handleLocationsChange} />
            </Form.Item>
             {/* Chỉ hiển thị Form.Item này nếu người dùng chọn từ 2 địa điểm trở lên */}
             {selectedLocations.length > 1 && (
              <Form.Item
                name="mainLocation"
                label="Địa điểm mong muốn chính (địa điểm quan trọng nhất):"
                className="font-semibold"
                rules={[
                  { required: true, message: "Chọn một địa điểm quan trọng" },
                ]}
              >
                <Select
                  placeholder="Chọn địa điểm chính"
                  showSearch
                  style={{ width: "100%" }}
                  value={mainLocation}
                  onChange={handleMainLocationChange}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {selectedLocations.map((location) => (
                    <Option
                      key={location.location}
                      value={location.provinceName}
                    >
                      {location.description}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              label="Hình thức ăn:"
              name="foodType"
              className="font-semibold"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group onChange={onChangeFoodType} defaultValue={value}>
                <Radio className="font-normal" value={0}>
                  Ăn chay
                </Radio>
                <Radio className="font-normal" value={1}>
                  Ăn mặn
                </Radio>
                <Radio className="font-normal" value={2}>
                  Có người ăn chay
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Flex vertical gap={32}>
              <Form.Item
                label="Mô tả yêu cầu:"
                className="font-semibold"
                name="description"
              >
                <TextArea
                  rows={6}
                  showCount
                  maxLength={225}
                  className="h-10"
                  placeholder="Nhập mô tả yêu cầu (VD: 10 người ăn chay, dị ứng món gì, .... )"
                  style={{
                    height: 120,
                    //   resize: 'none',
                  }}
                />
              </Form.Item>
            </Flex>

            <p className="text-sm font-semibold">
              Số lượng hành khách: &nbsp;
              <Tooltip title="Điền chi tiết số lượng hành khách để chúng tôi xếp phòng lưu trú phù hợp nhất cho bạn!">
                <QuestionCircleOutlined />
              </Tooltip>
            </p>
            <div className="mt-5 flex flex-wrap ">
              <p className="text-sm font-bold mr-6 ml-4">
                1. Khách lẻ: &nbsp;
                <Tooltip title="Khách lẻ đảm bảo tất cả đều là Người lớn tính từ 1m4 trở lên và 16 tuổi trở lên">
                  <QuestionCircleOutlined />
                </Tooltip>
              </p>
              {/* <div className="flex flex-wrap justify-around"> */}
              <Form.Item
                name="numOfSingleMale"
                label={<span>Số lượng người nam: &nbsp;</span>}
                className="font-semibold "
              >
                <InputNumber max={100} min={0} onChange={handleMaleChange} />
              </Form.Item>
              <Form.Item
                name="numOfSingleFemale"
                label={<span>Số lượng người nữ: &nbsp;</span>}
                className="font-semibold "
              >
                <InputNumber max={100} min={0} onChange={handleFemaleChange} />
              </Form.Item>
              {totalSingleGuests > 0 && (
                <p className="self-center text-sm font-semibold text-right text-mainColor">
                  Tổng số lượng khách lẻ: {totalSingleGuests} người lớn
                </p>
              )}
              {/* </div> */}
            </div>

            <div className="flex ">
              <div>
                <p className="text-sm font-bold mr-6 ml-4 my-4">
                  2. Khách có gia đình:
                </p>
                <DetailFamilySection
                  totalLimitFamily={totalLimitFamily}
                  totalAdults={totalAdults}
                  totalChildren={totalChildren}
                  setTotalAdults={setTotalAdults}
                  setTotalChildren={setTotalChildren}
                  form={form}
                  adultLimit={adultLimit}
                  childrenLimit={childrenLimit}
                  setTotalAllFamily={setTotalAllFamily}
                  totalAllFamily={totalAllFamily}
                />
              </div>
            </div>
            <div className="flex flex-wrap  mt-4">
              <div className="flex">
                <Form.Item
                  name="adult"
                  label="Tổng số người lớn:"
                  className=" font-semibold"
                >
                  <p className="hidden">
                    <InputNumber
                      min={1}
                      value={totalAdults + totalSingleGuests}
                      onChange={handleAdultChange}
                    />
                  </p>
                </Form.Item>
                <p className="font-semibold text-mainColor">
                  {" "}
                  {totalAdults + totalSingleGuests} người
                </p>
              </div>
              <div className="flex ml-10">
                <Form.Item
                  name="children"
                  label="Tổng số trẻ em:"
                  className="font-semibold"
                >
                  <p className="hidden">
                    <InputNumber
                      min={0}
                      value={totalChildren}
                      onChange={handleChildrenChange}
                    />
                  </p>
                </Form.Item>
                <p className="font-semibold text-mainColor">
                  {" "}
                  {totalChildren} người
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-between mb-2">
              <div>
                <Form.Item
                  name="minimumHotelRatingId"
                  className="font-semibold"
                  label="Hạng thấp nhất của nơi lưu trú mong muốn:"
                  rules={[
                    {
                      required: true,
                      message: "Chọn hạng thấp nhất của nơi lưu trú ",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn hạng thấp nhất của nơi lưu trú"
                    showSearch
                    style={{ width: "90%" }}
                  >
                    {hotelRatings.map((rating) => (
                      <Option key={rating.value} value={rating.value}>
                        {rating.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Hạng thấp nhất của nơi ăn uống mong muốn:"
                  name="minimumRestaurantRatingId"
                  className="font-semibold"
                  rules={[
                    {
                      required: true,
                      message: "Chọn hạng thấp nhất của nơi ăn uống ",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn hạng thấp nhất của nơi ăn uống "
                    showSearch
                    style={{ width: "90%" }}
                  >
                    {restaurantRatings.map((rating) => (
                      <Option key={rating.value} value={rating.value}>
                        {rating.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            {/* <div>
            <p className="font-semibold text-lg mb-4">Loại phòng mong muốn:</p>
            <RoomTypeSection
              form={form}
              onRoomTypeChange={calculateTotalRooms}
            />
          </div> */}

            <Form.Item
              label={
                <span>
                  URL tour đề xuất (nếu có): &nbsp;
                  <Tooltip title="URL tour đề xuất bởi Cóc Travel hoặc nguồn khác">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="recommnendedTourUrl"
              className="font-semibold "
            >
              <Input />
            </Form.Item>

            {/* <Form.Item
              name="budget"
              label={
                <span>
                  Ngân sách: &nbsp;
                  <Tooltip title="Ngân sách của bạn cho tour yêu cầu tính trên đầu người (người lớn).">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              className="font-semibold w-1/2"
              rules={[
                {
                  required: true,
                  message: (
                    <div>
                      <WarningFilled /> Vui lòng nhập ngân sách của bạn!
                    </div>
                  ),
                },
              ]}
            >
              <div className="flex align-items-center">
                <InputNumber min={0} className="w-[40%]" />
                <span className="ml-2">VND / Người</span>
              </div>
            </Form.Item> */}

            <Flex vertical gap={32}>
              <Form.Item
                label="Yêu cầu khác:"
                className="font-semibold"
                name="note"
              >
                <TextArea
                  rows={6}
                  showCount
                  maxLength={225}
                  className="h-10"
                  placeholder="Nhập yêu cầu khác (VD: Vé máy bay di chuyển khứ hồi, Phương tiện di chuyển trong tour, phòng mấy người, loại phòng lưu trú, ...)"
                  style={{
                    height: 120,
                    //   resize: 'none',
                  }}
                />
              </Form.Item>
            </Flex>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "You must agree to the terms and conditions"
                          )
                        ),
                },
              ]}
            >
              <Checkbox onChange={onCheckboxChange}>
                Tôi đã đọc và đồng ý với các điều khoản, chính sách liên quan
                tới Tour riêng tư.
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full mt-2"
                disabled={!isChecked}
              >
                Gửi yêu cầu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default TourRequestForm;
