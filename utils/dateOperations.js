export const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/");

  // console.log(new Date(`${year}-${month}`));
  return new Date(`${year}-${month}-${day}`);
};

export const getMonthNumberOfDays = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getListOfMonths = () => {
  var months = [];
  for (var i = 0; i < 12; i++) {
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
