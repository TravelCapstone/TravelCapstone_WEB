import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPrivateTourById } from "../../../../../api/privateTourRequestApi";
import LoadingOverlay from "../../../../../components/Loading/LoadingOverlay";
import TourRequestSection from "../CreatePackage/TourRequestSection";
import CreateOptionForm from "../CreatePackage/CreateOptionForm";
import CreatePlanForm from "../../CreatePlan/CreatePlanForm";

function TourRequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [request, setRequest] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  console.log("selectedOption", selectedOption);

  const fetchData = async () => {
    const data = await getPrivateTourById(id);
    if (data?.data?.isSuccess) {
      setRequest(data?.data?.result);
      setIsLoading(false);
      console.log("data", data);

      // Kiểm tra xem có option nào có optionQuotationStatusId == 1 không
      if (
        data.data.result.option1?.optionQuotation?.optionQuotationStatusId === 1
      ) {
        setSelectedOption(data.data.result.option1);
      } else if (
        data.data.result.option2?.optionQuotation?.optionQuotationStatusId === 1
      ) {
        setSelectedOption(data.data.result.option2);
      } else if (
        data.data.result.option3?.optionQuotation?.optionQuotationStatusId === 1
      ) {
        setSelectedOption(data.data.result.option3);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleTabChange = (index) => {
    setActiveTab(index);
    navigate(`${location.pathname}?tab=${index}`);
  };

  const tabs = [
    {
      label: "Thông tin yêu cầu",
      content: <TourRequestSection request={request} />,
    },
    {
      label: selectedOption ? null : "Tạo gói tour",
      content: selectedOption ? null : <CreateOptionForm request={request} />,
    },
    {
      label: "Tạo kế hoạch chi tiết",
      content: selectedOption ? (
        <CreatePlanForm
          optionQuotation={selectedOption.optionQuotation}
          quotationDetails={selectedOption.quotationDetails}
          vehicleQuotationDetails={selectedOption.vehicleQuotationDetails}
          privateTourResponse={request}
        />
      ) : null,
    },
  ];

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <div className="tabs">
        <div className="tab-headers my-10">
          {tabs.map(
            (tab, index) =>
              (tab.content || selectedOption) && (
                <button
                  key={index}
                  className={`mx-2 tab-header ${
                    activeTab === index ? "font-bold border-b-2" : ""
                  }`}
                  onClick={() => handleTabChange(index)}
                >
                  {tab.label}
                </button>
              )
          )}
        </div>
      </div>
      {tabs[activeTab].content}
    </>
  );
}

export default TourRequestPage;
