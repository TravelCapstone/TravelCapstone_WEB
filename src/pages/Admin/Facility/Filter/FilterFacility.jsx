import React, { useState, useEffect } from "react";
import LocationSelect from "../../../../components/UI/Address/LocationSelect";
import {
  facilityTypeLabels,
  ratingLabels,
} from "../../../../settings/globalStatus";
import {
  getAllFacilityByFilter,
  getAllFacilityByLocationAndRatingId,
  getAllFacilityRating,
} from "../../../../api/FacilityApi";
import LoadingComponent from "../../../../components/Loading/LoadingComponent";

function FilterFacility({
  log,
  isFilter,
  currentPage,
  itemsPerPage,
  fetchData,
}) {
  const [rating, setRating] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFacilityType, setSelectedFacilityType] = useState(null);
  const [selectedFacilityRating, setSelectedFacilityRating] = useState(null);
  const [data, setData] = useState({});
  const [isReset, setIsReset] = useState(false);
  useEffect(() => {
    return () => {};
  }, []);

  const handleFacilityTypeChange = async (e) => {
    const id = e.target.value;
    setIsLoading(true);
    setSelectedFacilityType(id);
    const data = await getAllFacilityRating(id);
    if (data.isSuccess) {
      const mappedOptions = data.result.items.map((item) => ({
        value: item.ratingId,
        label: ratingLabels[item.ratingId],
      }));
      setRating(mappedOptions);
      console.log(mappedOptions);
    }
    setIsLoading(false);
  };

  const logData = (data) => {
    setData(data);
  };

  const filterData = async () => {
    setIsLoading(true);
    console.log(selectedFacilityRating);

    if (selectedFacilityRating == null) {
      const dataSend = await getAllFacilityByFilter(
        data,
        currentPage,
        itemsPerPage
      );
      if (dataSend.isSuccess) {
        log({
          data: dataSend.result.items,
          totalPages: dataSend.result.totalPages,
        });
      }
    } else {
      const dataSend = await getAllFacilityByLocationAndRatingId(
        selectedFacilityRating,
        data,
        currentPage,
        itemsPerPage
      );
      if (dataSend.isSuccess) {
        log({
          data: dataSend.result.items,
          totalPages: dataSend.result.totalPages,
        });
      }
    }
    setIsLoading(false);
  };
  const handleReset = () => {
    fetchData();
    setIsReset(!isReset);
    setSelectedFacilityRating(null);
    setSelectedFacilityType(null);
  };
  return (
    <>
      <LoadingComponent isLoading={isLoading} />
      {isFilter && (
        <div className="flex flex-col mb-4">
          <LocationSelect
            isFlex={true}
            log={logData}
            isReset={isReset}
            handleReset={handleReset}
          />
          <div className="flex items-center">
            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text font-semibold">Loại hình</span>
              </label>
              <select
                className="select select-bordered w-40"
                onChange={(e) => handleFacilityTypeChange(e)}
                value={selectedFacilityType}
              >
                <option disabled>Chọn loại hình</option>
                {Object.entries(facilityTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control mt-6 mx-8">
              <label className="label">
                <span className="label-text font-semibold">Phân loại</span>
              </label>
              <select
                className="select select-bordered w-40"
                disabled={!selectedFacilityType}
                onChange={(e) => setSelectedFacilityRating(e.target.value)}
              >
                <option value="">Chọn Phân loại</option>
                {rating.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => filterData()}
              className="btn  mt-14 bg-mainColor text-white"
            >
              <i class="fa-solid fa-filter"></i> Lọc
            </button>
            <button
              onClick={() => handleReset()}
              className="btn mt-14 mx-2 bg-gray-200"
            >
              <i class="fa-solid fa-filter-circle-xmark"></i> Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterFacility;
