import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Card, Row, Col, Modal } from "antd";
import useFetch from "../../../../../hook/useFetch";
import { alertFail } from "../../../../../hook/useNotification";
import { callApi } from "../../../../../hook/useCallApi";
import api from "../../../../../config/axios";
import {
  MinusCircleOutlined,
  PlusOutlined,
  WarningFilled,
} from "@ant-design/icons";
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

  const [open11, setOpen11] = useState(false);
  const [open12, setOpen12] = useState(false);
  const [open13, setOpen13] = useState(false);
  const [open14, setOpen14] = useState(false);
  const [open15, setOpen15] = useState(false);

  const [form] = Form.useForm();

  const addHotelToList1 = (hotelsToAdd) => {
    setHotellist1(hotelsToAdd);
  };

  const addHotelToList2 = (hotelsToAdd) => {
    setHotellist2(hotelsToAdd);
  };

  const addHotelToList3 = (hotelsToAdd) => {
    setHotellist3(hotelsToAdd);
  };

  const addRestaurentToList1 = (restaurentToAdd) => {
    setRestaurent1(restaurentToAdd);
  };
  const addRestaurentToList2 = (restaurentToAdd) => {
    setRestaurent2(restaurentToAdd);
  };

  const addRestaurentToList3 = (restaurentToAdd) => {
    setRestaurent3(restaurentToAdd);
  };

  const addEntertainmentToList1 = (entertainmentToAdd) => {
    setEntertaiment1(entertainmentToAdd);
  };

  const addEntertainmentToList2 = (entertainmentToAdd) => {
    setEntertaiment2(entertainmentToAdd);
  };

  const addEntertainmentToList3 = (entertainmentToAdd) => {
    setEntertaiment3(entertainmentToAdd);
  };

  const addVehicleToList1 = (vehiclesToAdd) => {
    setVehicle1(vehiclesToAdd);
  };

  const addVehicleToList2 = (vehiclesToAdd) => {
    setVehicle2(vehiclesToAdd);
  };

  const addVehicleToList3 = (vehiclesToAdd) => {
    setVehicle3(vehiclesToAdd);
  };

  const onFinish = (e) => {
    setFormData(e);
  };


  return (
    <div className="mt-12 container">
      <div className="text-2xl text-center font-semibold uppercase my-6">
        TẠO GÓI TOUR
      </div>
      <div className="w-full mx-auto">
        <Form size="large" onFinish={onFinish}>
          <>
            <Row>
              <Col span={8} className="p-3">
                <Card className="flex-1">
                  <Form.Item
                    name="name1"
                    label="Tên gói"
                    rules={[
                      {
                        required: true,
                        message: (
                          <div>
                            <WarningFilled /> Vui lòng nhập tên gói!
                          </div>
                        ),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name="optionClass1" className="mt-5" label="Phân loại gói" rules={[
                    {
                      required: true,
                      message: (
                        <span>
                          <WarningFilled /> Vui lòng chọn phân loại gói!
                        </span>
                      ),
                    },
                  ]}>
                    <Select placeholder="Chọn gói">
                      <Option value={0}>Tiết kiệm</Option>
                      <Option value={1}>Cơ bản</Option>
                      <Option value={2}>Nâng cao</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Khách sạn">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black "
                      onClick={() => setOpen1(true)}
                    >
                      Chọn khách sạn
                    </button>
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
                  <Form.Item>
                    {hotellist1.length > 0 &&
                      hotellist1.map((item, index) => (
                        <div className="border-b-2 my-2 p-1">
                          <p key={index}>
                            {" "}
                            {item?.name}
                            <br></br> Địa chỉ: {item.address}
                          </p>
                          <p> Giá gốc: 1.000.000đ</p>
                          <p className="text-red-500 font-semibold		">
                            Giá bán ra: 1.500.000đ
                          </p>

                          <Input
                            label="Số lượng"
                            className="w-32 "
                            type="number"
                            placeholder="Số lượng"
                            min={0}
                          />
                          <p className="text-red-500 font-semibold		">
                            Tổng lời:500.000đ
                          </p>
                        </div>
                      ))}
                  </Form.Item>

                  <Form.Item label="Nhà hàng">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen2(true)}
                    >
                      Chọn nhà hàng
                    </button>
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
                        addRestaurentToList1={addRestaurentToList1}
                        option="1"
                        type="1"
                      />
                    </Modal>
                  </Form.Item>
                  <Form.Item>
                    {restaurant1.length > 0 &&
                      restaurant1.map((item, index) => (
                        <div className="border-b-2 my-2 p-1">
                          <p key={index}>
                            {" "}
                            {item?.name}
                            <br></br> Địa chỉ: {item.address}
                          </p>
                          <p> Giá gốc: 1.000.000đ</p>
                          <p className="text-red-500 font-semibold		">
                            Giá bán ra: 1.500.000đ
                          </p>

                          <Input
                            label="Số lượng"
                            className="w-32 "
                            type="number"
                            placeholder="Số lượng"
                            min={0}
                          />
                          <p className="text-red-500 font-semibold		">
                            Tổng lời:500.000đ
                          </p>
                        </div>
                      ))}
                  </Form.Item>
                  <Form.Item label="Phương tiện chính">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen3(true)}
                    >
                      Chọn phương tiện
                    </button>

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
                    {vehicle1.length > 0 &&
                      vehicle1.map((item, index) => (
                        <div className="border-b-2 my-2 p-1">
                          <p key={index}>
                            {" "}
                            {item?.name}
                            <br></br> Địa chỉ: {item.address}
                          </p>
                          <p> Giá gốc: 1.000.000đ</p>
                          <p className="text-red-500 font-semibold		">
                            Giá bán ra: 1.500.000đ
                          </p>

                          <Input
                            label="Số lượng"
                            className="w-32 "
                            type="number"
                            placeholder="Số lượng"
                            min={0}
                          />
                          <p className="text-red-500 font-semibold		">
                            Tổng lời:500.000đ
                          </p>
                        </div>
                      ))}
                  </Form.Item>
                  <Form.Item label="Giải trí">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen4(true)}
                    >
                      Chọn
                    </button>

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
                      <div className="border-b-2 my-2 p-1">
                        <p key={index}>
                          {" "}
                          {item?.name}
                          <br></br> Địa chỉ: {item.address}
                        </p>
                        <p> Giá gốc: 1.000.000đ</p>
                        <p className="text-red-500 font-semibold		">
                          Giá bán ra: 1.500.000đ
                        </p>

                        <Input
                          label="Số lượng"
                          className="w-32 "
                          type="number"
                          placeholder="Số lượng"
                          min={0}
                        />
                        <p className="text-red-500 font-semibold		">
                          Tổng lời:500.000đ
                        </p>
                      </div>
                    ))}
                  <Form.Item label="Vé máy bay (nếu có)">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen5(true)}
                    >
                      Chọn
                    </button>

                    <Modal
                      title="DANH SÁCH VÉ MÁY BAY"
                      centered
                      open={open5}
                      onOk={() => {
                        setOpen5(false);
                      }}
                      onCancel={() => setOpen5(false)}
                      width={1000}
                    >
                      <TableComponent type="4" />
                    </Modal>
                  </Form.Item>
                </Card>
              </Col>

              <Col span={8} className="p-3">
                <Card className="flex-1">
                <Form.Item
                    name="name2"
                    label="Tên gói"
                    rules={[
                      {
                        required: true,
                        message: (
                          <div>
                            <WarningFilled /> Vui lòng nhập tên gói!
                          </div>
                        ),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name="optionClass2" className="mt-5" label="Phân loại gói" rules={[
                    {
                      required: true,
                      message: (
                        <span>
                          <WarningFilled /> Vui lòng chọn phân loại gói!
                        </span>
                      ),
                    },
                  ]}>
                    <Select placeholder="Chọn gói">
                      <Option value={0}>Tiết kiệm</Option>
                      <Option value={1}>Cơ bản</Option>
                      <Option value={2}>Nâng cao</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Khách sạn">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen6(true)}
                    >
                      Chọn khách sạn
                    </button>
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
                  <Form.Item>
                    {hotellist2.length > 0 &&
                      hotellist2.map((item, index) => (
                        <div className="border-b-2 my-2 p-1">
                          <p key={index}>
                            {" "}
                            {item?.name}
                            <br></br> Địa chỉ: {item.address}
                          </p>
                          <p> Giá gốc: 1.000.000đ</p>
                          <p className="text-red-500 font-semibold		">
                            Giá bán ra: 1.500.000đ
                          </p>

                          <Input
                            label="Số lượng"
                            className="w-32 "
                            type="number"
                            placeholder="Số lượng"
                            min={0}
                          />
                          <p className="text-red-500 font-semibold		">
                            Tổng lời:500.000đ
                          </p>
                        </div>
                      ))}
                  </Form.Item>

                  <Form.Item label="Nhà hàng">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen7(true)}
                    >
                      Chọn nhà hàng
                    </button>
                    <Modal
                      title="DANH SÁCH NHÀ HÀNG"
                      centered
                      open={open7}
                      onOk={() => {
                        setOpen7(!open7);
                      }}
                      onCancel={() => setOpen7(false)}
                      width={1000}
                    >
                      <TableComponent
                        addRestaurentToList2={addRestaurentToList2}
                        option="2"
                        type="1"
                      />
                    </Modal>
                  </Form.Item>
                  <Form.Item>
                    {restaurant2.length > 0 &&
                      restaurant2.map((item, index) => (
                        <div className="border-b-2 my-2 p-1">
                          <p key={index}>
                            {" "}
                            {item?.name}
                            <br></br> Địa chỉ: {item.address}
                          </p>
                          <p> Giá gốc: 1.000.000đ</p>
                          <p className="text-red-500 font-semibold		">
                            Giá bán ra: 1.500.000đ
                          </p>

                          <Input
                            label="Số lượng"
                            className="w-32 "
                            type="number"
                            placeholder="Số lượng"
                            min={0}
                          />
                          <p className="text-red-500 font-semibold		">
                            Tổng lời:500.000đ
                          </p>
                        </div>
                      ))}
                  </Form.Item>
                  <Form.Item label="Phương tiện chính">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen8(true)}
                    >
                      Chọn phương tiện
                    </button>

                    <Modal
                      title="DANH SÁCH PHƯƠNG TIỆN"
                      centered
                      open={open8}
                      onOk={() => {
                        setOpen8(false);
                      }}
                      onCancel={() => setOpen8(false)}
                      width={1000}
                    >
                      <TableComponent
                        type="3"
                        addVehicleToList2={addVehicleToList2}
                        option={"2"}
                      />
                    </Modal>
                  </Form.Item>
                  <Form.Item>
                    {vehicle2.length > 0 &&
                      vehicle2.map((item, index) => (
                        <div className="border-b-2 my-2 p-1">
                          <p key={index}>
                            {" "}
                            {item?.name}
                            <br></br> Địa chỉ: {item.address}
                          </p>
                          <p> Giá gốc: 1.000.000đ</p>
                          <p className="text-red-500 font-semibold		">
                            Giá bán ra: 1.500.000đ
                          </p>

                          <Input
                            label="Số lượng"
                            className="w-32 "
                            type="number"
                            placeholder="Số lượng"
                            min={0}
                          />
                          <p className="text-red-500 font-semibold		">
                            Tổng lời:500.000đ
                          </p>
                        </div>
                      ))}
                  </Form.Item>
                  <Form.Item label="Giải trí">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen9(true)}
                    >
                      Chọn
                    </button>

                    <Modal
                      title="DANH SÁCH "
                      centered
                      open={open9}
                      onOk={() => {
                        setOpen9(false);
                      }}
                      onCancel={() => setOpen9(false)}
                      width={1000}
                    >
                      <TableComponent
                        type="2"
                        addEntertainmentToList2={addEntertainmentToList2}
                        option={"2"}
                      />
                    </Modal>
                  </Form.Item>
                  {entertaiment2.length > 0 &&
                    entertaiment2.map((item, index) => (
                      <div className="border-b-2 my-2 p-1">
                        <p key={index}>
                          {" "}
                          {item?.name}
                          <br></br> Địa chỉ: {item.address}
                        </p>
                        <p> Giá gốc: 1.000.000đ</p>
                        <p className="text-red-500 font-semibold		">
                          Giá bán ra: 1.500.000đ
                        </p>

                        <Input
                          label="Số lượng"
                          className="w-32 "
                          type="number"
                          placeholder="Số lượng"
                          min={0}
                        />
                        <p className="text-red-500 font-semibold		">
                          Tổng lời:500.000đ
                        </p>
                      </div>
                    ))}
                  <Form.Item label="Vé máy bay (nếu có)">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen10(true)}
                    >
                      Chọn
                    </button>

                    <Modal
                      title="DANH SÁCH VÉ MÁY BAY"
                      centered
                      open={open10}
                      onOk={() => {
                        setOpen10(false);
                      }}
                      onCancel={() => setOpen10(false)}
                      width={1000}
                    >
                      <TableComponent type="4" />
                    </Modal>
                  </Form.Item>
                </Card>
              </Col>

              <Col span={8} className="p-3">
                <Card className="flex-1">
                <Form.Item
                    name="name3"
                    label="Tên gói"
                    rules={[
                      {
                        required: true,
                        message: (
                          <div>
                            <WarningFilled /> Vui lòng nhập tên gói!
                          </div>
                        ),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name="optionClass3" className="mt-5" label="Phân loại gói" rules={[
                    {
                      required: true,
                      message: (
                        <span>
                          <WarningFilled /> Vui lòng chọn phân loại gói!
                        </span>
                      ),
                    },
                  ]}>
                    <Select placeholder="Chọn gói">
                      <Option value={0}>Tiết kiệm</Option>
                      <Option value={1}>Cơ bản</Option>
                      <Option value={2}>Nâng cao</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Khách sạn">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen11(true)}
                    >
                      Chọn khách sạn
                    </button>
                    <Modal
                      title="DANH SÁCH KHÁCH SẠN"
                      centered
                      open={open11}
                      onOk={() => {
                        setOpen11(!open11);
                      }}
                      onCancel={() => setOpen11(false)}
                      width={1000}
                    >
                      <TableComponent
                        type="0"
                        addHotelToList3={addHotelToList3}
                        option={"3"}
                      />
                    </Modal>
                  </Form.Item>
                  <Form.Item>
                    {hotellist3.length > 0 &&
                      hotellist3.map((item, index) => (
                        <div className="border-b-2 my-2 p-1">
                          <p key={index}>
                            {" "}
                            {item?.name}
                            <br></br> Địa chỉ: {item.address}
                          </p>
                          <p> Giá gốc: 1.000.000đ</p>
                          <p className="text-red-500 font-semibold		">
                            Giá bán ra: 1.500.000đ
                          </p>

                          <Input
                            label="Số lượng"
                            className="w-32 "
                            type="number"
                            placeholder="Số lượng"
                            min={0}
                          />
                          <p className="text-red-500 font-semibold		">
                            Tổng lời:500.000đ
                          </p>
                        </div>
                      ))}
                  </Form.Item>

                  <Form.Item label="Nhà hàng">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen12(true)}
                    >
                      Chọn nhà hàng
                    </button>
                    <Modal
                      title="DANH SÁCH NHÀ HÀNG"
                      centered
                      open={open12}
                      onOk={() => {
                        setOpen12(!open12);
                      }}
                      onCancel={() => setOpen12(false)}
                      width={1000}
                    >
                      <TableComponent
                        addRestaurentToList3={addRestaurentToList3}
                        option="3"
                        type="1"
                      />
                    </Modal>
                  </Form.Item>
                  <Form.Item>
                    {restaurant3.length > 0 &&
                      restaurant3.map((item, index) => (
                        <div className="border-b-2 my-2 p-1">
                          <p key={index}>
                            {" "}
                            {item?.name}
                            <br></br> Địa chỉ: {item.address}
                          </p>
                          <p> Giá gốc: 1.000.000đ</p>
                          <p className="text-red-500 font-semibold		">
                            Giá bán ra: 1.500.000đ
                          </p>

                          <Input
                            label="Số lượng"
                            className="w-32 "
                            type="number"
                            placeholder="Số lượng"
                            min={0}
                          />
                          <p className="text-red-500 font-semibold		">
                            Tổng lời:500.000đ
                          </p>
                        </div>
                      ))}
                  </Form.Item>
                  <Form.Item label="Phương tiện chính">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen13(true)}
                    >
                      Chọn phương tiện
                    </button>

                    <Modal
                      title="DANH SÁCH PHƯƠNG TIỆN"
                      centered
                      open={open13}
                      onOk={() => {
                        setOpen13(false);
                      }}
                      onCancel={() => setOpen13(false)}
                      width={1000}
                    >
                      <TableComponent
                        type="3"
                        addVehicleToList3={addVehicleToList3}
                        option={"3"}
                      />
                    </Modal>
                  </Form.Item>
                  <Form.Item>
                    {console.log("veha",vehicle3)}
                    {vehicle3.length > 0 &&
                      vehicle3.map((item, index) => (
                        <div className="border-b-2 my-2 p-1">
                          <p key={index}>
                            {" "}
                            {item?.name}
                            <br></br> Địa chỉ: {item.address}
                          </p>
                          <p> Giá gốc: 1.000.000đ</p>
                          <p className="text-red-500 font-semibold		">
                            Giá bán ra: 1.500.000đ
                          </p>

                          <Input
                            label="Số lượng"
                            className="w-32 "
                            type="number"
                            placeholder="Số lượng"
                            min={0}
                          />
                          <p className="text-red-500 font-semibold		">
                            Tổng lời:500.000đ
                          </p>
                        </div>
                      ))}
                  </Form.Item>
                  <Form.Item label="Giải trí">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen14(true)}
                    >
                      Chọn
                    </button>

                    <Modal
                      title="DANH SÁCH "
                      centered
                      open={open14}
                      onOk={() => {
                        setOpen14(false);
                      }}
                      onCancel={() => setOpen14(false)}
                      width={1000}
                    >
                      <TableComponent
                        type="2"
                        addEntertainmentToList3={addEntertainmentToList3}
                        option={"3"}
                      />
                    </Modal>
                  </Form.Item>
                  {entertaiment3.length > 0 &&
                    entertaiment3.map((item, index) => (
                      <div className="border-b-2 my-2 p-1">
                        <p key={index}>
                          {" "}
                          {item?.name}
                          <br></br> Địa chỉ: {item.address}
                        </p>
                        <p> Giá gốc: 1.000.000đ</p>
                        <p className="text-red-500 font-semibold		">
                          Giá bán ra: 1.500.000đ
                        </p>

                        <Input
                          label="Số lượng"
                          className="w-32 "
                          type="number"
                          placeholder="Số lượng"
                          min={0}
                        />
                        <p className="text-red-500 font-semibold		">
                          Tổng lời:500.000đ
                        </p>
                      </div>
                    ))}
                  <Form.Item label="Vé máy bay (nếu có)">
                    <button
                      type="mainColor"
                      className="bg-mainColor text-white text-sm mx-auto px-2 py-1 rounded-lg hover:text-black"
                      onClick={() => setOpen15(true)}
                    >
                      Chọn
                    </button>

                    <Modal
                      title="DANH SÁCH VÉ MÁY BAY"
                      centered
                      open={open15}
                      onOk={() => {
                        setOpen15(false);
                      }}
                      onCancel={() => setOpen15(false)}
                      width={1000}
                    >
                      <TableComponent type="4" />
                    </Modal>
                  </Form.Item>
                </Card>
              </Col>
            </Row>
          </>
        </Form>

        <Row justify="center" style={{ marginTop: "16px" }}>
          <Button
            type="primary"
            className=" uppercase"
            htmlType="submit"
          >
            Tạo gói tour
          </Button>
        </Row>
      </div>
    </div>
  );
}

export default CreateOptionForm;
