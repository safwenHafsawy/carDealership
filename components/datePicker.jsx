"use client";

import React, { useState } from "react";
import Calendar from "./calendar/calendar";

const locale = "en-GB";
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const DatePicker = ({ defaultClass }) => {
  const [startDate, setStartDate] = useState(
    new Date().toLocaleString(locale, options)
  );
  const [endDate, setEndDate] = useState(
    new Date().toLocaleString(locale, options)
  );
  const [toggleCalendar, setToggleCalendar] = useState([false, null]);

  const onSelect = (year, month, day) => {
    const newDate = new Date(
      parseInt(year),
      parseInt(month),
      day
    ).toLocaleString(locale, options);

    if (toggleCalendar[1] === "Start") setStartDate(newDate);
    else if (toggleCalendar[1] === "End") setEndDate(newDate);

    setToggleCalendar([false, null]);
  };

  const handleToggleCalendar = (toBeChanged) => {
    setToggleCalendar([true, toBeChanged]);
  };

  return (
    <div className="datepicker">
      <div className="date__container">
        <span>Start Date : </span>
        <input
          onClick={() => handleToggleCalendar("Start")}
          value={startDate}
          readOnly
        />
      </div>
      <div className="date__container">
        <span>End Date : </span>
        <input
          onClick={() => handleToggleCalendar("End")}
          value={endDate}
          readOnly
        />
      </div>
      {toggleCalendar[0] ? <Calendar selectDate={onSelect} /> : <></>}
    </div>
  );
};

export default DatePicker;
