"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "400", subsets: ["latin"] });

const PriceRange = () => {
  const min = 0;
  const max = 10000;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

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
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxRefVal.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minRefVal.current) {
      const minPercent = getPercent(+minRefVal.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <div className="filters__container-price">
      <input
        type="range"
        ref={minRefVal}
        min={min}
        max={max}
        value={minVal}
        className="thumb thumb__z3"
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 100);
          setMinVal(value);
          event.target.value = value.toString();
        }}
      />
      <input
        type="range"
        min={min}
        ref={maxRefVal}
        max={max}
        value={maxVal}
        className="thumb thumb__z4"
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 100);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
      />
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div style={tinWeb.style} className="slider__left-value">
          {minVal}$
        </div>
        <div style={tinWeb.style} className="slider__right-value">
          {maxVal}$
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
