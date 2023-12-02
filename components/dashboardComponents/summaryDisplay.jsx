import React from "react";
import { Overlock, Andika } from "next/font/google";

import {
  getDailyRevenue,
  getMonthlyRevenue,
  getNumberOfOrders,
} from "@/utils/dashboardUtils";

const tinWeb = Overlock({ weight: "700", subsets: ["latin"] });
const smallTextFont = Andika({ weight: "400", subsets: ["latin"] });

const SummaryDisplay = ({ name, dashboardData }) => {
  let data;

  if (name === "dailyRevenue") data = getDailyRevenue(dashboardData);
  else if (name === "monthlyRevenue") data = getMonthlyRevenue(dashboardData);
  else if (name === "NumberOfOrders") data = getNumberOfOrders(dashboardData);

  return (
    <div className={`${smallTextFont.className} summary_display`}>
      <div className="display_text">
        <span className={tinWeb.className}>{data ? data.revenue : 0}</span>
        <span>{data?.name}</span>
      </div>

      <div className="display_visual">
        <span
          className={data.growth > 0 ? "positive_growth" : "negative_growth"}
        >
          {data.growth > 0 ? "▲" : "▼"} {data ? data.growth : 0}%
        </span>
      </div>
    </div>
  );
};

export default SummaryDisplay;
