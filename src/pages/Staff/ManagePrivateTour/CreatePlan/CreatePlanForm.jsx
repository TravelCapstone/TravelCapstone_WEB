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
  console.log(hotel);
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission here
  };
  const [entertainmentData, setEntertainmentData] = useState(null);
  const [foodData, setFoodData] = useState(null);
  const [restingData, setRestingData] = useState(null);
  const [mergeData, setMergeData] = useState(null);
  const [provinceServices, setProvinceServices] = useState([]);

  const mergeDataFunc = (entertainmentData, foodData, restingData) => {
    const mergedData = [];

    // Merge entertainment data
    entertainmentData?.forEach((provinceEntertainments) => {
      const provinceId = provinceEntertainments.provinceId;
      const provinceName = provinceEntertainments.provinceName;
      const entertainmentServices = provinceEntertainments.services.map(
        (service) => ({
          serviceType: "Entertainment",
          provinceId: provinceId,
          provinceName: provinceName,
          facilityService: {
            id: service.facilityService.id,
            name: service.facilityService.name,
            address: service.facilityService.address,
          },
        })
      );
      mergedData.push(...entertainmentServices);
    });

    // Merge food and beverage data
    foodData?.forEach((provinceFoodData) => {
      const provinceId = provinceFoodData.provinceId;
      const provinceName = provinceFoodData.provinceName;
      const foodServices = provinceFoodData.services.map((service) => ({
        serviceType: "Food and Beverage",
        provinceId: provinceId,
        provinceName: provinceName,
        facilityService: {
          id: service.facilityService.id,
          name: service.facilityService.name,
          address: service.facilityService.address,
        },
      }));
      mergedData.push(...foodServices);
    });

    // Merge resting data
    restingData?.forEach((provinceRestingData) => {
      const provinceId = provinceRestingData.provinceId;
      const provinceName = provinceRestingData.provinceName;
      const restingServices = provinceRestingData.services.map((service) => ({
        serviceType: "Resting",
        provinceId: provinceId,
        provinceName: provinceName,
        facilityService: {
          id: service.facilityService.id,
          name: service.facilityService.name,
          address: service.facilityService.address,
        },
      }));
      mergedData.push(...restingServices);
    });

    return mergedData;
  };

  const createProvinceServiceList = (mergedData) => {
    const provinceServiceList = {};
    mergedData.forEach((item) => {
      const { provinceId, provinceName, facilityService } = item;
      if (!provinceServiceList[provinceId]) {
        provinceServiceList[provinceId] = {
          provinceId: provinceId,
          provinceName: provinceName,
          services: [facilityService],
        };
      } else {
        provinceServiceList[provinceId].services?.push(facilityService);
      }
    });
    return Object.values(provinceServiceList);
  };

  const updateProvinceServices = () => {
    if (mergeData) {
      const updatedProvinceServices = createProvinceServiceList(mergeData);
      setProvinceServices(updatedProvinceServices);
    }
  };

  useEffect(() => {
    setMergeData(mergeDataFunc(entertainmentData, foodData, restingData));
  }, [entertainmentData, foodData, restingData]);
  useEffect(() => {
    updateProvinceServices();
  }, [mergeData]);

  console.log("provinceServices", provinceServices);
  const provinceList = provinceServices?.map((service) => ({
    provinceId: service.provinceId,
    provinceName: service.provinceName,
  }));
  console.log("provinceList", provinceList);
  return (
    <div className="  p-4  bg-white max-h-[680px]  overflow-y-auto">
      <h3 className="font-bold text-mainColor text-xl text-center">
        TẠO KẾ HOẠCH TOUR CHI TIẾT
      </h3>
      <Divider />
      <Form
        name="createPlan"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item label="Phân loại">
          {optionQuotation && (
            <span className="font-semibold text-xl">
              {optionClassLabels[optionQuotation.optionClassId]}
            </span>
          )}
        </Form.Item>
        <Form.Item>
          <h3 className="font-bold text-primary text-xl">Dịch vụ lưu trú</h3>

          <RestingAssignment
            data={hotel}
            privateTourResponse={privateTourResponse}
            setRestingData={setRestingData}
          />
        </Form.Item>
        <Form.Item>
          <h3 className="font-bold text-primary text-xl">Dịch vụ ăn uống</h3>

          <FoodAndBevarageAssignment
            data={restaurant}
            privateTourResponse={privateTourResponse}
            setFoodData={setFoodData}
          />
        </Form.Item>
        <Form.Item>
          <h3 className="font-bold text-primary text-xl">
            Phương tiện di chuyển
          </h3>

          <VehicleAssignment data={vehicleQuotationDetails} />
        </Form.Item>
        <Form.Item>
          {/* <LocalVehicleAssignment data={vehicleQuotationDetails} /> */}
        </Form.Item>
        <Form.Item>
          <h3 className="font-bold text-primary text-xl">
            Dịch vụ vui chơi giải trí
          </h3>

          <EntertainmentAssignment
            data={entertainment}
            privateTourResponse={privateTourResponse}
            setEntertainmentData={setEntertainmentData}
          />
        </Form.Item>
        {/* TẠO KẾ HOẠCH CHI TIẾT CHO TOUR */}
        <div className="my-16">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            TẠO KẾ HOẠCH CHI TIẾT CHO TOUR
          </h2>
          {/* <BasicTimeline /> */}
        </div>
        {/* LỊCH TRÌNH TỪNG THỜI GIAN */}
        {/* <DetailPlanFollowingTimeline /> */}
        {provinceServices.length > 0 &&
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
          ))}

        {/* THÔNG TIN HƯỚNG DẪN VIÊN */}
        <TourguideAssignment provinceList={provinceList} />
        <MaterialAssignment />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo kế hoạch tour
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePlanForm;
