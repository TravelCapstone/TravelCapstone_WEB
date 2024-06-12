// src/pages/ListPage.js
import React from 'react';
import StyledList from './style/StyleList';

const mockData = [
    {
      id: 1,
      nameTour: 'Discover the Heart of the City',
      minPrice: 9990000,
      location: ['New York', 'Los Angeles', 'Las Vegas'],
      duration: '5N4D',
      totalSlotOrdered: 5,
      groupSize: 15,
      images: [
        'https://happytour.com.vn/public/userfiles/tour/127/z4642551066707_d74702844ce5a1acd5c4db89e0d79d9d.jpg',
        'https://dulichviet.com.vn/images/bandidau/NOI-DIA/Da-Nang/tour-da-nang-mua-he-gia-tot-du-lich-viet.jpg',
        'https://dulichgialai.vn/files/common/tour-du-lich-gia-lai-da-nang-hoi-an-ba-na-hill-2mepu.jpg',
      ],
    },
    {
      id: 2,
      nameTour: 'Mountains Adventure Awaits',
      minPrice: 4990000,
      location: ['Rocky Mountain', 'Mount Everest', 'Alps'],
      duration: '7N6D',
      totalSlotOrdered: 8,
      groupSize: 20,
      images: [
        'https://photo-cms-baophapluat.epicdn.me/w840/Uploaded/2024/dcdivivp/2023_09_04/dji-0955-4392.jpg',
        'https://haidangtravel.com/image/blog/tour-du-lich-trong-nuoc-h1.jpg',
        'https://cdnimgen.vietnamplus.vn/uploaded/wbxx/2021_11_15/live_fully.jpg',
      ],
    },
    {
      id: 3,
      nameTour: 'Beach Paradise Escape',
      minPrice: 3990000,
      location: ['Maldives', 'Bora Bora', 'Bahamas'],
      duration: '3N2D',
      totalSlotOrdered: 12,
      groupSize: 30,
      images: [
        'https://dulichviet.com.vn/images/bandidau/du-lich-trong-nuoc-du-lich-viet-nam-2.jpg',
        'https://happytourvn.com/public/userfiles/Tay-ninh/tayninh-nuibaden-1ngay.jpg',
        'https://happytour.com.vn/public/userfiles/Tay-ninh/tayninh-nuibaden-1ngay.jpg',
      ],
    },
    // ... add more mock tours as needed
  ];
  

export default function ListPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="uppercase my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Sự lựa chọn hàng đầu
          </h1>
      <StyledList items={mockData} />
      {/* More content here if needed */}
    </div>
  );
}
