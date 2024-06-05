import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import FoodMenuItem from "./FoodMenuItem";
import { ButtonCommon } from "../Button/Button";

import itemShow from "/assets/img/itemShow/food-menu.png";

const foodMenu = [
  {
    title: "Spaghetti alla Carbonara",
    price: "$49",
    image: "/assets/img/itemShow/item-show.png",
    subTitle: "Spaghetti alla Carbonara",
    priceSubTitle: "Extra free juice",
  },
  {
    title: "Spaghetti alla Carbonara",
    price: "$49",
    image: "/assets/img/itemShow/item-show_2.png",
    subTitle: "Spaghetti alla Carbonara",
    priceSubTitle: "Extra free juice",
  },
  {
    title: "Spaghetti alla Carbonara",
    price: "$49",
    image: "/assets/img/itemShow/item-show.png",
    subTitle: "Spaghetti alla Carbonara",
    priceSubTitle: "Extra free juice",
  },
  {
    title: "Spaghetti alla Carbonara",
    price: "$49",
    image: "/assets/img/itemShow/item-show_2.png",
    subTitle: "Spaghetti alla Carbonara",
    priceSubTitle: "Extra free juice",
  },
  {
    title: "Spaghetti alla Carbonara",
    price: "$49",
    image: "/assets/img/itemShow/item-show.png",
    subTitle: "Spaghetti alla Carbonara",
    priceSubTitle: "Extra free juice",
  },
  {
    title: "Spaghetti alla Carbonara",
    price: "$49",
    image: "/assets/img/itemShow/item-show_2.png",
    subTitle: "Spaghetti alla Carbonara",
    priceSubTitle: "Extra free juice",
  },
  {
    title: "Spaghetti alla Carbonara",
    price: "$49",
    image: "/assets/img/itemShow/item-show.png",
    subTitle: "Spaghetti alla Carbonara",
    priceSubTitle: "Extra free juice",
  },
  {
    title: "Spaghetti alla Carbonara",
    price: "$49",
    image: "/assets/img/itemShow/item-show_2.png",
    subTitle: "Spaghetti alla Carbonara",
    priceSubTitle: "Extra free juice",
  },
  {
    title: "Spaghetti alla Carbonara",
    price: "$49",
    image: "/assets/img/itemShow/item-show.png",
    subTitle: "Spaghetti alla Carbonara",
    priceSubTitle: "Extra free juice",
  },
  {
    title: "Spaghetti alla Carbonara",
    price: "$49",
    image: "/assets/img/itemShow/item-show_2.png",
    subTitle: "Spaghetti alla Carbonara",
    priceSubTitle: "Extra free juice",
  },
];

export default function FoodMenuHome({ styleTwo }) {
  return (
    <section>
      <div className="ak-height-150 ak-height-lg-60"></div>
      <div className="container">
        <SectionTitle
          title={"Appetizers"}
          subTitle={"Appetizers"}
          tyle={"center"}
        />
        <div className="ak-height-65 ak-height-lg-30"></div>
        {styleTwo == true ? (
          <div className="d-flex justify-content-between flex-wrap gap-5 gap-md-0">
            <div className="ak-menu-list style-2">
              {foodMenu?.slice(0, 5).map((item, index) => {
                return <FoodMenuItem key={index} data={item} />;
              })}
            </div>
            <div>
              <img src={itemShow} alt="..." />
            </div>
          </div>
        ) : (
          <div className="ak-menu-list">
            {foodMenu?.map((item, index) => {
              return <FoodMenuItem key={index} data={item} />;
            })}
          </div>
        )}

        <div className="ak-height-20 ak-height-lg-20"></div>

        <div className="text-md-center">
          <ButtonCommon to="/menu">View more</ButtonCommon>
        </div>
      </div>
    </section>
  );
}
