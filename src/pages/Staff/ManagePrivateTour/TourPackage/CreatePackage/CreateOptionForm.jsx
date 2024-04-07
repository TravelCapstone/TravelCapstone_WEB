import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Card, Row, Col, Modal } from "antd";
import useFetch from "../../../../../hook/useFetch";
import { alertFail } from "../../../../../hook/useNotification";
import { callApi } from "../../../../../hook/useCallApi";
import api from "../../../../../config/axios";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponent from "../ListService/TableComponent";

const { TextArea } = Input;
const { Option } = Select;

function CreateOptionForm() {
  const [hotellist1, setHotellist1] = useState([]);
  const [hotellist2, setHotellist2] = useState([]);
  const [hotellist3, setHotellist3] = useState([]);

  const [restaurant1, setRestaurent1] = useState([]);
  const [restaurant2, setRestaurent2] = useState([]);
  const [restaurant3, setRestaurent3] = useState([]);

  const [entertaiment1, setEntertaiment1] = useState([]);
  const [entertaiment2, setEntertaiment2] = useState([]);
  const [entertaiment3, setEntertaiment3] = useState([]);

  const [vehicle1, setVehicle1] = useState([]);
  const [vehicle2, setVehicle2] = useState([]);
  const [vehicle3, setVehicle3] = useState([]);

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [open9, setOpen9] = useState(false);
  const [open10, setOpen10] = useState(false);

  const [form] = Form.useForm();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedEntertaiment, setSelectedEntertaiment] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [priceService, setPriceService] = useState(0);
  const [itemCount, setItemCount] = useState(1);
  const [type, setType] = useState("");
  const [options, setOptions] = useState([
    {
      name: "",
      optionClass: "",
      hotel: null,
      restaurant: null,
      vehicle: null,
      entertainment: null,
      airticket: null,
    },
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

  const handleSelectEntertainment = (entertainment, index) => {
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
  const [data, setData] = useState();
  const fetch = async () => {
    const response = await callApi(
      "GET",
      "/get-all-province-by-private-tour-request-id/C8DE0D2A-D6EC-468A-993F-27A6F19F009D"
    );
    console.log(response.data.result[0].id);
    setData(response.data);
  };

  console.log(type);

  useEffect(() => {
    fetch();
  }, []);

  const addHotelToList1 = (hotelsToAdd) => {
    // Tạo một bản sao của danh sách khách sạn hiện tại
    const currentHotels = [...hotellist1];

    // Lặp qua từng khách sạn cần thêm vào danh sách
    hotelsToAdd.forEach((newHotel) => {
      // Kiểm tra xem khách sạn đã tồn tại trong danh sách hay chưa
      const isExisting = currentHotels.some(
        (existingHotel) => existingHotel.id === newHotel.id
      );

      // Nếu khách sạn chưa tồn tại, thêm vào danh sách
      if (!isExisting) {
        currentHotels.push(newHotel);
        console.log(`Khách sạn ${newHotel.id} đã được thêm vào danh sách.`);
      } else {
        console.log(`Khách sạn ${newHotel.id} đã tồn tại trong danh sách.`);
      }
    });

    // Cập nhật lại danh sách khách sạn sau khi đã thêm vào
    setHotellist1(currentHotels);
  };
  const addHotelToList2 = (hotelsToAdd) => {
    // Tạo một bản sao của danh sách khách sạn hiện tại
    const currentHotels = [...hotellist2];

    // Lặp qua từng khách sạn cần thêm vào danh sách
    hotelsToAdd.forEach((newHotel) => {
      // Kiểm tra xem khách sạn đã tồn tại trong danh sách hay chưa
      const isExisting = currentHotels.some(
        (existingHotel) => existingHotel.id === newHotel.id
      );

      // Nếu khách sạn chưa tồn tại, thêm vào danh sách
      if (!isExisting) {
        currentHotels.push(newHotel);
        console.log(`Khách sạn ${newHotel.id} đã được thêm vào danh sách.`);
      } else {
        console.log(`Khách sạn ${newHotel.id} đã tồn tại trong danh sách.`);
      }
    });

    // Cập nhật lại danh sách khách sạn sau khi đã thêm vào
    setHotellist2(currentHotels);
  };
  const addRestaurentToList1 = (restaurentToAdd) => {
    // Tạo một bản sao của danh sách khách sạn hiện tại
    const currentRestaurents = [...restaurant1];

    // Lặp qua từng khách sạn cần thêm vào danh sách
    restaurentToAdd.forEach((newRestaurent) => {
      // Kiểm tra xem khách sạn đã tồn tại trong danh sách hay chưa
      const isExisting = currentRestaurents.some(
        (existingHotel) => existingHotel.id === newRestaurent.id
      );

      // Nếu khách sạn chưa tồn tại, thêm vào danh sách
      if (!isExisting) {
        currentRestaurents.push(newRestaurent);
        console.log(
          `Khách sạn ${newRestaurent.id} đã được thêm vào danh sách.`
        );
      } else {
        console.log(
          `Khách sạn ${newRestaurent.id} đã tồn tại trong danh sách.`
        );
      }
    });

    // Cập nhật lại danh sách khách sạn sau khi đã thêm vào
    setRestaurent1(currentRestaurents);
  };
  const addRestaurentToList2 = (restaurentToAdd) => {
    // Tạo một bản sao của danh sách khách sạn hiện tại
    const currentRestaurents = [...restaurant2];

    // Lặp qua từng khách sạn cần thêm vào danh sách
    restaurentToAdd.forEach((newRestaurent) => {
      // Kiểm tra xem khách sạn đã tồn tại trong danh sách hay chưa
      const isExisting = currentRestaurents.some(
        (existingHotel) => existingHotel.id === newRestaurent.id
      );

      // Nếu khách sạn chưa tồn tại, thêm vào danh sách
      if (!isExisting) {
        currentRestaurents.push(newRestaurent);
        console.log(
          `Khách sạn ${newRestaurent.id} đã được thêm vào danh sách.`
        );
      } else {
        console.log(
          `Khách sạn ${newRestaurent.id} đã tồn tại trong danh sách.`
        );
      }
    });

    // Cập nhật lại danh sách khách sạn sau khi đã thêm vào
    setRestaurent2(currentRestaurents);
  };

  const addEntertainmentToList1 = (entertainmentToAdd) => {
    // Tạo một bản sao của danh sách khách sạn hiện tại
    const currentEntertainments = [...entertaiment1];

    // Lặp qua từng khách sạn cần thêm vào danh sách
    entertainmentToAdd.forEach((newRestaurent) => {
      // Kiểm tra xem khách sạn đã tồn tại trong danh sách hay chưa
      const isExisting = currentEntertainments.some(
        (existingHotel) => existingHotel.id === newRestaurent.id
      );

      // Nếu khách sạn chưa tồn tại, thêm vào danh sách
      if (!isExisting) {
        currentEntertainments.push(newRestaurent);
        console.log(
          `Khách sạn ${newRestaurent.id} đã được thêm vào danh sách.`
        );
      } else {
        console.log(
          `Khách sạn ${newRestaurent.id} đã tồn tại trong danh sách.`
        );
      }
    });

    // Cập nhật lại danh sách khách sạn sau khi đã thêm vào
    setEntertaiment1(currentEntertainments);
  };
  const addEntertainmentToList2 = (entertainmentToAdd) => {
    // Tạo một bản sao của danh sách khách sạn hiện tại
    const currentEntertainments = [...entertaiment2];

    // Lặp qua từng khách sạn cần thêm vào danh sách
    entertainmentToAdd.forEach((newRestaurent) => {
      // Kiểm tra xem khách sạn đã tồn tại trong danh sách hay chưa
      const isExisting = currentEntertainments.some(
        (existingHotel) => existingHotel.id === newRestaurent.id
      );

      // Nếu khách sạn chưa tồn tại, thêm vào danh sách
      if (!isExisting) {
        currentEntertainments.push(newRestaurent);
        console.log(
          `Khách sạn ${newRestaurent.id} đã được thêm vào danh sách.`
        );
      } else {
        console.log(
          `Khách sạn ${newRestaurent.id} đã tồn tại trong danh sách.`
        );
      }
    });

    // Cập nhật lại danh sách khách sạn sau khi đã thêm vào
    setEntertaiment2(currentEntertainments);
  };

  const addVehicleToList1 = (vehiclesToAdd) => {
    // Tạo một bản sao của danh sách khách sạn hiện tại
    const currenVehicles = [...vehicle1];

    // Lặp qua từng khách sạn cần thêm vào danh sách
    vehiclesToAdd.forEach((newVehicle) => {
      // Kiểm tra xem khách sạn đã tồn tại trong danh sách hay chưa
      const isExisting = currenVehicles.some(
        (existingHotel) => existingHotel.id === newVehicle.id
      );

      // Nếu khách sạn chưa tồn tại, thêm vào danh sách
      if (!isExisting) {
        currenVehicles.push(newVehicle);
        console.log(`Khách sạn ${newVehicle.id} đã được thêm vào danh sách.`);
      } else {
        console.log(`Khách sạn ${newVehicle.id} đã tồn tại trong danh sách.`);
      }
    });

    // Cập nhật lại danh sách khách sạn sau khi đã thêm vào
    setVehicle1(currenVehicles);
  };
  const addVehicleToList2 = (vehiclesToAdd) => {
    // Tạo một bản sao của danh sách khách sạn hiện tại
    const currenVehicles = [...vehicle2];

    // Lặp qua từng khách sạn cần thêm vào danh sách
    vehiclesToAdd.forEach((newVehicle) => {
      // Kiểm tra xem khách sạn đã tồn tại trong danh sách hay chưa
      const isExisting = currenVehicles.some(
        (existingHotel) => existingHotel.id === newVehicle.id
      );

      // Nếu khách sạn chưa tồn tại, thêm vào danh sách
      if (!isExisting) {
        currenVehicles.push(newVehicle);
        console.log(`Khách sạn ${newVehicle.id} đã được thêm vào danh sách.`);
      } else {
        console.log(`Khách sạn ${newVehicle.id} đã tồn tại trong danh sách.`);
      }
    });

    // Cập nhật lại danh sách khách sạn sau khi đã thêm vào
    setVehicle2(currenVehicles);
  };
  return (
    <div className="mt-24 container">
      <div className="text-2xl text-center font-semibold uppercase mt-6 mb-12">
        TẠO OPTION TOUR
      </div>
      <div className="w-full mx-auto">
        <Form size="large">
          <>
            <Row>
              <Card className="flex-1">
                <Form.Item label="Tên gói">
                  <Input />
                </Form.Item>

                <Form.Item className="mt-5" label="Phân loại gói">
                  <Select placeholder="Chọn gói">
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
                      setOpen1(!open1);
                    }}
                    onCancel={() => setOpen1(false)}
                    width={1000}
                  >
                    <TableComponent
                      type="0"
                      addHotelToList1={addHotelToList1}
                      option={"1"}
                    />
                  </Modal>
                </Form.Item>
                <Form.Item className="m-10">
                  {hotellist1.length > 0 &&
                    hotellist1.map((item, index) => (
                      <>
                        <p key={index}> {item?.name}</p>

                        <Form.Item label="Số lượng" className="flex">
                          <Input className="w-24" />
                        </Form.Item>
                      </>
                    ))}
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
                      setOpen2(!open2);
                    }}
                    onCancel={() => setOpen2(false)}
                    width={1000}
                  >
                    <TableComponent
                      type="1"
                      addRestaurentToList1={addRestaurentToList1}
                      option={"1"}
                    />
                  </Modal>

                  <Form.Item>
                    {console.log("aaaaaa", restaurant1)}
                    {restaurant1.length > 0 &&
                      restaurant1.map((item, index) => (
                        <>
                          <p key={index}> {item?.name}</p>
                          <Form.Item label="Số lượng" className="flex">
                            <Input className="w-24" />
                          </Form.Item>
                        </>
                      ))}
                  </Form.Item>
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
                      setOpen3(false);
                    }}
                    onCancel={() => setOpen3(false)}
                    width={1000}
                  >
                    <TableComponent
                      type="3"
                      addVehicleToList1={addVehicleToList1}
                      option={"1"}
                    />
                  </Modal>
                </Form.Item>
                <Form.Item>
                  {console.log("aaaaaa", restaurant1)}
                  {vehicle1.length > 0 &&
                    vehicle1.map((item, index) => (
                      <>
                        <p key={index}> {item?.name}</p>
                        <Form.Item label="Số lượng" className="flex">
                          <Input className="w-24" />
                        </Form.Item>
                      </>
                    ))}
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
                      setOpen4(false);
                    }}
                    onCancel={() => setOpen4(false)}
                    width={1000}
                  >
                    <TableComponent
                      type="2"
                      addEntertainmentToList1={addEntertainmentToList1}
                      option={"1"}
                    />
                  </Modal>
                </Form.Item>
                {entertaiment1.length > 0 &&
                  entertaiment1.map((item, index) => (
                    <>
                      <p key={index}> {item?.name}</p>
                      <Form.Item label="Số lượng" className="flex">
                        <Input className="w-24" />
                      </Form.Item>
                    </>
                  ))}
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
                </Form.Item>
              </Card>

              {/* ))} */}
            </Row>

            <Row>
              <Card className="flex-1">
                <Form.Item label="Tên gói">
                  <Input />
                </Form.Item>

                <Form.Item className="mt-5" label="Phân loại gói">
                  <Select placeholder="Chọn gói">
                    <Option value={0}>Tiết kiệm</Option>
                    <Option value={1}>Cơ bản</Option>
                    <Option value={2}>Nâng cao</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Khách sạn">
                  <Button type="primary" onClick={() => setOpen6(true)}>
                    Chọn khách sạn
                  </Button>
                  <Modal
                    title="DANH SÁCH KHÁCH SẠN"
                    centered
                    open={open6}
                    onOk={() => {
                      setOpen6(!open6);
                    }}
                    onCancel={() => setOpen6(false)}
                    width={1000}
                  >
                    <TableComponent
                      type="0"
                      addHotelToList2={addHotelToList2}
                      option={"2"}
                    />
                  </Modal>
                </Form.Item>
                <Form.Item className="m-10">
                  {hotellist2.length > 0 &&
                    hotellist2.map((item, index) => (
                      <>
                        <p key={index}> {item?.name}</p>

                        <Form.Item label="Số lượng" className="flex">
                          <Input className="w-24" />
                        </Form.Item>
                      </>
                    ))}
                </Form.Item>

                <Form.Item label="Nhà hàng">
                  <Button type="primary" onClick={() => setOpen7(true)}>
                    Chọn nhà hàng
                  </Button>
                  <Modal
                    title="DANH SÁCH NHÀ HÀNG"
                    centered
                    open={open7}
                    onOk={() => {
                      setOpen2(!open7);
                    }}
                    onCancel={() => setOpen7(false)}
                    width={1000}
                  >
                    <TableComponent
                      type="1"
                      addRestaurentToList1={addRestaurentToList1}
                      option={"1"}
                    />
                  </Modal>

                  <Form.Item>
                    {console.log("aaaaaa", restaurant1)}
                    {restaurant1.length > 0 &&
                      restaurant1.map((item, index) => (
                        <>
                          <p key={index}> {item?.name}</p>
                          <Form.Item label="Số lượng" className="flex">
                            <Input className="w-24" />
                          </Form.Item>
                        </>
                      ))}
                  </Form.Item>
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
                      setOpen3(false);
                    }}
                    onCancel={() => setOpen3(false)}
                    width={1000}
                  >
                    <TableComponent
                      type="3"
                      addVehicleToList1={addVehicleToList1}
                      option={"1"}
                    />
                  </Modal>
                </Form.Item>
                <Form.Item>
                  {console.log("aaaaaa", restaurant1)}
                  {vehicle1.length > 0 &&
                    vehicle1.map((item, index) => (
                      <>
                        <p key={index}> {item?.name}</p>
                        <Form.Item label="Số lượng" className="flex">
                          <Input className="w-24" />
                        </Form.Item>
                      </>
                    ))}
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
                      setOpen4(false);
                    }}
                    onCancel={() => setOpen4(false)}
                    width={1000}
                  >
                    <TableComponent
                      type="2"
                      addEntertainmentToList1={addEntertainmentToList1}
                      option={"1"}
                    />
                  </Modal>
                </Form.Item>
                {entertaiment1.length > 0 &&
                  entertaiment1.map((item, index) => (
                    <>
                      <p key={index}> {item?.name}</p>
                      <Form.Item label="Số lượng" className="flex">
                        <Input className="w-24" />
                      </Form.Item>
                    </>
                  ))}
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
                </Form.Item>
              </Card>

              {/* ))} */}
            </Row>
          </>
        </Form>

        <Row justify="center" style={{ marginTop: "16px" }}>
          <Button className="" type="primary" htmlType="submit">
            Tạo option tour
          </Button>
        </Row>
      </div>
    </div>
  );
}

export default CreateOptionForm;
