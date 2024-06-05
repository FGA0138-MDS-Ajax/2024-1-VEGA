import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import SideBarBlogDetails from "../components/BlogDetails/SideBarBlogDetails";
import BlogDetailsContainerAround from "../components/BlogDetails/BlogDetailsContainerAround";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import BlogConatiner from "../components/BlogCard/BlogConatiner";
import { useParams } from "react-router-dom";

import BlogUser from "../dataJson/bloguser.json";

export default function Blogdetails() {
  const { id } = useParams();
  const findBlog = BlogUser?.find((blog) => blog.id == id);

  return (
    <>
      <CommonHero title={"Single Blog"} link={"/"} />
      <section className="container">
        <div className="ak-height-150 ak-height-lg-60"></div>
        <div className="blog-details">
          <h3 className="anim-title-3">{findBlog.title}</h3>
          <div className="blog-details-subtitle">
            <p>{findBlog.data}</p>
            <p className="blog-details-date"></p>
            <p>{findBlog.postUser}</p>
          </div>
        </div>
        <div className="row" id="containerAround">
          <div className="col-md-8">
            <div className="blog-content" id="scrollGaleria">
              <BlogDetailsContainerAround props={findBlog} />
            </div>
          </div>
          <div className="col-md-4">
            <div id="infoProduto">
              <SideBarBlogDetails props={findBlog} />
            </div>
          </div>
        </div>
        <div className="ak-height-150 ak-height-lg-60"></div>
        <SectionTitle
          title={"Similar News"}
          subTitle={"Similar News"}
          tyle={"center"}
        />

        <div className="ak-height-65 ak-height-lg-30"></div>
        <BlogConatiner styleTypleTwo={true} />
      </section>
    </>
  );
}
