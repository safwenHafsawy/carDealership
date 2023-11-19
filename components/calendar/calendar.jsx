"use client";

import React, { useState, useEffect } from "react";
import { getMonthsCalendar } from "./utils";

const Calendar = () => {
  const DateObject = new Date();
  const [year, setYear] = useState(DateObject.getFullYear());
  const [month, setMonth] = useState(DateObject.getMonth());
  const [months, setMonths] = useState([]);

  /**
   * Determining the number of days in each month of chosen year
   */
  useEffect(() => {
    //getting months details on startup
    const months = getMonthsCalendar(year);
    setMonths(months);
  }, [year]);

  useEffect(() => {
    console.log("all months: ", months);
  }, [months]);

  return (
    <div className="calendar__container">
      <div className="calendar__options">
        <div className="calendar__options-year">
          <h3>{year}</h3>
        </div>
        <div className="calendar__options-month"></div>
      </div>
      <div className="calendar_dates"></div>
    </div>
  );
};

export default Calendar;
