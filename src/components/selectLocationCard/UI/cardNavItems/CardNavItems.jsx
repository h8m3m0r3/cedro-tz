import React from "react";

import "./CardNavItems.scss"

const CardNavItems = ({ category, setCategory }) => {
  const handleChangeCategory = (prop) => {
    setCategory(prop);
  };

  return (
    <ul className="nav__items">
      <li
        className={`nav__item ${category === "apartComplexes" ? "active" : ""}`}
        onClick={() => handleChangeCategory("apartComplexes")}
      >
        ЖК
      </li>
      <li
        className={`nav__item ${category === "areas" ? "active" : ""}`}
        onClick={() => handleChangeCategory("areas")}
      >
        Округ
      </li>
      <li
        className={`nav__item ${category === "districts" ? "active" : ""}`}
        onClick={() => handleChangeCategory("districts")}
      >
        район
      </li>
      <li
        className={`nav__item ${category === "stations" ? "active" : ""}`}
        onClick={() => handleChangeCategory("stations")}
      >
        метро
      </li>
    </ul>
  );
};

export { CardNavItems };
