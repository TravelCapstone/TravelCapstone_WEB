import { Form, Input, Select, DatePicker, Button } from "antd";

const { Option } = Select;

const LocalVehicleAssignment = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="1"></Form.Item>
      <Form.Item label="Khu vực">
        <span>Hà Giang - TP Hà Giang</span>
      </Form.Item>
      <Form.Item label="Số lượng xe">
        <span>1</span>
      </Form.Item>
      <Form.Item label="Ngày di chuyển">
        <DatePicker.RangePicker />
      </Form.Item>
      <Form.Item label="Nhà cung cấp xe">
        <Select style={{ width: "100%" }}>
          <Option value="">Mon</Option>
          {/* Add more options as needed */}
        </Select>
      </Form.Item>
      <Form.Item label="Chọn tài xế">
        <Select style={{ width: "100%" }}>
          <Option value="">
            Phạm Bùi Minh Khang SĐT: 0336678864 - Tiền công: 1.000.000/ngày
          </Option>
          {/* Add more options as needed */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default LocalVehicleAssignment;
