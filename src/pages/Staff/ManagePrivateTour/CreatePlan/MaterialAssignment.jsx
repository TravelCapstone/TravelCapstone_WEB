import React, { useState, useEffect, useRef } from "react";
import { Table, Input, Button, Form, Space } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const MaterialAssignment = ({ data }) => {
  return (
    <div className="my-16">
      <h2 className="font-bold text-lg text-mainColor border-b-2 my-2">
        NHỮNG DỤNG CỤ CẦN THIẾT MANG THEO TOUR
      </h2>
      <div className="overflow-x-auto  rounded-md ">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <>
              <div
                className="flex items-center justify-between px-4 py-2 "
                key={index}
              >
                <div className="flex items-center">
                  <p className="font-bold text-lg">
                    {item.materialPriceHistory?.material?.name}
                  </p>
                  <p className="ml-4">{item.quantity} cái</p>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default MaterialAssignment;
