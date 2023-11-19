"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { SectionHeader } from "@/components/header";
import { InputModal } from "@/components/popups";
import { Overlock, Andika } from "next/font/google";

const tinWeb = Overlock({ weight: "900", subsets: ["latin"] });
const smallTextFont = Andika({ weight: "700", subsets: ["latin"] });

const CarDetails = () => {
  const [carDetails, setCarDetails] = useState({});
  const pathname = usePathname();
  const carId = useRef(pathname.split("/")[2]);
  const { data: session } = useSession();
  const router = useRouter();

  const fetchCarData = async () => {
    try {
      const response = await fetch(`/api/car/${carId.current}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setCarDetails({ ...data });
      }
      if (response.status === 404) {
        alert("Not Found");
      }
      if (response.status === 500) {
        alert("internal server error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  const bookCar = () => {
    if (!session) router.push("/login");
  };

  return (
    <section className="page_sections-full">
      <InputModal />
      <div className="page__sections__leftSide car__image">
        <Image
          src={`/${carDetails.image}`}
          width={500}
          height={500}
          alt="Car image"
        />
      </div>
      <div className="page__sections__rightSide car__details">
        <div className="page_section-header">
          <SectionHeader type="section_header-light">
            {carDetails.model}
          </SectionHeader>
        </div>

        <div className="page__section-details">
          <h2 style={tinWeb.style}>
            Manufacturer:{" "}
            <span style={tinWeb.style}>{carDetails.manufacturer}</span>
          </h2>
          <div>
            <p style={smallTextFont.style}>
              Rent price per hour : {carDetails.pricePerHour}$<br />
              Availability :{" "}
              {carDetails.availability
                ? "Available"
                : `Available In ${carDetails.nextAv} days`}
            </p>

            <p style={smallTextFont.style}>
              Description : <br />
              {carDetails.technicalSpec}
            </p>
          </div>
        </div>
        <div className="options">
          <button style={tinWeb.style} onClick={bookCar}>
            Book This Car
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
