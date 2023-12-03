import React from "react";
import Link from "next/link";
import Image from "next/image";

const DashboardSideNavigation = () => {
  return (
    <div className="dashboard_side_nav">
      <Link href="/dashboard">
        <Image
          src="dashboardIcons/dashboardIcon.svg"
          width={20}
          height={20}
          alt="car icon"
        />
      </Link>
      <Link href="/dashboard/cars">
        <Image
          src="dashboardIcons/carIcon.svg"
          width={20}
          height={20}
          alt="car icon"
        />
      </Link>
      <Link href="/dashboard/customers">
        <Image
          src="dashboardIcons/customerIcon.svg"
          width={20}
          height={20}
          alt="car icon"
        />
      </Link>
    </div>
  );
};

export default DashboardSideNavigation;
