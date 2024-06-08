import React, { useState, useEffect } from "react";
import LocationSelect from "../../../components/UI/Address/LocationSelect";
import { typePortLabels } from "../../../settings/globalStatus";
import { getAllReferenceTransportPriceByFilter } from "../../../api/ReferencePriceTransportApi";
import { toast } from "react-toastify";
import LoadingComponent from "../../../components/Loading/LoadingComponent";
import moment from "moment-timezone";

function FilterReferenceTransportPrice({
  log,
  currentPage,
  itemsPerPage,
  isFilter,
  fetchData,
}) {
  const [province1, setProvince1] = useState(null);
  const [province2, setProvince2] = useState(null);
  const [district1, setDistrict1] = useState(null);
  const [district2, setDistrict2] = useState(null);
  const [commune1, setCommune1] = useState(null);
  const [commune2, setCommune2] = useState(null);
  const [portType, setPortType] = useState("default");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const filterData = async () => {
    if (portType == null) {
      toast.error("Vui lòng chọn loại cảng");
      return;
    }
    if (portType == 1 || portType == 3) {
      setStartDate(null);
      setEndDate(null);
    } else {
      if (startDate == null || endDate == null) {
        return;
      }
    }
    const dataSend = {
      firstLocation: {
        provinceId: province1,
        districtId: district1,
        communeId: commune1,
      },
      secondLocation: {
        provinceId: province2,
        districtId: district2,
        communeId: commune2,
      },
      portType: Number(portType),
      startDate: startDate == null ? null : moment(startDate).format(),
      endDate: endDate == null ? null : moment(endDate).format(),
    };
    console.log(dataSend);
    setIsLoading(true);
    const data = await getAllReferenceTransportPriceByFilter(
      dataSend,
      currentPage,
      itemsPerPage
    );
    if (data?.isSuccess) {
      log({
        data: data.result.items,
        totalPages: data.result.totalPages,
      });
    }
    setIsLoading(false);
  };
  const log1 = (data) => {
    setProvince1(data.provinceId);
    setDistrict1(data.districtId);
    setCommune1(data.communeId);
  };

  const log2 = (data) => {
    setProvince2(data.provinceId);
    setDistrict2(data.districtId);
    setCommune2(data.communeId);
  };
  const handleReset = () => {
    fetchData();
    setIsReset(!isReset);
    setProvince1(null);
    setProvince2(null);
    setDistrict1(null);
    setDistrict2(null);
    setCommune1(null);
    setCommune2(null);
    setPortType("default");
    setStartDate(null);
    setEndDate(null);
  };
  useEffect(() => {
    filterData();
  }, [currentPage]);
  return (
    <>
      <LoadingComponent isLoading={isLoading} />
      {isFilter && (
        <div class="flex justify-between my-10">
          <div className="flex flex-col md:flex md:flex-row ">
            <div>
              <span className="font-semibold">Nơi đi</span>
              <LocationSelect
                log={log1}
                isFlex={false}
                isReset={isReset}
                handleReset={handleReset}
              />
            </div>
            <div className="mx-5">
              <span className="font-semibold">Nơi đến</span>
              <LocationSelect
                log={log2}
                isFlex={false}
                isReset={isReset}
                handleReset={handleReset}
              />
            </div>
            <div className=" md:flex md:flex-col">
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text font-semibold">
                    Loại cảng/bến
                  </span>
                </label>
                <select
                  className="select select-bordered"
                  onChange={(e) => setPortType(e.target.value)}
                  value={portType}
                >
                  <option disabled value={"default"}>
                    Chọn loại bến
                  </option>
                  {Object.entries(typePortLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text font-semibold">Ngày bắt đầu</span>
                </label>
                <input
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text font-semibold">
                    Ngày kết thúc
                  </span>
                </label>
                <input
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="md:flex md:flex-row md:justify-between">
              <button
                className="btn mt-14 md:mx-4  bg-mainColor text-white"
                onClick={filterData}
              >
                <i class="fa-solid fa-filter"></i> Lọc
              </button>
              <button onClick={handleReset} className="btn mt-14 ">
                <i class="fa-solid fa-arrow-rotate-left"></i>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterReferenceTransportPrice;
