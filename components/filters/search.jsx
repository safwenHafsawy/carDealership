"use client";
import React, { useState } from "react";
import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "400", subsets: ["latin"] });

const SearchBar = () => {
  const [text, setText] = useState("");
  return (
    <input
      style={tinWeb.style}
      value={text}
      type="text"
      className="search__box"
      placeholder="search ..."
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default SearchBar;
