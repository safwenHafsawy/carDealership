"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Overlock } from "next/font/google";

import { SubHeader } from "./header";
import DragAndDrop from "./dragAndDropImg";
import Link from "next/link";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });
const acceptedTypes = ["image/jpeg", "image/png"];

const AuthForm = ({ type, items, onclick, showToast, toggleToast }) => {
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
    } else {
      showToast(
        "Please Select and image of type png or jpeg",
        "danger",
        toggleToast
      );
    }
  };

  const submitForm = (e) => {
    console.log(e.target.name);
    if (type === "CreateAccount") {
      const formData = new FormData();
      for (let d in formValues) {
        formData.append(d, formValues[d]);
      }
      formData.append("userImage", image);
      onclick(formData);
      return;
    }
    onclick(formValues, e.target.name);
  };

  return (
    <div className={type === "Login" ? "auth__form" : "auth__form_long"}>
      <SubHeader type="sub__header-dark">
        {type === "Login" ? "Login" : "Create New Account"} here
      </SubHeader>
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
        value={type === "Login" ? "Login" : "Sign Up"}
        name="credentials"
        onClick={submitForm}
      />
      <div className="social__auth">
        <button
          style={tinWeb.style}
          className="social__auth-item"
          name="google"
          onClick={submitForm}
        >
          <Image src="/google.svg" width={30} height={30} alt="google icon" />
          <span>
            {type === "Login" ? "Login with Google" : "Sign Up with google"}
          </span>
        </button>
      </div>
      <div className="options">
        {type == "Login" ? (
          <p style={tinWeb.style}>
            Don&apos;t have an account ?
            <Link href="/signup"> Sign up here!</Link>
          </p>
        ) : (
          <p style={tinWeb.style}>
            Already have an account ?
            <Link
              href={{
                pathname: "/login",
                query: { prevPath: pathname },
              }}
            >
              Login here!
            </Link>
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
  showToast,
  toggleToast,
}) => {
  const handleFile = (file) => {
    if (acceptedTypes.includes(file.type)) {
      handleChange("image", file);
    } else {
      showToast(
        "Please Select and image of type png or jpeg",
        "danger",
        toggleToast
      );
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
      <button
        style={tinWeb.style}
        className="closeForm"
        onClick={closeForm}
      ></button>
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

      <button
        style={tinWeb.style}
        type="submit"
        onClick={handleSubmit}
        className="submit-btn"
      >
        {title === "Create" ? "Add Car" : "Update Car"}
      </button>
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
