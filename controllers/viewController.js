const server = require("../server");
const { catchAsync } = require("../utils/catchAsync");

const homePage = catchAsync(async (req, res, next) => {
  const results = server.getActivityFile("week", { sum: "sum" });
  const dataWeek = server.getActivityFile("week", {
    sum: "sum",
    byday: "byday",
  });
  res.status(200).render("calcPage", {
    results,
    dataWeek,
  });
});

const statisticsPage = catchAsync(async (req, res, next) => {
  const results = server.getActivityFile("month", { byday: "byday" });
  if (results.status === "fail") throw results;
  res.status(200).render("statistics", {
    results,
  });
});

module.exports = { homePage, statisticsPage };
