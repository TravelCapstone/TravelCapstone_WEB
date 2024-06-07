import { useEffect, useState } from "react";
import { DatePicker, Form, Input, Select, message } from "antd";
import { formatPrice } from "../../../../utils/Util";
import { getLatestEntertaimentPrice } from "../../../../api/SellPriceHistoryApi";

function EntertainmentAssignment({
  data,
  privateTourResponse,
  form,
  setFieldsValue,
  getFieldValue,
}) {
  const [selectedEntertainments, setSelectedEntertainments] = useState([[]]);
  const [adultEntertainments, setAdultEntertainments] = useState([[]]);
  const [childEntertainments, setChildEntertainments] = useState([[]]);

  const handleChange = (value, index) => {
    // Create a new copy of the selectedEntertainments array
    let newSelectedEntertainments = [...selectedEntertainments];

    // Update the sub-array at the specified index
    newSelectedEntertainments[index] = value;

    // Check if the number of selected entertainments matches the quantity

    // Update the state
    setSelectedEntertainments(newSelectedEntertainments);
  };
  useEffect(() => {
    selectedEntertainments?.forEach((item, index) => {
      if (selectedEntertainments[index]?.length !== data[index]?.quantity) {
        message.warning("Số lượng địa điểm du lịch không khớp");
        return;
      }
    });
  }, [selectedEntertainments]);

  const fetchData = async () => {
    data?.forEach(async (item, index) => {
      debugger;

      const response = await getLatestEntertaimentPrice(
        item?.districtId,
        privateTourResponse?.privateTourResponse?.id
      );
      if (response.isSuccess) {
        let newAdultEntertainments = [...adultEntertainments];
        let newChildEntertainments = [...childEntertainments];
        newAdultEntertainments[index] = response.result[index]?.adultSellPrice;
        newChildEntertainments[index] =
          response.result[index]?.childrenSellPrice;
        debugger;
        setFieldsValue({ [`entertainmentStartDate[${index}]`]: null });
        setFieldsValue({ [`entertainmentEndDate[${index}]`]: null });
        setFieldsValue({
          [`entertainmentNumOfServiceUseAdult`]: item.quantityOfAdult,
        });
        setFieldsValue({
          [`entertainmentNumOfServiceUseChild`]: item.quantityOfChild,
        });
        setAdultEntertainments(newAdultEntertainments);
        setChildEntertainments(newChildEntertainments);
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("adultEntertainments", adultEntertainments);
  const handleTimeChange = (value) => {
    console.log("value", value);
    setFieldsValue({
      [`entertainmentStartDate`]: new Date(value[0]).toISOString(),
    });
    setFieldsValue({
      [`entertainmentEndDate`]: new Date(value[1]).toISOString(),
    });
  };
  return (
    <>
      {data &&
        data.map((item, index) => (
          <div key={index}>
            <h3 className="font-bold text-primary text-xl my-4">
              Dịch vụ vui chơi giải trí
            </h3>
            <div className="flex">
              <strong className="w-1/12">{index + 1}</strong>
              <div className="flex flex-col justify-between w-11/12">
                <div className="flex justify-between">
                  <div className="flex justify-between w-6/12">
                    <strong>
                      {item.district?.name} - {item.district?.province?.name}
                    </strong>
                    <div className="ml-8">
                      <strong className="mr-2">Giá vé:</strong>
                      <span className="font-bold text-red-600">
                        {formatPrice(item.minPrice)} -{" "}
                        {formatPrice(item.maxPrice)}/vé
                      </span>
                    </div>
                  </div>
                  <div className="w-6/12">
                    <strong className="mx-2">
                      Số lượng địa điểm du lịch:{" "}
                    </strong>
                    <span>{item.quantity}</span>
                  </div>
                </div>
                <div className=" my-4">
                  <p className="font-bold">Chọn nơi giải trí</p>

                  <Form.Item
                    name="dateEntertainments"
                    key={`dateEntertainments-${index}`}
                    label="Thời gian"
                  >
                    <DatePicker.RangePicker onChange={handleTimeChange} />
                  </Form.Item>

                  <Form.Item
                    name="adultEntertainments"
                    key={`adultEntertainments-${index}`}
                    label="Dịch vụ vui chơi giải trí người lớn"
                  >
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Chọn nơi giải trí"
                      // value={selectedEntertainments[index]}
                      // onChange={(value) => handleChange(value, index)}
                      loading={adultEntertainments[index]?.length === 0}
                    >
                      {adultEntertainments[index]?.map((entertainment) => (
                        <Select.Option
                          key={entertainment.id}
                          value={entertainment.id}
                        >
                          {`${entertainment.facilityService?.name}- ${entertainment.facilityService?.facility?.name} - ${formatPrice(entertainment.price)}`}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="childEntertainments"
                    key={`childEntertainments-${index}`}
                    label="Dịch vụ vui chơi giải trí trẻ em"
                  >
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Chọn nơi giải trí"
                      value={selectedEntertainments[index]}
                      onChange={(value) => handleChange(value, index)}
                      loading={childEntertainments[index]?.length === 0}
                    >
                      {childEntertainments[index]?.map((entertainment) => (
                        <Select.Option
                          key={entertainment.id}
                          value={entertainment.id}
                        >
                          {`${entertainment.facilityService?.name}- ${entertainment.facilityService?.facility?.name} - ${formatPrice(entertainment.price)}`}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name={`entertainmentStartDate[${index}]`}>
                    <Input hidden />
                  </Form.Item>
                  <Form.Item name={`entertainmentEndDate[${index}]`}>
                    <Input hidden />
                  </Form.Item>
                  <Form.Item name={`entertainmentNumOfServiceUseAdult`}>
                    <Input hidden />
                  </Form.Item>
                  <Form.Item name={`entertainmentNumOfServiceUseChild`}>
                    <Input hidden />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default EntertainmentAssignment;
