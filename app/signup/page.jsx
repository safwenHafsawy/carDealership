"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Form from "@/components/form";

const Signup = () => {
  const router = useRouter();
  const handleSignUp = async (userData) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      //headers: "application/json",
      body: JSON.stringify(userData),
    });
    console.log(response);

    //if (response.ok) router.push("/login");
  };
  return (
    <section className=" page_sections page__section__dark">
      <Form
        type="Create an account"
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

export default Signup;
