import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./layout/Main";
import Home from "./pages/Home";
import HomeTwo from "./pages/HomeTwo";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Chef from "./pages/Chef";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Reservations from "./pages/Reservations";
import Gallery from "./pages/Gallery";
import Comming from "./pages/Comming";
import ErrorPages from "./pages/ErrorPages";
import Chefdetails from "./pages/Chefdetails";
import Portfoliodetails from "./pages/Portfoliodetails";
import Blog from "./pages/Blog";
import Blogdetails from "./pages/Blogdetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />}></Route>
        <Route path="/home2" element={<HomeTwo />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/chef" element={<Chef />}></Route>
        <Route path="/meet-the-chef/:id" element={<Chefdetails />}></Route>
        <Route path="/portfolio" element={<Portfolio />}></Route>
        <Route
          path="/portfolio-details/:id"
          element={<Portfoliodetails />}
        ></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/blog-details/:id" element={<Blogdetails />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/reservations" element={<Reservations />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/comming-soon" element={<Comming />}></Route>
        <Route path="/*" element={<ErrorPages />}></Route>
      </Route>
    </Routes>
  );
}
