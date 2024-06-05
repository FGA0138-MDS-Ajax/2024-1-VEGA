import React, { useEffect, useRef } from "react";
import CommentUser from "../Comment/CommentUser";
import CommentConatctFrom from "../Comment/CommentConatctFrom";
import VideoButton from "../VideoPopUp/VideoButton";
import SectionTitle from "../SectionTitle/SectionTitle";
import { imageZoomInOut } from "../../helper/main";

export default function BlogDetailsContainerAround({ props }) {
  const videoImg = useRef();
  const container = useRef();
  const blogImg = useRef();
  useEffect(() => {
    imageZoomInOut(container.current, videoImg.current);
    imageZoomInOut(container.current, blogImg.current);
  }, []);
  return (
    <div ref={container}>
      <div className="ak-height-50 ak-height-lg-30"></div>
      <img className="imagesZoom" src={props?.img} alt="..." ref={blogImg} />
      <div className="ak-height-75 ak-height-lg-30"></div>
      <p>{props.desp}</p>
      <div className="ak-height-75 ak-height-lg-30"></div>
      <div className="quote-option">
        <div className="testimonial-section">
          <div className="testimonial-icon-1">
            <img src="/assets/img/icon/testimonial_icon_l.svg" alt="..." />
          </div>
          <div className="testimonial-info-section">
            <div className="testimonial-info">
              <p className="testimonial-info-subtitle">{props.testimonial}</p>
            </div>
          </div>
          <div className="testimonial-icon-1">
            <img src="/assets/img/icon/testimonial_icon_r.svg" alt="..." />
          </div>
        </div>
      </div>
      <div className="ak-height-75 ak-height-lg-30"></div>
      <h4 className="anim-title-2 ak-white-color">{props.shortTitle}</h4>
      <div className="ak-height-20 ak-height-lg-20"></div>
      <p>{props.shortDesc}</p>
      <div className="ak-height-75 ak-height-lg-30"></div>
      <div>
        <div className="video-section">
          <img
            src={props.videoImg}
            alt="..."
            ref={videoImg}
            className="video-section-bg-img ak-bg imagesZoom"
          />
          <VideoButton videoId={"UsD1MhKBmD4"} />
        </div>
      </div>
      <div className="ak-height-75 ak-height-lg-30"></div>
      <p>{props.shortDescTwo}</p>
      <div className="ak-height-75 ak-height-lg-30"></div>
      <div className="blog-details-border"></div>
      <div className="ak-height-35 ak-height-lg-30"></div>
      <div className="social-link">
        <p>Social Share:</p>
        <a href="https://www.facebook.com/">Facebook</a>
        <a href="https://bd.linkedin.com/">LinkedIn</a>
        <a href="https://www.instagram.com/">Instagram</a>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
      <CommentUser props={props} />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="contact-content">
        <div className="contact-form">
          <div className="contact-form-title ">
            <SectionTitle animTwo={true} textWhite={"Post A Comment"} />
          </div>
          <CommentConatctFrom />
        </div>
      </div>
    </div>
  );
}
