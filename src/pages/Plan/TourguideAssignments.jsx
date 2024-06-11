import React from "react";
import { Card, List } from "antd";

const TourguideAssignments = ({ tourguideAssignments }) => {
  console.log(tourguideAssignments);
  return (
    <Card style={{ marginBottom: "20px" }}>
      <h1 className="text-primary font-bold text-center text-2xl">
        Thông tin về hướng dẫn viên
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          {tourguideAssignments &&
            tourguideAssignments?.length > 0 &&
            tourguideAssignments.map((tourGuide, index) => (
              <div className="grid grid-cols-2" key={index}>
                <div>
                  <h2 className="text-lg text-primary font-bold mb-2 flex items-center">
                    Hướng dẫn viên
                  </h2>
                  <div className="flex items-center">
                    <i className="fas fa-user text-primary mr-2"></i>
                    <p>
                      {tourGuide.account?.firstName}{" "}
                      {tourGuide.account?.lastName}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone text-primary mr-2"></i>
                    <p>{tourGuide.account?.phoneNumber}</p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-primary mr-2"></i>
                    <p>{tourGuide.account?.email}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg text-primary font-bold mb-2 flex items-center">
                    Địa điểm
                  </h2>
                  <div className="flex items-center">
                    <i className="fas fa-city text-primary mr-2"></i>
                    <p>{tourGuide.province?.name}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
};

export default TourguideAssignments;
