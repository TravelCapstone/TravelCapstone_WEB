import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Tabs } from "antd";

import { useNavigate } from "react-router-dom";
import Container from "../../../../components/Container/Container";
import RequestSent from "../TabListStatus/RequestSent";
import { getPrivateTourByIdForCustomer } from "../../../../api/privateTourRequestApi";
import LoadingOverlay from "../../../../components/Loading/LoadingOverlay";
import { getIdOptionsRequest } from "../../../../api/OptionsApi";
import BreadcrumbWithBackButton from "../../../../components/BreadCrumb/BreadCrumb";
import { LISTING_TOUR_PRIVATE } from "../../../../settings/constant";

const ListPrivateTour = () => {
  const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const [detailTour, setDetailTour] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  console.log("orders", orders);
  console.log("detailTour", detailTour);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userId = "208be820-3a09-4a8c-af3f-d86cb0f5ccee"; // Thay thế bằng ID thực tế của người dùng
        const pageNumber = 1;
        const pageSize = 10;
        console.log("Fetching data with parameters:", {
          userId,
          pageNumber,
          pageSize,
        });

        const response = await getPrivateTourByIdForCustomer(
          userId,
          pageNumber,
          pageSize
        );
        console.log("API response:", response);

        if (response && response.data && response.data.result) {
          setOrders(response.data.result.items);
          // Fetch details for each order
          const detailResponses = await Promise.all(
            response.data.result.items.map((order) =>
              getIdOptionsRequest(order.id)
            )
          );

          const detailedOrders = response.data.result.items.map(
            (order, index) => ({
              ...order,
              details: detailResponses[index]?.result || {},
            })
          );
          //   debugger;

          setDetailTour(detailedOrders);
        } else {
          console.error("Invalid response structure", response);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingOverlay isLoading={true} />;
  if (error) return <div>Error: {error}</div>;

  const breadcrumbItems = [
    { name: "Lịch sử tour yêu cầu", url: LISTING_TOUR_PRIVATE },
  ];

  const tabs = [
    { key: "1", label: "Tất cả" },
    { key: "2", label: "Đã gửi yêu cầu" },
    { key: "3", label: "Chọn Options" },
    { key: "4", label: "Đã hoàn thành" },
    { key: "5", label: "Đã huỷ" },
  ];

  return (
    <div className="mx-10">
      <div className=" mb-8">
        <BreadcrumbWithBackButton
          breadcrumbItems={breadcrumbItems}
          currentTab={tabs.find((tab) => tab.key === activeTab)?.label}
        />
      </div>
      <div className="ml-2">
        <h2 className="text-xl font-bold mb-5 text-mainColor">
          LỊCH SỬ ĐẶT TOUR YÊU CẦU CỦA TÔI
        </h2>
        <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
          <Tabs.TabPane tab="Tất cả" key="1">
            <RequestSent
              title="Tổng tour yêu cầu"
              orders={detailTour || []}
              error={error}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã gửi yêu cầu" key="2">
            <RequestSent
              title="Tổng tour đã gửi yêu cầu"
              orders={
                detailTour.filter(
                  (order) => order.details.privateTourResponse.status === 0
                ) || []
              }
              error={error}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chọn Options" key="3">
            <RequestSent
              title="Tổng tour đã chọn Options"
              orders={
                detailTour.filter(
                  (order) => order.details.privateTourResponse.status === 1
                ) || []
              }
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hoàn thành" key="4">
            <RequestSent
              title="Tổng tour đã hoàn thành"
              orders={
                detailTour.filter(
                  (order) => order.details.privateTourResponse.status === 2
                ) || []
              }
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã huỷ" key="5">
            <RequestSent
              title="Tổng tour đã huỷ"
              orders={
                detailTour.filter(
                  (order) => order.details.privateTourResponse.status === 3
                ) || []
              }
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ListPrivateTour;
