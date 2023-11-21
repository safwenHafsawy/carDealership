import React from "react";
import { Lato, Overlock } from "next/font/google";

const cairo = Lato({ weight: "900", subsets: ["latin"] });
const work_sans = Overlock({ weight: "700", subsets: ["latin"] });

const SectionHeader = ({ type, children }) => {
  return <h1 className={`${cairo.className} ${type}`}>{children}</h1>;
};

const SubHeader = ({ type, children }) => {
  return <h2 className={`${work_sans.className} ${type}`}>{children}</h2>;
};

export { SectionHeader, SubHeader };
