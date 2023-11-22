"use client";

import React, { useState } from "react";
import { AuthForm } from "@/components/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ToastPopup } from "@/components/popups";

const Login = () => {
  const router = useRouter();
  const [toggleToast, setToggleToast] = useState({
    status: false,
    message: "",
    type: "",
  });

  const handleLogin = async (userData) => {
    try {
      const response = await signIn("credentials", {
        data: JSON.stringify(userData),
        redirect: false,
      });

      if (response.ok) {
        router.push("/");
      } else {
        if (response.status === 401) showError("Invalid credentials", "danger");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const showError = (message, type) => {
    setToggleToast({ status: true, message: message, type: type });
  };

  const closeError = () => {
    setToggleToast({ status: false, message: "", type: "" });
  };

  return (
    <section className=" page_sections page__section__dark">
      {toggleToast.status ? (
        <ToastPopup
          toastText={toggleToast.message}
          toastType={toggleToast.type}
          toggleToast={closeError}
        />
      ) : (
        <></>
      )}
      <AuthForm
        type="Login"
        items={[
          { name: "username", type: "text", placeholder: "username or email" },
          { name: "password", type: "password", placeholder: "password" },
        ]}
        onclick={handleLogin}
      />
    </section>
  );
};

export default Login;
