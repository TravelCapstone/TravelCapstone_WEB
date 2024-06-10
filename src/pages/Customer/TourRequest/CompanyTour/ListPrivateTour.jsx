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
import { useSelector } from "react-redux";

const ListPrivateTour = () => {
  const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.user || {});
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  console.log("orders", orders);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userId = user?.id; // Thay thế bằng ID thực tế của người dùng
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
    { key: "3", label: "Chọn gói tour" },
    { key: "4", label: "Đã chọn gói tour" },
    { key: "5", label: "Đã tạo kế hoạch tour" },
    { key: "6", label: "Đã huỷ" },
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
        {orders.length !== 0 && (
          <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
            <Tabs.TabPane tab="Tất cả" key="1">
              <RequestSent
                title="Tổng tour yêu cầu"
                orders={orders || []}
                error={error}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đã gửi yêu cầu" key="2">
              <RequestSent
                title="Tổng tour đã gửi yêu cầu"
                orders={
                  orders.filter(
                    (order) => order.status === 0
                  ) || []
                }
                error={error}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Chọn gói tour" key="3">
              <RequestSent
                title="Tổng tour đã chọn gói tour"
                orders={
                  orders.filter(
                    (order) => order.status === 1
                  ) || []
                }
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đã chọn gói tour" key="4">
              <RequestSent
                title="Tổng tour đã chọn gói tour"
                orders={
                  orders.filter(
                    (order) => order.status === 2
                  ) || []
                }
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đã tạo kế hoạch tour" key="5">
              <RequestSent
                title="Tổng tour đã tạo kế hoạch tour"
                orders={
                  orders.filter(
                    (order) => order.status === 4
                  ) || []
                }
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đã huỷ" key="6">
              <RequestSent
                title="Tổng tour đã huỷ"
                orders={
                  orders.filter(
                    (order) => order.status === 3
                  ) || []
                }
              />
            </Tabs.TabPane>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default ListPrivateTour;
