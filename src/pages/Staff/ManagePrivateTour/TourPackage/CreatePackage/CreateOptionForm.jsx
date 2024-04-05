import React, { useState } from "react";
import { Form, Input, Button, Space, Card, Row, Col } from "antd";
import HotelList from "../ListService/HotelList";
import RestaurantList from "../ListService/RestaurantList";

function CreateOptionForm() {
  const [form] = Form.useForm();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [itemCount, setItemCount] = useState(1);

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleSelectRestaurant = (record) => {
    setSelectedRestaurant(record);
  };

  const handleAddItem = () => {
    const currentCount = itemCount + 1;
    setItemCount(currentCount);
  };



  return (
    <div className="mt-24 container">
      <div className="text-2xl text-center font-semibold uppercase mt-6 mb-12">
        TẠO OPTION TOUR
      </div>
      <div className="w-full mx-auto">
        <Form
          form={form}
          name="dynamic_form_complex"
          layout="vertical"
          initialValues={{
            items: [{}],
          }}
        >
          <Form.List name="items">
            {(fields, { add }) => (
              <>
                <Row gutter={[16, 16]}>
                  {fields.map((field, index) => (
                    <Col key={field.key} xs={24} sm={12} md={8}>
                      <Card title={`Option ${index + 1}`}>
                        <Form.Item label="Tên gói" name={[field.name, "name"]}>
                          <Input />
                        </Form.Item>

                        <Form.Item label="Khách sạn">
                          <HotelList
                            onSelectRecord={(hotel) =>
                              handleSelectHotel(hotel, index)
                            }
                          />

                          {selectedHotel && (
                            <>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={selectedHotel.name}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={`Loại dịch vụ: ${selectedHotel.age}`}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={`Địa chỉ: ${selectedHotel.address}`}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={`Giá mặc định: ${selectedHotel.price}`}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <Form.Item label="Giá báo">
                                <Input type="number" />
                              </Form.Item>
                              
                            </>
                          )}
                        </Form.Item>

                        <Form.Item label="Nhà hàng">
                          <RestaurantList
                            onSelectRecord={handleSelectRestaurant}
                          />

                          {selectedRestaurant && (
                            <>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={selectedRestaurant.name}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={`Loại dịch vụ: ${selectedRestaurant.age}`}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={`Địa chỉ: ${selectedRestaurant.address}`}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <Form.Item label="Giá khẩu phần/người">
                                <Input type="number" />
                              </Form.Item>
                            </>
                          )}
                        </Form.Item>

                        <Form.Item
                          label="Phí tour"
                          name={[field.name, "price"]}
                        >
                          <Input />
                        </Form.Item>
                        
            
          
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row justify="center" style={{ marginTop: "16px" }}>
                  {itemCount < 3 && (
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                        handleAddItem();
                      }}
                    >
                      + Thêm option
                    </Button>
                  )}
                </Row>
              </>
            )}
          </Form.List>

          <Row justify="center" style={{ marginTop: "16px" }}>
            <Button className="" type="primary" htmlType="submit">
              Tạo option tour
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default CreateOptionForm;
