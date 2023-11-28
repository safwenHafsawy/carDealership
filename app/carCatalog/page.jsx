"use client";

import React, { useEffect, useState, useRef } from "react";
import useToast from "@/hooks/useToast";

/**
 * Importing components
 */
import Card from "@/components/card";
import Filters from "@/components/filters";
import CustomShapeDivider from "@/components/custom_shape_divider";
import Loader from "@/components/loader";
import { ToastPopup } from "@/components/popups";
import { SectionHeader } from "@/components/header";

/**
 * importing helper functions
 */

import { showToast } from "@/lib/toastFunctions";

/**
 *  Car Catalog page component
 */
const CarCatalog = () => {
  const allCarsList = useRef([]);
  const filtersList = useRef({
    search: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
  });
  const [carsList, setCarsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggleToast, setToggleToast] = useToast();

  /**
   * fetch cars
   */

  const getCars = async () => {
    try {
      const response = await fetch("/api/car");

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        allCarsList.current = data;
        setCarsList(data);

        handleLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleLoading(true);
    getCars();
  }, []);

  /**
   * filtering data
   */

  const handleFilterChange = ({ name, value }) => {
    //handling search
    if (name === "search") {
      filtersList.current.search = value;
    }

    //handling prices
    if (name === "minPrice") filtersList.current.minPrice = parseFloat(value);
    if (name === "maxPrice") filtersList.current.maxPrice = parseFloat(value);
  };

  const filterData = (search, minPrice, maxPrice, available) => {
    let filteredCars = [...allCarsList.current];

    //filter based on search keywords
    if (search.length > 0) {
      const listOfKeywords = search.split(" ");
      for (let word of listOfKeywords) {
        filteredCars = filteredCars.filter((car) => {
          if (
            !car.manufacturer.toLowerCase().includes(word.toLowerCase()) &&
            !car.model.toLowerCase().includes(word.toLowerCase()) &&
            !car.technicalSpec.toLowerCase().includes(word.toLowerCase())
          ) {
            return false;
          }

          return true;
        });
      }
    }

    //filter based on Price
    filteredCars = filteredCars.filter((car) => {
      if (!(car.pricePerHour > minPrice) || !(car.pricePerHour < maxPrice)) {
        return false;
      }
      return true;
    });

    //filter based on availability
    if (available) {
      filteredCars = filteredCars.filter(
        (car) => car.availability === "Available"
      );
    }

    setCarsList([...filteredCars]);
  };

  /**
   * handle loading
   */
  const handleLoading = (status) => {
    setLoading(status);
  };

  return (
    <section className="page_sections car__catalog">
      {toggleToast.status ? (
        <ToastPopup
          toastText={toggleToast.message}
          toastType={toggleToast.type}
          toggleToast={setToggleToast}
        />
      ) : null}
      <div className="page__sections__leftSide catalog__leftSide">
        <Filters changeFilters={handleFilterChange} filterData={filterData} />
      </div>
      <div className="page__sections__rightSide">
        <CustomShapeDivider type="shape__divider__dark" />
        <SectionHeader type="section_header-light">
          Our Car Collection
        </SectionHeader>
        {loading ? (
          <Loader loaderText="Fetching the newest details about the car inventory. Just a moment..." />
        ) : (
          <>
            <div id="card_section" className="card__container">
              {carsList.map((car) => {
                return (
                  <Card
                    key={car.id}
                    carDetails={car}
                    showToast={showToast}
                    toggleToast={setToggleToast}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CarCatalog;
