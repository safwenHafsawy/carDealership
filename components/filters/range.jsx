"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });

const PriceRange = ({ minPrice, maxPrice, onChange }) => {
  const min = 0;
  const max = 500;

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // refs are used to access DOM element directly
  const minRefVal = useRef(null);
  const maxRefVal = useRef(null);
  const range = useRef(null);

  useEffect(() => {
    if (maxRefVal.current) {
      const minPercent = getPercent(minPrice);
      const maxPercent = getPercent(+maxRefVal.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minPrice, getPercent]);

  useEffect(() => {
    if (minRefVal.current) {
      const minPercent = getPercent(+minRefVal.current.value);
      const maxPercent = getPercent(maxPrice);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxPrice, getPercent]);

  return (
    <div className="filters__container-price">
      <input
        type="range"
        ref={minRefVal}
        min={min}
        max={max}
        value={minPrice}
        name="minPrice"
        className="thumb thumb__z3"
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxPrice - 20);
          onChange({ name: event.target.name, value });
          event.target.value = value.toString();
        }}
      />
      <input
        type="range"
        min={min}
        ref={maxRefVal}
        max={max}
        value={maxPrice}
        name="maxPrice"
        className="thumb thumb__z4"
        onChange={(event) => {
          const value = Math.max(+event.target.value, minPrice + 20);
          onChange({ name: event.target.name, value });
          event.target.value = value.toString();
        }}
      />
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div style={tinWeb.style} className="slider__left-value">
          {minPrice}$
        </div>
        <div style={tinWeb.style} className="slider__right-value">
          {maxPrice}$
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
