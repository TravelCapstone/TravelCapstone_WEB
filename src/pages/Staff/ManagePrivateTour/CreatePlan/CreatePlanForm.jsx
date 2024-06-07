import { useEffect, useState } from "react";
import { Form, Button, Divider } from "antd";
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
  const [data, setData] = useState({});
  const [provinceList, setProvinceList] = useState([]);
  const [form] = Form.useForm();

  console.log("quotationDetails", quotationDetails);
  const onFinish = (values) => {
    console.log("merge", buildData());
  };

  const buildLocation = () => {
    const hotelData = buildHotel();
    const restaurantData = buildRestarent();
    const entertaimentData = buildEntertainment();
    debugger;
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
    return combinedLocationData;
  };
  const builDdetailPlanRoutes = () => {
    return form.getFieldValue("detailPlanRoutes").map((item) => ({
      date: new Date(item.date).toISOString(),
      description: item.description,
      detailDayPlanRoutes: item.detailDayPlanRoutes.map((innerItem) => ({
        startTime: new Date(innerItem.dateRange[0]).toISOString(),
        endTime: new Date(innerItem.dateRange[1]).toISOString(),
        note: innerItem.note,
        startFacilityId: innerItem.startFacilityId,
        endFacilityId: innerItem.endFacilityId,
        startPortId: innerItem.startPortId,
        endPortId: innerItem.endPortId,
      })),
    }));
  };
  const buildData = () => {
    setData({
      privateTourRequestId: privateTourResponse?.privateTourResponse?.id,
      startDate: privateTourResponse?.privateTourResponse?.startDate,
      endDate: privateTourResponse?.privateTourResponse?.endDate,
      location: buildLocation(),
      vehicles: buildVehicle(),
      tourguides: [],
      material: buildMaterial(),
      detailPlanRoutes: builDdetailPlanRoutes(),
    });
  };
  const buildHotel = () => {
    const hotelValue = form.getFieldValue("hotel");
    let locationArray = Array.isArray(hotelValue)
      ? hotelValue.flat()
      : [hotelValue];
    return locationArray.filter((item) => item !== undefined);
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
    }));
  };

  const buildEntertainment = () => {
    const adultEntertainments = form.getFieldValue("adultEntertainments");
    const childEntertainments = form.getFieldValue("childEntertainments");
    const adultMap = adultEntertainments?.map((item, index) => ({
      sellPriceHistoryId: item,
      startDate: form.getFieldValue(`entertainmentStartDate]`) || null,
      endDate: form.getFieldValue(`entertainmentEndDate`) || null,
      numOfServiceUse:
        form.getFieldValue(`entertainmentNumOfServiceUseAdult`) || null,
    }));
    const childMap = childEntertainments?.map((item, index) => ({
      sellPriceHistoryId: item,
      startDate: form.getFieldValue(`entertainmentStartDate`) || null,
      endDate: form.getFieldValue(`entertainmentEndDate`) || null,
      numOfServiceUse:
        form.getFieldValue(`entertainmentNumOfServiceUseChild`) || null,
    }));
    return [...adultMap, ...childMap];
  };
  const buildVehicle = () => {
    return vehicleQuotationDetails.map((item, index) => ({
      vehicleType: item.vehicleType || null,
      startPoint: item.startPointId || null,
      endPoint: item.endPointId || null,
      portStartPoint: form.getFieldValue(`portStartPoint[${index}]`) || null,
      portEndPoint: form.getFieldValue(`portEndPoint[${index}]`) || null,
      startDate: form.getFieldValue(`startDate[${index}]`) || null,
      endDate: form.getFieldValue(`endDate[${index}]`) || null,
      driverId: form.getFieldValue(`driverId[${index}]`) || null,
      sellPriceHistoryId:
        form.getFieldValue(`sellPriceHistoryId[${index}]`) || null,
      referencePriceId:
        form.getFieldValue(`referencePriceId[${index}]`) || null,
      numOfVehicle: form.getFieldValue(`numOfVehicle[${index}]`) || null,
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

  console.log("provinceList", provinceList);
  return (
    <div className="  p-4  bg-white max-h-[680px]  overflow-y-auto">
      <h3 className="font-bold text-mainColor text-xl text-center">
        TẠO KẾ HOẠCH TOUR CHI TIẾT
      </h3>
      <Divider />
      <div className="mt-10">
        <h3>Form Data:</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
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
        />

        <EntertainmentAssignment
          data={entertainment}
          privateTourResponse={privateTourResponse}
          form={form}
          setFieldsValue={setFieldsValue}
          getFieldValue={getFieldValue}
        />
        {/* TẠO KẾ HOẠCH CHI TIẾT CHO TOUR */}
        <MaterialAssignment data={material} />

        <div className="my-16">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            TẠO KẾ HOẠCH CHI TIẾT CHO TOUR
          </h2>
        </div>

        <DetailPlanFollowingTimeline />

        {/* THÔNG TIN HƯỚNG DẪN VIÊN */}
        <TourguideAssignment provinceList={provinceList} form={form} />
        <div className="flex justify-center">
          <Button className="bg-primary text-white" htmlType="submit">
            Tạo kế hoạch tour
          </Button>
        </div>
      </Form>
      <Button onClick={() => buildData()}>Log data</Button>
    </div>
  );
};

export default CreatePlanForm;
