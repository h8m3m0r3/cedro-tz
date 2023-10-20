import React, { useEffect, useState } from "react";
import searchIcon from "./assets/images/searchIcon.svg";
import deleteIcon from "./assets/images/deleteIcon.svg";

import { mockDataLocations } from "./mock";
import "./App.scss";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("apartComplexes");
  const [locationList, setLocationList] = useState(mockDataLocations);
  const [pickedItems, setPickedItems] = useState([]);

  const handleCheckboxChange = (itemKey) => {
    const updatedLocationList = { ...locationList };
    updatedLocationList[category][itemKey].picked =
      !updatedLocationList[category][itemKey].picked;
    setLocationList(updatedLocationList);
  };
  const handleDeleteItem = (itemId) => {
    const updatedPickedItems = pickedItems.filter((item) => item.id !== itemId);
    setPickedItems(updatedPickedItems);

    const updatedLocationList = { ...locationList };
    for (const categoryKey in updatedLocationList) {
      for (const itemKey in updatedLocationList[categoryKey]) {
        if (updatedLocationList[categoryKey][itemKey].id === itemId) {
          updatedLocationList[categoryKey][itemKey].picked = false;
          break;
        }
      }
    }
    setLocationList(updatedLocationList);
  };
  useEffect(() => {
    const allPickedItems = Object.keys(locationList).reduce(
      (accumulator, categoryKey) => {
        const categoryItems = locationList[categoryKey];
        const pickedCategoryItems = Object.keys(categoryItems)
          .filter((itemKey) => categoryItems[itemKey].picked)
          .map((itemKey) => categoryItems[itemKey]);
        return [...accumulator, ...pickedCategoryItems];
      },
      []
    );
    setPickedItems(allPickedItems);
  }, [locationList]);

  return (
    <div className="App" onClick={() => setIsOpen(!isOpen)}>
      <div className="card">
        <header className="card__header">Локация</header>
        <button className="card__btn" onClick={() => setIsOpen(!isOpen)}>
          <img src={searchIcon} alt="Иконка поиска" />
          <p className="btn__text">ЖК, Округ, район, метро</p>
        </button>
        <div
          className={`dropdown ${isOpen ? "active" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="nav__items">
            <li
              className={`nav__item ${
                category === "apartComplexes" ? "active" : ""
              }`}
              onClick={() => setCategory("apartComplexes")}
            >
              ЖК
            </li>
            <li
              className={`nav__item ${category === "areas" ? "active" : ""}`}
              onClick={() => setCategory("areas")}
            >
              Округ
            </li>
            <li
              className={`nav__item ${
                category === "districts" ? "active" : ""
              }`}
              onClick={() => setCategory("districts")}
            >
              район
            </li>
            <li
              className={`nav__item ${category === "stations" ? "active" : ""}`}
              onClick={() => setCategory("stations")}
            >
              метро
            </li>
          </ul>
          {/* <div className="picked__itemsss">

          </div> */}
          <ul
            className="picked__items"
            style={{
              display: pickedItems.length === 0 ? "none" : "flex",
              height: "58px",
            }}
          >
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
          <div className="tab__list">
            <ul>
              {Object.keys(locationList[category]).map((item) => {
                return (
                  <li key={locationList[category][`${item}`].id}>
                    <p>{locationList[category][`${item}`].name}</p>
                    <div className="custom__checkbox">
                      <input
                        type="checkbox"
                        className="tab__item checkbox"
                        id={`myCheckbox${locationList[category][`${item}`].id}`}
                        checked={locationList[category][item].picked}
                        onChange={() => handleCheckboxChange(item)}
                      />
                      <label
                        htmlFor={`myCheckbox${
                          locationList[category][`${item}`].id
                        }`}
                      ></label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
