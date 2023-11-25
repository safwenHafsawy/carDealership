import React from "react";
import { Lato, Overlock } from "next/font/google";

const mainHeaderFont = Lato({ weight: "900", subsets: ["latin"] });
const secondaryHeaderFont = Overlock({ weight: "700", subsets: ["latin"] });

const SectionHeader = ({ type, children }) => {
  return (
    <h1 className={`main__header ${mainHeaderFont.className} ${type}`}>
      {children}
    </h1>
  );
};

const SubHeader = ({ type, children }) => {
  return (
    <h2 className={`${secondaryHeaderFont.className} ${type}`}>{children}</h2>
  );
};

export { SectionHeader, SubHeader };
