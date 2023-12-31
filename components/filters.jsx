"use client";

import { useEffect, useState } from "react";

import PriceRange from "./filters/range";
import SearchBar from "./filters/search";
import { SectionHeader } from "@/components/header";
import { SingleCheckBoxContainer } from "./filters/checkbox";

import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "900", subsets: ["latin"] });

const Filters = ({ changeFilters, filterData }) => {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [available, setAvailability] = useState(false);

  const handleChange = ({ name, value }) => {
    switch (name) {
      case "search":
        setSearch(value);
        break;
      case "minPrice":
        setMinPrice(value);
        break;
      case "maxPrice":
        setMaxPrice(value);
        break;
      case "available":
        setAvailability(!available);
        break;
    }
  };

  useEffect(() => console.log(available), [available]);

  return (
    <div className="filters__container">
      <SectionHeader type="section_header-dark">
        What are you looking for today ?
      </SectionHeader>
      <div className="filters__container__filters">
        <SearchBar search={search} onChange={handleChange} />
        <PriceRange
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChange={handleChange}
        />

        <SingleCheckBoxContainer
          name="available"
          value="Available Only"
          onChange={handleChange}
        />
      </div>
      <button
        className={`${tinWeb.className} filters__container-search`}
        onClick={() => filterData(search, minPrice, maxPrice, available)}
      >
        Search
      </button>
    </div>
  );
};

export default Filters;
