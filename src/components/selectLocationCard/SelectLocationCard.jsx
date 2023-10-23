import React, { useEffect, useRef, useState } from "react";
import { CardNavItems, CardPickedItems, CardTabItems, СardButton } from "./UI";
import { mockDataLocations } from "../../mock";

import "./SelectLocationCard.scss";

const SelectLocationCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("apartComplexes");
  const [locationList, setLocationList] = useState(mockDataLocations);
  const [pickedItems, setPickedItems] = useState([]);
  const dropdownRef = useRef(null);

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
  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <div className="App">
      <div className="card">
        <header className="card__header">Локация</header>
        <СardButton
          handleDropdownClick={handleDropdownClick}
          pickedItems={pickedItems}
        />
        <div className={`dropdown ${isOpen ? "active" : ""}`} ref={dropdownRef}>
          <CardNavItems category={category} setCategory={setCategory} />
          <CardPickedItems
            pickedItems={pickedItems}
            handleDeleteItem={handleDeleteItem}
          />
          <CardTabItems
            locationList={locationList}
            category={category}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectLocationCard;
