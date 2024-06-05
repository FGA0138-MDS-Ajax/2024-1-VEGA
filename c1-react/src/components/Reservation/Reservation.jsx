import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import BookingSystem from "../BookingSystem/BookingSystem";

export default function Reservation() {
  return (
    <div className="container">
      <div className="ak-height-150 ak-height-lg-60"></div>
      <div className="booking-system-heading">
        <SectionTitle
          title={"Reservations"}
          subTitle={"Reservations"}
          tyle="center"
        />
        <div className="ak-height-60 ak-height-lg-30"></div>
        <BookingSystem styleTwo={true} />
      </div>
    </div>
  );
}
