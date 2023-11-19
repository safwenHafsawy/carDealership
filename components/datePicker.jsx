"use client";

import React, { useState } from "react";
import Calendar from "./calendar/calendar";

const DatePicker = ({ defaultClass }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const onChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="datepicker-toggle">
      <label htmlFor="datepicker" class="datepicker-toggle-button">
        {date}
      </label>
      <input
        id="datepicker"
        type="date"
        className="datepicker-input"
        value={date}
        onChange={onChange}
      />
      <Calendar />
    </div>
  );
};

export default DatePicker;
