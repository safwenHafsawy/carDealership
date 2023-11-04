"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { AuthForm } from "@/components/form";

const SignUp = () => {
  const router = useRouter();
  const handleSignUp = async (userData) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      body: userData,
    });

    if (response.status === 401) alert("Email or Username is already used !");
    if (response.status === 500) alert("internal Server Error !");
    if (response.status === 201) router.push("/login");
  };
  return (
    <section className=" page_sections page__section__dark">
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
      />
    </section>
  );
};

export default SignUp;
