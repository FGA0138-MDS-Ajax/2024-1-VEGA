import React, { useLayoutEffect, useRef } from "react";
import { ButtonCommon } from "../Button/Button";
import SectionTitle from "../SectionTitle/SectionTitle";
import { borderAnimation, imageZoomInOut } from "../../helper/main";

const about_content = {
  title: "Royalty",
  textWhite: "Exquisite Dining Experience Fit for",
  imgOne: "/assets/img/about/about_bg.jpg",
  subtext:
    "Lorem to our restaurant, where culinary artistry meets exceptional dining experiences. At, we strive to create a gastronomic haven that.",
  details:
    "Welcome to our restaurant, where culinary artistry meets exceptional dining experiences. At, we strive to create a gastronomic haven that tantalizes your taste buds and leaves you with unforgettable memories.",
};

const { title, textWhite, imgOne, subtext, details } = about_content;

export default function AboutContent() {
  const imageContainer = useRef(null);
  const imageZoomIn = useRef(null);
  const borderAbout = useRef(null);

  useLayoutEffect(() => {
    imageZoomInOut(imageContainer.current, imageZoomIn.current);
    borderAnimation(borderAbout.current, 2, 13);
  }, []);

  return (
    <section className="ak-about-bg-color" ref={imageContainer}>
      <div className="ak-height-150 ak-height-lg-60"></div>
      <div className="ak-about ak-style-1">
        <div className="ak-about-bg-img ak-bg">
          <img src={imgOne} alt="..." ref={imageZoomIn} />
        </div>
        <div className="ak-about-hr" ref={borderAbout}></div>
        <div className="container">
          <div className="about-section ak-about-1">
            <div className="about-text-section">
              <SectionTitle title={title} textWhite={textWhite} />

              <div className="ak-height-30 ak-height-lg-30"></div>
              <p className="about-subtext">{details}</p>
              <div className="ak-height-30 ak-height-lg-30"></div>
              <p className="about-subtext">{subtext}</p>
              <div className="ak-height-50 ak-height-lg-30"></div>
              <ButtonCommon to={"/about"}>Discover The Kitchen</ButtonCommon>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
