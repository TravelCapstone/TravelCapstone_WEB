import React, { createContext, useState, useContext, useCallback } from "react";

const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
  const [commonPrices, setCommonPrices] = useState([]);
  const [packagePrices, setPackagePrices] = useState({
    basic: [],
    standard: [],
    premium: [],
  });

  const updateCommonPrice = useCallback((service) => {
    setCommonPrices((prevPrices) => [...prevPrices, service]);
  }, []);

  const updatePackagePrice = useCallback((packageType, service) => {
    setPackagePrices((prevPrices) => ({
      ...prevPrices,
      [packageType]: [...prevPrices[packageType], service],
    }));
  }, []);

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
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => useContext(PriceContext);
