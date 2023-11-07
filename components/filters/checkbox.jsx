import React from "react";

import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "400", subsets: ["latin"] });

const CheckboxFilter = ({ name, value, onChange }) => {
  return (
    <label className="checkboxFilter_container">
      <span style={tinWeb.style}>{value}</span>
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </label>
  );
};

export default CheckboxFilter;
