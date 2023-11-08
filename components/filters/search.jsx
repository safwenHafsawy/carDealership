"use client";
import React, { useState } from "react";
import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });

const SearchBar = ({ search, onChange }) => {
  return (
    <input
      style={tinWeb.style}
      value={search}
      name="search"
      type="text"
      className="search__box"
      placeholder="search for models, manufacturer, ..."
      onChange={(e) => onChange(e.target)}
    />
  );
};

export default SearchBar;
