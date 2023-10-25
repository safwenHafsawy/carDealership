"use client";

import PriceRange from "./filters/range";
import SearchBar from "./filters/search";
import { SectionHeader } from "@/components/header";
import NavLink from "@/components/linksAndBtns";

const Filters = () => {
  return (
    <div className="filters__container">
      <SectionHeader type="section_header-dark">
        What are you looking for today ?
      </SectionHeader>
      <SearchBar />
      <PriceRange />
      <NavLink type="dark__navLink" hrf="/">
        Search
      </NavLink>
    </div>
  );
};

export default Filters;
