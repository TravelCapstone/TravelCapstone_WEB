import { Modal } from "antd";
import { Card, Descriptions, Tooltip, Tabs } from "antd";
import { formatDate, formatPrice } from "../../../utils/Util";
import {
  ratingLabels,
  vehicleTypeLabels,
} from "../../../settings/globalStatus";
import { useState } from "react";
import { getDishListByMenuId } from "../../../api/MenuApi";
const { TabPane } = Tabs;

const ViewOptionDetail = ({ data, visible, onOk, onCancel }) => {
  const [menuData, setMenuData] = useState(null);
  const handleEyeClick = async (id) => {
    try {
      const response = await getDishListByMenuId(id);
      if (response.isSuccess) {
        setMenuData(response.result.items);
      }
    } catch (error) {
      console.error("Failed to fetch menu data:", error);
    }
  };

  return (
    <Modal
      title="Chi tiết gói"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={1200}
      maskClosable={false}
    >
      <div className="h-[900px] overflow-y-scroll">
        <Card title="Chi tiết báo giá">
          <Descriptions title="Thông tin chung" bordered column={1}>
            <Descriptions.Item label="Ngày bắt đầu">
              {formatDate(data.optionQuotation.startDate)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày kết thúc">
              {formatDate(data.optionQuotation.endDate)}
            </Descriptions.Item>
            <Descriptions.Item label="Chi phí tổ chức">
              {formatPrice(data.optionQuotation.organizationCost)}
            </Descriptions.Item>
            <Descriptions.Item label="Phí dự phòng">
              {formatPrice(data.optionQuotation.contingencyFee)}
            </Descriptions.Item>
            <Descriptions.Item label="Phí hộ tống">
              {formatPrice(data.optionQuotation.escortFee)}
            </Descriptions.Item>
            <Descriptions.Item label="Phí hoạt động">
              {formatPrice(data.optionQuotation.operatingFee)}
            </Descriptions.Item>
            <Descriptions.Item label="Chi phí lái xe">
              {formatPrice(data.optionQuotation.driverCost)}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giá tối thiểu">
              {formatPrice(data.optionQuotation.minTotal)}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giá tối đa">
              {formatPrice(data.optionQuotation.maxTotal)}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Chi tiết báo giá" key="1">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Số lượng người lớn</th>
                  <th>Số lượng trẻ em</th>
                  <th>Loại dịch vụ</th>
                  <th>Rating</th>

                  <th>Giá tối thiểu</th>
                  <th>Giá tối đa</th>
                </tr>
              </thead>
              <tbody>
                {data.quotationDetails.length > 0 &&
                  data.quotationDetails?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.quantityOfAdult}</td>
                      <td>{item.quantityOfChild}</td>
                      <td>
                        {item.serviceType
                          ? item.serviceType.name
                          : item.materialPriceHistory?.material.name}
                      </td>
                      <td>
                        {item.facilityRating
                          ? ratingLabels[item.facilityRating.ratingId]
                          : "N/A"}
                      </td>
                      <td>{formatPrice(item.minPrice)}</td>
                      <td>{formatPrice(item.maxPrice)}</td>
                      <td onClick={() => handleEyeClick(item.menuId)}>
                        {item.menu && <i className="fa-solid fa-eye"></i>}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {menuData && (
              <>
                <h3 className="text-center text-primary text-xl font-bold my-2">
                  THỰC ĐƠN
                </h3>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Tên món</th>
                      <th>Mô tả</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuData.map((dish) => (
                      <tr key={dish.id}>
                        <td>{dish.name}</td>
                        <td>{dish.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </TabPane>
          <TabPane tab="Hướng dẫn viên" key="2">
            {data.tourguideQuotationDetails.length > 0 &&
              data.tourguideQuotationDetails?.map((guide) => (
                <Card key={guide.id}>
                  <div>
                    <p>
                      <span className="font-bold">Tỉnh:</span>{" "}
                      {guide.province?.name}
                    </p>
                    <p>
                      <span className="font-bold">Số lượng HDV:</span>{" "}
                      {guide.quantity}
                    </p>
                    <p>
                      <span className="font-bold">Chi phí:</span>{" "}
                      {formatPrice(guide.total)}
                    </p>
                  </div>
                </Card>
              ))}
          </TabPane>
          <TabPane tab="Sự kiện" key="3">
            {data.optionEvent.length > 0 &&
              data.optionEvent?.map((event) => (
                <Card key={event.id}>
                  <div>
                    <p>
                      <span className="font-bold">Tên sự kiện:</span>{" "}
                      {event.event.name}
                    </p>
                    <p>
                      <span className="font-bold">Mô tả:</span>{" "}
                      {event.event.description}
                    </p>
                    <p>
                      <span className="font-bold">Ngày:</span>{" "}
                      {formatDate(event.date)}
                    </p>
                  </div>
                </Card>
              ))}
          </TabPane>
          <TabPane tab="Phương tiện" key="4">
            {data.vehicleQuotationDetails.length > 0 &&
              data.vehicleQuotationDetails?.map((vehicle) => (
                <Card key={vehicle.id}>
                  <div>
                    <p>
                      <span className="font-bold">Loại phương tiện:</span>{" "}
                      {vehicleTypeLabels[vehicle.vehicleType]}
                    </p>
                    <p>
                      <span className="font-bold">Số ngày thuê:</span>{" "}
                      {vehicle.numOfRentingDay}
                    </p>
                    <p>
                      <span className="font-bold">Điểm đi:</span>{" "}
                      <Tooltip message={vehicle.startPoint.name}>
                        <span>{vehicle.startPoint.name.slice(0, 10)}</span>
                      </Tooltip>
                    </p>
                    <p>
                      <span className="font-bold">Điểm đến:</span>{" "}
                      <Tooltip message={vehicle.endPoint.name}>
                        <span>{vehicle.endPoint.name.slice(0, 10)}</span>
                      </Tooltip>
                    </p>
                    <p>
                      <span className="font-bold">Giá tối thiểu:</span>{" "}
                      {formatPrice(vehicle.minPrice)}
                    </p>
                    <p>
                      <span className="font-bold">Giá tối đa:</span>{" "}
                      {formatPrice(vehicle.maxPrice)}
                    </p>
                  </div>
                </Card>
              ))}
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};
export default ViewOptionDetail;
