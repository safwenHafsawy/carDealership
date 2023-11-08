import React from "react";

import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "400", subsets: ["latin"] });

const CheckboxFilter = ({ type, name, value, onChange }) => {
  return (
    <label
      className={
        type === "dark"
          ? "checkboxFilter_container-dark"
          : "checkboxFilter_container"
      }
    >
      <span style={tinWeb.style}>{value}</span>
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target)}
      />
    </label>
  );
};

export default CheckboxFilter;
