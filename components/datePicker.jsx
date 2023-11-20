"use client";

import React, { useState } from "react";
import Calendar from "./calendar";
import { Overlock, Andika } from "next/font/google";

const work_sans = Overlock({ weight: "700", subsets: ["latin"] });
const regular_text = Andika({ weight: "400", subsets: ["latin"] });
const locale = "en-GB";
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const DatePicker = ({ error, errorHandler, onSubmit }) => {
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
      <div className="dates__container">
        <div className={`${regular_text.className} error__handler`}>
          {error}
        </div>
        <div className="date__container-date">
          <span className={work_sans.className}>Start Date</span>
          <input
            className={work_sans.className}
            onClick={() => handleToggleCalendar("Start")}
            value={startDate}
            readOnly
          />
        </div>
        <div className="date__container-date">
          <span className={work_sans.className}>End Date</span>
          <input
            className={work_sans.className}
            onClick={() => handleToggleCalendar("End")}
            value={endDate}
            readOnly
          />
        </div>
      </div>

      {toggleCalendar[0] ? <Calendar selectDate={onSelect} /> : <></>}
      <div className="actions">
        <button
          className={work_sans.className}
          onClick={() => {
            onSubmit(startDate, endDate);
          }}
        >
          Book Car
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
