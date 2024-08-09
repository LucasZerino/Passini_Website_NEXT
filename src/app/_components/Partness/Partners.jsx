"use client";

import React from "react";
import Slider from "react-slick";

const partners = [
  {
    id: 2,
    logo: "/images/clientes/MPD.png",
  },
  {
    id: 3,
    logo: "/images/clientes/USIMINAS.png",
  },
  {
    id: 4,
    logo: "/images/clientes/braskem_2.png",
  },
  {
    id: 5,
    logo: "/images/clientes/vale.png",
  },
  {
    id: 6,
    logo: "/images/clientes/kallas.png",
  },
];

const Partners = () => {
  const settings = {
    autoplay: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} arrows={false}>
      {partners.map((partner) => (
        <div className="item" key={partner.id}>
          <div className="icon d-flex align-items-center justify-content-center">
            <img src={partner.logo} alt="" />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Partners;
