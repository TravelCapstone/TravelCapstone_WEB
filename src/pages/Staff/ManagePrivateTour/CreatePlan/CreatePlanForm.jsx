import { useEffect, useState } from "react";
import { Form, Button, Divider, message } from "antd";
import RestingAssignment from "./RestingAssignment";
import FoodAndBevarageAssignment from "./FoodAndBevarageAssigment";
import VehicleAssignment from "./VehicleAssignment";
import EntertainmentAssignment from "./EntertainmentAssignment";
import DetailPlanFollowingTimeline from "./PlanDetail/DetailPlanFollowingTimeline";
import TourguideAssignment from "./PlanDetail/TourguideAssignment";
import { optionClassLabels } from "../../../../settings/globalStatus";
import "../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";
import { getProvinceOfOption } from "../../../../api/privateTourRequestApi";
import MaterialAssignment from "./MaterialAssignment";
import { useSelector } from "react-redux";
import { createTour } from "../../../../api/TourApi";
import LoadingOverlay from "../../../../components/Loading/LoadingOverlay";
import moment from "moment-timezone";
import { formatDateToISOString } from "../../../../utils/Util";
import { useNavigate } from "react-router-dom";
const CreatePlanForm = ({
  privateTourResponse,
  optionQuotation,
  quotationDetails,
  vehicleQuotationDetails,
}) => {
  const entertainment = quotationDetails?.filter(
    (item) => item?.facilityRating?.facilityTypeId === 2
  );
  const hotel = quotationDetails?.filter(
    (item) => item?.facilityRating?.facilityTypeId === 0
  );
  const restaurant = quotationDetails?.filter(
    (item) => item?.facilityRating?.facilityTypeId === 1
  );
  const material = quotationDetails?.filter(
    (item) => item.materialPriceHistoryId !== null
  );
  const [provinceList, setProvinceList] = useState([]);
  const [location, setLocation] = useState([]);
  const signal = useSelector((state) => state.plan.isCreatePlan || false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // debugger;
    const data = buildData();
    if (data.location.length === 0) {
      message.error("Vui lòng chọn ít nhất một địa điểm");
      return;
    }
    if (data.vehicles.length === 0) {
      message.error("Vui lòng chọn ít nhất một phương tiện");
      return;
    }
    if (data.tourguides.length === 0) {
      message.error("Vui lòng chọn ít nhất một hướng dẫn viên");
      return;
    }

    if (data.detailPlanRoutes.length === 0) {
      message.error("Vui lòng chọn ít nhất một kế hoạch chi tiết");
      return;
    }

    setIsLoading(true);
    const response = await createTour(data);
    if (response.isSuccess) {
      message.success("Tạo kế hoạch thành công");
      navigate("/staff/view-list-tour-private");
    } else {
      response.messages.forEach((mess) => {
        message.error(mess);
      });
    }
    setIsLoading(false);
  };

  const buildLocation = () => {
    const hotelData = buildHotel();
    const restaurantData = buildRestarent();
    const entertaimentData = buildEntertainment();
    let combinedLocationData = [];

    if (hotelData.length > 0) {
      combinedLocationData = [...combinedLocationData, ...hotelData];
    }
    if (restaurantData.length > 0) {
      combinedLocationData = [...combinedLocationData, ...restaurantData];
    }
    if (entertaimentData.length > 0) {
      combinedLocationData = [...combinedLocationData, ...entertaimentData];
    }
    // debugger;
    return combinedLocationData;
  };
  const buildDetailPlanRoutes = () => {
    if (!form.getFieldValue("detailPlanRoutes")) return [];
    else {
      return form.getFieldValue("detailPlanRoutes").map((item) => ({
        date: formatDateToISOString(new Date(item.date)),
        description: item.description,
        detailDayPlanRoutes: item.detailDayPlanRoutes.map((innerItem) => ({
          startTime: formatDateToISOString(new Date(innerItem.dateRange[0])),
          endTime: formatDateToISOString(new Date(innerItem.dateRange[1])),
          note: innerItem.note,
          startId: innerItem.startId,
          endId: innerItem.endId,
        })),
      }));
    }
  };
  const buildData = () => {
    return {
      privateTourRequestId: privateTourResponse?.privateTourResponse?.id,
      startDate: privateTourResponse?.privateTourResponse?.startDate,
      endDate: privateTourResponse?.privateTourResponse?.endDate,
      location: buildLocation(),
      vehicles: buildVehicle() || [],
      tourguides: buildTourguide() || [],
      material: buildMaterial() || [],
      detailPlanRoutes: buildDetailPlanRoutes() || [],
    };
    // debugger;
  };
  const buildHotel = () => {
    const hotelValue = form.getFieldValue("hotel");
    let locationArray = Array.isArray(hotelValue)
      ? hotelValue.flat()
      : [hotelValue];
    const hotelData = locationArray.filter((item) => item !== undefined);
    return hotelData
      ? hotelData.map((item) => {
          return {
            sellPriceHistoryId: item.sellPriceHistoryId,
            startDate: formatDateToISOString(new Date(item.startDate)),
            endDate: formatDateToISOString(new Date(item.endDate)),
            numOfServiceUse: item.numOfServiceUse,
            serviceType: 0,
          };
        })
      : [];
  };
  const buildRestarent = () => {
    return restaurant.map((item, index) => ({
      sellPriceHistoryId: form.getFieldValue(
        `restaurentSellPriceHistoryId[${index}]`
      ),
      startDate: form.getFieldValue(`restaurentStartDate[${index}]`),
      endDate: form.getFieldValue(`restaurentEndDate[${index}]`),
      numOfServiceUse: form.getFieldValue(
        `restaurentNumOfServiceUse[${index}]`
      ),
      serviceType: 1,
    }));
  };

  const buildEntertainment = () => {
    const adultEntertainments = form.getFieldValue("adultEntertainments");
    const childEntertainments = form.getFieldValue("childEntertainments");
    if (!adultEntertainments && !childEntertainments) return [];
    else {
      const adultMap = adultEntertainments?.map((item, index) => ({
        sellPriceHistoryId: item,
        startDate: form.getFieldValue(`entertainmentStartDate`) || null,
        endDate: form.getFieldValue(`entertainmentEndDate`) || null,
        numOfServiceUse:
          form.getFieldValue(`entertainmentNumOfServiceUseAdult`) || null,
        serviceType: 2,
      }));
      const childMap = childEntertainments?.map((item, index) => ({
        sellPriceHistoryId: item,
        startDate: form.getFieldValue(`entertainmentStartDate`) || null,
        endDate: form.getFieldValue(`entertainmentEndDate`) || null,
        numOfServiceUse:
          form.getFieldValue(`entertainmentNumOfServiceUseChild`) || null,
        serviceType: 2,
      }));
      return [...adultMap, ...childMap];
    }
  };
  const buildVehicle = () => {
    // return vehicleQuotationDetails.map((item, index) => ({
    //   vehicleType: item.vehicleType || null,
    //   startPoint: item.startPointId || null,
    //   endPoint: item.endPointId || null,
    //   portStartPoint: form.getFieldValue(`portStartPoint[${index}]`) || null,
    //   portEndPoint: form.getFieldValue(`portEndPoint[${index}]`) || null,
    //   startDate:
    //     formatDateToISOString(
    //       new Date(form.getFieldValue(`dateRange[${index}].[0]`))
    //     ) || null,
    //   endDate:
    //     formatDateToISOString(
    //       new Date(form.getFieldValue(`dateRange[${index}].[1]`))
    //     ) || null,
    //   driverId: form.getFieldValue(`driverId[${index}]`) || null,
    //   sellPriceHistoryId:
    //     form.getFieldValue(`sellPriceHistoryId[${index}]`) || null,
    //   referencePriceId:
    //     form.getFieldValue(`referencePriceId[${index}]`) || null,
    //   numOfVehicle: form.getFieldValue(`numOfVehicle[${index}]`) || null,
    // }));

    return vehicleQuotationDetails
      .map((item, index) => {
        const vehicleItems = form.getFieldValue(`vehicles[${index}]`);
        debugger;
        const dateRange = form.getFieldValue(`dateRange[${index}]`);
        const startDate = dateRange[0];
        const endDate = dateRange[1];
        return vehicleItems.map((vehicleItem, vehicleIndex) => ({
          vehicleType: item.vehicleType || null,
          startPoint: item.startPointId || null,
          endPoint: item.endPointId || null,
          portStartPoint:
            form.getFieldValue(`portStartPoint[${vehicleIndex}]`) || null,
          portEndPoint:
            form.getFieldValue(`portEndPoint[${vehicleIndex}]`) || null,
          startDate: formatDateToISOString(new Date(startDate)) || null,
          endDate: formatDateToISOString(new Date(endDate)) || null,
          driverId: vehicleItem.driverId || null,
          sellPriceHistoryId:
            form.getFieldValue(`sellPriceHistoryId[${vehicleIndex}]`) || null,
          referencePriceId: vehicleItem.referencePriceId || null,
          numOfVehicle:
            form.getFieldValue(`numOfVehicle[${vehicleIndex}]`) || null,
        }));
      })
      .flat();
  };
  const buildTourguide = () => {
    const tourguide = form.getFieldValue("tourguide");
    return tourguide.map((item, index) => ({
      tourguideId: item.tourguide,
      startDate: formatDateToISOString(new Date(item.time[0])),
      endDate: formatDateToISOString(new Date(item.time[1])),
      provinceId: item.province,
      districtId: null,
    }));
  };
  const setFieldsValue = (values) => {
    form.setFieldsValue(values);
  };
  const getFieldValue = (values) => {
    return form.getFieldValue(values);
  };
  const buildMaterial = () => {
    return {
      tourId: privateTourResponse?.privateTourResponse?.tourId,
      materialRequests: material?.map((item) => ({
        materialSellPriceId: item.materialPriceHistory.id,
        quantity: item.quantity,
      })),
    };
  };

  const fetchProvinces = async () => {
    const data = await getProvinceOfOption(optionQuotation?.id);
    if (data.isSuccess) {
      setProvinceList(data.result);
    }
  };
  useEffect(() => {
    fetchProvinces();
  }, [optionQuotation]);
  useEffect(() => {
    if (signal) {
      setLocation(buildLocation());
    }
  }, [signal === true]);
  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <div className="  p-4  bg-white max-h-[680px]  overflow-y-auto">
        <h3 className="font-bold text-mainColor text-xl text-center">
          TẠO KẾ HOẠCH TOUR CHI TIẾT
        </h3>
        <Divider />

        <Form
          initialValues={{
            remember: true,
          }}
          locale={viVN}
          name="createPlan"
          onFinish={onFinish}
          form={form}
        >
          {optionQuotation && (
            <span className="font-semibold text-xl">
              {optionClassLabels[optionQuotation.optionClassId]}
            </span>
          )}

          <h3 className="font-bold text-primary text-xl">Dịch vụ lưu trú</h3>

          <RestingAssignment
            data={hotel}
            privateTourResponse={privateTourResponse}
            form={form}
            setFieldsValue={setFieldsValue}
            getFieldValue={getFieldValue}
          />
          <h3 className="font-bold text-primary text-xl">Dịch vụ ăn uống</h3>

          <FoodAndBevarageAssignment
            data={restaurant}
            privateTourResponse={privateTourResponse}
            form={form}
            setFieldsValue={setFieldsValue}
            getFieldValue={getFieldValue}
          />

          <VehicleAssignment
            data={vehicleQuotationDetails}
            form={form}
            setFieldsValue={setFieldsValue}
            getFieldValue={getFieldValue}
            privateTourResponse={privateTourResponse?.privateTourResponse}
          />

          <EntertainmentAssignment
            data={entertainment}
            privateTourResponse={privateTourResponse?.privateTourResponse}
            form={form}
            setFieldsValue={setFieldsValue}
            getFieldValue={getFieldValue}
          />
          {/* TẠO KẾ HOẠCH CHI TIẾT CHO TOUR */}
          <MaterialAssignment data={material} />

          <TourguideAssignment
            provinceList={provinceList}
            form={form}
            privateTourResponse={privateTourResponse?.privateTourResponse}
          />

          <DetailPlanFollowingTimeline
            location={location}
            optionQuotation={optionQuotation}
            setFieldsValue={setFieldsValue}
            getFieldValue={getFieldValue}
            privateTourResponse={privateTourResponse?.privateTourResponse}
          />

          {/* THÔNG TIN HƯỚNG DẪN VIÊN */}
          <div className="flex justify-center">
            <Button className="bg-primary text-white" htmlType="submit">
              Tạo kế hoạch tour
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreatePlanForm;
