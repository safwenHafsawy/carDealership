import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Lato, Luckiest_Guy } from "next/font/google";

const cairo = Lato({ weight: "900", subsets: ["latin"] });
const brand = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

function Navigation() {
  return (
    <nav className="navigation">
      <h2 style={brand.style} className="brand__name">
        Swift Cars
      </h2>
      <ul style={cairo.style} className="navigation__list">
        <li className="navigation__list__item">
          <Link href="/login">Login</Link>
        </li>
        <li className="navigation__list__item">
          <Link href="/carCatalog">Car Catalog</Link>
        </li>
        <li className="navigation__list__item">
          <Link href="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
