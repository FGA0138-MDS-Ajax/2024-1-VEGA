import React from "react";

export default function GoogleMap(props) {
  return (
    <div className="booking-system-map-frist">
      <div className="ak-google-map ak-bg">
        <iframe src={props.addressLink} allowFullScreen />
      </div>
    </div>
  );
}
