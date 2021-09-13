const dbController = require("../dbController");
const formatDate = require("../utils/formatDate");
const { catchAsync } = require("../utils/catchAsync");

const homePage = catchAsync(async (req, res, next) => {
  const results = await dbController.getWeeklyActivity();

  res.status(200).render("calcPage", {
    results,
  });
});

const statisticsPage = catchAsync(async (req, res, next) => {
  const results = await dbController.getMonthlyActivity();

  res.status(200).render("statistics", {
    results,
    formatDate,
  });
});

module.exports = { homePage, statisticsPage };
