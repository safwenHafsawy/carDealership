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
import DashboardSideNavigation from "@/components/dashboardComponents/dashboardSideNavigation";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const dashboardData = await fetchDashboardData();

  return (
    <section className="adminDashboardSection">
      <DashboardSideNavigation />
      <div className="dashboard_main">
        <div className={`${tinWeb.className} dashboard_main-header`}>
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
