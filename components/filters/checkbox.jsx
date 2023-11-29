import React from "react";

import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "400", subsets: ["latin"] });

const SingleCheckBoxContainer = ({ name, value, onChange }) => {
  return (
    <div className="singleCheckBox__container">
      <div className="custom-checkbox">
        <input
          name={name}
          type="checkbox"
          value={value}
          onChange={(e) => onChange(e.target)}
        />
        <div className="outer"></div>
        <div className="inner"></div>
      </div>
      <span className={tinWeb.className}>{value}</span>
    </div>
  );
};

const MultipleCheckBox = ({ name, value, onChange }) => {
  return (
    <div className={`${tinWeb.className} custom-multiCheckbox`}>
      <input
        name={name}
        type="checkbox"
        value={value}
        onChange={(e) => onChange(e.target)}
      />
      <label>{value}</label>
    </div>
  );
};

export { SingleCheckBoxContainer, MultipleCheckBox };
