const server = require("../server");
const { catchAsync } = require("../utils/catchAsync");

const statisticsPage = catchAsync(async (req, res, next) => {
  const results = server.getActivityFile("month", { byday: "byday" });
  if (results.status === "fail") throw results;
  res.status(200).render("statistics", {
    results,
  });
});

const getActivityFile = catchAsync(async (req, res, next) => {
  const option = {
    sum: req.params.sum,
    byday: req.params.byday,
  };
  let results = server.getActivityFile(req.params.type, option);
  if (results.status === "fail") throw results;

  res.status(200).json({
    status: "success",
    results,
  });
});
module.exports = { statisticsPage, getActivityFile };
