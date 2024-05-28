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
import { usePrice } from "../../../../../../context/PriceContext";

const { Option } = Select;

const InsuranceSection = ({
  form,
  request,
  setProvinces,
  districts,
  provinces,
  onProvinceChange,
  basePath,
}) => {
  const [insurances, setInsurances] = useState({});
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [insuranceId, setInsuranceId] = useState(null);
  const numOfDays = request?.privateTourResponse?.numOfDay;

  const { updateCommonPrice, commonPrices } = usePrice();

  useEffect(() => {
    if (
      insurances.assuranceId &&
      numOfDays &&
      typeof insurances === "object" &&
      !Array.isArray(insurances)
    ) {
      const quantity =
        request?.privateTourResponse?.numOfAdult +
        request?.privateTourResponse?.numOfChildren;
      // debugger;
      const totalInsurance = insurances.price * quantity;
      const commonService = {
        item: "Bảo hiểm du lịch",
        price: insurances.price,
        quantity: 1,
        total: totalInsurance,
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
  }, [insurances, updateCommonPrice, commonPrices]);

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
          <strong>Giá:</strong> {formatPrice(insurances.price)}
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
