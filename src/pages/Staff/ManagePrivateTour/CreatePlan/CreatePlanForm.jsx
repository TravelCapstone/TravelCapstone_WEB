import React from "react";
import { Form, Button, Divider } from "antd";
import RestingAssignment from "./RestingAssignment";
import FoodAndBevarageAssignment from "./FoodAndBevarageAssigment";
import VehicleAssignment from "./VehicleAssignment";
import EntertainmentAssignment from "./EntertainmentAssignment";
import BasicTimeline from "./PlanDetail/BasicTimeline";
import DetailPlanFollowingTimeline from "./PlanDetail/DetailPlanFollowingTimeline";
import MaterialAssignment from "./PlanDetail/MaterialAssignment";
import TourguideAssignment from "./PlanDetail/TourguideAssignment";
import LocalVehicleAssignment from "./LocalVehicleAssignment";

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

  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission here
  };

  return (
    <div className="p-4">
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
          {optionQuotation && <span>{optionQuotation.optionClassLabels}</span>}
        </Form.Item>

        <Form.Item>
          <RestingAssignment
            data={hotel}
            privateTourResponse={privateTourResponse}
          />
        </Form.Item>

        <Form.Item>
          <FoodAndBevarageAssignment
            data={restaurant}
            privateTourResponse={privateTourResponse}
          />
        </Form.Item>

        <Form.Item>
          <VehicleAssignment data={vehicleQuotationDetails} />
        </Form.Item>
        <Form.Item>
          <LocalVehicleAssignment data={vehicleQuotationDetails} />
        </Form.Item>
        <Form.Item>
          <EntertainmentAssignment
            data={entertainment}
            privateTourResponse={privateTourResponse}
          />
        </Form.Item>

        {/* TẠO KẾ HOẠCH CHI TIẾT CHO TOUR */}
        <div className="my-16">
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            TẠO KẾ HOẠCH CHI TIẾT CHO TOUR
          </h2>
          <BasicTimeline />
        </div>

        {/* LỊCH TRÌNH TỪNG THỜI GIAN */}
        <DetailPlanFollowingTimeline />

        {/* THÔNG TIN HƯỚNG DẪN VIÊN */}
        <TourguideAssignment />

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
