"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import DatePicker from "./datePicker";

const InputModal = (props) => {
  const { data: session } = useSession();

  return (
    <div className="popup_container">
      <form className="carDetails">
        <input type="text" value={session?.user.name} readOnly />
        <div className="datePicker__container">
          <DatePicker />
        </div>
      </form>
    </div>
  );
};

const ErrorModal = () => {
  return <div>popups</div>;
};

export { InputModal, ErrorModal };
