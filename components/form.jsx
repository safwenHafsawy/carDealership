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

/**
 *
 * CAR FORM COMPONENT
 *
 */
const CarForm = ({
  title,
  carData,
  handleChange,
  status,
  submitForm,
  toggleUpdate,
  validationsError,
}) => {
  const handleFile = (file) => {
    if (acceptedTypes.includes(file.type)) {
      handleChange("image", file);
    } else {
      alert("Please Select and image of type png or jpeg");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let operation = title === "Create" ? "POST" : "PATCH";
    submitForm(carData, operation);
  };

  const closeForm = (e) => {
    e.preventDefault();
    toggleUpdate(false);
  };

  return (
    <form className={status ? "carForm" : "carForm-hidden"}>
      <SubHeader type="sub__header-dark">
        {title === "Create" ? "Add New Car" : "Update Car"}
      </SubHeader>
      <button style={tinWeb.style} className="closeForm" onClick={closeForm}>
        Close
      </button>
      <div
        className={validationsError.length > 0 ? "error-show" : "error-hide"}
      >
        <p>{validationsError}</p>
      </div>
      <input
        name="manufacturer"
        value={carData.manufacturer}
        style={tinWeb.style}
        type="text"
        placeholder="Car Manufacturer"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <input
        name="model"
        value={carData.model}
        style={tinWeb.style}
        type="text"
        placeholder="Car Model"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      {/**Availability */}
      <label style={tinWeb.style}>
        <input
          type="radio"
          name="availability"
          value={true}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          checked={carData.availability}
        />
        <span>Available</span>
      </label>

      <label style={tinWeb.style}>
        <input
          id="notAvailable"
          type="radio"
          name="availability"
          value={false}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          checked={!carData.availability}
        />
        <span>Not Available</span>
      </label>
      <input
        name="nextAv"
        value={carData.nextAv}
        style={tinWeb.style}
        type="text"
        placeholder="Days until available (If not Available)"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <input
        name="pricePerHour"
        value={carData.pricePerHour}
        style={tinWeb.style}
        type="text"
        placeholder="Hourly Price"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <textarea
        placeholder="Technical specifications"
        name="technicalSpec"
        style={tinWeb.style}
        rows={5}
        col={50}
        value={carData.technicalSpec}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <DragAndDrop image={carData.image} changeImage={handleFile} />

      <input
        style={tinWeb.style}
        type="submit"
        value={title === "Create" ? "Add Car" : "Update Car"}
        onClick={handleSubmit}
      />
      <button
        style={tinWeb.style}
        className={title === "Create" ? "removeBtn-hidden" : "removeBtn-shown"}
        onClick={(e) => {
          e.preventDefault();
          submitForm({ id: carData.id }, "DELETE");
        }}
      >
        Remove Car
      </button>
    </form>
  );
};

export { AuthForm, CarForm };
