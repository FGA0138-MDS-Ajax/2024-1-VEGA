import React, { useLayoutEffect, useRef, useState } from "react";
import ModalVideo from "react-modal-video";
import { imageZoomInOut } from "../../helper/main";

import aboutVideoBg from "/assets/img/about/aboutVideoBg.jpg";

export default function Videos({ videoId }) {
  const [isOpen, setOpen] = useState(false);
  const imageContainer = useRef(null);
  const imageZoomIn = useRef(null);

  useLayoutEffect(() => {
    imageZoomInOut(imageContainer.current, imageZoomIn.current);
  }, [videoId]);

  return (
    <>
      <div className="ak-height-150 ak-height-lg-60"></div>
      <div className="video-section" ref={imageContainer}>
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 0 }}
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => setOpen(false)}
        />
        <img
          src={aboutVideoBg}
          alt="..."
          className="video-section-bg-img ak-bg"
          ref={imageZoomIn}
        />{" "}
        <button className="video-section-btn">
          <span
            className="ak-player-btn ak-accent-color"
            onClick={() => setOpen(true)}
          >
            <span></span>
          </span>
        </button>
      </div>
    </>
  );
}
