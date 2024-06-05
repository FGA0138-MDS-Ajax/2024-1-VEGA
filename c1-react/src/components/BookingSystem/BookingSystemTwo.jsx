import React, { useLayoutEffect, useRef } from "react";
import VideoButton from "../VideoPopUp/VideoButton";
import SectionTitle from "../SectionTitle/SectionTitle";
import BookingSystem from "./BookingSystem";
import { imageZoomInOut } from "../../helper/main";
import bookingSystemBg from "/assets/img/bg/bookingSystemBg.png";

export default function BookingSystemTwo({ videoId }) {
  const imageContainer = useRef(null);
  const imageZoomIn = useRef(null);

  useLayoutEffect(() => {
    imageZoomInOut(imageContainer.current, imageZoomIn.current);
  }, [videoId]);
  return (
    <>
      <div className="ak-height-150 ak-height-lg-60"></div>
      <div className="ak-booking-system" ref={imageContainer}>
        <img
          className="ak-booking-system-bg-img ak-bg"
          src={bookingSystemBg}
          alt="..."
          ref={imageZoomIn}
        />
        <div className="ak-height-150 ak-height-lg-60"></div>
        <div className="container">
          <div className="row justify-content-center align-content-center align-items-center">
            <div className="col-md-6 col-12">
              <div className="ak-height-lg-60"></div>
              <VideoButton videoId={videoId} />
              <div className="ak-height-lg-60"></div>
            </div>
            <div className="col-md-6 col-12">
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
      </div>
    </>
  );
}
