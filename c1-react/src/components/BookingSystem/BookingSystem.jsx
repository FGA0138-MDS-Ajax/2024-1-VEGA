import classNames from "classnames";
import React, { useState } from "react";
import { SubmitButton } from "../Button/Button";

export default function BookingSystem(props) {
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Data send successfully");
  };

  const bookingStyle = classNames("booking-system-form ", {
    "style-2": props?.styleTwo,
  });

  return (
    <div className="booking-system-form">
      <form className={bookingStyle} onSubmit={handleSubmit}>
        <div className="select">
          <select
            className="ak-form-select"
            name="option"
            onChange={handleChange}
          >
            <option value={inputs.option || "One"}>One</option>
            <option value={inputs.option || "Two"}>Two</option>
            <option value={inputs.option || "Three"}>Three</option>
          </select>
          <div className="select-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
            >
              <path
                d="M8.99516 9.502C8.80335 9.502 8.61135 9.42869 8.46491 9.28225L0.964914 1.78225C0.671852 1.48919 0.671852 1.01463 0.964914 0.72175C1.25798 0.428875 1.73254 0.428688 2.02541 0.72175L8.99516 7.6915L15.9649 0.72175C16.258 0.428688 16.7325 0.428688 17.0254 0.72175C17.3183 1.01481 17.3185 1.48937 17.0254 1.78225L9.52541 9.28225C9.37898 9.42869 9.18698 9.502 8.99516 9.502Z"
                fill="#FFD28D"
              />
            </svg>
          </div>
        </div>
        <div className="ak-form-time-date">
          <div className="ak-time">
            <input
              className="time-input"
              type="time"
              name="time"
              id="time"
              value={inputs.time || "03:45"}
              onChange={handleChange}
            />
            <div className="time-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <g clipPath="url(#clip0_1166_8212)">
                  <path
                    d="M12 24.002C5.38581 24.002 0 18.6161 0 12.002C0 5.38777 5.38581 0.00195312 12 0.00195312C18.6142 0.00195312 24 5.38777 24 12.002C24 18.6161 18.6142 24.002 12 24.002ZM12 1.14474C6.01423 1.14474 1.14279 6.01618 1.14279 12.002C1.14279 17.9877 6.01423 22.8592 12 22.8592C17.9858 22.8592 22.8572 17.9877 22.8572 12.002C22.8572 6.01618 17.9858 1.14474 12 1.14474Z"
                    fill="#FFD28D"
                  />
                  <path
                    d="M11.4287 4.00195H12.5717V10.2876H11.4287V4.00195Z"
                    fill="#FFD28D"
                  />
                  <path
                    d="M11.4287 13.7168H12.5717V16.5739H11.4287V13.7168Z"
                    fill="#FFD28D"
                  />
                  <path
                    d="M12.0001 14.2884C10.7431 14.2884 9.71436 13.2596 9.71436 12.0026C9.71436 10.7455 10.7431 9.7168 12.0001 9.7168C13.2572 9.7168 14.2859 10.7455 14.2859 12.0026C14.2859 13.2596 13.2572 14.2884 12.0001 14.2884ZM12.0001 10.8598C11.3715 10.8598 10.8574 11.374 10.8574 12.0026C10.8574 12.6312 11.3715 13.1454 12.0001 13.1454C12.6288 13.1454 13.1429 12.6312 13.1429 12.0026C13.1429 11.374 12.6288 10.8598 12.0001 10.8598Z"
                    fill="#FFD28D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1166_8212">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.00195312)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="ak-date">
            <input
              className="date-input"
              type="date"
              name="date"
              id="date"
              value={inputs.date || "2023-07-22"}
              onChange={handleChange}
            />
            <div className="date-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <mask
                  id="mask0_1166_8220"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="25"
                  height="25"
                >
                  <path
                    d="M0.995117 0.140627H24.9951V24.1406H0.995117V0.140627Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_1166_8220)">
                  <path
                    d="M12.0732 18.6094H13.917M17.6152 18.6094H19.4589M6.54198 18.6094H8.38571M12.0732 13.0781H13.917M17.6152 13.0781H19.4589M6.54198 13.0781H8.38571M1.93262 8.45311H24.0683M18.537 5.68749V1.07813M7.46387 5.68749V1.07813M5.63077 23.2031H20.3701C22.4125 23.2031 24.0683 21.5474 24.0683 19.5049V6.62006C24.0683 4.57763 22.4125 2.92186 20.3701 2.92186H5.63077C3.58834 2.92186 1.93262 4.57763 1.93262 6.62006V19.5049C1.93262 21.5474 3.58834 23.2031 5.63077 23.2031Z"
                    stroke="#FFD28D"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
        {!props?.styleTwo && (
          <div className="ak-height-50 ak-height-lg-30"></div>
        )}
        <SubmitButton>Reservations</SubmitButton>
      </form>
    </div>
  );
}
