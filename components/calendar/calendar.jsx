"use client";

import React, { useState, useEffect, useRef } from "react";
import { getMonthNumberOfDays, getListOfMonths } from "./utils";

const Calendar = ({ selectDate }) => {
  const months = useRef([]);
  const DateObject = new Date();
  const [year, setYear] = useState(DateObject.getFullYear());
  const [month, setMonth] = useState({
    name: "",
    number: null,
  });
  const [listOfDays, setListOfDays] = useState([]);

  /**
   * Determining the number of days in each month of chosen year
   */

  useEffect(() => {
    //getting list of months on startup
    months.current = getListOfMonths();
    const numberOfCurrentMonth = DateObject.getMonth();

    setMonth({
      name: months.current[numberOfCurrentMonth],
      number: numberOfCurrentMonth,
    });

    for (let i = 0; i < getMonthNumberOfDays(year, numberOfCurrentMonth); i++) {
      setListOfDays(() => {
        const newListOfDays = [];
        for (
          let i = 0;
          i < getMonthNumberOfDays(year, numberOfCurrentMonth);
          i++
        ) {
          newListOfDays.push(i + 1);
        }
        return newListOfDays;
      });
    }
  }, []);

  useEffect(() => {
    console.log(listOfDays);
  }, [listOfDays]);

  return (
    <div className="calendar__container">
      <div className="calendar__options">
        <div className="calendar__options-year">
          <h3>{year}</h3>
        </div>
        <div className="calendar__options-month">
          <h3>{month.name}</h3>
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
