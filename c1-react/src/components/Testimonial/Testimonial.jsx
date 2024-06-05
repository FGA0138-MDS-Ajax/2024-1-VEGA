import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonialInfo = [
  {
    img: "/assets/img/testimonial/testimonial_1.jpg",
    title: "Steven K. Roberts",
    subtitle: "From USA",
    content:
      "“Their talented team of passionate chefs masterfully crafts each dish, combining the finest ingredients with innovative techniques to present culinary creations that are as visually stunning as they are delicious.”",
  },
  {
    img: "/assets/img/testimonial/testimonial_2.jpg",
    title: "K. Roberts",
    subtitle: "From ",
    content:
      "“Their talented team of passionate chefs masterfully crafts each dish, combining the finest ingredients with innovative techniques to present culinary creations that are as visually stunning as they are delicious.”",
  },
  {
    img: "/assets/img/testimonial/testimonial_3.jpg",
    title: "Jon K. Sun",
    subtitle: "From ",
    content:
      "“Their talented team of passionate chefs masterfully crafts each dish, combining the finest ingredients with innovative techniques to present culinary creations that are as visually stunning as they are delicious.”",
  },
];

export default function Testimonial() {
  const swiperTestimonialRef = useRef();
  return (
    <section className="container">
      <div className="ak-height-150 ak-height-lg-60"></div>
      <div className="ak-slider ak-slider-3">
        <Swiper
          loop={true}
          slidesPerView={"auto"}
          onSwiper={(swiper) => {
            swiperTestimonialRef.current = swiper;
          }}
        >
          {testimonialInfo?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="container">
                  <div className="testimonial-section">
                    <div className="testimonial-icon-1">
                      <img
                        src="/assets/img/icon/testimonial_icon_l.svg"
                        alt="..."
                      />
                    </div>
                    <div className="testimonial-info-section">
                      <div className="testimonial-info">
                        <img
                          src={item.img}
                          className="testimonial-info-img"
                          alt="..."
                        />
                        <h6 className="testimonial-info-title">{item.title}</h6>
                        <p className="short-title">{item.subtitle}</p>
                        <p className="testimonial-info-subtitle">
                          {item.content}
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-icon-1">
                      <img
                        src="/assets/img/icon/testimonial_icon_r.svg"
                        alt="..."
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="ak-swiper-controll-3">
        <div className="ak-swiper-navigation-wrap">
          <div className="ak-swiper-button-prev-3">
            <button
              className="btn-style-2 btn-size btn-style-round button-prev-next-2 rotate-svg"
              aria-disabled="false"
              onClick={() => swiperTestimonialRef.current.slideNext()}
            >
              <svg width="20" height="14" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#fff" fill="none" fillRule="evenodd">
                  <path d="M12.743 1.343L18.4 7l-5.657 5.657M18.4 7H.4"></path>
                </g>
              </svg>
              <svg width="20" height="14" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#fff" fill="none" fillRule="evenodd">
                  <path d="M12.743 1.343L18.4 7l-5.657 5.657M18.4 7H.4"></path>
                </g>
              </svg>
            </button>
          </div>
          <div className="ak-swiper-button-next-3">
            <button
              className="btn-style-2 btn-size btn-style-round button-prev-next-2"
              aria-disabled="false"
              onClick={() => swiperTestimonialRef.current.slidePrev()}
            >
              <svg width="20" height="14" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#fff" fill="none" fillRule="evenodd">
                  <path d="M12.743 1.343L18.4 7l-5.657 5.657M18.4 7H.4"></path>
                </g>
              </svg>
              <svg width="20" height="14" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#fff" fill="none" fillRule="evenodd">
                  <path d="M12.743 1.343L18.4 7l-5.657 5.657M18.4 7H.4"></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
