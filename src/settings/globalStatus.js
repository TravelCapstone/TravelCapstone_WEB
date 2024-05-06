const statusPrivateTourLabels = {
  0: "Chờ xử lí",
  1: "Đợi khách hàng phản hồi",
  2: "Chấp nhận",
  3: "Từ chối",
};
const typePortLabels = {
  0: "Hàng Không",
  1: "Cảng tàu",
  2: "Ga tàu hoả",
  3: "Bến phà",
  4: "Bến xe buýt",
};
const dietaryPreferenceLabels = {
  0: "Ăn được hết",
  1: "Thuần chay",
  2: "Chay trường",
  3: "Không chứa protein từ gạo và ngũ cốc",
  4: "Đạo Hồi",
  5: "Đạo Do Thái",
  6: "Chay nhưng ăn cá",
};

const serviceTypeLabels = {
  0: "Lưu trú",
  1: "Ăn uống",
  2: "Vui chơi giải trí",
  3: "Cung cấp phương tiện",
};

const facilityTypeLabels = {
  0: "Khách sạn",
  1: "Nhà hàng",
  2: "Địa điểm vui chơi giải trí",
  3: "Địa điểm cung cấp phương tiện di chuyển",
  4: "Đại lý vé máy bay",
};
const ratingLabels = {
  0: "Nhà nghỉ",
  1: "Khách sạn 2 sao",
  2: "Khách sạn 3 sao",
  3: "Khách sạn 4 sao",
  4: "Khách sạn 5 sao",
  5: "Quán ăn bình dân",
  6: "Nhà hàng 2 sao",
  7: "Nhà hàng 3 sao",
  8: "Nhà hàng 4 sao",
  9: "Nhà hàng 5 sao",
  10: "Khu resort nghỉ dưỡng",
  11: "Khu du lịch",
};

const ratingLabelsAPI = [
  {
    id: "34115F50-25D5-4750-8500-5CB917F27DA5",
    ratingId: 0,
    label: "Nhà nghỉ",
  },
  {
    id: "1E955290-E063-439F-8E17-D2EDCB2AD69B",
    ratingId: 1,
    label: "Khách sạn 2 sao",
  },
  {
    id: "1BA853DB-84E4-4E9C-B750-DBE432D1A2B0",
    ratingId: 2,
    label: "Khách sạn 3 sao",
  },
  {
    id: "EF3FC5D9-7C7A-44C3-8FC1-8DA12CA7E93B",
    ratingId: 3,
    label: "Khách sạn 4 sao",
  },
  {
    id: "F2603607-D947-4ACA-888E-9FD3BC3C0339",
    ratingId: 4,
    label: "Khách sạn 5 sao",
  },
  
  {
    id: "D39D6346-6831-4155-B27A-A2A779271BA2",
    ratingId: 10,
    label: "Khu resort nghỉ dưỡng",
  },
  
];

const ratingEntertaimentAPI = [{
  id: "994CB1A9-6D4E-4D34-B904-91B229A12D5C",
  ratingId: 11,
  label: "Khu du lịch",
},]

const ratingRestaurantAPI = [{
  id: "F48D19EE-36AE-49BD-88ED-A3D326B1B1D8",
  ratingId: 5,
  label: "Quán ăn bình dân",
},
{
  id: "23C8E757-AC2D-4232-A569-D5461DEB9B05",
  ratingId: 6,
  label: "Nhà hàng 2 sao",
},
{
  id: "A59BBB50-4FCC-473F-BBF4-B311F06B2ED8",
  ratingId: 7,
  label: "Nhà hàng 3 sao",
},
{
  id: "FA63BF87-51A3-46B7-A6DF-AA29FB9B9057",
  ratingId: 8,
  label: "Nhà hàng 4 sao",
},
{
  id: "4B3961FF-AA19-41FD-9A3E-1A6B37F99D09",
  ratingId: 9,
  label: "Nhà hàng 5 sao",
},];


const optionClassLabels = {
  0: "Gói tiết kiệm",
  1: "Gói cơ bản",
  2: "Gói cao cấp",
};

const servingHotelsQuantity = {
  2: "Loại phòng 2 người",
  4: "Loại phòng 4 người",
  6: "Loại phòng 6 người",
};

const servingFoodsQuantity = {
  5: "Loại bàn ăn 5 người",
  10: "Loại Bàn ăn 10 người",
};

const servingVehiclesQuantity = {
  0: "Xe buýt - 44 chỗ",
  1: "Xe khách - 29 chỗ",
  2: "Limousine - 14 chỗ",
  3: "Xe ô tô - 6 chỗ",
  4: "Máy bay",
  5: "Tàu/ thuyền",
  6: "Xe đạp",
  7: "Trực thăng",
};

const servingActor = {
  0: "Chỉ người lớn",
  1: "Chỉ Trẻ em",
  2: "Mọi đối tượng",
};


const vehicleTypeLabels = {
  0: "Xe buýt",
  1: "Xe khách",
  2: "Xe 16 chỗ",
  3: "Xe 4 chỗ",
  4: "Máy bay",
  5: "Tàu/ thuyền",
  6: "Xe đạp",
  7: "Trực thăng",
};
const unitLabels = {
  0: "Ngày",
  1: "Phòng",
  2: "Người",
};
export {
  unitLabels,
  vehicleTypeLabels,
  optionClassLabels,
  statusPrivateTourLabels,
  typePortLabels,
  dietaryPreferenceLabels,
  serviceTypeLabels,
  facilityTypeLabels,
  ratingLabels,
  servingHotelsQuantity,
  servingFoodsQuantity,
  servingVehiclesQuantity,  
  servingActor,
  ratingLabelsAPI,
  ratingEntertaimentAPI,
  ratingRestaurantAPI,
};
