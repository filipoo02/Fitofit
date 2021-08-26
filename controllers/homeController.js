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

module.exports = { homePage };
