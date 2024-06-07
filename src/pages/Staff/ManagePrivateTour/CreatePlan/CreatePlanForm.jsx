import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Divider,
  Card,
  List,
  Input,
  DatePicker,
  TimePicker,
  ConfigProvider,
} from "antd";
import RestingAssignment from "./RestingAssignment";
import FoodAndBevarageAssignment from "./FoodAndBevarageAssigment";
import VehicleAssignment from "./VehicleAssignment";
import EntertainmentAssignment from "./EntertainmentAssignment";
import BasicTimeline from "./PlanDetail/BasicTimeline";
import DetailPlanFollowingTimeline from "./PlanDetail/DetailPlanFollowingTimeline";
import MaterialAssignment from "./PlanDetail/MaterialAssignment";
import TourguideAssignment from "./PlanDetail/TourguideAssignment";
import LocalVehicleAssignment from "./LocalVehicleAssignment";
import { optionClassLabels } from "../../../../settings/globalStatus";
import "../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";
import moment from "moment";
import { isEmptyObject } from "../../../../utils/Util";
import { getProvinceOfOption } from "../../../../api/privateTourRequestApi";

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

  console.log("optionQuotation", optionQuotation);
  const onFinish = (values) => {
    console.log("merge", buildData());
  };
  const buildData = () => {
    const locationData = buildLocation();
    const restaurantData = buildRestarent();
    debugger;
    setData({
      privateTourRequestId: privateTourResponse?.privateTourResponse?.id,
      startDate: privateTourResponse?.privateTourResponse?.startDate,
      endDate: privateTourResponse?.privateTourResponse?.endDate,
      location:
        locationData.length > 0 && restaurantData.length > 0
          ? [...locationData, ...restaurantData]
          : [],
      vehicles: buildVehicle(),
      tourguides: [],
      material: buildMaterial(),
      detailPlanRoutes: [],
    });
    return {
      privateTourRequestId: privateTourResponse?.privateTourResponse?.id,
      startDate: privateTourResponse?.privateTourResponse?.startDate,
      endDate: privateTourResponse?.privateTourResponse?.endDate,
      location:
        locationData.length > 0 && restaurantData.length > 0
          ? [...locationData, ...restaurantData]
          : locationData.length > 0 && restaurantData.length === 0
            ? [...locationData]
            : restaurantData.length > 0 && locationData.length === 0
              ? [...restaurantData]
              : [],
      vehicles: buildVehicle(),
      tourguides: [],
      material: buildMaterial(),
      detailPlanRoutes: [],
    };
  };
  const buildLocation = () => {
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
    debugger;
    if (data?.isSuccess) {
      setProvinceList(data.result?.items);
    }
  };
  useEffect(() => {
    fetchProvinces();
  }, [optionQuotation]);
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
        <Form.Item>
          <h3 className="font-bold text-primary text-xl">
            Phương tiện di chuyển
          </h3>

          <VehicleAssignment
            data={vehicleQuotationDetails}
            form={form}
            setFieldsValue={setFieldsValue}
            getFieldValue={getFieldValue}
          />
        </Form.Item>
        {/* <Form.Item> */}
        {/* <LocalVehicleAssignment data={vehicleQuotationDetails} /> */}
        {/* </Form.Item> */}
        {/* <Form.Item>
          <h3 className="font-bold text-primary text-xl">
            Dịch vụ vui chơi giải trí
          </h3>

          <EntertainmentAssignment
            data={entertainment}
            privateTourResponse={privateTourResponse}
            setEntertainmentData={setEntertainmentData}
          />
        </Form.Item> */}
        {/* TẠO KẾ HOẠCH CHI TIẾT CHO TOUR */}
        <MaterialAssignment data={material} />

        <div className="my-16">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            TẠO KẾ HOẠCH CHI TIẾT CHO TOUR
          </h2>
          {/* <BasicTimeline /> */}
        </div>

        {/* LỊCH TRÌNH TỪNG THỜI GIAN */}
        {/* <DetailPlanFollowingTimeline /> */}
        {/* {provinceServices.length > 0 &&
          provinceServices.map((province) => (
            <div key={province.provinceId} style={{ marginBottom: "20px" }}>
              <Card title={province.provinceName}>
                <List
                  dataSource={province.services}
                  grid={{ gutter: 16, column: 1 }}
                  renderItem={(item) => (
                    <List.Item key={item.id}>
                      <div className="grid grid-cols-2">
                        <div>
                          <p className="font-bold text-primary text-lg">
                            Thời gian:{" "}
                          </p>
                          <div>
                            <ConfigProvider locale={viVN}>
                              <DatePicker
                                className="ml-2"
                                format="DD/MM/YYYY"
                              />
                              <TimePicker className="ml-2" format="HH:mm" />
                            </ConfigProvider>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-primary text-lg">
                            Địa điểm
                          </p>
                          <p>
                            {item.name} - {item.address}
                          </p>
                          <textarea
                            className="w-full border rounded p-2"
                            placeholder="Nhập nội dung"
                          ></textarea>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          ))} */}

        {/* THÔNG TIN HƯỚNG DẪN VIÊN */}
        <TourguideAssignment provinceList={provinceList} />
        <Button type="primary" htmlType="submit">
          Tạo kế hoạch tour
        </Button>
      </Form>
      <Button onClick={() => buildData()}>Log data</Button>
    </div>
  );
};

export default CreatePlanForm;
