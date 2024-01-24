import React from "react";
import Cards2 from "./Cards/Cards2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LatestProducts = ({ products }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Set the autoplay speed in milliseconds (adjust as needed)
    appendArrows: "#custom-arrows",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <>
    
      <Slider  {...settings}>
        {products &&
          products
            // .slice(0, 5)
            .filter((item) => item.productstatus === true)
            .map((product, i) => (
              <div key={i}>
                <Cards2 product={product} />
              </div>
            ))}
      </Slider>
    </>
  );
};

const CustomPrevArrow = (props) => (
  <div className="custom-prev-arrow" onClick={props.onClick}>
    Previous
  </div>
);

const CustomNextArrow = (props) => (
  <div className="custom-next-arrow" onClick={props.onClick}>
    Next
  </div>
);

export default LatestProducts;
