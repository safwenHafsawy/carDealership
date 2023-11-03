"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Overlock } from "next/font/google";

import { SubHeader } from "./header";
import DragAndDrop from "./dragAndDropImg";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });
const acceptedTypes = ["image/jpeg", "image/png"];

const Form = ({ type, items, onclick }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [formValues, setFormValues] = useState({});
  const [image, SetImage] = useState(null);

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

  const handleFile = (file) => {
    if (acceptedTypes.includes(file.type)) {
      SetImage(file);
      console.log(file);
    } else {
      alert("Please Select and image of type png or jpeg");
    }
  };

  const submitForm = () => {
    if (type === "CreateAccount") {
      const formData = new FormData();
      for (let d in formValues) {
        formData.append(d, formValues[d]);
      }
      formData.append("userImage", image);
      onclick(formData);
      return;
    }
    onclick(formValues);
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
      {type === "Login" ? (
        <></>
      ) : (
        <DragAndDrop image={image} changeImage={handleFile} />
      )}
      <input
        type="submit"
        style={tinWeb.style}
        className="login__items auth__btn"
        onClick={submitForm}
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
