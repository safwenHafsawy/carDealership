"use client";

import React, { useState, useEffect } from "react";
import { Andika } from "next/font/google";

import { getDifferenceBetweenTwoDates } from "@/utils/dateOperations";

const smallTextFont = Andika({ weight: "400", subsets: ["latin"] });

const RecentReservations = ({ dashboardData }) => {
  const [recentReservations, setRecentReservations] = useState([]);

  useEffect(() => {
    const copyDashboardData = [...dashboardData].reverse();

    setRecentReservations(copyDashboardData.splice(0, 10));
  }, [dashboardData]);

  return recentReservations.length > 0 ? (
    <ul className={smallTextFont.className}>
      {[...Array(10)].map((_, index) => {
        const reservation = recentReservations[index] || {};

        return (
          <li
            key={index}
            className={Object.keys(reservation).length > 0 ? "shown" : "hidden"}
          >
            <div>
              {reservation.totalPrice && (
                <>
                  <span>{reservation.totalPrice}$</span>{" "}
                  <span>{reservation.rentedBy.name}</span>{" "}
                </>
              )}
            </div>
            {reservation.rentedCar && (
              <div>
                <span>{reservation.rentedCar.manufacturer}</span>
                <span>{reservation.rentedCar.model}</span>
              </div>
            )}
            {reservation.startDate && reservation.endDate && (
              <div>
                <span>
                  {getDifferenceBetweenTwoDates(
                    reservation.startDate,
                    reservation.endDate
                  ) === 0
                    ? "24 hours"
                    : `${getDifferenceBetweenTwoDates(
                        reservation.startDate,
                        reservation.endDate
                      )} days`}
                </span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  ) : (
    <></>
  );
};

export default RecentReservations;
