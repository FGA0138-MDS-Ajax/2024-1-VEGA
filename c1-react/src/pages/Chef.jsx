import React from "react";
import { Link } from "react-router-dom";
import CommonHero from "../components/CommonHero/CommonHero";
import ChefList from "../dataJson/cheflist.json";

export default function Chef() {
  return (
    <>
      <CommonHero title={"Our Chefs"} link={"/"} />
      <div className="ak-height-150 ak-height-lg-60"></div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
          {ChefList?.map((elem, index) => (
            <div className="col" key={index}>
              <div className="chef ak-bg">
                <img src={elem.img} alt="..." />
                <div className="chef-style-1">
                  <div className="chef-info">
                    <div className="chef-info-social">
                      {elem.Children.map((data, index) => (
                        <Link to={data.link} key={index}>
                          {data.name}
                        </Link>
                      ))}
                    </div>
                    <div className="chef-title">
                      <Link to={`/meet-the-chef/${elem.id}`}>{elem.name}</Link>
                      <p>{elem.posation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
