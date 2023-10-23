import React, { useEffect, useState } from "react";
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
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
          <section className="btn__info">
            <img src={searchIcon} alt="Иконка поиска" />
            <p className="btn__text">ЖК, Округ, район, метро</p>
          </section>
          {pickedItems.length > 0 && (
            <span className="card__btn counter">{pickedItems.length}</span>
          )}
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
          <div className="tab__list" data-simplebar>
            <ul className="tab__items">
              {Object.keys(locationList[category]).map((item) => {
                return (
                  <li key={locationList[category][`${item}`].id}>
                    <p>{locationList[category][`${item}`].name}</p>
                    <button className={`custom__checkbox ${locationList[category][item].picked ? "checked" : ""}`}
                    checked={locationList[category][item].picked}
                    onClick={() => handleCheckboxChange(item)}>
                    </button>
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
