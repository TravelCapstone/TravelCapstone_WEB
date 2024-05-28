import React, { useEffect, useState } from "react";
import {
  Form,
  InputNumber,
  Button,
  Space,
  Select,
  Modal,
  Table,
  DatePicker,
} from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { fetchEventListWithQuantity } from "../../../../../../api/EventApi";
import { usePrice } from "../../../../../../context/PriceContext";

const { Option } = Select;

const EventGalasSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
  basePath,
}) => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  console.log("selectedEvent", selectedEvent);

  const { updateCommonPrice, commonPrices } = usePrice();

  const quantity =
    request?.privateTourResponse?.numOfAdult +
    request?.privateTourResponse?.numOfChildren;

  useEffect(() => {
    if (
      selectedEvent &&
      typeof selectedEvent === "object" &&
      !Array.isArray(selectedEvent)
    ) {
      // debugger;
      const perInsurance = selectedEvent.total / quantity;
      const commonService = {
        item: "Bảo hiểm du lịch",
        price: perInsurance,
        quantity: 1,
        total: selectedEvent.total,
      };
      // Kiểm tra nếu dịch vụ đã tồn tại trong danh sách
      const existingServiceIndex = commonPrices.findIndex(
        (service) => service.item === commonService.item
      );
      if (existingServiceIndex !== -1) {
        // Cập nhật giá trị dịch vụ
        commonPrices[existingServiceIndex] = commonService;
      } else {
        // Thêm dịch vụ mới vào danh sách
        updateCommonPrice(commonService);
      }
    }
  }, [selectedEvent, updateCommonPrice, commonPrices]);

  const fetchEvents = async () => {
    setLoading(true);
    const eventList = await fetchEventListWithQuantity(quantity);
    if (eventList.isSuccess) {
      setEvents(eventList.result);
      console.log(events);
    }
    setLoading(false);
  };

  const showModal = (packageType) => {
    setSelectedPackage(packageType);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchEvents();
  }, [quantity]);

  const handleSelectEvent = (event) => {
    form.setFieldsValue({
      eventGala: {
        eventId: event.event.id,
      },
    });
    setModalVisible(false);
  };

  const handleSelectChange = (value) => {
    const event = events.find((e) => e.event.id === value);
    setSelectedEvent(event);
    form.setFieldsValue({
      eventGala: {
        eventId: value,
      },
    });
    showModal(value);
  };

  const handleDateChange = (date) => {
    form.setFieldsValue({
      eventGala: {
        date: date,
      },
    });
  };

  const columns = [
    {
      title: "Event",
      dataIndex: ["event", "name"],
      key: "eventName",
      width: 200,
      render: (text, record) => (
        <a onClick={() => handleSelectEvent(record)}>{text}</a>
      ),
    },
    {
      title: "Mô tả Event",
      dataIndex: ["event", "description"],
      key: "eventDescription",
      width: 400,
      render: (text, record) => (
        <a onClick={() => handleSelectEvent(record)}>{text}</a>
      ),
    },
    {
      title: "Chi tiết Event",
      dataIndex: "eventDetailReponses",
      width: 500,
      key: "eventDetailReponses",
      render: (details) =>
        details.map((detail, index) => (
          <div key={detail.name} className="my-2">
            {index + 1}. {detail.name} - Giá: {detail.price} VND
          </div>
        )),
    },
    {
      title: "Tổng giá dịch vụ event",
      dataIndex: "totalPriceEvent",
      width: 200,
      key: "totalPriceEvent",
      render: (text, record) => (
        <p className="font-semibold text-lg ">
          <span>
            {" "}
            {selectedEvent.total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}{" "}
          </span>
          / Tour
        </p>
      ),
    },
  ];

  useEffect(() => {
    if (request?.privateTourResponse?.otherLocation) {
      setProvinces(
        request.privateTourResponse.otherLocation.map((loc) => ({
          id: loc.provinceId,
          name: loc.province.name,
        }))
      );
    }
  }, [request]);

  return (
    <>
      <Modal
        title="Chọn gói Event"
        className="!max-w-[1200px] !w-full"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedEvent && (
          <Table
            columns={columns}
            dataSource={[selectedEvent]}
            rowKey="id"
            loading={loading}
            scroll={{ y: 500 }}
          />
        )}
      </Modal>

      <Space
        direction="vertical"
        size="large"
        className="flex justify-between"
        align="baseline"
      >
        <div className="flex ">
          <div>
            <div className="Options ">
              <div className="Option2 flex flex-wrap items-center">
                <div className="flex ">
                  <Form.Item
                    className="font-semibold my-2"
                    label="Gói Event/Game:"
                    name={["eventGala", "eventId"]}
                  >
                    <Select
                      placeholder="Gói Event/Game"
                      className="!w-[200px] mr-10"
                      onChange={handleSelectChange}
                    >
                      {events.length > 0 &&
                        events.map((event) => (
                          <Option key={event.event?.id} value={event.event?.id}>
                            {event?.event?.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Button
                    className="bg-mainColor text-white mt-2"
                    onClick={showModal}
                  >
                    Xem chi tiết
                  </Button>
                  <Form.Item
                    name={["eventGala", "date"]}
                    className="font-semibold ml-10 my-2"
                    label="Ngày tổ chức:"
                    rules={[
                      { required: true, message: " Vui lòng chọn thời gian!" },
                    ]}
                  >
                    <DatePicker showTime onChange={handleDateChange} />
                  </Form.Item>
                </div>
                {selectedEvent && (
                  <div className=" text-gray-500 ml-10 ">
                    <p className="font-semibold text-lg ">
                      Giá dịch vụ:{" "}
                      <span>
                        {" "}
                        {selectedEvent.total.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}{" "}
                      </span>
                      / Tour
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Space>
    </>
  );
};
export default EventGalasSection;
