import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { footerAnimation, scrollUpBtn, scrollUpShow } from "../../helper/main";
import { WhiteButton } from "../../components/Button/Button";

import footerBg from "/assets/img/bg/footer_bg.png";
import elegenciaLogo from "/assets/img/logo/Elegencia.png";

const Footertext = {
  email: "info@example.com",
  phoneone: "1-800-915-6271",
  phonetwo: "1-800-915-6271",
  addressone: "2726 Av. PapineauMontreal",
  addresstwo: " H2K 4J6, Canada",
  timeone: "SUNDAY - THURSDAY: 11:30AM - 11PM",
  timetwo: "FRIDAY & SATURDAY: 11:30AM - 12AM",
  copyright: "Copyright 2023 All Right Reserved",
};

const Footernav = [
  {
    title: "Home",
    link: "/",
    key: "home",
  },
  {
    title: "About",
    link: "/about",
    key: "about",
  },
  {
    title: "Menu",
    link: "/menu",
    key: "menu",
  },
  {
    title: "Chef",
    link: "/chef",
    key: "chef",
  },
  {
    title: "Contact",
    link: "/contact",
    key: "contact",
  },
];

export default function Footer() {
  const scrollup = useRef();
  const footerContainer = useRef(null);
  const footerHrTop = useRef(null);
  const footerHrBottom = useRef(null);
  const footerTimeBorder = useRef(null);

  useLayoutEffect(() => {
    footerAnimation(
      footerContainer.current,
      footerHrTop.current,
      footerHrBottom.current,
      footerTimeBorder.current
    );
    scrollUpShow(scrollup.current);
  }, [
    footerContainer.current,
    footerHrTop.current,
    footerHrBottom.current,
    footerTimeBorder.current,
  ]);

  return (
    <footer>
      <div className="ak-height-150 ak-height-lg-150"></div>
      <div className="ak-footer ak-style-1">
        <img className="ak-bg footer-bg-img" src={footerBg} />
        <div className="container ak-hr-container" ref={footerContainer}>
          <div className="ak-braner-logo type-color-1 footer-logo">
            <div
              className="footer-log-elem"
              ref={scrollup}
              onClick={() => scrollUpBtn()}
            >
              <div className="footer-log-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="13"
                  viewBox="0 0 30 13"
                  fill="none"
                >
                  <path
                    d="M28.991 12.2063L14.8322 1L0.67334 12.2063"
                    stroke="white"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <img src={elegenciaLogo} alt="..." />
            </div>
          </div>
          <div className="ak-height-100 ak-height-lg-60"></div>
          <div className="ak-footer-hr-top" ref={footerHrTop}></div>

          <div className="footer-main">
            <div className="footer-eamil-menu">
              <div className="footer-email">
                <a href="mailto:info@example.com">{Footertext.email}</a>
              </div>
              <div className="footer-menu">
                <ul>
                  {Footernav?.map((item) => {
                    return (
                      <li key={item.key}>
                        <Link to={item.link}>{item.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="ak-height-75 ak-height-lg-5"></div>
            <div className="footer-info">
              <div className="fooer-phn">
                <a href={`tel:${Footertext.phoneone}`}>{Footertext.phoneone}</a>
                <br />
                <a href={`tel:${Footertext.phonetwo}`}>{Footertext.phonetwo}</a>
              </div>
              <div className="footer-address">
                <a
                  href="https://maps.app.goo.gl/gAd1JdfRW5d6eHkn7"
                  target="_blank"
                >
                  {Footertext.addressone}
                  <br />
                  {Footertext.addresstwo}
                </a>
              </div>
              <div className="footer-time">
                <p>{Footertext.timeone}</p>
                <div
                  className="footer-time-border my-1"
                  ref={footerTimeBorder}
                ></div>
                <p>{Footertext.timetwo}</p>
              </div>
              <div className="footer-btn">
                <WhiteButton to="reservations">Reservations</WhiteButton>
              </div>
            </div>
          </div>

          <div
            className="ak-footer-hr-bottom qodef-grid-item"
            ref={footerHrBottom}
          ></div>
          <div className="ak-height-130 ak-height-lg-30"></div>

          <div className="copy-right-section">
            <p className="text-uppercase text-md-center text-white">
              {Footertext.copyright}
            </p>
          </div>

          <div className="ak-height-45 ak-height-lg-30"></div>
        </div>
      </div>
    </footer>
  );
}
