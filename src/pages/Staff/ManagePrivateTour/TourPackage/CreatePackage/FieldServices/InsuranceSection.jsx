import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Space, Select, Modal, Input } from "antd"; // Import Modal
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getAvailableAssurancesWithNumOfDays } from "../../../../../../api/AssuranceApi";
import { optionClassLabels } from "../../../../../../settings/globalStatus";
import { formatPrice } from "../../../../../../utils/Util";

const { Option } = Select;

const InsuranceSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
  basePath,
  setInsurances,
  insurances,
}) => {
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [insuranceId, setInsuranceId] = useState(null);
  const numOfDays = request?.privateTourResponse?.numOfDay;

  console.log("insurances", insurances);
  console.log("numOfDays", numOfDays);

  useEffect(() => {
    if (request?.privateTourResponse?.otherLocation) {
      setProvinces(
        request.privateTourResponse.otherLocation.map((loc) => ({
          id: loc.provinceId,
          name: loc.province.name,
        }))
      );
    }

    const fetchInsurances = async () => {
      const response = await getAvailableAssurancesWithNumOfDays(numOfDays);
      console.log("responseinsurances", response);
      if (response.isSuccess) {
        setInsurances(response.result); // Flatten the array if nested
        setInsuranceId(response.result.id);
        form.setFieldsValue({ insurance: response.result.id });
      }
    };

    if (numOfDays) {
      fetchInsurances();
    }
  }, [request, numOfDays]);

  // Function to handle modal opening
  const showModal = () => {
    setModalVisible(true);
  };

  // Function to handle modal closing
  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Form.Item
        className="font-semibold my-2 !w-full"
        name="insurance"
        label="Gói Bảo Hiểm:"
      >
        <Input value={insuranceId} hidden />
        <span onClick={showModal} className="text-lg cursor-pointer">
          {insurances.assurance?.name}.... Xem chi tiết
        </span>
      </Form.Item>
      <Modal
        title="Thông Tin Bảo Hiểm"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <p>
          <strong>Tên:</strong> {insurances.assurance?.name}
        </p>
        <p>
          <strong>Giá:</strong> {formatPrice(insurances.price)} / người
        </p>
        <p>
          <strong>Mô tả:</strong> {insurances.assurance?.description}
        </p>
        <p>
          <strong>Yêu cầu tối thiểu số ngày:</strong>{" "}
          {insurances.assurance?.dayMOQ}
        </p>
      </Modal>
    </>
  );
};
export default InsuranceSection;
