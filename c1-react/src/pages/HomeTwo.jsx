import React from "react";
import FoodMenuHome from "../components/FoodMenu/FoodMenu";
import HeroSilder from "../components/Silders/HeroSilder";
import ShowCase from "../components/ShowCase/ShowCase";
import Testimonial from "../components/Testimonial/Testimonial";
import OpeningHoursInfo from "../components/OpenIngHour/OpeningHoursInfo";
import BestItem from "../components/BestItem/BestItem";
import Reservation from "../components/Reservation/Reservation";
import Videos from "../components/VideoPopUp/Videos";

export default function HomeTwo() {
  return (
    <div>
      <HeroSilder />
      <ShowCase />
      <FoodMenuHome styleTwo={true} bgimgremove={true} />
      <Testimonial />
      <OpeningHoursInfo typeTwo={true} />
      <BestItem />
      <Reservation />
      <Videos videoId={"UsD1MhKBmD4"} />
    </div>
  );
}
