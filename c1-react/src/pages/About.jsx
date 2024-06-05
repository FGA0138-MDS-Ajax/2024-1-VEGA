import React from "react";
import AboutContent from "../components/AboutContent/AboutContent";
import CommonHero from "../components/CommonHero/CommonHero";
import Testimonial from "../components/Testimonial/Testimonial";
import OpeningHoursInfo from "../components/OpenIngHour/OpeningHoursInfo";
import Videos from "../components/VideoPopUp/Videos";

export default function About() {
  return (
    <div>
      <CommonHero title={"About Us"} link={"/"} />
      <AboutContent />
      <Testimonial />
      <OpeningHoursInfo typeTwo={true} />
      <Videos videoId={"UsD1MhKBmD4"} />
    </div>
  );
}
