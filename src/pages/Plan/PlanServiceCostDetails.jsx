import React from "react";
import { Card, List } from "antd";
import Title from "antd/es/skeleton/Title";
import { formatPrice } from "../../utils/Util";

const PlanServiceCostDetails = ({ planServiceCostDetails }) => {
  console.log("planServiceCostDetails", planServiceCostDetails);
  return (
    <Card style={{ marginBottom: "20px" }}>
      <h1 className="text-primary font-bold text-center text-2xl">
        Bảng giá chi tiết kế hoạch
      </h1>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  STT
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tên dịch vụ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Số lượng{" "}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Giá
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tổng
                </th>
                {/* Thêm các cột khác nếu cần */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Sử dụng map để hiển thị dữ liệu từ JSON */}
              {planServiceCostDetails &&
                planServiceCostDetails?.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.materialPriceHistory?.material?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice(item.materialPriceHistory?.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice(
                        item.materialPriceHistory?.price * item.quantity
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default PlanServiceCostDetails;
