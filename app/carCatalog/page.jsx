"use client";

import React from "react";
import CustomShapeDivider from "@/components/custom_shape_divider";

import carsData from "../api/dummyData";
import Card from "@/components/card";
import { SectionHeader } from "@/components/header";
import Filters from "@/components/filters";

const CarCatalog = () => {
  return (
    <section className="page_sections car__catalog">
      <div className="page__sections__leftSide catalog__leftSide">
        <Filters />
      </div>
      <div className="page__sections__rightSide">
        <CustomShapeDivider type="shape__divider__dark" />
        <SectionHeader type="section_header-light">
          Our Car Collection
        </SectionHeader>
        <div id="card_section" className="card__container">
          {carsData.map((car) => {
            return (
              <Card
                key={car.id}
                id={car.id}
                model={car.model}
                manuf={car.manufacturer}
                image={car.image}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CarCatalog;
