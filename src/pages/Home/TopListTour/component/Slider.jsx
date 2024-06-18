import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { Carousel, Modal, Button } from "antd";
import { themeGet } from "@styled-system/theme-get";
import PostImageGallery from "./PostImageGallery";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const PostImage = styled.div`
  margin: 0 auto;
  height: 550 px;
  position: relative;

  @media (max-width: 767px) {
    height: 406px;
  }

  img.absolute {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }

  .image_gallery_button {
    background: ${themeGet("color.1", "#ffffff")};
    border-radius: 3px;
    font-size: 15px;
    font-weight: 700;
    color: #2c2c2c;
    border: 0;
    height: 37px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    position: absolute;
    bottom: 30px;
    right: 25px;

    &:hover,
    &:focus {
      background: ${themeGet("color.2", "#F7F7F7")};
      color: ${themeGet("text.0", "#2C2C2C")};
    }
  }
`;

const SliderWrapper = styled.div`
  .ant-carousel .slick-slide {
    text-align: center;
    height: 550px;
    line-height: 600px;
    overflow: hidden;
  }

  .ant-carousel .slick-slide div {
    height: 100%; /* Ensure the div inside the slick-slide takes full height */
    display: block !important; /* Remove inline-block to ensure full width */
  }

  .ant-carousel .slick-slide img {
    // min-width: 320px;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures image covers the container without distortion */
    margin-top: 0; /* Ensures no margin is added */
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    color: #fff;
  }

  .slick-prev {
    left: 10px;
  }
  .slick-next {
    right: 10px;
  }

  @media (max-width: 767px) {
    .ant-carousel .slick-slide {
      text-align: center;
      height: 400px;
      line-height: 600px;
      overflow: hidden;
    }
  }
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  color: white;
  border: none;
  font-size: 24px;
  padding: 10px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover,
  &:focus {
    border-radius: 5px;

    background: rgba(0, 0, 0, 0.7);
    color: white;
  }
`;

const PrevArrow = ({ onClick }) => (
  <ArrowButton onClick={onClick} style={{ left: 10 }}>
    <LeftOutlined />
  </ArrowButton>
);

const NextArrow = ({ onClick }) => (
  <ArrowButton onClick={onClick} style={{ right: 10 }}>
    <RightOutlined />
  </ArrowButton>
);

const Slider = ({ images }) => {
  const [isModalShowing, setIsModalShowing] = useState(false);

  const galleryItems = images.map((url) => ({
    original: url,
    thumbnail: url, // hoặc một đường dẫn thumbnail phù hợp nếu có
  }));

  return (
    <PostImage>
      <SliderWrapper>
        <Carousel
          autoplay={false} // Disable auto play
          arrows // Enable arrows
          prevArrow={<PrevArrow />} // Custom previous arrow
          nextArrow={<NextArrow />} // Custom next arrow
        >
          {images.map((image, index) => (
            <div key={index}>
              <img className="rounded-md" src={image} alt={`slide-${index}`} />
            </div>
          ))}
        </Carousel>
      </SliderWrapper>
      <Button
        type="primary"
        onClick={() => setIsModalShowing(true)}
        className="image_gallery_button"
      >
        View Photos
      </Button>
      <Modal
        open={isModalShowing}
        onCancel={() => setIsModalShowing(false)}
        footer={null}
        width="80%"
        wrapClassName="image_gallery_modal"
        closable={false}
      >
        <Fragment>
          <div className="text-right">
            <Button
              onClick={() => setIsModalShowing(false)}
              className="image_gallery_close mb-4"
            >
              <svg width="13.004" height="13" viewBox="0 0 16.004 16">
                <path
                  id="_ionicons_svg_ios-close_2_"
                  d="M170.4,168.55l5.716-5.716a1.339,1.339,0,1,0-1.894-1.894l-5.716,5.716-5.716-5.716a1.339,1.339,0,1,0-1.894,1.894l5.716,5.716-5.716,5.716a1.339,1.339,0,0,0,1.894,1.894l5.716-5.716,5.716,5.716a1.339,1.339,0,0,0,1.894-1.894Z"
                  transform="translate(-160.5 -160.55)"
                  fill="#909090"
                />
              </svg>
            </Button>
          </div>
          <PostImageGallery items={galleryItems} />
        </Fragment>
      </Modal>
    </PostImage>
  );
};

export default Slider;
