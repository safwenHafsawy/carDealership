"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lato, Luckiest_Guy, Overlock } from "next/font/google";
import { signOut, useSession } from "next-auth/react";

const mainHeaderFont = Lato({ weight: "900", subsets: ["latin"] });
const secondaryHeaderFont = Overlock({ weight: "700", subsets: ["latin"] });
const brandFont = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

function Navigation() {
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const toggleDropDown = () => {
    setToggle(!toggle);
  };

  return (
    <nav className="navigation">
      <h2 className={`${brandFont.className} brand__name`}>Swift Cars</h2>
      <ul className={`${mainHeaderFont.className} navigation__list`}>
        {session ? (
          <div className="navigation__list__item dropDownMenu">
            <Image
              src={session.user.image}
              width={40}
              height={40}
              alt="user picture"
              className="dropDownMenu__icon"
              onClick={toggleDropDown}
            />
            <ul
              className={
                toggle
                  ? "dropDownMenu__list-shown"
                  : "dropDownMenu__list-hidden"
              }
            >
              <li className="dropDownMenu__list__item">
                <button
                  className={secondaryHeaderFont.className}
                  onClick={signOut}
                >
                  Logout
                </button>
              </li>
              <li className="dropDownMenu__list__item">
                <Link href="/rentedCars" onClick={() => setToggle(false)}>
                  Booked Cars
                </Link>
              </li>
              {session?.user.role == "ADMIN" ? (
                <li className="dropDownMenu__list__item mobile-item">
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              ) : (
                <></>
              )}
              <li className="dropDownMenu__list__item mobile-item">
                <Link href="/carCatalog">Car Catalog</Link>
              </li>
              <li className="dropDownMenu__list__item mobile-item">
                <Link href="/">Home</Link>
              </li>
            </ul>
          </div>
        ) : (
          <li className="navigation__list__item">
            <Link
              href={{
                pathname: "/login",
                query: { prevPath: pathname },
              }}
            >
              Login
            </Link>
          </li>
        )}
        {session?.user.role == "ADMIN" ? (
          <li className="navigation__list__item">
            <Link href="/dashboard">Dashboard</Link>
          </li>
        ) : (
          <></>
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
