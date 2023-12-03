import React from "react";
import Link from "next/link";
import Image from "next/image";

import dashboardHome from "@/public/dashboardIcons/dashboardIcon.svg";
import carsIcon from "@/public/dashboardIcons/carIcon.svg";
import customerIcon from "@/public/dashboardIcons/customerIcon.svg";

const DashboardSideNavigation = () => {
  return (
    <div className="dashboard_side_nav">
      <Link href="/dashboard">
        <Image src={dashboardHome} width={20} height={20} alt="home icon" />
      </Link>
      <Link href="/dashboard/cars">
        <Image src={carsIcon} width={20} height={20} alt="car icon" />
      </Link>
      <Link href="/dashboard/customers">
        <Image src={customerIcon} width={20} height={20} alt="customer icon" />
      </Link>
    </div>
  );
};

export default DashboardSideNavigation;
