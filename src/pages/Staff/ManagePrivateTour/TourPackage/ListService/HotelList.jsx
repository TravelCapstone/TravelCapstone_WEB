import React, { useState } from "react";
import { Button, Modal } from "antd";
import TableComponent from "./TableComponent";

function HotelList({ onSelectRecord }) {
  const [open, setOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      price: "1000000"
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
      price: "2000000"
    },
    {
      key: "3",
      name: "Jim Green",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      price: "3000000"
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
      price: "4000000"
    },
  ];
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Chọn khách sạn
      </Button>
      <Modal
        title="DANH SÁCH KHÁCH SẠN"
        centered
        visible={open}
        //open={open}
        //onOk={() => setOpen(false)}
        onOk={() => {
          onSelectRecord(selectedHotel);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <TableComponent data={data} onSelectRecord={handleSelectHotel} />
      </Modal>
    </>
  );
}

export default HotelList;
