import { isArray } from "lodash";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

export default function MenuItem({ props }) {
  const [showMenu, setShowMenu] = useState(false);

  const showsubnav = () => {
    setShowMenu(!showMenu);
  };

  const showActive = classNames("ak-munu_dropdown_toggle", {
    active: showMenu,
  });

  const showActivePrent = classNames("menu-item-has-children", {
    active: showMenu,
  });

  return (
    <li className={showActivePrent}>
      <Link to={props.link}>{props.title}</Link>
      {isArray(props.childern) && (
        <>
          <ul>
            {props?.childern?.map((child) => (
              <li key={child.key}>
                <Link to={child.link}>{child.title}</Link>
              </li>
            ))}
          </ul>
          <span className={showActive} onClick={showsubnav}></span>
        </>
      )}
    </li>
  );
}
