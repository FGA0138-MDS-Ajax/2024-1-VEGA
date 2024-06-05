import React, { useLayoutEffect, useRef } from "react";
import { imagesOverlayShow } from "../../helper/main";

export default function ImgesOverlay({ image, imagesZoom }) {
  const imagesShowcontainer = useRef(null);
  const imagesShow = useRef(null);

  useLayoutEffect(() => {
    imagesOverlayShow(
      imagesShowcontainer.current,
      imagesShow.current,
      imagesZoom
    );
  }, []);

  return (
    <div className="img-container-overlay" ref={imagesShowcontainer}>
      <img
        src={`${image}`}
        alt="overlay-image"
        className="images-show"
        ref={imagesShow}
      />
    </div>
  );
}
