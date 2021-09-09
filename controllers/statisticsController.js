const server = require("../server");
const { catchAsync } = require("../utils/catchAsync");

const getWeeklyActivity = catchAsync(async (req, res, next) => {
  let results;

  if (req.params.sortDay && req.params.sortDay === "sortDay") {
    results = await server.getWeeklyActivity("sortDay");
  } else {
    results = await server.getWeeklyActivity();
  }

  const weeklyDistance = results[0] ? results : 0;

  res.status(200).json({
    status: "success",
    weeklyDistance,
  });
});

module.exports = { getWeeklyActivity };
