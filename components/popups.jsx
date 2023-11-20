"use client";

import React, { useState } from "react";
import { Lato } from "next/font/google";

import DatePicker from "./datePicker";
import { parseDate } from "@/utils/dateOperations";

const cairo = Lato({ weight: "900", subsets: ["latin"] });

const InputModal = () => {
  const [dateValidationError, setDateValidationError] = useState("");
  const validateDates = (startDate, endDate) => {
    const startDateParsed = parseDate(startDate);
    const endDateParsed = parseDate(endDate);
    if (new Date(startDateParsed) > new Date(endDateParsed)) return false;
    return true;
  };

  const bookCar = async (startDate, endDate) => {
    if (!validateDates(startDate, endDate)) {
      setDateValidationError(
        "Make sure that the end date is after the start date"
      );
      return;
    }
    //const response = await fetch(`/api/book/`);
  };

  return (
    <div className="popup_container">
      <div className="popup">
        <h1 className={cairo.className}> Choose Start and End Dates </h1>
        <div className="datePicker__container">
          <DatePicker
            error={dateValidationError}
            errorHandler={setDateValidationError}
            onSubmit={bookCar}
          />
        </div>
      </div>
    </div>
  );
};

const ErrorModal = () => {
  return <div>popups</div>;
};

export { InputModal, ErrorModal };
