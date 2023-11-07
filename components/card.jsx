"use client";

import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Titillium_Web } from "next/font/google";

const tilWeb = Titillium_Web({ weight: "400", subsets: ["latin"] });

const Card = ({ carDetails, toggleUpdate, handleChange, resetForm }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { id, model, image, pricePerHour, availability, nextAv } = carDetails;

  const goToCar = () => {
    if (session?.user.role === "ADMIN") {
      if (pathname === "/carCatalog") {
        alert(
          "if you want to update this car details, please use the dashboard"
        );
        return;
      } else if (pathname === "/dashboard/cars") {
        resetForm();
        for (let dt in carDetails) {
          if (dt !== "userId" && dt !== "image") {
            let value = carDetails[dt];
            if (carDetails[dt] === null) value = "";
            handleChange(dt, value);
          } else if (dt === "image") {
            //console.log(carDetails[dt].split("\\cars\\")[1].split("_")[0]);
          }
        }

        toggleUpdate(true, "Update");
        return;
      }
    }
    router.push(`/carCatalog/${id}`);
  };

  return (
    <div className="card" onClick={goToCar}>
      <div className="card__image">
        <Image src={`/${image}`} width={240} height={240} alt="car picture" />
      </div>
      <div className="card__details">
        <h1>
          <span>Model : </span>
          {model}
        </h1>
        <p style={tilWeb.style}>
          Status : {availability ? "Available" : `Available in ${nextAv} days`}
        </p>
        <p style={tilWeb.style}>Price Per Hour : {pricePerHour} $</p>
      </div>
    </div>
  );
};

export default Card;
