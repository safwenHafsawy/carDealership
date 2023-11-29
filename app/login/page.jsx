"use client";

import React, { useState } from "react";
import { AuthForm } from "@/components/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

/**
 * importing components
 */
import { ToastPopup } from "@/components/popups";
import { showToast } from "@/lib/toastFunctions";
import Loader from "@/components/loader";

/**
 *
 * @returns JSX DOM elements
 */
const Login = () => {
  const router = useRouter();
  const [toggleToast, setToggleToast] = useToast();
  const [loading, setLoading] = useState(false);

  /**
   * Handles the login process when the form is submitted.
   * @param {Object} userData - User credentials entered in the login form.
   */
  const handleLogin = async (userData, provider) => {
    try {
      // Handle login based on provider
      // Credentials provider
      if (provider === "credentials") {
        setLoading(true);
        const response = await signIn("credentials", {
          data: JSON.stringify(userData),
          redirect: false,
        });
        setLoading(false);
        if (response.ok) {
          router.back();
        } else {
          if (response.status === 401)
            showToast(
              "Invalid credentials ! please check the information you provided",
              "danger",
              setToggleToast
            );
          else if (response.status === 500)
            showToast(
              "There was an error on our side ! please try again",
              "danger",
              setToggleToast
            );
        }
      }

      // google provider
      else {
        await signIn(provider);
      }
    } catch (error) {
      showToast(
        "There was an error on our side ! please try again",
        "danger",
        setToggleToast
      );
    }
  };

  return (
    <section className=" page_sections page__section__dark">
      {loading ? (
        <Loader loaderText="Verifying your identity, almost there..." />
      ) : null}
      {toggleToast.status ? (
        <ToastPopup
          toastText={toggleToast.message}
          toastType={toggleToast.type}
          toggleToast={setToggleToast}
        />
      ) : (
        <></>
      )}
      {/* AuthForm component handles the rendering of the login form */}
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
