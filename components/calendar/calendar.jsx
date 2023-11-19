/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { getMonthNumberOfDays, getListOfMonths } from "./utils";

const Calendar = ({ selectDate }) => {
  const months = useRef([]);
  const DateObject = new Date();
  const [year, setYear] = useState(DateObject.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(DateObject.getMonth());
  const [month, setMonth] = useState({
    name: "",
    number: null,
  });
  const [listOfDays, setListOfDays] = useState([]);

  /**
   * Determining the number of days in each month of chosen year
   */

  const getMonthAndDays = () => {
    months.current = getListOfMonths();

    setMonth({
      name: months.current[currentMonth],
      number: currentMonth,
    });

    for (let i = 0; i < getMonthNumberOfDays(year, currentMonth); i++) {
      setListOfDays(() => {
        const newListOfDays = [];
        for (let i = 0; i < getMonthNumberOfDays(year, currentMonth); i++) {
          newListOfDays.push(i + 1);
        }
        return newListOfDays;
      });
    }
  };

  useEffect(() => {
    //getting list of months on startup
    getMonthAndDays();
  }, []);

  /**
   * Month to month navigation
   */

  const updateMonth = (operation) => {
    switch (operation) {
      case "forward":
        if (currentMonth < 11) setCurrentMonth((prevState) => prevState + 1);
        else if (currentMonth === 11) {
          setCurrentMonth(0);
          setYear((prevState) => prevState + 1);
        }
        break;
      case "backward":
        if (
          currentMonth > DateObject.getMonth() ||
          (currentMonth > 0 && year > DateObject.getFullYear())
        ) {
          setCurrentMonth((prevState) => prevState - 1);
          console.log(year);
        } else if (currentMonth === 0) {
          setCurrentMonth(11);
          setYear((prevState) => prevState - 1);
        }
        break;
    }
  };

  useEffect(() => {
    getMonthAndDays();
  }, [currentMonth]);

  return (
    <div className="calendar__container">
      <div className="calendar__options">
        <div className="calendar_option calendar__options-month">
          <button onClick={() => updateMonth("backward")}>&#60;</button>
          <h3>
            {month.name} / {year}
          </h3>
          <button onClick={() => updateMonth("forward")}>&#62;</button>
        </div>
      </div>
      <div className="calendar_dates">
        {listOfDays.map((day, i) => {
          return (
            <span
              className="calendar__dates-date"
              key={i}
              onClick={(e) =>
                selectDate(year, month.number, e.target.textContent)
              }
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
