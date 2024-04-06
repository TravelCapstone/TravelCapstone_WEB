import React, { useState } from "react";
import { Form, Input, Button, Select, Card, Row, Col } from "antd";
import HotelList from "../ListService/HotelList";
import RestaurantList from "../ListService/RestaurantList";
import useFetch from "../../../../../hook/useFetch";

const { TextArea } = Input;
const { Option } = Select;

function CreateOptionForm() {
  const [form] = Form.useForm();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [nameService, setNameService] = useState("");
  const [priceService, setPriceService] = useState(0);
  const [itemCount, setItemCount] = useState(1);
  const [options, setOptions] = useState([
    { name: "", hotel: null, restaurant: null, price: "" },
  ]);
  const handleSelectHotel = (hotel, index) => {
    changeOption(index, "hotel", hotel);
  };

  const changeOption = (index, property, value) => {
    const newOptions = [...options];
    newOptions[index][property] = value;
    setOptions(newOptions);
  };
  const handleSelectPrice = (index, price) => {
    changeOption(index, "price", price);
  };

  const handleSelectName = (index, name) => {
    changeOption(index, "name", name);
  };

  const handleSelectRestaurant = (restaurant, index) => {
    changeOption(index, "restaurant", restaurant);
  };

  const handleAddItem = () => {
    const currentCount = itemCount + 1;
    setOptions([
      ...options,
      { name: "", hotel: null, restaurant: null, price: "" },
    ]);
    setItemCount(currentCount);
  };

  // console.log(selectedHotel)
  // console.log(selectedRestaurant)
  console.table(options);

  const { data, isError } = useFetch(
    "/get-all-province-by-private-tour-request-id/C8DE0D2A-D6EC-468A-993F-27A6F19F009D",
    "GET"
  );
  if (isError) {
    return <div>Error fetching data</div>;
  }
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
            option1: [[]],
          }}
        >
          <Form.List name="option1">
            {(field, { add }) => (
              <>
                <Row gutter={[16, 16]}>
                  {field.map((field, index) => (
                    <Col key={field.key} xs={24} sm={12} md={8}>
                      <Card title={`Option ${index + 1}`}>
                        <Form.Item label="Tên gói" name={[field.name, "name"]}>
                          <Input
                            value={options[index].name}
                            onInput={(e) =>
                              handleSelectName(index, e.target.value)
                            }
                          />
                        </Form.Item>

                        <Form.Item
                          label="Loại dịch vụ"
                          name={[field.name, "name"]}
                        >
                          <Select
                            placeholder="Phân loại dịch vụ"
                            value={options[index].name}
                            onChange={(value) => handleSelectName(index, value)}
                          >
                            <Option value={0}>Tiết kiệm</Option>
                            <Option value={1}>Cơ bản</Option>
                            <Option value={2}>Nâng cao</Option>
                          </Select>
                        </Form.Item>

                        <div>
                          {data &&
                            data.result &&
                            data.result.map((item) => (
                              <div key={item.id}>
                                Địa điểm: {item.name}
                              
                              </div>
                            ))}
                        </div>

                        <Form.Item label="Khách sạn">
                                  <HotelList
                                    onSelectRecord={(hotel) =>
                                      handleSelectHotel(hotel, index)
                                    }
                                  />

                                  {options && options[index].hotel && (
                                    <>
                                      <Form.Item style={{ marginBottom: 8 }}>
                                        <Input
                                          readOnly
                                          value={options[index].hotel.name}
                                          style={{ border: "none" }}
                                        />
                                      </Form.Item>
                                      <Form.Item style={{ marginBottom: 8 }}>
                                        <Input
                                          readOnly
                                          value={`Loại dịch vụ: ${options[index].hotel.age}`}
                                          style={{ border: "none" }}
                                        />
                                      </Form.Item>
                                      <Form.Item style={{ marginBottom: 8 }}>
                                        <Input
                                          readOnly
                                          value={`Địa chỉ: ${options[index].hotel.address}`}
                                          style={{ border: "none" }}
                                        />
                                      </Form.Item>
                                      <Form.Item style={{ marginBottom: 8 }}>
                                        <Input
                                          readOnly
                                          value={`Giá mặc định: ${options[index].hotel.price}`}
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
                            onSelectRecord={(restaurant) =>
                              handleSelectRestaurant(restaurant, index)
                            }
                          />

                          {options && options[index].restaurant && (
                            <>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={options[index].restaurant.name}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={`Loại dịch vụ: ${options[index].restaurant.age}`}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={`Địa chỉ: ${options[index].restaurant.address}`}
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
                          <Input
                            value={options[index].price}
                            onInput={(e) =>
                              handleSelectPrice(index, e.target.value)
                            }
                          />
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
