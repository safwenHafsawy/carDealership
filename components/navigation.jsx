"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lato, Luckiest_Guy } from "next/font/google";
import { signOut, useSession } from "next-auth/react";

const cairo = Lato({ weight: "900", subsets: ["latin"] });
const brand = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

function Navigation() {
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession();

  const toggleDropDown = () => {
    setToggle(!toggle);
  };

  return (
    <nav className="navigation">
      <h2 style={brand.style} className="brand__name">
        Swift Cars
      </h2>
      <ul style={cairo.style} className="navigation__list">
        {session ? (
          <div className="navigation__list__item dropDownMenu">
            <span onClick={toggleDropDown} className="dropDownMenu__icon">
              {session.user.name}
            </span>
            <ul
              className={
                toggle
                  ? "dropDownMenu__list-shown"
                  : "dropDownMenu__list-hidden"
              }
            >
              <li className="dropDownMenu__list__item">
                <button onClick={signOut}>Logout</button>
              </li>
              <li className="dropDownMenu__list__item">
                <Link href="/" onClick={() => setToggle(false)}>
                  Rented Cars
                </Link>
              </li>
              <li className="dropDownMenu__list__item">
                <Link href="/" onClick={() => setToggle(false)}>
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <li className="navigation__list__item">
            <Link href="/login">Login</Link>
          </li>
        )}

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
