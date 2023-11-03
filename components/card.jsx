"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Titillium_Web } from "next/font/google";

const tilWeb = Titillium_Web({ weight: "400", subsets: ["latin"] });

const Card = ({ id, model, image }) => {
  const router = useRouter();

  const goToCar = () => {
    console.log("sss");
    router.push(`/carCatalog/${id}`);
  };

  return (
    <div className="card" onClick={goToCar}>
      <div className="card__image">
        <Image src={image} width={240} height={240} alt="car picture" />
      </div>
      <div className="card__details">
        <h1>
          <span>Model : </span>
          {model}
        </h1>
        <p style={tilWeb.style}>Status : Available</p>
      </div>
    </div>
  );
};

export default Card;
