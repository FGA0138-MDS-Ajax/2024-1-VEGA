import React from "react";
import { Link } from "react-router-dom";

import blogData from "../../dataJson/bloglist.json";

const BlogConatiner = ({ styleTypleTwo }) => {
  const data = styleTypleTwo ? blogData.slice(0, 3) : blogData;

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {data?.map((data, i) => (
          <div
            key={i}
            className={`col b-none ${
              i < 6 ? (styleTypleTwo ? " " : "ak-border  p-0") : " "
            } ${i == 2 || i == 5 || i == 8 ? " " : " drop-anim-gallery"}`}
          >
            <div className="blog h-100 p-4">
              <img src={data.img} className="blog-img-top" alt="..." />
              <div className="blog-body">
                <p className="blog-time">{data.time}</p>
                <Link to={`/blog-details/${data.id}`}>
                  <h6 className="blog-title">{data.title}</h6>
                </Link>
                <Link to={`/blog-details/${data.id}`} className="blog-text">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogConatiner;
