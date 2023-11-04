"use client";

import React from "react";

import { CarForm } from "@/components/form";

const Cars = () => {
  const handleOperation = async (carData) => {
    const formData = new FormData();
    for (let data in carData) {
      console.log(carData[data]);
      formData.append(data, carData[data]);
    }

    await fetch("/api/car", {
      method: "POST",
      body: formData,
    });
  };
  return (
    <section className="page_sections-full">
      <div className="page__sections__rightSide addCar">
        <CarForm submitForm={handleOperation} />
      </div>
      <div className="page__sections__leftSide"></div>
    </section>
  );
};

export default Cars;
