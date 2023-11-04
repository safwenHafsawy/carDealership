"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Overlock } from "next/font/google";

import { SubHeader } from "./header";
import DragAndDrop from "./dragAndDropImg";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });
const acceptedTypes = ["image/jpeg", "image/png"];

const AuthForm = ({ type, items, onclick }) => {
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

const CarForm = ({ submitForm }) => {
  const [carData, setCarData] = useState({
    manufacturer: "",
    model: "",
    available: "",
    image: "",
    technicalSpecifications: "",
    nextAv: "",
  });

  const handleFile = (file) => {
    if (acceptedTypes.includes(file.type)) {
      setCarData((prevState) => {
        return { ...prevState, image: file };
      });
      //console.log(file);
    } else {
      alert("Please Select and image of type png or jpeg");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(carData);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCarData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="carForm">
      <SubHeader type="sub__header-dark">Add a new car</SubHeader>
      <input
        name="manufacturer"
        value={carData.manufacturer}
        style={tinWeb.style}
        type="text"
        placeholder="Car Manufacturer"
        onChange={handleChange}
      />
      <input
        name="model"
        value={carData.model}
        style={tinWeb.style}
        type="text"
        placeholder="Car Model"
        onChange={handleChange}
      />

      <label style={tinWeb.style}>
        <input type="radio" name="availability" value={true} />{" "}
        <span>Available</span>
      </label>

      <label style={tinWeb.style}>
        <input
          id="notAvailable"
          type="radio"
          name="availability"
          value={false}
        />
        <span>Not Available</span>
      </label>
      <input
        name="nextAv"
        value={carData.nextAv}
        style={tinWeb.style}
        type="text"
        placeholder="Next Available (If not Available)"
        onChange={handleChange}
      />
      <textarea
        placeholder="Technical specifications"
        name="technicalSpecifications"
        style={tinWeb.style}
        rows={5}
        col={50}
        value={carData.technicalSpecifications}
        onChange={handleChange}
      />
      <DragAndDrop image={carData.image} changeImage={handleFile} />

      <input
        style={tinWeb.style}
        type="submit"
        value="Add Car"
        onClick={handleSubmit}
      />
    </form>
  );
};

export { AuthForm, CarForm };
