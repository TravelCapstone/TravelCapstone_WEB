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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPrivateTourById(id);
      if (data?.data?.isSuccess) {
        setRequest(data?.data?.result);
        setIsLoading(false);
        // Kiểm tra xem có option nào có optionQuotationStatusId == 1 không
        if (
          data.data.result.option1?.optionQuotation?.optionQuotationStatusId ===
          1
        ) {
          setSelectedOption(data.data.result.option1);
        } else if (
          data.data.result.option2?.optionQuotation?.optionQuotationStatusId ===
          1
        ) {
          setSelectedOption(data.data.result.option2);
        } else if (
          data.data.result.option3?.optionQuotation?.optionQuotationStatusId ===
          1
        ) {
          setSelectedOption(data.data.result.option3);
        }

        const selected = [
          data.data.result.option1,
          data.data.result.option2,
          data.data.result.option3,
        ].find(
          (option) => option?.optionQuotation?.optionQuotationStatusId === 1
        );
        setSelectedOption(selected);
      }
    };

    fetchData();
    // Synchronize active tab with URL query parameters
    const query = new URLSearchParams(location.search);
    const tab = parseInt(query.get("tab"), 10);
    if (!isNaN(tab)) {
      setActiveTab(tab);
    }
  }, [id, location.search]);

  const hasOptions = request.option1 && request.option2 && request.option3;

  useEffect(() => {
    // Adjust the active tab based on the status when it changes
    if (request?.privateTourResponse?.status !== 0 && activeTab === 1) {
      setActiveTab(0); // Default to the first tab
    }
  }, [request]);

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
      label: request.privateTourResponse?.status === 0 ? "Tạo gói tour" : null,
      content:
        request.privateTourResponse?.status === 0 ? (
          <CreateOptionForm request={request} />
        ) : null,
    },
    {
      label:
        request.privateTourResponse?.status === 2 && hasOptions
          ? "Tạo kế hoạch chi tiết"
          : null,
      content:
        request.privateTourResponse?.status === 2 && hasOptions ? (
          <CreatePlanForm
            optionQuotation={selectedOption?.optionQuotation}
            quotationDetails={selectedOption?.quotationDetails}
            vehicleQuotationDetails={selectedOption?.vehicleQuotationDetails}
            privateTourResponse={request}
          />
        ) : null,
    },
  ].filter((tab) => tab.content != null);

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
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
      </div>
      {tabs[activeTab].content}
    </>
  );
}

export default TourRequestPage;
