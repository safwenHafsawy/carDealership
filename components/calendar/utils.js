export const getMonthsCalendar = (year) => {
  const monthsArray = [];
  for (let month = 0; month < 12; month++) {
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    const monthName = new Date(year, month, 1).toLocaleDateString(undefined, {
      month: "long",
    });

    monthsArray.push({
      monthNumber: month + 1,
      month: monthName,
      numberOfDays,
    });
  }

  return monthsArray;
};
