"use client";

import React from "react";
import Image from "next/image";
import { Titillium_Web } from "next/font/google";

import NavLink from "./linksAndBtns";

const tilWeb = Titillium_Web({ weight: "400", subsets: ["latin"] });

const Card = ({ id, model, image }) => {
  return (
    <div className="card">
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
