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
  const [form] = Form.useForm();

  console.log("restaurant", restaurant);
  const onFinish = (values) => {
    console.log("values", values);
    console.log("location", buildLocation());
    console.log("vehilce", buildVehicle());
    console.log("buildRestarent", buildRestarent());
    const location = [...buildLocation(), ...buildRestarent()];
    console.log("merge", location);
  };
  const buildLocation = () => {
    const hotelValue = form.getFieldValue("hotel");
    return Array.isArray(hotelValue) ? hotelValue.flat() : [hotelValue];
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
    debugger;
    const test = form.getFieldsValue(`portStartPoint[${0}]`);
    return vehicleQuotationDetails.map((item, index) => ({
      vehicleType: item.vehicleType,
      startPoint: item.startPointId,
      endPoint: item.endPointId,
      portStartPoint: isEmptyObject(
        form.getFieldsValue(`portStartPoint[${index}]`)
      )
        ? form.getFieldsValue(`portStartPoint[${index}]`)
        : null,
      portEndPoint: isEmptyObject(form.getFieldsValue(`portEndPoint[${index}]`))
        ? form.getFieldsValue(`portEndPoint[${index}]`)
        : null,
      startDate: isEmptyObject(form.getFieldsValue(`startDate[${index}]`))
        ? form.getFieldsValue(`startDate[${index}]`)
        : null,
      endDate: isEmptyObject(form.getFieldsValue(`endDate[${index}]`))
        ? form.getFieldsValue(`endDate[${index}]`)
        : null,
      driverId: isEmptyObject(form.getFieldsValue(`driverId[${index}]`))
        ? form.getFieldsValue(`driverId[${index}]`)
        : null,
      sellPriceHistoryId: isEmptyObject(
        form.getFieldsValue(`sellPriceHistoryId[${index}]`)
      )
        ? form.getFieldsValue(`sellPriceHistoryId[${index}]`)
        : null,
      referencePriceId: isEmptyObject(
        form.getFieldsValue(`referencePriceId[${index}]`)
      )
        ? form.getFieldsValue(`referencePriceId[${index}]`)
        : null,
      numOfVehicle: isEmptyObject(form.getFieldsValue(`numOfVehicle[${index}]`))
        ? form.getFieldsValue(`numOfVehicle[${index}]`)
        : null,
    }));
  };
  const setFieldsValue = (values) => {
    form.setFieldsValue(values);
  };
  const getFieldValue = (values) => {
    return form.getFieldValue(values);
  };
  return (
    <div className="  p-4  bg-white max-h-[680px]  overflow-y-auto">
      <h3 className="font-bold text-mainColor text-xl text-center">
        TẠO KẾ HOẠCH TOUR CHI TIẾT
      </h3>
      <Divider />
      <div className="mt-10">
        <h3>Form Data:</h3>
        <pre>{JSON.stringify(buildRestarent(), null, 2)}</pre>
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
        {/* <TourguideAssignment provinceList={provinceList} /> */}
        {/* <MaterialAssignment /> */}
        <Button type="primary" htmlType="submit">
          Tạo kế hoạch tour
        </Button>
      </Form>
    </div>
  );
};

export default CreatePlanForm;
