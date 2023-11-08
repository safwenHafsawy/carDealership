"use client";

import React, { useState, useEffect, useRef } from "react";
import { Overlock } from "next/font/google";

import { CarForm } from "@/components/form";
import Card from "@/components/card";
import { SectionHeader, SubHeader } from "@/components/header";
import CheckboxFilter from "@/components/filters/checkbox";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });

const Cars = () => {
  const allCars = useRef([]);
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
  const [formValidationErrors, setFormValidationErrors] = useState("");

  const filters = useRef({
    manufacturer: [],
    availability: [],
  });

  const existingManufacturers = useRef([]);

  /**
   * Fetching Car on component startup
   */
  const fetchCars = async () => {
    const response = await fetch("/api/car", {
      method: "GET",
    });

    const data = await response.json();
    setListOfCars([...data]);
    allCars.current = [...data];

    //getting the list of available manufacturers
    allCars.current.forEach((car) => {
      //console.log(car);
      if (!existingManufacturers.current.includes(car.manufacturer)) {
        //console.log("No manufacturer");
        //console.log(existingManufacturers);
        existingManufacturers.current.push(car.manufacturer);
      }
    });
  };

  useEffect(() => {
    fetchCars();
  }, []);

  /**
   * form validation
   */

  const validateForm = async (carData) => {
    return new Promise((resolve, reject) => {
      setFormValidationErrors("");

      // Checking if all fields are filled (for update and create)
      for (const field in carData) {
        if (
          carData[field] === "" &&
          !formValidationErrors.includes("Make sure to fill all fields") &&
          field !== "nextAv"
        ) {
          reject("Make sure to fill all fields");
        }
      }

      // checking if both availability and nextAv are true
      if (carData.availability === true && carData.nextAv !== "") {
        reject(
          "If car is currently available , make sure to remove days until available"
        );
      }

      // Checking if nextAv is set
      if (!carData.availability && carData.nextAv === "") {
        reject(
          "If the car is not available, make sure to specify days until available"
        );
      }

      resolve();
    });
  };

  /**
   * Handling API Calls
   */

  const handleOperation = async (carData, operation) => {
    try {
      await validateForm(carData);

      const formData = new FormData();
      for (let data in carData) {
        formData.append(data, carData[data]);
      }

      if (operation === "DELETE") {
        const response = await fetch("/api/car/", {
          method: "DELETE",
          body: formData,
        });

        switch (response.status) {
          case 401:
            alert("could not remove this car");
            break;
          case 500:
            alert("Internal Server Error");
            break;
          default:
            const filteredList = listOfCars.filter(
              ({ id }) => id !== carData.id
            );
            setListOfCars([...filteredList]);
            setToggleForm(false);
            break;
        }
      } else {
        const response = await fetch("/api/car", {
          method: operation,
          body: formData,
        });

        switch (response.status) {
          case 401:
            alert("could not add/update this car");
            break;
          case 500:
            alert("Internal Server Error");
            break;
          default:
            const data = await response.json();
            if (operation === "PATCH") {
              const filteredList = listOfCars.filter(
                ({ id }) => id !== carData.id
              );
              setListOfCars([...filteredList, data]);
            } else {
              setListOfCars((prevState) => [...prevState, data]);
            }

            setToggleForm(false);
            break;
        }
      }
    } catch (error) {
      //  (error);
      if (
        error === "Make sure to fill all fields" ||
        error ===
          "If the car is not available, make sure to specify days until available" ||
        error ===
          "If car is currently available , make sure to remove days until available"
      ) {
        setFormValidationErrors(error);
      }
    }
  };

  /**
   * Handling form input changes
   */
  const handleChange = (name, value) => {
    if (name === "availability") {
      value = JSON.parse(value);
    }
    setCarData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Handling form display change
   */

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

  /**
   * Filtering Cars
   */

  const handleFilterChange = ({ name, value }) => {
    if (value === "Available") value = true;
    else if (value === "Not Available") value = false;

    // handling of manufacturers filter
    if (name === "manufacturer") {
      if (filters.current.manufacturer.includes(value)) {
        const updatedFilters = filters.current.manufacturer.filter(
          (manufacturer) => !(manufacturer === value)
        );

        filters.current.manufacturer = [...updatedFilters];
        return;
      } else {
        filters.current.manufacturer = [...filters.current.manufacturer, value];
      }
    }
    //handling of availability filters
    else if (name === "availability") {
      if (filters.current.availability.includes(value)) {
        const updatedFilters = filters.current.availability.filter(
          (availability) => !(availability === value)
        );

        filters.current.availability = [...updatedFilters];
      } else {
        filters.current.availability = [...filters.current.manufacturer, value];
      }
    }

    //console.log(filters.current);
  };

  const filterCars = () => {
    const filteredCars = allCars.current.filter((car) => {
      //filter by manufacturer name
      if (filters.current.manufacturer.length > 0) {
        if (!filters.current.manufacturer.includes(car.manufacturer))
          return false;
      }

      if (filters.current.availability.length > 0) {
        if (!filters.current.availability.includes(car.availability)) {
          return false;
        }
      }

      return true;
    });

    setListOfCars([...filteredCars]);
  };

  //useEffect(() => console.log(filters), [filters]);

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
          validationsError={formValidationErrors}
        />
      </div>
      <div className="carCollection">
        <SectionHeader type="section_header-light">
          Car Collection
        </SectionHeader>

        <div className="options">
          <div className="options-left">
            <div className="filters_container">
              <div className="filters_option">
                <span style={tinWeb.style}>Manufacturer: </span>
                <div className="filters_option-set">
                  {existingManufacturers.current.map((manufacturer, index) => {
                    return (
                      <CheckboxFilter
                        key={index}
                        name="manufacturer"
                        value={manufacturer}
                        onChange={handleFilterChange}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="filters_option">
                <span style={tinWeb.style}>Availability: </span>
                <div className="filters_option-set">
                  <CheckboxFilter
                    key={1}
                    name={"availability"}
                    value={"Available"}
                    onChange={handleFilterChange}
                  />
                  <CheckboxFilter
                    key={2}
                    name={"availability"}
                    value={"Not Available"}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
            </div>
            <button style={tinWeb.style} onClick={filterCars}>
              &#8711; Filter
            </button>
          </div>

          <div className="options-right">
            <button
              style={tinWeb.style}
              onClick={() => {
                resetForm();
                showForm(true, "Create");
              }}
            >
              Add New Car
            </button>
          </div>
        </div>
        <div className="carsContainer">
          {/*console.log(listOfCars)*/}
          {listOfCars.length === 0 ? (
            <SubHeader type="sub__header-light">
              Looks Like there are no cars here yet
            </SubHeader>
          ) : (
            listOfCars.map((car) => {
              return (
                <Card
                  key={car.id}
                  carDetails={car}
                  toggleUpdate={showForm}
                  handleChange={handleChange}
                  resetForm={resetForm}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Cars;
