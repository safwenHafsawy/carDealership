"use client";

import React, { useState } from "react";
import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });

const DragAndDrop = ({ image, changeImage }) => {
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let image = e.dataTransfer.files[0];
    changeImage(image);
  };

  return (
    <div
      className="dragDrop__container"
      onDragOver={handleOnDragOver}
      onDrop={handleOnDrop}
    >
      <input
        type="file"
        name="file"
        id="file"
        className="dragDrop__input"
        onChange={(e) => changeImage(e.target.files[0])}
      />
      <label htmlFor="file" className="dragDrop__label" style={tinWeb.style}>
        {!image ? "Drag and Drop or Select image here" : image.name}
      </label>
    </div>
  );
};

export default DragAndDrop;
