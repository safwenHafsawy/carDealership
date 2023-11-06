"use client";

import React, { useState, useEffect } from "react";
import { Overlock } from "next/font/google";

import { CarForm } from "@/components/form";
import Card from "@/components/card";
import { SectionHeader } from "@/components/header";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });

const Cars = () => {
  const [listOfCars, setListOfCars] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const [carData, setCarData] = useState({
    manufacturer: "",
    model: "",
    availability: true,
    pricePerHour: "",
    image: "",
    technicalSpec: "",
    nextAv: "",
  });
  const [formTitle, setFormTitle] = useState("");

  const fetchCars = async () => {
    const response = await fetch("/api/car", {
      method: "GET",
    });

    const data = await response.json();
    setListOfCars([...data]);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleOperation = async (carData, operation) => {
    const formData = new FormData();
    for (let data in carData) {
      formData.append(data, carData[data]);
    }

    if (operation === "DELETE") {
      const response = await fetch("/api/car/", {
        method: "DELETE",
        body: formData,
      });

      console.log(response.status);
      if (response.status === 204) {
        const filteredList = listOfCars.filter(({ id }) => id !== carData.id);
        console.log(filteredList);
        setListOfCars([...filteredList]);
        setToggleForm(false);
      } else if (response.status === 401) alert("could not remove this car");
      else if (response.status === 500) alert("Internal Server Error");
    } else {
      const response = await fetch("/api/car", {
        method: operation,
        body: formData,
      });

      if (response.status === 201) {
        await fetchCars();
      } else if (response.status === 401) alert("could not add");
      else alert("internal server error");
    }
  };

  const handleChange = (name, value) => {
    if (name === "availability") {
      value = JSON.parse(value);
    }
    setCarData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showForm = (status, opType) => {
    setFormTitle(opType);
    setToggleForm(status);
  };

  const resetForm = () => {
    for (let dt in carData) {
      if (dt === "availability") carData[dt] = true;
      else carData[dt] = "";
    }
  };

  //useEffect(() => console.log(carData), [carData]);

  return (
    <section className="page_sections-full">
      <div className="addCar">
        <CarForm
          title={formTitle}
          handleChange={handleChange}
          carData={carData}
          status={toggleForm}
          submitForm={handleOperation}
          toggleUpdate={showForm}
        />
      </div>
      <div className="carCollection">
        <SectionHeader type="section_header-light">
          Car Collection
        </SectionHeader>
        <div className="options">
          <button
            style={tinWeb.style}
            onClick={() => {
              resetForm();
              showForm(true, "Create");
            }}
          >
            add new car
          </button>
        </div>
        <div className="carsContainer">
          {listOfCars.map((car) => {
            return (
              <Card
                key={car.id}
                carDetails={car}
                toggleUpdate={showForm}
                handleChange={handleChange}
                resetForm={resetForm}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Cars;
