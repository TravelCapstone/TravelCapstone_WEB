import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Title from "antd/es/skeleton/Title";
import PlanServiceCostDetails from "./PlanServiceCostDetails";
import DayPlans from "./DayPlans";
import TourguideAssignments from "./TourguideAssignments";
import { useEffect, useState } from "react";
import { getPlanByTourId } from "../../api/TourApi";
import Tour from "./Tour";

const ViewPlan = ({ privateTourResponse }) => {
  const [result, setResult] = useState({});
  console.log("privateTourResponse", privateTourResponse);
  const fetchPlan = async () => {
    const data = await getPlanByTourId(privateTourResponse.tourId);
    if (data?.isSuccess) {
      setResult(data.result);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);
  return (
    <Layout>
      <Title level={2}>Tour Details</Title>
      <Content style={{ padding: "20px" }}>
        <Tour tour={result.tour} />
        <PlanServiceCostDetails
          planServiceCostDetails={result.planServiceCostDetails}
        />
        <DayPlans dayPlans={result.dayPlans} />
        <TourguideAssignments
          tourguideAssignments={result.tourguideAssignments}
        />
      </Content>
    </Layout>
  );
};
export default ViewPlan;
