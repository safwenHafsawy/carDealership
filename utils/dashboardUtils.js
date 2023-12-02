import prisma from "@/prisma/prisma";
import { getPrevMonth } from "./dateOperations";

export async function fetchDashboardData() {
  const logs = await prisma.carRental.findMany({
    include: {
      rentedBy: true,
      rentedCar: true,
    },
  });

  if (logs) return logs;
}

export function getNumberOfOrders(data) {
  // removing redundancy of customers
  const date = new Date();

  const numberOfOrdersThisMonth = calculateMetricsForDate(
    "month",
    data,
    date,
    null
  );

  const lastMonth = getPrevMonth(date);
  const numberOfOrdersLastMonth = calculateMetricsForDate(
    "month",
    data,
    lastMonth,
    null
  );

  const growth = getGrowthPercentage({
    current: numberOfOrdersThisMonth,
    previous: numberOfOrdersLastMonth,
  });

  return {
    name: "Number Of Orders This Month",
    revenue: numberOfOrdersThisMonth,
    growth: growth,
  };
}

export function getMonthlyRevenue(data) {
  const date = new Date();

  const monthlyRevenue = calculateMetricsForDate(
    "month",
    data,
    date,
    "totalPrice"
  );

  const lastMonth = getPrevMonth(date);
  const lastMonthRevenue = calculateMetricsForDate(
    "month",
    data,
    lastMonth,
    "totalPrice"
  );

  const growth = getGrowthPercentage({
    current: monthlyRevenue,
    previous: lastMonthRevenue,
  });

  return {
    name: "Monthly Revenue",
    revenue: `${monthlyRevenue}$`,
    growth: growth,
  };
}

export function getDailyRevenue(data) {
  const todayRevenue = calculateMetricsForDate(
    "day",
    data,
    new Date(),
    "totalPrice"
  );

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayRevenue = calculateMetricsForDate(
    "day",
    data,
    yesterday,
    "totalPrice"
  );

  //getting growth Percentage
  const growthPercentage = getGrowthPercentage({
    current: todayRevenue,
    previous: yesterdayRevenue,
  });

  return {
    name: "Daily Revenue",
    revenue: `${todayRevenue}$`,
    growth: growthPercentage,
  };
}

/**
 * Helper functions
 */

/**
 *
 * @param {Sting} interval
 * @param {Array} data // list of objects that represents the logs in the database
 * @param {Date} date representing current date
 * @param {String} metric // representation of the metric of the calculation
 * @returns Number
 */

function calculateMetricsForDate(interval, data, date, metric) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (interval === "day") {
    const formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;

    return data.reduce((acc, curr) => {
      if (curr.startDate === formattedDate) {
        acc += curr[metric];
      }
      return acc;
    }, 0);
  }

  if (interval === "month") {
    const formattedDate = `${month < 10 ? "0" : ""}${month}/${year}`;

    return data.reduce((acc, curr) => {
      const [, month, year] = curr.startDate.split("/");
      const formattedStartDate = `${month}/${year}`;
      if (formattedStartDate === formattedDate)
        metric === "totalPrice" ? (acc += curr.totalPrice) : (acc += 1);

      return acc;
    }, 0);
  }
}

const getGrowthPercentage = (values) => {
  const { current, previous } = values;
  return Math.ceil(((current - previous) / previous) * 100);
};
