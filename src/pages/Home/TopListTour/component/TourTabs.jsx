// TourTabs.js
import React, { useState } from "react";
import { Tabs, Button, Modal } from "antd";
import styled from "styled-components";
import {
  CloseOutlined,
  HeartOutlined,
  ShareAltOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { themeGet } from "@styled-system/theme-get";

const { TabPane } = Tabs;

const TabsWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
`;

const CustomTabs = styled(Tabs)`
  .ant-tabs-nav-list {
    display: flex;
    align-items: center;
  }

  .ant-tabs-tab {
    padding: 8px 16px;
    margin: 0;
    transition: color 0.2s ease-in-out;

    &:hover {
      .ant-tabs-tab-btn {
        color: ${themeGet("primary.0", "#008489")}; /* Màu khi tab được hover */
      }
    }
  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      font-weight: 500;
      color: ${themeGet(
        "primary.0",
        "#008489 !important"
      )}; /* Màu khi tab được chọn */
    }
  }

  .ant-tabs-ink-bar {
    background: ${themeGet(
      "primary.0",
      "#008489 !important"
    )}; /* Màu của gạch chân khi tab được chọn */
    height: 3px;
  }
`;

const TourTabs = ({
  overview,
  itinerary,
  videos,
  images,
  reviews,
  pricing,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const showModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalContent(null);
    setZoomLevel(1); // Reset zoom level when modal is closed
  };

  const handleZoomIn = () => {
    setZoomLevel((prevLevel) => Math.min(prevLevel + 0.2, 3)); // Max zoom level is 3
  };

  const handleZoomOut = () => {
    setZoomLevel((prevLevel) => Math.max(prevLevel - 0.2, 0.5)); // Min zoom level is 0.5
  };
  return (
    <TabsWrapper>
      <CustomTabs defaultActiveKey="1">
        <TabPane tab="Tổng quan" key="1">
          <div className="w-full">{overview}</div>
        </TabPane>
        <TabPane tab="Lịch trình" key="2">
          {" "}
          <div className="w-full">{itinerary}</div>
        </TabPane>
        <TabPane tab="Video/Image" key="3">
          {videos || images ? (
            <div>
              {videos && (
                <div>
                  <p className="font-semibold text-xl my-4">Video về tour:</p>
                  <div className="grid grid-cols-3 gap-4">
                    {videos.map((video, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          showModal(
                            <video
                              src={video}
                              controls
                              style={{ width: "100%" }}
                            />
                          )
                        }
                      >
                        <video
                          src={video}
                          controls
                          style={{ cursor: "pointer", width: "100%" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {images && (
                <div>
                  <p className="font-semibold text-xl my-4">
                    Hình ảnh về tour:
                  </p>
                  <div className="image-grid">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          showModal(
                            <img
                              src={img}
                              alt={`Tour Image ${index}`}
                              style={{ width: "100%" }}
                            />
                          )
                        }
                      >
                        <img
                          src={img}
                          alt={`Tour Image ${index}`}
                          style={{ cursor: "pointer", width: "100%" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p>Không có video hoặc hình ảnh nào</p>
            </div>
          )}
        </TabPane>
        <TabPane tab="Review" key="4">
          {reviews}
        </TabPane>
        <TabPane tab="Bảng giá" key="5">
          {pricing}
        </TabPane>
      </CustomTabs>

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        className="zoom-modal"
      >
        <div
          style={{
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Button className="mx-2" onClick={handleZoomOut}>
            <ZoomOutOutlined />
          </Button>
          <Button className="mx-2" onClick={handleZoomIn}>
            <ZoomInOutlined />
          </Button>
        </div>
        <div
          className="modal-content-wrapper"
          style={{ overflow: "hidden", textAlign: "center" }}
        >
          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center",
              transition: "transform 0.2s",
              display: "inline-block",
            }}
          >
            {modalContent}
          </div>
        </div>
      </Modal>

      <style jsx>{`
        .zoom-modal .ant-modal-content {
          padding: 10px;
          min-width: 800px !important;
          margin: auto;
        }
        .zoom-modal .ant-modal-body {
          align-items: center;
        }
        @media (max-width: 1051px) {
          .zoom-modal .ant-modal-content {
            min-width: 623px !important;
          }
        }
        @media (max-width: 729px) {
          .zoom-modal .ant-modal-content {
            min-width: 500px !important;
          }
        }
        @media (max-width: 500px) {
          .zoom-modal .ant-modal-content {
            min-width: 368px !important;
          }
        }
        .image-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 1051px) {
          .image-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 729px) {
          .image-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .image-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </TabsWrapper>
  );
};

export default TourTabs;
