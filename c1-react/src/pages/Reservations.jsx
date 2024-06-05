import React from "react";
import LocationConatiner from "../components/LocationCardItem/LocationConatiner";
import CommonHero from "../components/CommonHero/CommonHero";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import BookingSystem from "../components/BookingSystem/BookingSystem";
import GoogleMap from "../components/GoogleMap/GoogleMap";

export default function Reservations() {
  return (
    <>
      <CommonHero title={"Reservation"} link={"/"} />
      <div className="ak-height-150 ak-height-lg-60"></div>
      <div className="container-fluid">
        <div className="ak-booking-system-map-from">
          <div className="booking-system-map">
            <GoogleMap addressLink="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96652.27317354927!2d-74.33557928194516!3d40.79756494697628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3a82f1352d0dd%3A0x81d4f72c4435aab5!2sTroy+Meadows+Wetlands!5e0!3m2!1sen!2sbd!4v1563075599994!5m2!1sen!2sbd" />
            <div className="booking-system-map-second">
              <div className="booking-system-heading">
                <SectionTitle
                  title={"Reservations"}
                  subTitle={"Reservations"}
                  animTwo={true}
                />
                <div className="ak-height-60 ak-height-lg-30"></div>
                <BookingSystem />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ak-height-150 ak-height-lg-60"></div>
      <SectionTitle
        title={"Nearby Find Us"}
        subTitle={"Visit Us"}
        tyle={"center"}
      />
      <div className="ak-height-65 ak-height-lg-30"></div>

      <LocationConatiner />
    </>
  );
}
