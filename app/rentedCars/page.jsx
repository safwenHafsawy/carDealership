"use client";

import React, { useEffect, useState } from "react";
import { Andika, Overlock } from "next/font/google";
import useToast from "@/hooks/useToast";

/**
 * Import Components
 */
import { SectionHeader, SubHeader } from "@/components/header";
import { ToastPopup } from "@/components/popups";
import Loader from "@/components/loader";

/**
 * importing helper functions
 */
import { showToast } from "@/lib/toastFunctions";

/**
 * Declaring fonts and needed constants
 */

const secondaryHeaderFont = Overlock({ weight: "700", subsets: ["latin"] });
const smallTextFont = Andika({ weight: "400", subsets: ["latin"] });

/**
 * Rented Cars page component
 */
const RentedCars = () => {
  const [rentedCarsLogs, setRentedCarsLogs] = useState([]);
  const [loading, setLoading] = useState({ status: false, message: "" });
  const [toggleToast, setToggleToast] = useToast();

  const getUserBookingLogs = async () => {
    setLoading({
      status: true,
      message: "Fetching your booked cars details! just a moment...",
    });
    try {
      const response = await fetch("api/book/", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "one-user": true,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setRentedCarsLogs(data);
        setLoading({ status: false, message: "" });
      } else if (response.status === 404)
        setLoading({ status: false, message: "" });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserBookingLogs();
  }, []);

  useEffect(() => {
    //console.log(rentedCarsLogs);
  }, [rentedCarsLogs]);

  /** Handle Booking Cancellation */
  const cancelLog = async (logId) => {
    setLoading({
      status: true,
      message: "Cancelled your booking ! please wait...",
    });
    try {
      const response = await fetch("api/book/", {
        method: "DELETE",
        body: JSON.stringify({ logId }),
      });

      const data = await response.json();
      setLoading({ status: false, message: "" });
      if (response.status === 200) {
        showToast("Booking canceled successfully", "success", setToggleToast);
        setRentedCarsLogs((prevState) =>
          prevState.filter((log) => log.id !== data.deleteLogId)
        );
      } else if (response.status === 400) {
        showToast(
          "There was an error on our side ! please try again",
          "danger",
          setToggleToast
        );
      }
    } catch (e) {
      showToast(
        "There was an error on our side ! please try again",
        "danger",
        setToggleToast
      );
    }
  };

  return (
    <section className="page_sections-full booked__cars">
      {toggleToast.status ? (
        <ToastPopup
          toastText={toggleToast.message}
          toastType={toggleToast.type}
          toggleToast={setToggleToast}
        />
      ) : null}{" "}
      ;<SectionHeader type="section_header-light">Booked Cars</SectionHeader>
      {loading.status ? (
        <Loader loaderText={loading.message} />
      ) : (
        <div className="rentLogs__container">
          {rentedCarsLogs.length === 0 ? (
            <SubHeader type="sub__header-light">No booked Cars Yet !</SubHeader>
          ) : (
            rentedCarsLogs.map((rentLog) => (
              <RentLogDetails
                key={rentLog.id}
                rentLog={rentLog}
                cancelLog={cancelLog}
                setLoading={setLoading}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export const RentLogDetails = ({ rentLog, cancelLog, setLoading }) => {
  const [toggleExtendedDetails, setToggleExtendedDetails] = useState(false);

  const handleToggleDetails = () => {
    setToggleExtendedDetails(!toggleExtendedDetails);
  };

  const { id, startDate, endDate, totalPrice, rentedCar } = rentLog;
  return (
    <div className="renLog__data">
      <div className="renLog__data-main" onClick={handleToggleDetails}>
        <span className={secondaryHeaderFont.className}>
          {rentedCar.manufacturer} - {rentedCar.model}
        </span>
        <span>&#x25BC;</span>
      </div>
      <div
        className={
          toggleExtendedDetails
            ? "rentLog__data-extend-shown"
            : "rentLog__data-extend-hidden"
        }
      >
        <span className={smallTextFont.className}>
          Start Date : {startDate}
        </span>
        <span className={smallTextFont.className}>End Date : {endDate}</span>
        <span className={smallTextFont.className}>
          Total Price : {totalPrice} $
        </span>
        <div>
          <button
            className={secondaryHeaderFont.className}
            onClick={() => cancelLog(id)}
          >
            Cancel this booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentedCars;
