// ViewOptions.jsx
import React, { useEffect, useState } from 'react';
import ViewOptionsItems from './ViewOptionsItems';
import ViewOptionsWrapper, {
  ViewOptionHeader,
  Title,
  Description,
  ViewOptionTableArea,
  ButtonGroup,
  Button,
} from './ViewOptions.style';
import { getIdOptionsRequest } from '../../api/OptionsApi';

const ViewOptions = () => {

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const data = await getIdOptionsRequest("C8DE0D2A-D6EC-468A-993F-27A6F19F009D");
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

  if (loading) return <div className='text-center mt-20'>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
console.log('options', options);

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
