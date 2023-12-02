import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { Overlock } from "next/font/google";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchDashboardData } from "@/utils/dashboardUtils";

import { SectionHeader, SubHeader } from "@/components/header";
import RecentReservations from "@/components/dashboardComponents/recentReservation";
import SummaryDisplay from "@/components/dashboardComponents/summaryDisplay";
import BarChart from "@/components/dashboardComponents/chat";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const dashboardData = await fetchDashboardData();

  return (
    <section className="adminDashboardSection">
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

      <div className="dashboard_main">
        <div className="dashboard_main-header">
          <SubHeader type="section_subHeader-light">Admin Dashboard</SubHeader>
          <span>Welcome {session?.user.name}</span>
        </div>

        <div className="dashboard_main-summary">
          <div>
            {/* Daily Revenue Display */}
            <SummaryDisplay name="dailyRevenue" dashboardData={dashboardData} />
          </div>
          <div>
            {/* Monthly Revenue Display */}
            <SummaryDisplay
              name="monthlyRevenue"
              dashboardData={dashboardData}
            />
          </div>
          <div>
            {/* Number of customers Display */}
            <SummaryDisplay
              name="NumberOfOrders"
              dashboardData={dashboardData}
            />
          </div>
        </div>
        <div className="dashboard_main-details">
          <div className="chart">
            <BarChart dashboardData={dashboardData} />
          </div>
          <div className="recent_orders">
            <h4 className={tinWeb.className}>Recent Reservations</h4>
            <RecentReservations dashboardData={dashboardData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
