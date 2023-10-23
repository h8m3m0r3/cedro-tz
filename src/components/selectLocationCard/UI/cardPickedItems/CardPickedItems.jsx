import React from "react";

import deleteIcon from "../../../../assets/images/deleteIcon.svg";
import "./CardPickedItems.scss"

const CardPickedItems = ({pickedItems, handleDeleteItem}) => {
  return (
    <div
      className={`picked__items ${pickedItems.length === 0 ? "" : "visible"}`}
    >
      <ul className="picked__list">
        {pickedItems.map((item) => (
          <li key={item.id} className="picked__item">
            <p>{item.name}</p>
            <img
              src={deleteIcon}
              alt="Удалить"
              className="delete-icon"
              onClick={() => handleDeleteItem(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { CardPickedItems };
