import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import CommonHero from "../components/CommonHero/CommonHero";

import galleryitems from "../dataJson/gallery.json";

export default function GalleryShow() {
  const ClassOption = classNames(
    "row row-cols-1 row-cols-md-2  row-cols-xl-3 g-5"
  );
  return (
    <>
      <CommonHero title={"Gallery"} link={"/"} />
      <div className="container">
        <div className="ak-height-150 ak-height-lg-60"></div>
        <LightGallery
          speed={500}
          plugins={[lgThumbnail]}
          elementClassNames={ClassOption}
        >
          {galleryitems?.map((image, index) => (
            <Link to={image.thumbnail} key={index}>
              <div className="gallery-hover">
                <img className="h-100" src={image.src} alt={image.caption} />
                <div className="gallery-img-overlay">
                  <div className="images-info">
                    <div className="gallery-img-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="41"
                        height="41"
                        viewBox="0 0 41 41"
                        fill="none"
                      >
                        <rect
                          x="0.507812"
                          y="19.7305"
                          width="40"
                          height="1"
                          fill="#FFD28D"
                        />
                        <rect
                          x="20.0078"
                          y="0.730469"
                          width="1"
                          height="40"
                          fill="#FFD28D"
                        />
                      </svg>
                    </div>
                    <div className="gallery-hover-info">
                      <div>
                        <h6>{image.title}</h6>
                        <p>{image.desp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </LightGallery>
      </div>
    </>
  );
}
