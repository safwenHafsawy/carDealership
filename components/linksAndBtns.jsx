import React from "react";
import Link from "next/link";
import { Lato } from "next/font/google";

const cairo = Lato({ weight: "900", subsets: ["latin"] });

const NavLink = ({ type, hrf, children }) => {
  return (
    <Link style={cairo.style} className={type} href={hrf}>
      {children}
    </Link>
  );
};

export default NavLink;
