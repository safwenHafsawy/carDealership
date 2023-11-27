import React from "react";

import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });

const SingleCheckBoxContainer = ({ value }) => {
  return (
    <div className="singleCheckBox__container">
      <div class="custom-checkbox">
        <input type="checkbox" />
        <div class="outer"></div>
        <div class="inner"></div>
      </div>
      <span className={tinWeb.className}>{value}</span>
    </div>
  );
};

const MultipleCheckBox = ({ value }) => {
  return (
    <div className="custom-multiCheckbox">
      <input type="checkbox" />
      <label>{value}</label>
    </div>
  );
};

export { SingleCheckBoxContainer, MultipleCheckBox };
