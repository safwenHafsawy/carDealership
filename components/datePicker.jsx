"use client";

import React, { useState } from "react";
import Calendar from "./calendar/calendar";

const DatePicker = ({ defaultClass }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const onSelect = (day, month, year) => {
    setDate(year + "-" + month + "-" + day);
  };

  return (
    <div className="datepicker-toggle">
      <span>{date}</span>
      <Calendar selectDate={onSelect} />
    </div>
  );
};

export default DatePicker;
