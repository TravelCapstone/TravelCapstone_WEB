// TourDetailPage.js
import React from "react";
import Slider from "./component/Slider";
import TourDetails from "./component/TourDetails";
import TourTabs from "./component/TourTabs";
import BookingSection from "./component/BookingSection";
import BreadcrumbWithBackButton from "../../../components/BreadCrumb/BreadCrumb";
import styled from "styled-components";
import OrderCard from "../../Customer/TourRequest/CompanyTour/componentTour.jsx/CardTour";
import TailwindCard from "./style/StyleCard";

const PageContainer = styled.div`
  max-width: 70%;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 80px;

  @media (max-width: 1500px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const LeftColumn = styled.div`
  flex: 7;
`;

const RightColumn = styled.div`
  margin-top: 20px;
  flex: 3;
  display: flex;
  flex-direction: column;
  //   gap: 5px;
  max-width: 400px;

  @media (max-width: 1500px) {
    margin-top: 0;
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
`;

const tourData = {
  id: 1,
  nameTour: "Amazing Vietnam Tour",
  description:
    "Đến với Đà Nẵng một thành phố được mệnh danh là “ Thành phố đáng sống nhất Việt Nam ”. Tại nơi đây Quý khách có thể thỏa sức mình ngụp lặn trong làn nước biếc, nô giỡn với những con sóng và tắm nắng trên bãi cát trắng mịn. Mẹ thiên nhiên đã ưu ái ban tặng cho địa danh này không chỉ là cảnh quan thiên nhiên tươi đẹp như đèo Hải Vân với danh xưng Thiên hạ đệ nhất hùng quang, mà còn là những hải sản tươi sống, tươi ngon như tôm, mực, ghẹ, mực trứng và đặc biệt để níu giữ chân du khách không thể không kể đến đặc sản Cao Lầu, sợi mỳ ăn cùng thịt xá xíu, chan vừa đủ nước sốt rồi thêm ít rau xanh. Từ xa xưa, Cao Lầu đã trở thành linh hồn ẩm thực văn hóa Đà Nẵng. Đà Nẵng còn níu chân du khách bởi những con người chân chất với nụ cười thân thiện, mến khách , khí hậu mát mẻ quanh năm… ai đã từng đặt chân đến nơi đây sẽ nhớ mãi không quên và quay trở lại.",
  mainVehicle: "Bus",
  rating: 4.5,
  numFeedBack: 2,
  minPrice: 500,
  maxPrice: 1000,
  nowPrice: 750,
  images: [
    "https://photo-cms-baophapluat.epicdn.me/w840/Uploaded/2024/dcdivivp/2023_09_04/dji-0955-4392.jpg",
    "https://haidangtravel.com/image/blog/tour-du-lich-trong-nuoc-h1.jpg",
    "https://dulichgialai.vn/files/common/tour-du-lich-gia-lai-da-nang-hoi-an-ba-na-hill-2mepu.jpg",
  ],
  videos: ["link-to-video1.mp4", "link-to-video2.mp4"],
  isPrivate: false,
  qrCode: "link-to-qr-code.png",
  location: ["Hanoi", "Halong Bay", "Ho Chi Minh City"],
  duration: "5 Ngày 4 đêm",
  startDate: "2024-07-01",
  endDate: "2024-07-10",
  planDetail: {
    day1: {
      name: "Arrival in Hanoi",
      location: "Hanoi",
      time: "08:00 AM",
      activities: "City tour, Water puppet show",
      note: "Welcome dinner at local restaurant",
    },
    day2: {
      name: "Halong Bay Cruise",
      location: "Halong Bay",
      time: "09:00 AM",
      activities: "Cruise, Kayaking",
      note: "Overnight on the boat",
    },
    // Thêm các ngày khác theo mẫu trên
  },
  hotel: "5-star hotel",
  transportation: "Bus, Boat",
  meals: "Breakfast, Lunch, Dinner",
  groupSize: 20,
  travelInsurance: true,
  travelInsuranceDetail: "Coverage up to $50,000",
  specialRequirements: "Vegetarian meals available upon request",
  ageOrOtherRestrictions: "Minimum age 12 years",
  feedback: [
    { user: "John Doe", comment: "Amazing tour! Highly recommended." },
    {
      user: "Jane Smith",
      comment: "Great experience, but the food could be better.",
    },
  ],
  necessaryItems: "Comfortable shoes, Sunscreen, Hat",
  policy: [
    {
      numberType: "1",
      nameType: "Cancellation Policy",
      desc: "<ul><li>Cancel 30 days in advance for a full refund.</li><li>No refund for cancellations within 7 days of the tour.</li></ul>",
    },
    {
      numberType: "2",
      nameType: "Payment Policy",
      desc: "<ul><li>50% deposit required at booking.</li><li>Full payment due 14 days before the tour.</li></ul>",
    },
  ],
  bookingInformation:
    "<p>For booking, please visit our website or contact our customer service.</p><p>Payment can be made via credit card or bank transfer.</p>",
};

const relatedTours = [
  {
    id: 5,
    nameTour: "Discover the Heart of the City",
    minPrice: 9990000,
    location: ["New York", "Los Angeles", "Las Vegas"],
    duration: "5N4D",
    totalSlotOrdered: 5,
    groupSize: 15,
    images: [
      "https://happytour.com.vn/public/userfiles/tour/127/z4642551066707_d74702844ce5a1acd5c4db89e0d79d9d.jpg",
      "https://dulichviet.com.vn/images/bandidau/NOI-DIA/Da-Nang/tour-da-nang-mua-he-gia-tot-du-lich-viet.jpg",
      "https://dulichgialai.vn/files/common/tour-du-lich-gia-lai-da-nang-hoi-an-ba-na-hill-2mepu.jpg",
    ],
  },
  {
    id: 6,
    nameTour: "Mountains Adventure Awaits",
    minPrice: 4990000,
    location: ["Rocky Mountain", "Mount Everest", "Alps"],
    duration: "7N6D",
    totalSlotOrdered: 8,
    groupSize: 20,
    images: [
      "https://photo-cms-baophapluat.epicdn.me/w840/Uploaded/2024/dcdivivp/2023_09_04/dji-0955-4392.jpg",
      "https://haidangtravel.com/image/blog/tour-du-lich-trong-nuoc-h1.jpg",
      "https://cdnimgen.vietnamplus.vn/uploaded/wbxx/2021_11_15/live_fully.jpg",
    ],
  },
  {
    id: 7,
    nameTour: "Beach Paradise Escape",
    minPrice: 3990000,
    location: ["Maldives", "Bora Bora", "Bahamas"],
    duration: "3N2D",
    totalSlotOrdered: 12,
    groupSize: 30,
    images: [
      "https://dulichviet.com.vn/images/bandidau/du-lich-trong-nuoc-du-lich-viet-nam-2.jpg",
      "https://happytourvn.com/public/userfiles/Tay-ninh/tayninh-nuibaden-1ngay.jpg",
      "https://happytour.com.vn/public/userfiles/Tay-ninh/tayninh-nuibaden-1ngay.jpg",
    ],
  },
  // ... add more mock tours as needed
];

const TourDetailPage = () => (
  <div className="max-w-[70%] my-32 mx-auto">
    <div className="mb-4 mx-4">
      <BreadcrumbWithBackButton
        currentTab={`Thông tin chi tiết tour ${tourData.nameTour} - ${tourData.duration}`}
      />
    </div>
    <div className="font-bold text-2xl my-6 ml-2 text-mainColor">
      <h1>
        {tourData.nameTour} - {tourData.duration}{" "}
      </h1>
    </div>
    <Slider images={tourData.images} />
    <TourDetails
      name={tourData.nameTour}
      rating={tourData.rating}
      numFeedBack={tourData.numFeedBack}
      address={tourData.location.join(", ")}
    />
    <ContentWrapper>
      <LeftColumn>
        <TourTabs
          overview={tourData.description}
          itinerary={Object.values(tourData.planDetail).map((day) => (
            <div key={day.name}>
              <h3>{day.name}</h3>
              <p>
                <strong>Location:</strong> {day.location}
              </p>
              <p>
                <strong>Time:</strong> {day.time}
              </p>
              <p>
                <strong>Activities:</strong> {day.activities}
              </p>
              <p>
                <strong>Note:</strong> {day.note}
              </p>
            </div>
          ))}
          videos={tourData.videos.map((video, index) => (
            <div key={index}>
              <video src={video} controls />
            </div>
          ))}
          reviews={tourData.feedback.map((fb, index) => (
            <div key={index}>
              <p>
                <strong>{fb.user}:</strong> {fb.comment}
              </p>
            </div>
          ))}
          pricing={tourData.policy.map((policy) => (
            <div key={policy.numberType}>
              <h3>{policy.nameType}</h3>
              <div dangerouslySetInnerHTML={{ __html: policy.desc }} />
            </div>
          ))}
        />
      </LeftColumn>
      <div>
        <p className="font-semibold my-2"> TOUR LIÊN QUAN:</p>
        <RightColumn>
          {relatedTours.map((tour, index) => (
            <TailwindCard key={tour.id} data={tour} />
          ))}
        </RightColumn>
      </div>
    </ContentWrapper>
    <BookingSection price={`$${tourData.nowPrice}`} />
  </div>
);

export default TourDetailPage;
