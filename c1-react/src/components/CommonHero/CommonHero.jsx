import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { commonTitleAnimation } from "../../helper/main";
import bgimg from "/assets/img/bg/banner_top_all.png";

export default function CommonHero({ link, title }) {
  const titles = useRef(null);

  useLayoutEffect(() => {
    commonTitleAnimation(titles.current);
  }, []);

  return (
    <section>
      <div className="ak-commmon-hero ak-style1 ak-bg">
        <img src={bgimg} alt="..." className="commmon-hero-img" />
        <div className="ak-commmon-heading">
          <div className="ak-section-heading ak-style-1 ak-type-1 ak-color-1 page-top-title">
            <div className="ak-section-subtitle">
              <Link to={`${link}`}>Home</Link> / {title}
            </div>
            <h2 className="ak-section-title page-title-anim" ref={titles}>
              {title}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
