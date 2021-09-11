const server = require("../server");
const { catchAsync } = require("../utils/catchAsync");

const homePage = catchAsync(async (req, res, next) => {
  const results = await server.getWeeklyActivity();

  res.status(200).render("calcPage", {
    results,
  });
});

const statisticsPage = catchAsync(async (req, res, next) => {
  // const results = server.getActivityFile("month", { byday: "byday" });
  // if (results.status === "fail") throw results;
  // res.status(200).render("statistics", {
  //   results,
  // });
});

module.exports = { homePage, statisticsPage };
