import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import { Link } from "react-router-dom";

import protfoliList from "../dataJson/protfolilists.json";

export default function Portfolio() {
  return (
    <>
      <CommonHero title={"Portfolio"} link={"/"} />
      <div className="ak-height-150 ak-height-lg-60"></div>
      <section className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {protfoliList?.map((elem, index) => (
            <div className="col" key={index}>
              <Link
                to={`/portfolio-details/${elem.id}`}
                className="ak-card ak-style-1"
              >
                <div className="ak-card-img">
                  <img src={elem.img} alt="..." />
                </div>
                <div className="card-info">
                  <div className="card-text style-1">
                    <h5 className="card-title">{elem.title}</h5>
                    <div className="card-subtitle">{elem.subtitle}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
