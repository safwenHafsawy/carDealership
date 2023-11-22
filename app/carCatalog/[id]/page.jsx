"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

import { SectionHeader } from "@/components/header";
import { InputModal } from "@/components/popups";
import { ToastPopup } from "@/components/popups";
import { Overlock, Andika } from "next/font/google";
import { showToast } from "@/lib/toastFunctions";

const tinWeb = Overlock({ weight: "900", subsets: ["latin"] });
const smallTextFont = Andika({ weight: "700", subsets: ["latin"] });

const CarDetails = () => {
  const pathname = usePathname();
  const router = useRouter();
  const carId = useRef(pathname.split("/")[2]);
  const { data: session } = useSession();

  const [carDetails, setCarDetails] = useState({});
  const [bookModal, setBookModal] = useState(false);
  const [toggleToast, setToggleToast] = useToast();

  /**
   * Fetch Car Details
   */
  const fetchCarData = async () => {
    try {
      const response = await fetch(`/api/car/${carId.current}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setCarDetails({ ...data });
      }
      if (response.status === 404) {
        showToast("Car not found", "danger", setToggleToast);
      }
      if (response.status === 500) {
        showToast(
          "There was an error on our side ! please try again",
          "danger",
          setToggleToast
        );
      }
    } catch (err) {
      showToast(
        "There was an error on our side ! please try again",
        "danger",
        setToggleToast
      );
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  const bookCar = () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setBookModal(true);
  };

  /**
   * Modals and popups
   */

  const handleBookModal = () => {
    setBookModal(!bookModal);
  };

  return (
    <section className="page_sections-full">
      {toggleToast.status ? (
        <ToastPopup
          toastText={toggleToast.message}
          toastType={toggleToast.type}
          toggleToast={setToggleToast}
        />
      ) : (
        <></>
      )}
      {bookModal ? (
        <InputModal
          handleModalToggle={handleBookModal}
          rentalLog={carDetails.rentalLog}
          pricePerDay={carDetails.pricePerHour}
          showToast={showToast}
          toggleToast={setToggleToast}
        />
      ) : (
        <></>
      )}
      <div className="page__sections__leftSide car__image">
        <Image
          src={`/${carDetails.image}`}
          width={500}
          height={500}
          alt="Car image"
        />
      </div>
      <div className="page__sections__rightSide car__details">
        <div className="page_section-header">
          <SectionHeader type="section_header-light">
            {carDetails.model}
          </SectionHeader>
        </div>

        <div className="page__section-details">
          <h2 className={tinWeb.className}>
            Manufacturer:{" "}
            <span className={tinWeb.className}>{carDetails.manufacturer}</span>
          </h2>
          <div>
            <p className={smallTextFont.className}>
              Rent price per hour : {carDetails.pricePerHour}$<br />
              Availability : {carDetails.availability}
            </p>

            <p className={smallTextFont.className}>
              Description : <br />
              {carDetails.technicalSpec}
            </p>
          </div>
        </div>
        <div className="options">
          <button className={tinWeb.className} onClick={bookCar}>
            Book This Car
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
