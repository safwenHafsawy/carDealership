"use client";

import React from "react";
import { AuthForm } from "@/components/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

import { ToastPopup } from "@/components/popups";
import { showToast } from "@/lib/toastFunctions";

const Login = () => {
  const router = useRouter();
  const [toggleToast, setToggleToast] = useToast();

  const handleLogin = async (userData) => {
    try {
      const response = await signIn("credentials", {
        data: JSON.stringify(userData),
        redirect: false,
      });

      if (response.ok) {
        router.push("/");
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
