// ViewOptions.jsx
import React, { useEffect, useState } from "react";
import ViewOptionsItems from "./ViewOptionsItems";
import ViewOptionsWrapper, {
  ViewOptionHeader,
  Title,
  Description,
  ViewOptionTableArea,
  ButtonGroup,
  Button,
} from "./ViewOptions.style";
import { getIdOptionsRequest } from "../../../api/OptionsApi";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TourRequestPage from "../../Staff/ManagePrivateTour/TourPackage/ViewListTourPrivate/DetailTourRequest";
import TourRequestSection from "../../Staff/ManagePrivateTour/TourPackage/CreatePackage/TourRequestSection";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import LoadingComponent from "../../../components/Loading/LoadingComponent";
import ViewOptionCard from "./ViewOptionCard/ViewOptionCard";
import BreadcrumbWithBackButton from "../../../components/BreadCrumb/BreadCrumb";
import {
  LISTING_TOUR_PRIVATE,
  LISTING_TOUR_REQUEST_STAFF,
} from "../../../settings/constant";
import { getPrivateTourById } from "../../../api/privateTourRequestApi";
import ViewPlan from "../../Plan/ViewPlan";

const ViewOptions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [privateResponse, setPrivateResponse] = useState({});
  const location = useLocation();
  const reservationState = location.state; // This contains startDate, endDate, totalWeeks, totalPrice
  console.log("reservationState", reservationState);
  console.log("selectedOption", selectedOption);
  console.log("options", options);

  const urlSearchParams = new URLSearchParams(location.search);
  const initialTab = urlSearchParams.get("tab") || "1";

  console.log("id", id);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const data = await getIdOptionsRequest(id);
        const data2 = await getPrivateTourById(id);
        if (data2?.data?.isSuccess) {
          setPrivateResponse(data2?.data?.result?.privateResponse);
        }

        console.log("Fetched data:", data); // Log the fetched data to see its structure

        // Adjust the following line based on the actual structure of the data object
        setOptions(data.result);

        setError(null);

        const selected = [
          data.result?.option1,
          data.result?.option2,
          data.result?.option3,
        ].find(
          (option) => option?.optionQuotation?.optionQuotationStatusId === 1
        );
        setSelectedOption(selected);
      } catch (error) {
        setError(error.message || "Failed to fetch options");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [id]);

  // if (loading) return <LoadingComponent isLoading={true} />;
  // if (error) return <div>Error: {error}</div>;

  const handleTabChange = (key) => {
    navigate(`${location.pathname}?tab=${key}`);
  };

  console.log("options", options);

  const breadcrumbItems = [
    { name: "Lịch sử tour yêu cầu", url: LISTING_TOUR_PRIVATE },
  ];
  const currentTabLabel = {
    1: "Thông tin yêu cầu tour",
    2: "Chọn gói tour",
    3: "Xem gói tour đã chọn",
    4: "Xem kế hoạch tour ",
  }[initialTab];

  return (
    <>
      <div className="mx-10">
        <div className="mb-8">
          <BreadcrumbWithBackButton
            breadcrumbItems={breadcrumbItems}
            currentTab={currentTabLabel}
          />
        </div>
        <h1 className="text-center font-bold text-xl mb-2 text-mainColor">
          THÔNG TIN CHI TIẾT TOUR YÊU CẦU
        </h1>
        <Tabs
          defaultActiveKey={initialTab}
          onChange={handleTabChange}
          className="mx-4"
        >
          <TabPane tab="Thông tin yêu cầu tour" key="1">
            <TourRequestSection
              loading={loading}
              request={options}
              error={error}
            />
          </TabPane>
          {!selectedOption && options.option1 && (
            <TabPane tab="Chọn gói tour" key="2">
              {options.option1 !== null && (
                <ViewOptionsWrapper>
                  <ViewOptionHeader>
                    <Title>
                      <span className="text-mainColor">Chọn Gói Dịch Vụ</span>
                    </Title>
                    <Description>
                      Khách hàng Vui Lòng chọn 1 trong 3 gói (options) dưới đây!
                    </Description>
                  </ViewOptionHeader>
                  <div>
                    <ViewOptionsItems
                      options={options}
                      loading={loading}
                      error={error}
                      selectedOptionCus={selectedOption}
                    />
                  </div>
                </ViewOptionsWrapper>
              )}
            </TabPane>
          )}
          {selectedOption && (
            <TabPane tab="Xem gói tour đã chọn" key="3">
              <div className="flex justify-center">
                <ViewOptionCard
                  option={selectedOption}
                  selectedOption={selectedOption}
                />
              </div>
            </TabPane>
          )}
          {options?.privateTourResponse?.status === 4 && (
            <TabPane tab="Xem kế hoạch tour" key="4">
              <ViewPlan privateTourResponse={privateResponse} />
            </TabPane>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default ViewOptions;
