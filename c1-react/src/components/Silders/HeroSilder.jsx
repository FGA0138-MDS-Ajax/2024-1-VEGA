import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { scrollButton } from "../../helper/main";
import { Link } from "react-router-dom";

import bg_img from "/assets/img/bg/hero_bg_2.jpg";

const sliderData = [
  {
    id: 1,
    title: "Elegent Italian Food",
    maintitle: "Elegance Retreat",
    subtitle: "Restaurant",
    buttonText: "View More",
    buttonUrl: "reservations",
  },
  {
    id: 2,
    title: "Elegent Italian Food",
    maintitle: "Elegance Retreat",
    subtitle: "Restaurant",
    buttonText: "View More",
    buttonUrl: "reservations",
  },
];

export default function HeroSilder() {
  const swiperRef = useRef(null);
  const scrollbtn = () => {
    scrollButton();
  };
  return (
    <div className="ak-hero ak-style1 heignt-100vh">
      <img className="ak-hero-bg ak-bg" src={bg_img} alt="..." />
      <div className="container">
        <div className="hero-text-section container-fluid container-md">
          <div className="ak-slider ak-slider-hero-1">
            <Swiper
              loop={true}
              slidesPerView={"auto"}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {sliderData.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="slider-info">
                    <div className="hero-title">
                      <p className="mini-title">{item.title}</p>
                      <h1 className="hero-main-title">{item.maintitle}</h1>
                      <h1 className="hero-main-title-1 style-2">
                        {item.subtitle}
                      </h1>
                    </div>
                    <div className="ak-height-40 ak-height-lg-30"></div>
                    <Link to={item.buttonUrl} className="hero-btn style-1">
                      <div className="ak-btn style-5">{item.buttonText}</div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="ak-swiper-controll-hero-1">
          <div className="ak-swiper-navigation-wrap">
            <div
              className="hero-swiper-prev"
              onClick={() => swiperRef.current.slideNext()}
            >
              <div className="btn-cricle"></div>
              <div className="btn-arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="41"
                  viewBox="0 0 29 41"
                  fill="none"
                >
                  <path
                    d="M20.5013 20.0839L14.6041 14.1866C14.3922 13.9392 14.0199 13.9104 13.7726 14.1223C13.5252 14.3341 13.4964 14.7064 13.7083 14.9538C13.728 14.9769 13.7495 14.9984 13.7726 15.0181L18.6614 19.9129H2.24401C1.91834 19.9129 1.6543 20.1769 1.6543 20.5026C1.6543 20.8284 1.91834 21.0924 2.24401 21.0924H18.6614L13.7726 25.9812C13.5252 26.193 13.4964 26.5653 13.7083 26.8127C13.9202 27.0601 14.2924 27.0889 14.5398 26.877C14.5628 26.8572 14.5844 26.8358 14.6041 26.8127L20.5014 20.9154C20.73 20.6854 20.73 20.314 20.5013 20.0839Z"
                    fill="#FFD28D"
                  />
                </svg>
              </div>
            </div>
            <div
              className="hero-swiper-next"
              onClick={() => swiperRef.current.slidePrev()}
            >
              <div className="btn-cricle"></div>
              <div className="btn-arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="41"
                  viewBox="0 0 29 41"
                  fill="none"
                >
                  <path
                    d="M1.82581 20.0839L7.72307 14.1866C7.93491 13.9392 8.3072 13.9104 8.55457 14.1223C8.80194 14.3341 8.83078 14.7064 8.61889 14.9538C8.59912 14.9769 8.57763 14.9984 8.55457 15.0181L3.66574 19.9129H20.0831C20.4088 19.9129 20.6729 20.1769 20.6729 20.5026C20.6729 20.8284 20.4088 21.0924 20.0831 21.0924H3.66574L8.55457 25.9812C8.80194 26.193 8.83078 26.5653 8.61889 26.8127C8.40699 27.0601 8.03475 27.0889 7.78738 26.877C7.76432 26.8572 7.74278 26.8358 7.72307 26.8127L1.82575 20.9154C1.59714 20.6854 1.59714 20.314 1.82581 20.0839Z"
                    fill="#FFD28D"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="social-icon-section">
        <p>FOLLOW US</p>
        <div className="social-border"></div>
        <div className="social-icon">
          <a href="https://www.facebook.com/">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <g clipPath="url(#clip0_2049_19)">
                  <path
                    d="M9.26044 16.5654L9.26044 9.26761L11.709 9.26761L12.0764 6.42268H9.26044V4.60661C9.26044 3.78319 9.48816 3.22204 10.6703 3.22204L12.1755 3.22142V0.676814C11.9152 0.642986 11.0216 0.56543 9.98165 0.56543C7.80997 0.56543 6.3232 1.891 6.3232 4.32485L6.3232 6.42268H3.86719L3.86719 9.26761H6.3232L6.3232 16.5654H9.26044Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2049_19">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0.0214844 0.56543)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </a>
          <a href="https://bd.linkedin.com/">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <g clipPath="url(#clip0_2049_21)">
                  <path
                    d="M16.0173 16.5659L16.0213 16.5652V10.6972C16.0213 7.82657 15.4033 5.61523 12.0473 5.61523C10.434 5.61523 9.35133 6.50057 8.90933 7.3399H8.86266V5.88323L5.68066 5.88323L5.68066 16.5652H8.994L8.994 11.2759C8.994 9.88324 9.258 8.53657 10.9827 8.53657C12.682 8.53657 12.7073 10.1259 12.7073 11.3652L12.7073 16.5659H16.0173Z"
                    fill="white"
                  />
                  <path
                    d="M0.285156 5.88281L3.60249 5.88281L3.60249 16.5648H0.285156L0.285156 5.88281Z"
                    fill="white"
                  />
                  <path
                    d="M1.94282 0.56543C0.882151 0.56543 0.0214844 1.4261 0.0214844 2.48676C0.0214844 3.54743 0.882151 4.4261 1.94282 4.4261C3.00348 4.4261 3.86415 3.54743 3.86415 2.48676C3.86348 1.4261 3.00282 0.56543 1.94282 0.56543Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2049_21">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0.0214844 0.56543)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </a>
          <a href="https://twitter.com/">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
              >
                <g clipPath="url(#clip0_2049_17)">
                  <path
                    d="M16.5454 1.60543C15.9454 1.86543 15.3254 2.04543 14.6654 2.12543C15.3454 1.72543 15.8654 1.08543 16.1054 0.30543C15.4654 0.68543 14.7654 0.94543 14.0254 1.10543C13.4254 0.46543 12.5654 0.0654297 11.6254 0.0654297C9.80541 0.0654297 8.34541 1.54543 8.34541 3.34543C8.34541 3.60543 8.36541 3.84543 8.42541 4.08543C5.70541 3.96543 3.30541 2.64543 1.68541 0.66543C0.52541 2.74543 1.82541 4.46543 2.68541 5.04543C2.16541 5.04543 1.64541 4.88543 1.20541 4.64543C1.20541 6.26543 2.34541 7.60543 3.82541 7.90543C3.50541 8.00543 2.78541 8.06543 2.34541 7.96543C2.76541 9.26543 3.98541 10.2254 5.40541 10.2454C4.28541 11.1254 2.64541 11.8254 0.54541 11.6054C2.00541 12.5454 3.72541 13.0854 5.58541 13.0854C11.6254 13.0854 14.9054 8.08543 14.9054 3.76543C14.9054 3.62543 14.9054 3.48543 14.8854 3.34543C15.5654 2.84543 16.1254 2.26543 16.5454 1.60543Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2049_17">
                    <rect
                      width="17"
                      height="14"
                      fill="white"
                      transform="translate(0.521484)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </a>
        </div>
      </div>
      <div className="scroll-btn" id="scroll-btn" onClick={() => scrollbtn()}>
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="55"
            viewBox="0 0 52 55"
            fill="none"
          >
            <path
              d="M25.4001 38.124L16.8902 29.6143C16.5333 29.3086 16.4917 28.7714 16.7974 28.4144C17.1031 28.0575 17.6404 28.0158 17.9973 28.3216C18.0306 28.3501 18.0617 28.3811 18.0901 28.4144L25.1532 35.469L25.1532 1.77869C25.1532 1.30875 25.5343 0.927734 26.0043 0.927734C26.4743 0.927734 26.8552 1.30875 26.8552 1.77869L26.8552 35.469L33.9098 28.4144C34.2155 28.0575 34.7527 28.0158 35.1097 28.3216C35.4666 28.6274 35.5082 29.1645 35.2025 29.5215C35.174 29.5547 35.1429 29.5858 35.1097 29.6143L26.5999 38.1241C26.2681 38.454 25.732 38.454 25.4001 38.124Z"
              fill="#FFD28D"
              className="arro"
            />
            <path
              d="M51 29C51 32.283 50.3534 35.5339 49.097 38.5671C47.8406 41.6002 45.9991 44.3562 43.6777 46.6777C41.3562 48.9991 38.6002 50.8406 35.5671 52.097C32.5339 53.3534 29.283 54 26 54C22.717 54 19.4661 53.3534 16.4329 52.097C13.3998 50.8406 10.6438 48.9991 8.32233 46.6777C6.00086 44.3562 4.15938 41.6002 2.90301 38.5671C1.64664 35.5339 0.999998 32.283 0.999998 29"
              stroke="#FFD28D"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
