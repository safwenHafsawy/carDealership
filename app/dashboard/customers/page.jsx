import React from "react";

import DashboardSideNavigation from "@/components/dashboardComponents/dashboardSideNavigation";
import { SectionHeader } from "@/components/header";

const Customers = () => {
  return (
    <section className="adminDashboardSection">
      <DashboardSideNavigation />
      <div className="ListOfCustomers">
        <SectionHeader>List Of Customers</SectionHeader>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Customer Phone</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data 1</td>
              <td>Data 2</td>
              <td>Data 3</td>
            </tr>
            <tr>
              <td>Data 4</td>
              <td>Data 5</td>
              <td>Data 6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Customers;
