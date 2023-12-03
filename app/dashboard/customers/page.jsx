import React from "react";

import DashboardSideNavigation from "@/components/dashboardComponents/dashboardSideNavigation";
import { SectionHeader } from "@/components/header";

const Customers = () => {
  return (
    <section className="adminDashboardSection">
      <DashboardSideNavigation />
      <div className="ListOfCustomers">
        <SectionHeader type="section_header-dark">
          This Page is still under constraction
        </SectionHeader>
      </div>
    </section>
  );
};

export default Customers;
