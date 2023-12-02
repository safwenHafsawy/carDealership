export const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/");

  // console.log(new Date(`${year}-${month}`));
  return new Date(`${year}-${month}-${day}`);
};

export const getMonthNumberOfDays = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getListOfMonths = () => {
  let months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(2000, i, 1);
    const monthName = date.toLocaleDateString(undefined, { month: "long" });
    months.push(monthName);
  }

  return months;
};

export const dateWithinRange = (startDate, endDate, { day, month, year }) => {
  const currentDate = new Date(`${year}-${month + 1}-${day}`);

  if (
    parseDate(startDate) <= currentDate &&
    currentDate <= parseDate(endDate)
  ) {
    //console.log(dateParsed);
    return true;
  }

  return false;
};

export const millisecondsToDays = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return days;
};

export function getPrevMonth(currentDate) {
  const lastMonth = new Date(currentDate);
  lastMonth.setDate(1); // Set day to 1 to avoid issues with varying days in months
  lastMonth.setMonth(currentDate.getMonth() - 1);

  // Handle the case where the current month is January
  if (currentDate.getMonth() === 0) {
    lastMonth.setFullYear(currentDate.getFullYear() - 1);
  }

  // Reset the day to the original day
  lastMonth.setDate(currentDate.getDate());

  return lastMonth;
}
