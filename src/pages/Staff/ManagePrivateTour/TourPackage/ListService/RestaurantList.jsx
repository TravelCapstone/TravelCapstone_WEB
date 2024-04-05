import React, { useState } from "react";
import { Button, Modal } from "antd";
import TableComponent from "./TableComponent";

function RestaurantList({ onSelectRecord }) {
    const [open, setOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const data2 = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Joe Black',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Jim Green',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
       Chọn nhà hàng
      </Button>
      <Modal
        title="DANH SÁCH NHÀ HÀNG"
        centered
        visible={open}
        //open={open}
        //onOk={() => setOpen(false)}
        onOk={() => {
            onSelectRecord(selectedRestaurant);
            setOpen(false);
          }}
        onCancel={() => setOpen(false)}
        width={1000} 
               
      >
        <TableComponent data={data2} onSelectRecord={handleSelectRestaurant}/>
      </Modal>
    </>
  )
}

export default RestaurantList