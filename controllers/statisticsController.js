const dbController = require("../dbController");
const { catchAsync } = require("../utils/catchAsync");

const getWeeklyActivity = catchAsync(async (req, res, next) => {
  let results;

  if (req.params.sortDay && req.params.sortDay === "sortDay") {
    results = await dbController.getWeeklyActivity("sortDay");
  } else {
    results = await dbController.getWeeklyActivity();
  }

  const weeklyDistance = results[0] ? results : 0;

  res.status(200).json({
    status: "success",
    weeklyDistance,
  });
});

const getMonthlyActivity = catchAsync(async (req, res, next) => {
  const results = await dbController.getMonthlyActivity();

  const monthlyDistance = results[0] ? results : 0;

  res.status(200).json({
    status: "success",
    monthlyDistance,
  });
});

module.exports = { getWeeklyActivity, getMonthlyActivity };
