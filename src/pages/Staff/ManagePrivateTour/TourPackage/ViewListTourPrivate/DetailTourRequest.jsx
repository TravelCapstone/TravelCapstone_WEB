import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPrivateTourById } from "../../../../../api/privateTourRequestApi";
import Loading from "../../../../../components/Loading/Loading";
import TourRequestSection from "../CreatePackage/TourRequestSection";
import CreateOptionForm from "../CreatePackage/CreateOptionForm";
import CreatePlanForm from "../../CreatePlan/CreatePlanForm";
function TourRequestPage() {
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

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

  const handleTabChange = (index) => {
    console.log(index);
    setActiveTab(index);
  };
  const tabs = [
    {
      label: "Thông tin yêu cầu",
      content: <TourRequestSection request={request} />,
    },
    {
      label: "Tạo gói tour",
      content: <CreateOptionForm />,
    },
    {
      label: "Tạo kế hoạch chi tiết",
      content: <CreatePlanForm />,
    },
  ];
  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="tabs">
        <div className="tab-headers my-10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`mx-2 tab-header ${activeTab === index ? "font-bold border-b-2" : ""}`}
              onClick={() => handleTabChange(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {tabs[activeTab].content}
      </div>
    </>
  );
}

export default TourRequestPage;
