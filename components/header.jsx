import React from "react";
import { Lato, Overlock } from "next/font/google";

const cairo = Lato({ weight: "900", subsets: ["latin"] });
const work_sans = Overlock({ weight: "700", subsets: ["latin"] });

const SectionHeader = ({ type, children }) => {
  return (
    <h1 style={cairo.style} className={type}>
      {children}
    </h1>
  );
};

const SubHeader = ({ type, children }) => {
  return (
    <h2 style={work_sans.style} className={type}>
      {children}
    </h2>
  );
};

export { SectionHeader, SubHeader };
