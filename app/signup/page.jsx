"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { AuthForm } from "@/components/form";

/**
 * importing components
 */
import { ToastPopup } from "@/components/popups";
import Loader from "@/components/loader";

/**
 * importing helper functions
 */
import { showToast } from "@/lib/toastFunctions";

/*
 ** SignUp component for user registration
 */
const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toggleToast, setToggleToast] = useToast();

  // Handling user sign-up
  const handleSignUp = async (userData) => {
    setLoading(true);
    // Sending user data to the server for registration
    const response = await fetch("/api/signup", {
      method: "POST",
      body: userData,
    });
    setLoading(false);
    // Handling different server response statuses
    if (response.status === 401)
      showToast("Email or Username is already used!", "danger", setToggleToast);
    if (response.status === 500)
      showToast(
        "There was an error on our side! Please try again.",
        "danger",
        setToggleToast
      );
    if (response.status === 201) router.push("/login");
  };

  return (
    // Main section for the SignUp component
    <section className="page_sections page__section__dark">
      {loading ? (
        <Loader loaderText="We're preparing your new account, thank you for your patience.." />
      ) : null}
      {/* Rendering ToastPopup component if toggleToast is true */}
      {toggleToast.status ? (
        <ToastPopup
          toastText={toggleToast.message}
          toastType={toggleToast.type}
          toggleToast={setToggleToast}
        />
      ) : (
        // Empty fragment if toggleToast is false
        <></>
      )}

      {/* Rendering AuthForm component for user registration */}
      <AuthForm
        type="CreateAccount"
        items={[
          { name: "name", type: "text", placeholder: "full name" },
          { name: "username", type: "text", placeholder: "username" },
          { name: "phone", type: "text", placeholder: "phone number" },
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
