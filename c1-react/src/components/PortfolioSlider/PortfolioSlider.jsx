import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import protfoliList from "../../dataJson/protfolilists.json";

export default function PortfolioSlider() {
  const swiperTestimonialRefpro = useRef();
  return (
    <section>
      <div className="ak-height-150 ak-height-lg-60"></div>
      <div className="container-fluid">
        <SectionTitle
          title={"Food Items"}
          subTitle={"Food Showcase"}
          tyle={"center"}
        />
        <div className="ak-height-65 ak-height-lg-30"></div>
        <div className="ak-slider ak-slider-2">
          <Swiper
            loop={true}
            slidesPerView={"auto"}
            centeredSlides={true}
            modules={[Pagination]}
            pagination={{ clickable: true, el: ".ak-pagination-2" }}
            onSwiper={(swiper) => {
              swiperTestimonialRefpro.current = swiper;
            }}
          >
            {protfoliList?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="col">
                    <Link
                      to={`/portfolio-details/${item.id}`}
                      className="ak-card ak-style-1"
                    >
                      <div className="ak-card-img">
                        <img src={item.img} alt="..." />
                      </div>
                      <div className="card-info">
                        <div className="card-text style-1">
                          <h5 className="card-title">{item.title}</h5>
                          <div className="card-subtitle">{item.subtitle}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="container">
          <div className="ak-next-prev-2">
            <div className="ak-next-prev-2 ak-style-1">
              <div className="ak-swiper-button-prev-2">
                <button
                  className="btn-style-2 btn-size btn-style-round button-prev-next-2 rotate-svg"
                  aria-disabled="false"
                  onClick={() => swiperTestimonialRefpro.current.slideNext()}
                >
                  <svg
                    width="20"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g stroke="#fff" fill="none" fillRule="evenodd">
                      <path d="M12.743 1.343L18.4 7l-5.657 5.657M18.4 7H.4"></path>
                    </g>
                  </svg>
                  <svg
                    width="20"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g stroke="#fff" fill="none" fillRule="evenodd">
                      <path d="M12.743 1.343L18.4 7l-5.657 5.657M18.4 7H.4"></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="ak-pagination-2 ak-style1"></div>
              <div className="ak-swiper-button-next-2">
                <button
                  className="btn-style-2 btn-size btn-style-round button-prev-next-2"
                  aria-disabled="false"
                  onClick={() => swiperTestimonialRefpro.current.slidePrev()}
                >
                  <svg
                    width="20"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g stroke="#fff" fill="none" fillRule="evenodd">
                      <path d="M12.743 1.343L18.4 7l-5.657 5.657M18.4 7H.4"></path>
                    </g>
                  </svg>
                  <svg
                    width="20"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g stroke="#fff" fill="none" fillRule="evenodd">
                      <path d="M12.743 1.343L18.4 7l-5.657 5.657M18.4 7H.4"></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
