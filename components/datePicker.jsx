"use client";

import React, { useState, useEffect } from "react";
import Calendar from "./calendar";
import { Overlock, Andika } from "next/font/google";
import { parseDate, millisecondsToDays } from "@/utils/dateOperations";

const work_sans = Overlock({ weight: "700", subsets: ["latin"] });
const regular_text = Andika({ weight: "400", subsets: ["latin"] });
const locale = "en-GB";
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const DatePicker = ({
  error,
  errorHandler,
  onSubmit,
  rentalLog,
  pricePerDay,
}) => {
  const [startDate, setStartDate] = useState(
    new Date().toLocaleString(locale, options)
  );
  const [endDate, setEndDate] = useState(
    new Date().toLocaleString(locale, options)
  );
  const [toggleCalendar, setToggleCalendar] = useState([false, null]);
  const [price, setPrice] = useState(pricePerDay);

  const onSelect = (year, month, day) => {
    const newDate = new Date(parseInt(year), parseInt(month), day);

    if (toggleCalendar[1] === "Start")
      setStartDate(newDate.toLocaleString(locale, options));
    else if (toggleCalendar[1] === "End")
      setEndDate(newDate.toLocaleString(locale, options));

    setToggleCalendar([false, null]);
  };

  const handleToggleCalendar = (toBeChanged) => {
    errorHandler("");
    setToggleCalendar([true, toBeChanged]);
  };

  /**
   * Calculate New Price
   */

  const calculatePrice = () => {
    const timeLapse =
      new Date(parseDate(endDate)) - new Date(parseDate(startDate));

    const newPrice = (millisecondsToDays(timeLapse) + 1) * pricePerDay;
    if (newPrice < 0) setPrice(0);
    else setPrice(newPrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [startDate, endDate]);

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

      {toggleCalendar[0] ? (
        <Calendar rentalLog={rentalLog} selectDate={onSelect} />
      ) : (
        <></>
      )}
      <div className={`${work_sans.className} price__display`}>
        <span>Total Price : {price} $</span>
        <span>
          Duration :{" "}
          {millisecondsToDays(
            new Date(parseDate(endDate)) - new Date(parseDate(startDate))
          ) + 1}{" "}
          day(s)
        </span>
      </div>
      <div className="actions">
        <button
          className={work_sans.className}
          onClick={() => {
            onSubmit(startDate, endDate, price);
          }}
        >
          Book Car
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
