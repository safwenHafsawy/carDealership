export const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
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
