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
  Input,
  ConfigProvider,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  fetchEventListWithQuantity,
  updateEventDetails,
} from "../../../../../../api/EventApi";
import { usePrice } from "../../../../../../context/PriceContext";
import moment from "moment";
import {
  alertFail,
  alertSuccess,
} from "../../../../../../hook/useNotification";
import "../../../../../../settings/setupDayjs";
import viVN from "antd/lib/locale/vi_VN";

const { Option } = Select;

const EventGalasSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
  basePath,
  jsonCustomEventJsonString,
  setJsonCustomEventJsonString,
}) => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [originalDetails, setOriginalDetails] = useState([]);
  const [currentDetails, setCurrentDetails] = useState([]);

  const [jsonCustormEvent, setjsonCustormEvent] = useState([]);

  console.log("jsonCustormEvent", jsonCustormEvent);

  const { updateCommonPrice, commonPrices } = usePrice();
  const [totalPrice, setTotalPrice] = useState(0);

  const quantity =
    request?.privateTourResponse?.numOfAdult +
    request?.privateTourResponse?.numOfChildren;

  console.log("selectedEvent", selectedEvent);

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

  const showEditModal = (event) => {
    setEditingEvent(event);
    setCurrentDetails([...event.eventDetailReponses]); // Assuming this is the correct data structure
    setOriginalDetails([...event.eventDetailReponses]); // For tracking changes
    setTotalPrice(calculateTotalPrice([...event.eventDetailReponses])); // Calculate initial total
    setEditModalVisible(true);
  };

  const handleNameChange = (index, newName) => {
    const updatedDetails = currentDetails.map((detail, idx) => {
      if (idx === index) {
        return { ...detail, name: newName };
      }
      return detail;
    });
    setCurrentDetails([...updatedDetails]);
  };
  const handleQuantityChange = (index, newQuantity) => {
    const updatedDetails = currentDetails.map((detail, idx) => {
      if (idx === index) {
        return { ...detail, quantity: newQuantity };
      }
      return detail;
    });
    setCurrentDetails(updatedDetails);
    setTotalPrice(calculateTotalPrice(updatedDetails));
  };

  const handlePriceChange = (index, newPrice) => {
    const updatedDetails = currentDetails.map((detail, idx) => {
      if (idx === index) {
        return { ...detail, price: newPrice };
      }
      return detail;
    });
    setCurrentDetails(updatedDetails);
    setTotalPrice(calculateTotalPrice(updatedDetails));
  };

  const calculateTotalPrice = (details) => {
    return details.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const fetchEvents = async () => {
    setLoading(true);

    const eventList = await fetchEventListWithQuantity(quantity);

    if (eventList.isSuccess) {
      setEvents(eventList.result);
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
      width: 450,
      key: "eventDetailReponses",
      render: (details) =>
        details.map((detail, index) => (
          <div key={detail.name} className="my-2">
            {index + 1}. {detail.name} - Số lượng: {detail.quantity} - Giá:
            {detail.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
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
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>
          Sửa
        </Button>
      ),
    },
  ];

  useEffect(() => {
    updateEventDetailsWithCustomData();
  }, [jsonCustormEvent]); // Đảm bảo rằng hàm này chỉ chạy khi jsonCustormEvent thay đổi

  const updateEventDetailsWithCustomData = () => {
    if (jsonCustormEvent && jsonCustormEvent.eventDetailPriceHistoryResponses) {
      let updatedEventDetails = selectedEvent.eventDetailReponses.map(
        (detail) => {
          const customDetail =
            jsonCustormEvent.eventDetailPriceHistoryResponses.find(
              (cd) => cd.EventDetailPriceHistoryId === detail.historyPriceId
            );
          if (customDetail) {
            return {
              ...detail,
              quantity: customDetail.Quantity,
              total: customDetail.Total, // Cập nhật total từng chi tiết
            };
          } else {
            return detail; // Giữ nguyên chi tiết nếu không tìm thấy customDetail
          }
        }
      );

      setSelectedEvent({
        ...selectedEvent,
        eventDetailReponses: updatedEventDetails,
        total: jsonCustormEvent.Total, // Cập nhật total chính của sự kiện
      });
    }
  };

  const handleSaveChanges = async () => {
    // debugger;
    const updatedDetails = currentDetails.map((detail) => ({
      eventDetailPriceHistoryId: detail.historyPriceId,
      quantity: detail.quantity,
      name: detail.name,
      price: detail.price,
    }));
    try {
      const response = await updateEventDetails(
        editingEvent.event.id,
        updatedDetails
      );
      if (response.isSuccess) {
        // Check if your API sends a 'success' flag or similar indicator
        alertSuccess("Tour created successfully!");
        // debugger;
        const resultObject = response.result;
        setJsonCustomEventJsonString(resultObject);

        const jsonResult = JSON.parse(response.result); // Chuyển đổi chuỗi thành đối tượng JSON

        setjsonCustormEvent(jsonResult);
        // await fetchEvents(); // Re-fetch events to update UI
        setEditModalVisible(false);
      } else {
        alertFail("Failed to create the tour.");
      }
    } catch (error) {
      console.error("Error updating event details:", error);
      alertFail("An error occurred while updating the tour.", "Error");
    }
    setEditModalVisible(false);
    updateEventDetailsWithCustomData();
  };

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

  const disabledDate = (current) => {
    // Lấy giá trị tourDate từ form
    const tourDate = form.getFieldValue("tourDate");
    if (!tourDate || tourDate.length < 2) {
      return false;
    }
    const startDate = tourDate[0];
    const endDate = tourDate[1];
    return current && (current < startDate || current > endDate);
  };

  // Lấy giá trị defaultPickerValue từ tourDate
  const getDefaultPickerValue = () => {
    const tourDate = form.getFieldValue("tourDate");
    if (!tourDate || tourDate.length < 2) {
      return moment(); // Nếu không có tourDate, sử dụng ngày hiện tại
    }
    return tourDate[0]; // Sử dụng ngày bắt đầu của tourDate
  };

  const isChanged = () => {
    return JSON.stringify(originalDetails) !== JSON.stringify(currentDetails);
  };

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
          <div>
            <Modal
              title="Chỉnh sửa Event/Gala Details"
              classNames="text-xl"
              visible={editModalVisible}
              onCancel={() => setEditModalVisible(false)}
              fetchEvents={fetchEvents}
              footer={[
                <Button onClick={handleSaveChanges} disabled={!isChanged()}>
                  Lưu
                </Button>,
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditModalVisible(false);
                  }}
                >
                  Huỷ
                </Button>,
              ]}
              className=" !w-[800px]"
            >
              {editingEvent && (
                <Form layout="vertical">
                  {currentDetails.map((detail, index) => (
                    <Form.Item
                      // label={` ${index + 1}.`}
                      className="font-semibold"
                    >
                      <div className="flex ">
                        <p className="text-lg self-end">{index + 1}.</p>
                        <div className="mx-4">
                          <p className="font-semibold text-sm my-2">
                            Tên hoạt động:
                          </p>
                          {/* <Input
                            className="!w-[400px]"
                            defaultValue={detail.name}
                            onChange={(e) =>
                              handleNameChange(index, e.target.value)
                            }
                            disabled
                          /> */}
                          <p className="!w-[400px] text-lg ">{detail.name}</p>
                        </div>
                        <div className="mx-4">
                          <p className="font-semibold text-sm my-2">
                            Số lượng:
                          </p>

                          <InputNumber
                            defaultValue={detail.quantity}
                            onChange={(value) =>
                              handleQuantityChange(index, value)
                            }
                            disabled={!detail.perPerson}
                          />
                        </div>
                        <div className="mx-4">
                          <p className="font-semibold text-sm my-2">Giá:</p>

                          {/* <InputNumber
                            defaultValue={detail.price}
                            onChange={(value) =>
                              handlePriceChange(index, value)
                            }
                            disabled
                          /> */}
                          <p className="!w-[400px] text-lg ">
                            {detail.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}{" "}
                          </p>
                        </div>
                      </div>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <p className="text-xl font-bold">
                      Tổng giá:{" "}
                      {totalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </Form.Item>
                </Form>
              )}
            </Modal>
            {/* {jsonCustormEvent ? (
              <Table
                columns={columns}
                dataSource={[jsonCustormEvent]}
                rowKey="id"
                loading={loading}
                scroll={{ y: 500 }}
              />
            ) : ( */}
            <Table
              columns={columns}
              dataSource={[selectedEvent]}
              rowKey="id"
              loading={loading}
              scroll={{ y: 500 }}
            />
            {/* )} */}
          </div>
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
                <div className="flex flex-wrap">
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
                  <ConfigProvider locale={viVN}>
                    <Form.Item
                      name={["eventGala", "date"]}
                      className="font-semibold ml-10 my-2"
                      label="Ngày tổ chức:"
                      rules={[
                        {
                          required: true,
                          message: " Vui lòng chọn thời gian!",
                        },
                      ]}
                    >
                      <DatePicker
                        disabledDate={disabledDate}
                        defaultPickerValue={[getDefaultPickerValue()]}
                        showTime
                        onChange={handleDateChange}
                        format="DD-MM-YYYY HH:mm:ss"
                      />
                    </Form.Item>
                  </ConfigProvider>
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
