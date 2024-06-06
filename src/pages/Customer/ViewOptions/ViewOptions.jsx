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

const ViewOptions = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const data = await getIdOptionsRequest(
          "c41e0543-f944-4dee-9622-c5550d5f007a"
        );
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
  );
};

export default ViewOptions;
