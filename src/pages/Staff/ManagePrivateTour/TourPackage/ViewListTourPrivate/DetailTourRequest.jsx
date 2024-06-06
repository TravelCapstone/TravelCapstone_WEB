import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPrivateTourById } from "../../../../../api/privateTourRequestApi";
import LoadingOverlay from "../../../../../components/Loading/LoadingOverlay";
import TourRequestSection from "../CreatePackage/TourRequestSection";
import CreateOptionForm from "../CreatePackage/CreateOptionForm";
import CreatePlanForm from "../../CreatePlan/CreatePlanForm";
import BreadcrumbWithBackButton from "../../../../../components/BreadCrumb/BreadCrumb";
import { LISTING_TOUR_REQUEST_STAFF } from "../../../../../settings/constant";

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
  console.log(selectedOption);
  const hasOptions = request.option1 && request.option2 && request.option3;

  useEffect(() => {
    // Adjust the active tab based on the status when it changes
    if (request?.privateTourResponse?.status !== 0 && activeTab === 1) {
      setActiveTab(0); // Default to the first tab
    }
  }, [request]);

  const renderActiveTabContent = () => {
    const activeTabContent = tabs[activeTab];
    if (!activeTabContent) {
      console.error("Active tab index is out of range:", activeTab);
      return null;
    }
    return activeTabContent.content;
  };

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

  const breadcrumbItems = [
    { name: "Lịch sử tour yêu cầu", url: LISTING_TOUR_REQUEST_STAFF },
  ];

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      {activeTab >= 0 && activeTab < tabs.length && (
        <div className="mx-10 mb-10">
          <BreadcrumbWithBackButton
            breadcrumbItems={breadcrumbItems}
            currentTab={tabs[activeTab].label}
          />
        </div>
      )}

      <div className="mx-10 tabs">
        <div className="tab-headers mb-10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`mx-2 tab-header ${activeTab === index ? "font-bold border-b-2" : "font-medium"}`}
              onClick={() => handleTabChange(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {renderActiveTabContent()}
    </>
  );
}

export default TourRequestPage;
