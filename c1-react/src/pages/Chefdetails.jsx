import React from "react";
import { useParams } from "react-router-dom";
import CommonHero from "../components/CommonHero/CommonHero";
import { ButtonCommon } from "../components/Button/Button";

import ChefList from "../dataJson/cheflist.json";

export default function Chefdetails() {
  const { id } = useParams();

  const findChef = ChefList?.find((product) => product.id == id);

  return (
    <>
      <CommonHero title={"About Chef"} link={"/"} />
      <div className="ak-height-150 ak-height-lg-60"></div>
      <div className="container">
        <div className="meet-the-content-about-section">
          <div className="about-info">
            <div className="ak-section-heading ak-style-1 ak-color-1">
              <p>{findChef?.posation}</p>
              <h2 className="ak-section-title ">{findChef?.name}</h2>
            </div>
            <div className="ak-height-25 ak-height-lg-25"></div>
            <p>{findChef?.desp}</p>
            <div className="ak-height-25 ak-height-lg-25"></div>
            <p>{findChef?.shortDesp}</p>
            <div className="ak-height-45 ak-height-lg-30"></div>
            <ButtonCommon to={findChef?.videolink}>View Expertise</ButtonCommon>
          </div>
          <div className="about-img">
            <img src={findChef?.img} className="imagesZoom" alt="meetAbout" />
          </div>
          <div className="about-social">
            {findChef?.Children?.map((data, i) => (
              <a href={data?.link} key={i}>
                {data?.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
