import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Space, Select, Modal, Table } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { fetchEventListWithQuantity } from "../../../../../../api/EventApi";

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

  const quantity =
    request?.privateTourResponse?.numOfAdult +
    request?.privateTourResponse?.numOfChildren;

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
      [selectedPackage]: event.id,
    });
    setModalVisible(false);
  };
  const handleSelectChange = (value) => {
    const event = events.find((e) => e.event.id === value);
    setSelectedEvent(event);
    showModal(value);
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
        <div className="flex">
          <div>
            <div className="Options my-4">
              <div className="Option2 my-4">
                <div className="flex">
                  <Form.Item
                    className="font-semibold my-2"
                    label="Gói Event/Game:"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Space>
    </>
  );
};
export default EventGalasSection;
