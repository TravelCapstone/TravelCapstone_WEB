import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Card, Row, Col , Modal} from "antd";
import useFetch from "../../../../../hook/useFetch";
import { alertFail } from "../../../../../hook/useNotification";
import useCallApi from "../../../../../hook/useCallApi";
import api from "../../../../../config/axios";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "../ListService/TableComponent";

const { TextArea } = Input;
const { Option } = Select;

function CreateOptionForm() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [form] = Form.useForm();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedEntertaiment, setSelectedEntertaiment] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [priceService, setPriceService] = useState(0);
  const [itemCount, setItemCount] = useState(1);
  const [type, setType] = useState("");
  const [options, setOptions] = useState([
    { name: "",optionClass:"", hotel: null, restaurant: null, vehicle: null, entertainment: null, airticket: null },
  ]);

  const handleSelectHotel1 = (hotel) => {
    setSelectedHotel(hotel);
  };
  const handleSelectEntertainment1 = (entertainment) => {
    setSelectedEntertaiment(entertainment);
  };


  const handleSelectHotel = (selectedHotel, index) => {
    changeOption(index, "hotel", selectedHotel);
  };

  const handleSelectRestaurant = (restaurant, index) => {
    changeOption(index, "restaurant", restaurant);
  };

  const handleSelectVehicle = (index, vehicle) => {
    changeOption(index, "vehicle", vehicle);
  };

  const handleSelectEntertainment = (entertainment,index) => {
    changeOption(index, "entertainment", entertainment);
  };

  const changeOption = (index, property, value) => {
    const newOptions = [...options];
    newOptions[index][property] = value;
    setOptions(newOptions);
  };


  const handleSelectName = (index, name) => {
    changeOption(index, "name", name);
  };

  const handleSelectClass = (index, optionClass) => {
    changeOption(index, "optionClass", optionClass);
    console.log(optionClass);
    setType(optionClass);
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
  console.log(options);
  const { loading, error, callApi, resetError } = useCallApi();
  const [data, setData] = useState();
  const fetch = async () => {
    const response = await api.get(
      "/get-all-province-by-private-tour-request-id/C8DE0D2A-D6EC-468A-993F-27A6F19F009D"
    );
    console.log(response.data.result[0].id);
    setData(response.data);
  };

  console.log(type);

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    alertFail(error);
    resetError();
  }
  console.log(selectedHotel)
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
                          label="Phân loại gói"
                          name={[field.name, "optionClass"]}
                        >
                          <Select
                            placeholder="Chọn gói"
                            value={options[index].optionClass}
                            onChange={(value) =>
                              handleSelectClass(index, value)
                            }
                          >
                            <Option value={0}>Tiết kiệm</Option>
                            <Option value={1}>Cơ bản</Option>
                            <Option value={2}>Nâng cao</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item label="Khách sạn">
                        <Button type="primary" onClick={() => setOpen1(true)}>
                            Chọn khách sạn
                          </Button>
                          <Modal
                            title="DANH SÁCH KHÁCH SẠN"
                            centered
                            open={open1}
                            onOk={() => {
                              handleSelectHotel(selectedHotel,index);
                              setOpen1(false);
                            }}
                            onCancel={() => setOpen1(false)}
                            width={1000}
                          >
                            <TableComponent
                            type="0"
                            onSelectRecord={handleSelectHotel1} 
                            />
                          </Modal>

                          {options && options[index].hotel && (
                            <>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={options[index].hotel.id}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <p>{options[index].hotel.name}</p>
                              <p>Địa chỉ: {options[index].hotel.address}</p>

                              <Form.Item label="Số lượng đặt chỗ">
                                <Input type="number" />
                              </Form.Item>
                            </>
                          )}
                        </Form.Item>
                        <Form.Item label="Nhà hàng">                        
                          <Button type="primary" onClick={() => setOpen2(true)}>
                            Chọn nhà hàng
                          </Button>
                          <Modal
                            title="DANH SÁCH NHÀ HÀNG"
                            centered
                            open={open2}
                            onOk={() => {
                              onSelectRecord(selectedRestaurant);
                              setOpen2(false);
                            }}
                            onCancel={() => setOpen2(false)}
                            width={1000}
                          >
                            <TableComponent
                            type="1"
                              onSelectRecord={handleSelectRestaurant}
                            />
                          </Modal>

                          {options && options[index].restaurant && (
                            <>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={options[index].restaurant.id}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <p>{options[index].restaurant.name}</p>
                              <p>
                                Địa chỉ: {options[index].restaurant.address}
                              </p>

                              <Form.Item label="Số lượng đặt chỗ">
                                <Input type="number" />
                              </Form.Item>
                            </>
                          )}
                        </Form.Item>

                        <Form.Item label="Phương tiện chính">
                        <Button type="primary" onClick={() => setOpen3(true)}>
                            Chọn phương tiện
                          </Button>

                          <Modal
                            title="DANH SÁCH PHƯƠNG TIỆN"
                            centered
                            open={open3}
                            onOk={() => {
                              onSelectRecord(selectedVehicle);
                              setOpen3(false);
                            }}
                            onCancel={() => setOpen3(false)}
                            width={1000}
                          >
                            <TableComponent
                            type="3"
                              onSelectRecord={handleSelectVehicle}
                            />
                          </Modal>

                          {options && options[index].restaurant && (
                            <>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={options[index].restaurant.id}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <p>{options[index].restaurant.name}</p>
                              <p>
                                Địa chỉ: {options[index].restaurant.address}
                              </p>

                              <Form.Item label="Số lượng đặt chỗ">
                                <Input type="number" />
                              </Form.Item>
                            </>
                          )}
                        </Form.Item>

                        <Form.Item label="Giải trí">
                        <Button type="primary" onClick={() => setOpen4(true)}>
                            Chọn 
                          </Button>

                          <Modal
                            title="DANH SÁCH "
                            centered
                            open={open4}
                            onOk={() => {
                              handleSelectEntertainment(selectedEntertaiment,index)
                              setOpen4(false);
                            }}
                            onCancel={() => setOpen4(false)}
                            width={1000}
                          >
                            <TableComponent
                            type="2"
                            onSelectRecord={handleSelectEntertainment1}
                     
                            />
                          </Modal>

                          {options && options[index].entertainment && (
                            <>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={options[index].entertainment.id}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <p>{options[index].entertainment.name}</p>
                              <p>
                                Địa chỉ: {options[index].entertainment.address}
                              </p>

                              <Form.Item label="Số lượng đặt chỗ">
                                <Input type="number" />
                              </Form.Item>
                            </>
                          )}
                        </Form.Item>

                        <Form.Item label="Vé máy bay (nếu có)">
                        <Button type="primary" onClick={() => setOpen5(true)}>
                            Chọn 
                          </Button>

                          <Modal
                            title="DANH SÁCH VÉ MÁY BAY"
                            centered
                            open={open5}
                            onOk={() => {
                              onSelectRecord(selectedVehicle);
                              setOpen5(false);
                            }}
                            onCancel={() => setOpen5(false)}
                            width={1000}
                          >
                            <TableComponent
                            type="4"
                              onSelectRecord={handleSelectVehicle}
                            />
                          </Modal>

                          {options && options[index].restaurant && (
                            <>
                              <Form.Item style={{ marginBottom: 8 }}>
                                <Input
                                  readOnly
                                  value={options[index].restaurant.id}
                                  style={{ border: "none" }}
                                />
                              </Form.Item>
                              <p>{options[index].restaurant.name}</p>
                              <p>
                                Địa chỉ: {options[index].restaurant.address}
                              </p>

                              <Form.Item label="Số lượng đặt chỗ">
                                <Input type="number" />
                              </Form.Item>
                            </>
                          )}
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
