import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";

const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
  const [commonPrices, setCommonPrices] = useState([]);
  const [packagePrices, setPackagePrices] = useState({
    basic: [],
    standard: [],
    premium: [],
  });

  // const commonPricesRef = useRef(commonPrices);
  // const packagePricesRef = useRef(packagePrices);

  // useEffect(() => {
  //   commonPricesRef.current = commonPrices;
  // }, [commonPrices]);

  // useEffect(() => {
  //   packagePricesRef.current = packagePrices;
  // }, [packagePrices]);

  const updateCommonPrice = useCallback((service) => {
    setCommonPrices((prevPrices) => [...prevPrices, service]);
  }, []);

  const updatePackagePrice = useCallback((packageType, service) => {
    setPackagePrices((prevPrices) => ({
      ...prevPrices,
      [packageType]: [...prevPrices[packageType], service],
    }));
  }, []);

  //  setPackagePrices((prevPrices) => {
  //     const existingServiceIndex = prevPrices[packageType].findIndex(
  //       (s) => s.item === service.item
  //     );
  //     if (existingServiceIndex !== -1) {
  //       const updatedPrices = [...prevPrices[packageType]];
  //       updatedPrices[existingServiceIndex] = service;
  //       return {
  //         ...prevPrices,
  //         [packageType]: updatedPrices,
  //       };
  //     } else {
  //       return {
  //         ...prevPrices,
  //         [packageType]: [...prevPrices[packageType], service],
  //       };
  //     }
  //   });
  // }, []);

  const calculateTotalCost = (services) => {
    return services.reduce((sum, record) => sum + record.total, 0);
  };

  const getTotalCost = () => {
    const commonCost = calculateTotalCost(commonPrices);
    const basicCost = calculateTotalCost(packagePrices.basic);
    const standardCost = calculateTotalCost(packagePrices.standard);
    const premiumCost = calculateTotalCost(packagePrices.premium);

    return {
      common: commonCost,
      basic: basicCost + commonCost,
      standard: standardCost + commonCost,
      premium: premiumCost + commonCost,
    };
  };

  return (
    <PriceContext.Provider
      value={{
        commonPrices,
        packagePrices,
        updateCommonPrice,
        updatePackagePrice,
        getTotalCost,
        setPackagePrices,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => useContext(PriceContext);
