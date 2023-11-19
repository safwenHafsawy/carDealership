"use client";

import React, { useState } from "react";
import Calendar from "./calendar/calendar";

const DatePicker = ({ defaultClass }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [toggleCalendar, setToggleCalendar] = useState(false);

  const onSelect = (day, month, year) => {
    setDate(year + "-" + month + "-" + day);
  };

  return (
    <div className="datepicker">
      <span onClick={() => setToggleCalendar(true)}>Start Date : {date}</span>{" "}
      {"  "}
      <span onClick={() => setToggleCalendar(true)}>End Date : {date}</span>
      {toggleCalendar ? <Calendar selectDate={onSelect} /> : <></>}
    </div>
  );
};

export default DatePicker;
