import React from "react";
import Link from "next/link";

import { SectionHeader, SubHeader } from "@/components/header";

const Dashboard = () => {
  return (
    <section className="page_sections adminDashboardSection">
      <SectionHeader type="section_header-light">Admin Dashboard</SectionHeader>
      <div className="adminOptions">
        <Link href="/dashboard/cars">
          <div id="cars-option" className="adminOptions-option">
            <SubHeader type="sub__header-dark">Cars</SubHeader>
          </div>
        </Link>
        <Link href="/dashboard/customers">
          <div id="customer-option" className="adminOptions-option">
            <SubHeader type="sub__header-dark">Customers</SubHeader>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;
