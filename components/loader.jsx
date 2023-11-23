import React from "react";

import { SubHeader } from "./header";

const Loader = ({ loaderText }) => {
  return (
    <div className="loader__container">
      <div className="spinner" />
      <SubHeader type="sub__header-dark">{loaderText}</SubHeader>
    </div>
  );
};

export default Loader;
