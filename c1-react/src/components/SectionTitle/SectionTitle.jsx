import React, { useLayoutEffect, useRef } from "react";
import classNames from "classnames";
import { sectionTitleAnim, sectionTitleAnimTwo } from "../../helper/main";

export default function SectionTitle(props) {
  const { title, subTitle, tyle, animTwo, textWhite } = props;
  const animTitle = useRef(null);
  const animTitleSection = useRef(null);
  useLayoutEffect(() => {
    if (animTwo) {
      sectionTitleAnimTwo(animTitle.current, animTitleSection.current);
    } else {
      sectionTitleAnim(animTitle.current, animTitleSection.current);
    }
  }, [title]);

  const sectionClass = classNames("ak-section-heading ak-style-1", {
    "ak-type-1": tyle == "center",
  });

  return (
    <div className={sectionClass} ref={animTitleSection}>
      {subTitle && <div className="ak-section-subtitle">{subTitle}</div>}
      <h2 className="ak-section-title" ref={animTitle}>
        {textWhite && (
          <>
            <span className="text-white">{textWhite}</span> <br />
          </>
        )}
        {title}
      </h2>
    </div>
  );
}
