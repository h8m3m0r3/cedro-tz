import React from "react";
import "simplebar";
import "simplebar/dist/simplebar.css";

import "./CardTabItems.scss"
const CardTabItems = ({locationList, category, handleCheckboxChange}) => {
  return (
    <div className="tab__list" data-simplebar>
      <ul className="tab__items">
        {Object.keys(locationList[category]).map((item) => {
          return (
            <li key={locationList[category][`${item}`].id}>
              <p>{locationList[category][`${item}`].name}</p>
              <button
                className={`custom__checkbox ${
                  locationList[category][item].picked ? "checked" : ""
                }`}
                checked={locationList[category][item].picked}
                onClick={() => handleCheckboxChange(item)}
              ></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export {CardTabItems};
