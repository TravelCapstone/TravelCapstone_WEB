import { Select, DatePicker, Typography, Form, Button } from "antd";
import "../../../../../settings/setupDayjs";
import { useState } from "react";
import { getAvailableTourguide } from "../../../../../api/TourguideAssignmentApi";
const TourguideAssignment = ({ provinceList, form }) => {
  console.log("form", form.getFieldValue("tourguide"));
  const [tourguide, setTourguide] = useState([[]]);
  const handleChange = async (index) => {
    // const newTourguide = [...tourguide];
    // newTourguide[index] = item;
    // setTourguide(newTourguide);
    // form.setFieldsValue({ tourguide: newTourguide });
    const tourguide = form.getFieldValue("tourguide");
    const province = tourguide[index].province;
    const startDate = new Date(tourguide[index].time[0]).toISOString();
    const endDate = new Date(tourguide[index].time[1]).toISOString();
    const availableTourguide = await getAvailableTourguide(
      province,
      startDate,
      endDate,
      1,
      100
    );
    if (availableTourguide.isSuccess) {
      let newTourguide = [...tourguide];
      newTourguide[index] = availableTourguide.result?.items;
      setTourguide(newTourguide);
    }
  };

  return (
    <div className="my-16">
      <h3 className="text-mainColor font-bold text-xl border-b-2">
        THÔNG TIN HƯỚNG DẪN VIÊN
      </h3>
      <div className="grid grid-cols-1 mt-10">
        <Form.List name="tourguide">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key} className="flex flex-wrap">
                  <Form.Item
                    {...field}
                    className=""
                    label="Thời gian"
                    required
                    name={[field.name, "time"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing time",
                      },
                    ]}
                    key={`${field.key}-time`}
                  >
                    <DatePicker.RangePicker
                      onChange={() => handleChange(index)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    className="mx-4"
                    label="Tỉnh"
                    required
                    name={[field.name, "province"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing province",
                      },
                    ]}
                    key={`${field.key}-province`}
                  >
                    <Select
                      placeholder="Chọn tỉnh"
                      loading={provinceList.length === 0}
                    >
                      {provinceList.map((province) => (
                        <Select.Option key={province.id} value={province.id}>
                          {province.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Hướng dẫn viên"
                    {...field}
                    className=""
                    required
                    name={[field.name, "tourguide"]}
                    key={`${field.key}-tourguide`}
                  >
                    <Select placeholder="Select a tour guide"></Select>
                  </Form.Item>

                  <Button
                    className="mx-4 bg-red-700 text-white"
                    onClick={() => remove(field.name)}
                  >
                    Xóa
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button
                  className="bg-primary text-white "
                  onClick={() => add()}
                >
                  Thêm hướng dẫn viên
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>{" "}
      </div>
    </div>
  );
};

export default TourguideAssignment;
