import React from "react";
import CustomShapeDivider from "@/components/custom_shape_divider";
import Image from "next/image";

import { Overlock } from "next/font/google";

const tinWeb = Overlock({ weight: "400", subsets: ["latin"] });

import { SectionHeader } from "@/components/header";
import NavLink from "@/components/linksAndBtns";

const Home = () => {
  return (
    <>
      <section className="page_sections homeBanner">
        <div className="homeBanner__text">
          <SectionHeader type="section_header-dark">
            Welcome To Swift Cars
          </SectionHeader>
          <p className={tinWeb.className}>
            Where Every Journey Begins. Enjoy hassle-free rentals, a fleet of
            quality vehicles, and the freedom to explore at your pace. We make
            mobility easy.
          </p>
          <NavLink type="dark__navLink" hrf="#why_us">
            Why choose us ?
          </NavLink>
        </div>
        <div className="homeBanner__image">
          <Image
            src="/carhome.svg"
            width={1000}
            height={1000}
            alt="car picture"
          />
        </div>
      </section>
      <section id="why_us" className="page_sections why__us">
        <CustomShapeDivider type="shape__divider__dark" />
        <div className="why__us__right ">
          <SectionHeader type="section_header-light">
            Why Choose Us ?
          </SectionHeader>
          <ul>
            {whyUs.map((reason) => {
              return (
                <li key={reason.key} className={tinWeb.className}>
                  <span>{reason.title}: </span>
                  {reason.content}
                </li>
              );
            })}
          </ul>
          <NavLink type="light__navLink" hrf="/carCatalog">
            Book A Car Now !
          </NavLink>
        </div>
        <div className="why__us__left">
          <Image src="/rentSVG.svg" width={100} height={100} alt="rent a car" />
        </div>
      </section>
    </>
  );
};

const whyUs = [
  {
    key: 1,
    title: " Wide Selection of Cars",
    content:
      "Choose from our extensive fleet of vehicles, including economy cars, luxury vehicles, and spacious SUVs.",
  },
  {
    key: 2,
    title: "Exceptional Customer Service",
    content:
      "Our dedicated team is available 24/7 to assist you, ensuring a smooth and worry-free rental experience.",
  },
  {
    key: 3,
    title: "Affordable Rates",
    content:
      "Enjoy competitive pricing and various discounts to fit your budget.",
  },
  {
    key: 4,
    title: "Safety First",
    content:
      "We prioritize your safety with regular vehicle maintenance and comprehensive insurance coverage.",
  },
  {
    key: 5,
    title: "Convenient Locations",
    content:
      "With multiple rental locations nationwide, we&apos;re always nearby for your convenience.",
  },
];

export default Home;
