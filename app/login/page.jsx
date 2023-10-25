import React from "react";
import Image from "next/image";
import { SubHeader } from "@/components/header";

import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });

const Login = () => {
  return (
    <section className=" page_sections page__section__dark">
      <div className="login__form">
        <SubHeader type="sub__header-dark">Login here</SubHeader>
        <input
          style={tinWeb.style}
          type="text"
          className=" login__items login__items-username"
          placeholder="username"
        />
        <input
          style={tinWeb.style}
          type="password"
          className=" login__items login__items-password"
          placeholder="password"
        />
        <button style={tinWeb.style} className="login__items login__btn">
          Login
        </button>
        <div className="social__login">
          <div style={tinWeb.style} className="social__login-item">
            Google
            <Image src="/google.svg" width={20} height={20} alt="google icon" />
          </div>
        </div>
        <div className="options">
          <p style={tinWeb.style}>
            Don&apos;t have an account ? <span>sign up here!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
