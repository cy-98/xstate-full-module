import React from "react";
import Slick, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Slider: React.FC<Settings> = (props) => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...props
  };

  return (
    <Slick {...settings}>
      {props.children}
    </Slick>
  );
};
