"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Lato } from "next/font/google";

import DatePicker from "./datePicker";
import { parseDate } from "@/utils/dateOperations";

const cairo = Lato({ weight: "900", subsets: ["latin"] });

const InputModal = ({ handleModalToggle, rentalLog, pricePerDay }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [dateValidationError, setDateValidationError] = useState("");

  const validateDates = (startDate, endDate) => {
    const startDateParsed = parseDate(startDate);
    const endDateParsed = parseDate(endDate);
    if (new Date(startDateParsed) > new Date(endDateParsed)) return 0;

    // checking if chosen dates are not interrupted by another reservation

    for (let log of rentalLog) {
      const rentalLogParsedStartDate = parseDate(log.startDate);
      const rentalLogParsedEndDate = parseDate(log.endDate);

      if (
        rentalLogParsedStartDate > startDateParsed &&
        rentalLogParsedEndDate > endDateParsed
      )
        return 1;
    }

    return 2;
  };

  /**
   * Function to book a car reservation
   * @param {date} startDate
   * @param {date} endDate
   *
   */

  const bookCar = async (startDate, endDate, totalPrice) => {
    if (validateDates(startDate, endDate) === 0) {
      setDateValidationError(
        "Make sure that the end date is after the start date"
      );
      return;
    } else if (validateDates(startDate, endDate) === 1) {
      setDateValidationError(
        "Make sure that your reservation is not interrupted by another reservation"
      );
      return;
    }
    const response = await fetch(`/api/book/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user.id,
        carId: pathname.split("/")[2],
        startDate,
        endDate,
        totalPrice,
      }),
    });

    const data = await response.json();

    if (response.status === 201) handleModalToggle();
    else if (response.status === 400 || response.status === 500)
      alert(data.message);
  };

  return (
    <div
      className="popup_container"
      //onClick={(e) => console.log(e.target.name)}
    >
      <div className="popup">
        <button className={cairo.className} onClick={handleModalToggle}>
          close
        </button>
        <h1 className={cairo.className}> Choose Start and End Dates </h1>
        <div className="datePicker__container">
          <DatePicker
            pricePerDay={pricePerDay}
            rentalLog={rentalLog}
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
