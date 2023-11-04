"use client";

import React, { useEffect } from "react";
import { AuthForm } from "@/components/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleLogin = async (userData) => {
    const response = await signIn("credentials", {
      data: JSON.stringify(userData),
      redirect: false,
    });

    if (response.ok) {
      router.push("/");
    } else {
      alert("nono");
    }
  };

  return (
    <section className=" page_sections page__section__dark">
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
