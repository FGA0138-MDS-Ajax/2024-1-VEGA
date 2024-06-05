import React, { useLayoutEffect, useRef } from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import FoodMenuItem from "../components/FoodMenu/FoodMenuItem";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import { imageZoomInOut } from "../helper/main";
import foodmenulist from "../dataJson/foodmenulist.json";

export default function Menu() {
  const imageContainers = useRef([]);
  const imageZoomIns = useRef([]);

  useLayoutEffect(() => {
    foodmenulist.forEach((item, index) => {
      imageZoomInOut(
        imageContainers.current[index],
        imageZoomIns.current[index]
      );
    });
  }, []);
  return (
    <div>
      <CommonHero title={"Our Menu"} link={"/"} />
      {foodmenulist?.map((item, i) => (
        <div
          key={i}
          className="set-bg-img-section"
          ref={(el) => (imageContainers.current[i] = el)}
        >
          <img
            src={`${item.bgImgShow}`}
            alt="..."
            className="imagesZoom bg-img ak-bg"
            ref={(el) => (imageZoomIns.current[i] = el)}
          />

          <div className="ak-height-150 ak-height-lg-60"></div>
          <div className="container">
            <SectionTitle
              title={item.headingtext.title}
              subTitle={item.headingtext.subTitle}
              tyle={item.headingtext.tyle}
            />
            <div className="ak-height-65 ak-height-lg-30"></div>
            <div className="ak-menu-list">
              {item.foodMenu?.map((item, index) => {
                return <FoodMenuItem key={index} data={item} />;
              })}
            </div>
          </div>

          <div className="ak-height-150 ak-height-lg-0"></div>
          <div className="ak-height-150 ak-height-lg-60"></div>
        </div>
      ))}
    </div>
  );
}
