import React from "react";
import { Link } from "react-router-dom";

export function ButtonCommon(props) {
  return (
    <div className="text-btn">
      <Link to={props.to} className="text-btn1">
        {props.children}
      </Link>
    </div>
  );
}

export function WhiteButton(props) {
  return (
    <div className="ak-btn style-5">
      <Link to={props.to}>{props.children}</Link>
    </div>
  );
}

export function SubmitButton(props) {
  return (
    <div className="ak-btn style-5">
      <button type="submit">{props.children}</button>
    </div>
  );
}
