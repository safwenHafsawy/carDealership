/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Overlock } from "next/font/google";

import {
  getMonthNumberOfDays,
  getListOfMonths,
  dateWithinRange,
} from "@/utils/dateOperations";

const work_sans = Overlock({ weight: "700", subsets: ["latin"] });

const Calendar = ({ selectDate, rentalLog }) => {
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

  /**
   * Checking Date eligibility
   */

  const determineDateAvailability = (day) => {
    // block the days that already passed from current month
    if (currentMonth === DateObject.getMonth()) {
      if (day < DateObject.getDate()) {
        return "date-unavailable";
      }
    }
    // block the days that have already been booked
    for (let log of rentalLog) {
      if (
        dateWithinRange(log.startDate, log.endDate, {
          day,
          month: month.number,
          year,
        })
      ) {
        return "date-booked";
      }
    }

    return "date-available";
  };

  return (
    <div className="calendar__container">
      <div className="calendar__options">
        <div className="calendar_option calendar__options-month">
          <button onClick={() => updateMonth("backward")}>&#60;</button>
          <h3 className={work_sans.className}>
            {month.name} / {year}
          </h3>
          <button onClick={() => updateMonth("forward")}>&#62;</button>
        </div>
      </div>
      <div className="calendar_dates">
        {listOfDays.map((day, i) => {
          return (
            <span
              className={`${
                work_sans.className
              } calendar__dates-date ${determineDateAvailability(day)}`}
              key={i}
              onClick={
                determineDateAvailability(day) === "date-available"
                  ? (e) => selectDate(year, month.number, e.target.textContent)
                  : null
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
