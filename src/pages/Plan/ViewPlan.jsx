import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Title from "antd/es/skeleton/Title";
import PlanServiceCostDetails from "./PlanServiceCostDetails";
import DayPlans from "./DayPlans";
import TourguideAssignments from "./TourguideAssignments";
import { useEffect, useState } from "react";
import { getPlanByTourId } from "../../api/TourApi";
import Tour from "./Tour";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";
const ViewPlan = ({ privateTourResponse }) => {
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log("privateTourResponse", privateTourResponse);
  const fetchPlan = async () => {
    setIsLoading(true);
    const data = await getPlanByTourId(privateTourResponse.tourId);
    if (data?.isSuccess) {
      setResult(data.result);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlan();
  }, []);
  return (
    <Layout>
      <LoadingOverlay isLoading={isLoading} />
      <Title level={2}>Tour Details</Title>
      <Content style={{ padding: "20px" }}>
        <Tour tour={result.tour} />

        <DayPlans dayPlans={result.dayPlans} />
        <TourguideAssignments
          tourguideAssignments={result.tourguideAssignments}
        />
        <PlanServiceCostDetails
          planServiceCostDetails={result.planServiceCostDetails}
        />
      </Content>
    </Layout>
  );
};
export default ViewPlan;
