import React from "react";
import { WhiteButton } from "../components/Button/Button";
import errorPagesbg from "/assets/img/bg/errorPagesBg.png";

export default function ErrorPages() {
  return (
    <div className="section-all-item-center">
      <img className="error-bg-img" src={errorPagesbg} alt="errorBg" />
      <div className="border-comming-soon-colum-right drop-anim-gallery"></div>
      <div className="border-comming-soon-top"></div>
      <div className="container text-center">
        <h2 className="item-title-number">404</h2>
        <h2 className="item-title">Sorry! The Page isn't Found Here</h2>
        <p className="item-subtext">
          Fortunately, since it is mainly a client-side issue, it is relatively
          easy for website owners to fix the 404 error. This article will
          explain the possible causes of error 404 and show four effective
          methods to resolve it.Fortunately, since it is mainly a client-side
          issue, it is relatively easy for website owners to fix the 404 error.
        </p>
        <div className="mt-5">
          <WhiteButton to={"/"}> Back to Home</WhiteButton>
        </div>
      </div>
      <div className="border-comming-soon-colum-left drop-anim-gallery"></div>
      <div className="border-comming-soon-bottom"></div>
    </div>
  );
}
