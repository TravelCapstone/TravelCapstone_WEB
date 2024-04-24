import React, { useEffect, useState } from "react";
import { Card, List, Button } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CREATE_OPTIONS_TOUR_PRIVATE } from "../../../../../settings/constant";
import { NavLink } from "react-router-dom";
import { StaffLayout } from "../../../../../layouts";
import HeaderManagement from "../../../../../components/Header/HeaderManagement";
import { getPrivateTourById } from "../../../../../api/privateTourRequestApi";
import Loading from "../../../../../components/Loading/Loading";
import { statusPrivateTourLabels } from "../../../../../settings/globalStatus";
import TourRequestSection from "../CreatePackage/TourRequestSection";
import CreateOptionForm from "../CreatePackage/CreateOptionForm";
import CreatePlanForm from "../../CreatePlan/CreatePlanForm";
function TourRequestPage() {
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(id);

  const fetchData = async () => {
    const data = await getPrivateTourById(id);
    if (data?.data?.isSuccess) {
      setRequest(data?.data?.result);
      setIsLoading(false);
      console.log(request);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab font-medium"
          aria-label="Thông tin yêu cầu"
          checked
        />
        <TourRequestSection request={request} />

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab font-medium"
          aria-label="Tạo gói tour"
        />
        <div role="tabpanel" className="tab-content p-10">
          <CreateOptionForm />
        </div>
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab font-medium"
          aria-label="Tạo kế hoạch chi tiêt"
        />
        <div role="tabpanel" className="tab-content p-10">
          <CreatePlanForm />
        </div>
      </div>
    </>
  );
}

export default TourRequestPage;
