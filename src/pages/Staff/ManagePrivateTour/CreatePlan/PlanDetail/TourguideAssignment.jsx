import { Select, DatePicker, Typography, Form } from "antd";
import "../../../../../settings/setupDayjs";

function TourguideAssignment({ provinceList }) {
  return (
    <div className="my-16">
      <h3 className="text-mainColor font-bold text-xl border-b-2">
        THÔNG TIN HƯỚNG DẪN VIÊN
      </h3>
      <div className="flex flex-wrap justify-center">
        <Form.Item className="" label="Tỉnh" required>
          <Select placeholder="Chọn tỉnh">
            {provinceList.map((province) => (
              <Select.Option key={province.id} value={province.id}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Hướng dẫn viên"></Form.Item>
        <Select placeholder="Select a tour guide"></Select>
      </div>
    </div>
  );
}

export default TourguideAssignment;
