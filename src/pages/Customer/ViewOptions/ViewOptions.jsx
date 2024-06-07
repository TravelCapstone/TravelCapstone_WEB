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
import { useLocation, useParams } from "react-router-dom";
import TourRequestPage from "../../Staff/ManagePrivateTour/TourPackage/ViewListTourPrivate/DetailTourRequest";
import TourRequestSection from "../../Staff/ManagePrivateTour/TourPackage/CreatePackage/TourRequestSection";

const ViewOptions = () => {
  const { id } = useParams();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const reservationState = location.state; // This contains startDate, endDate, totalWeeks, totalPrice
  console.log("reservationState", reservationState);

  console.log("id", id);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const data = await getIdOptionsRequest(id);
        // debugger;
        setOptions(data.result);
        setError(null);
      } catch (error) {
        setError(error.message || "Failed to fetch options");
        console.error(error.data);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  if (loading) return <LoadingOverlay isLoading={true} />;
  if (error) return <div>Error: {error}</div>;

  console.log("options", options);

  return (
    <div>
      <TourRequestSection request={options} />

      {options && options.length === 0 && (
        <ViewOptionsWrapper>
          <ViewOptionHeader>
            <Title>Chọn Gói Dịch Vụ</Title>
            <Description>
              Khách hàng Vui Lòng chọn 1 trong 3 gói (options) dưới đây!
            </Description>
          </ViewOptionHeader>
          <div>
            <ViewOptionsItems options={options} />
          </div>
        </ViewOptionsWrapper>
      )}
    </div>
  );
};

export default ViewOptions;
