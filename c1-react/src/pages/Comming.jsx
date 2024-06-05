import React, { useState, useEffect } from "react";
import commingSoonbg from "/assets/img/bg/commingSoonPagesBg.png";

export default function Comming() {
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-08-08") - +new Date();
    if (difference <= 0) {
      return { expired: true };
    }
    return {
      months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
      days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="section-all-item-center">
      <img className="error-bg-img" src={commingSoonbg} alt="errorBg" />
      <div className="border-comming-soon-colum-right drop-anim-gallery"></div>
      <div className="border-comming-soon-top"></div>
      <h2 className="item-title">Coming Soon</h2>
      <div className="container">
        <div className="date-section" id="commingsoon">
          {timeLeft.expired ? (
            <span>Time's up!</span>
          ) : (
            <>
              {Object.entries(timeLeft).map(([interval, value]) => (
                <div className="timmer" key={interval}>
                  <h1 className="number ak-stroke-text">{value}</h1>
                  <p className="text">{interval}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="border-comming-soon-colum-left drop-anim-gallery"></div>
      <div className="border-comming-soon-bottom"></div>
    </div>
  );
}
