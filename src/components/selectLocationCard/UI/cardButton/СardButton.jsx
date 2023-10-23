import React from "react";

import searchIcon from "../../../../assets/images/searchIcon.svg";
import "./СardButton.scss"

const СardButton = ({ handleDropdownClick, pickedItems }) => {
  return (
    <button className="card__btn" onClick={handleDropdownClick}>
      <div className="btn__info">
        <img src={searchIcon} alt="Иконка поиска" />
        <p className="btn__text">ЖК, Округ, район, метро</p>
      </div>
      {pickedItems.length > 0 && (
        <span className="card__btn counter">{pickedItems.length}</span>
      )}
    </button>
  );
};

export { СardButton };
