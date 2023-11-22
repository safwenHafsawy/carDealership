"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { AuthForm } from "@/components/form";

import { ToastPopup } from "@/components/popups";

import { showToast } from "@/lib/toastFunctions";

const SignUp = () => {
  const router = useRouter();
  const [toggleToast, setToggleToast] = useToast();

  const handleSignUp = async (userData) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: userData,
    });

    if (response.status === 401)
      showToast(
        "Email or Username is already used !",
        "danger",
        setToggleToast
      );
    if (response.status === 500)
      showToast(
        "There was an error on our side ! please try again",
        "danger",
        setToggleToast
      );
    if (response.status === 201) router.push("/login");
  };
  return (
    <section className=" page_sections page__section__dark">
      {toggleToast.status ? (
        <ToastPopup
          toastText={toggleToast.message}
          toastType={toggleToast.type}
          toggleToast={setToggleToast}
        />
      ) : (
        <></>
      )}
      <AuthForm
        type="CreateAccount"
        items={[
          { name: "name", type: "text", placeholder: "full name" },
          { name: "username", type: "text", placeholder: "username" },
          { name: "age", type: "text", placeholder: "age" },
          { name: "email", type: "text", placeholder: "email" },
          { name: "password", type: "password", placeholder: "password" },
        ]}
        onclick={handleSignUp}
        showToast={showToast}
        toggleToast={setToggleToast}
      />
    </section>
  );
};

export default SignUp;
