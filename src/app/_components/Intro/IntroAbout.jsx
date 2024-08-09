"use client";

import Image from "next/image";
import { useState } from "react";

const IntroAbout = () => {
  const [isOpen, setOpen] = useState(false);
  const cardsData = [
    {
      id: 1,
      cardNo: "card-one",
      title: "Capacidade",
      subtitle: "Imbatível",
    },
    {
      id: 2,
      title: "40+ Anos",
      cardNo: "card-two",
      subtitle: "De Experiência",
    },
    {
      id: 3,
      title: "Inovação",
      cardNo: "card-three",
      subtitle: "Tecnologia de Ponta",
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-xl-5 col-md-6 order-md-last">
          <div className="text-wrapper md-pb-70">
            <Image
              width={66}
              height={66}
              src="/images/icon/icon_103.svg"
              alt="icon"
              className="lazy-img cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <p className="tx-dark pt-30 pb-30 md-pb-15" data-aos="fade-up">
                A Passini atingiu <span className="fw-500">9.000</span> novos contratos, graças à eficiência e inovação das nossas gruas SL, destacando nossa liderança na construção civil.
            </p>
            <h6
              className="fs-20 tx-dark d-inline-block fst-italic position-relative ps-4"
              data-aos="fade-up"
            >
              Paulo Passini
            </h6>
          </div>
          {/* /.text-wrapper */}
        </div>
        {/* End .col */}

        <div className="col-xl-7 col-md-6 order-md-first" data-aos="fade-up">
          <div className="img-holder d-lg-inline-flex position-relative zn2 pb-45 xl-pb-90">
            <img
              src="/images/shape/shape_135.svg"
              alt="shape"
              className="lazy-img"
            />
            <Image
              width={561}
              height={732}
              src="/images/diretor/diretor.png"
              className="lazy-img avatar-img"
              alt="man"
            />

            {cardsData.map((item) => (
              <div
                className={`card-style ${item.cardNo} d-flex justify-content-center`}
                key={item.id}
              >
                <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-check-lg" />
                </div>
                <div className="ps-2 ps-lg-4">
                  <h3>{item.title}</h3>
                  <p className="fs-20 tx-dark m0">{item.subtitle}</p>
                </div>
              </div>
            ))}
            {/* /.card */}
          </div>
        </div>
        {/* End .col-xl-7 */}
      </div>
    </>
  );
};

export default IntroAbout;
