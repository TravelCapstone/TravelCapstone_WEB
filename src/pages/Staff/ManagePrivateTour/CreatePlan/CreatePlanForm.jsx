import EntertainmentAssignment from "./EntertainmentAssignment";
import FoodAndBevarageAssignment from "./FoodAndBevarageAssigment";
import LocalVehicleAssignment from "./LocalVehicleAssignment";
import BasicTimeline from "./PlanDetail/BasicTimeline";
import DetailPlanFollowingTimeline from "./PlanDetail/DetailPlanFollowingTimeline";
import MaterialAssignment from "./PlanDetail/MaterialAssignment";
import TourguideAssignment from "./PlanDetail/TourguideAssignment";
import RestingAssignment from "./RestingAssignment";
import VehicleAssignment from "./VehicleAssignment";

const CreatePlanForm = () => {
  return (
    <div className="p-4">
      <h3 className="font-bold text-mainColor text-xl text-center">
        TẠO KẾ HOẠCH TOUR CHI TIẾT
      </h3>
      <div className="py-6 px-20 shadow-xl rounded-xl w-full max-h-lvh overflow-y-auto">
        <div className="flex items-center">
          <h5 className="font-bold text-xl">Phân loại: </h5>
          <span className="font-light text-xl mx-2">Gói cơ bản</span>
        </div>
        <div>
          <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
            LỰA CHỌN DỊCH VỤ THEO YÊU CẦU
          </h2>
          <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              Nơi lưu trú:
            </h3>
            <RestingAssignment />
          </div>
          <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              Dịch vụ ăn uống:
            </h3>
            <FoodAndBevarageAssignment />
          </div>
          <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              Phương tiện di chuyển:
            </h3>
            <VehicleAssignment />
          </div>
          <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              Phương tiện di chuyển trong tỉnh:
            </h3>
            <LocalVehicleAssignment />
          </div>
          <div>
            <h3 className="font-bold text-base my-2 text-mainColor">
              Giải trí- điểm du lịch
            </h3>
            <EntertainmentAssignment />
          </div>
        </div>
        {/* //TẠO KẾ HOẠCH CHI TIẾT CHO TOUR */}
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
        <div className="flex justify-center">
          <button className="btn bg-mainColor text-white text-center">
            Tạo kế hoạch tour
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreatePlanForm;
