const distanceWeekMonth = (results, month = false) => {
  let sum = 0;
  results.forEach((val, _) => {
    sum += val.distance;
  });
  return {
    distance: sum,
    weekOfActivity: new Date(results[0].dateOfActivity).getWeekNumber(),
  };
};
const distanceByDay = (results) => {
  const sum = new Array();
  let days = new Set();

  results.forEach((val, _) => {
    days.add(formatDate({ dataInput: val.dateOfActivity, returnDate: true }));
  });
  days = [...days];
  // tablica dla kazdego dnia
  days.forEach((day, index) => {
    sum.push([Number(0)]);
    results.forEach((val, _) => {
      if (
        formatDate({ dataInput: val.dateOfActivity, returnDate: true }) === day
      ) {
        sum[index] = sum[index] * 1;
        sum[index] += val.distance * 1;
      }
    });
  });
  const buffor = [];
  days.forEach((day, index) => {
    buffor.push({
      distance: sum[index],
      dateOfActivity: day,
    });
  });
  return buffor;
};
module.exports = { distanceByDay, distanceWeekMonth };
