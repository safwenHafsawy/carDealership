"use client";

import React, { useEffect, useState } from "react";

/**
 * Import Components
 */
import { SectionHeader, SubHeader } from "@/components/header";

const RentedCars = () => {
  const [rentedCarsLogs, setRentedCarsLogs] = useState([]);

  const getUserBookingLogs = async () => {
    const response = await fetch("api/book/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status === 200) setRentedCarsLogs(data);
    else if (response.status === 404) console.log(data);
  };

  useEffect(() => {
    getUserBookingLogs();
  }, []);

  useEffect(() => {
    console.log(rentedCarsLogs);
  }, [rentedCarsLogs]);

  return (
    <section className="page_sections-full booked__cars">
      <SectionHeader type="section_header-light">Booked Cars</SectionHeader>
      <div className="booked__cars__data">
        {rentedCarsLogs.length === 0 ? (
          <SubHeader>No booked Cars Yet</SubHeader>
        ) : (
          <div>
            {rentedCarsLogs.map((car, index) => (
              <div key={index}>
                <span>
                  {car.rentedCar.manufacturer} {car.rentedCar.model}
                </span>
                <span>&#10148;</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RentedCars;
