"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Overlock } from "next/font/google";

import { SubHeader } from "./header";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });

const Form = ({ type, items, onclick }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const toOtherForm = () => {
    if (pathname === "/login") {
      router.push("/signup");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={type === "Login" ? "auth__form" : "auth__form_long"}>
      <SubHeader type="sub__header-dark">{type} here</SubHeader>
      {items.map((item, index) => {
        return (
          <input
            key={index}
            name={item.name}
            value={formValues[item.name] || ""}
            style={tinWeb.style}
            type={item.type}
            className=" auth__items"
            placeholder={item.placeholder}
            onChange={handleChange}
          />
        );
      })}
      <input
        type="submit"
        style={tinWeb.style}
        className="login__items auth__btn"
        onClick={() => onclick(formValues)}
        value={type === "Login" ? "Login" : "Sign Up"}
      />

      <div className="social__auth">
        <div style={tinWeb.style} className="social__auth-item">
          Google
          <Image src="/google.svg" width={20} height={20} alt="google icon" />
        </div>
      </div>
      <div className="options">
        {type == "Login" ? (
          <p style={tinWeb.style}>
            Don&apos;t have an account ?
            <span onClick={toOtherForm}> Sign up here!</span>
          </p>
        ) : (
          <p style={tinWeb.style}>
            Already have an account ?
            <span onClick={toOtherForm}> Login here!</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
