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
  console.log("events", events);
  console.log("selectedPackage", selectedPackage);

  const quantity =
    request?.privateTourResponse?.numOfAdult +
    request?.privateTourResponse?.numOfChildren;

  console.log("quantity", quantity);

  const fetchEvents = async () => {
    setLoading(true);
    const eventList = await fetchEventListWithQuantity(quantity); // Example quantity
    setEvents(eventList);
    setLoading(false);
  };

  const showModal = (packageType) => {
    setSelectedPackage(packageType);
    fetchEvents();
    setModalVisible(true);
  };

  const handleSelectEvent = (event) => {
    form.setFieldsValue({
      [selectedPackage]: event.id,
    });
    setModalVisible(false);
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
        <Table
          columns={columns}
          dataSource={events}
          rowKey="id"
          loading={loading}
          scroll={{ y: 500 }}
        />
      </Modal>

      <Form.List name={[...basePath, "eventGalas"]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Space
                key={field.key}
                direction="vertical"
                size="large"
                className="flex justify-between"
                align="baseline"
              >
                <div className="flex">
                  <div>
                    <div className="Options my-4">
                      <div className="Option1 my-4">
                        <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                          Gói Tiết Kiệm:
                        </li>
                        <div className="flex">
                          <Form.Item
                            className="font-semibold my-2"
                            name={[field.name, "option1EventId"]}
                            label="Gói Event/Game:"
                          >
                            <Select
                              placeholder="Gói Event/Game"
                              className="!w-[200px] mr-10"
                            >
                              {events.map((event) => (
                                <Option
                                  key={event.event.id}
                                  value={event.event.id}
                                >
                                  {event.event.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Button
                            type="primary"
                            onClick={() =>
                              showModal([field.name, "option1EventId"])
                            }
                          >
                            Xem chi tiết các gói dịch vụ Event
                          </Button>
                        </div>
                      </div>

                      <div className="Option2 my-4">
                        <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                          Gói Cơ Bản:
                        </li>
                        <div className="flex">
                          <Form.Item
                            className="font-semibold my-2"
                            name={[field.name, "option2EventId"]}
                            label="Gói Event/Game:"
                          >
                            <Select
                              placeholder="Gói Event/Game"
                              className="!w-[200px] mr-10"
                            >
                              {events.map((event) => (
                                <Option
                                  key={event.event.id}
                                  value={event.event.id}
                                >
                                  {event.event.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Button
                            type="primary"
                            onClick={() =>
                              showModal([field.name, "option2EventId"])
                            }
                          >
                            Xem chi tiết các gói dịch vụ Event
                          </Button>
                        </div>
                      </div>

                      <div className="Option3 my-4">
                        <li className="list-disc text-lg font-semibold mb-2 text-red-400">
                          Gói Nâng Cao:
                        </li>
                        <div className="flex">
                          <Form.Item
                            className="font-semibold my-2"
                            name={[field.name, "option3EventId"]}
                            label="Gói Event/Game:"
                          >
                            <Select
                              placeholder="Gói Event/Game"
                              className="!w-[200px] mr-10"
                            >
                              {events.map((event) => (
                                <Option
                                  key={event.event.id}
                                  value={event.event.id}
                                >
                                  {event.event.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Button
                            type="primary"
                            onClick={() =>
                              showModal([field.name, "option3EventId"])
                            }
                          >
                            Xem chi tiết các gói dịch vụ Event
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Space>
            ))}
            <Form.Item>
              <Button
                onClick={() => add()}
                className="bg-teal-600 font-semibold text-white"
                type="dashed"
                style={{ marginTop: 16 }}
                icon={<PlusOutlined />}
              >
                Tạo Gói Event/Teambulding
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};
export default EventGalasSection;
