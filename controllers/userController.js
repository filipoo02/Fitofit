const server = require("../server");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

const getAllUsers = catchAsync(async (req, res, next) => {
  const results = await server.getAllUsers();
  if (results.status === "fail") throw new AppError(results.message, 404);

  res.status(200).json({
    status: "success",
    length: results.length,
    results,
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const results = await server.getUser(id);

  if (results.status === "fail") throw new AppError(results.message, 404);

  res.status(200).json({
    status: "success",
    results,
  });
});

const insertNewWalk = catchAsync(async (req, res, next) => {
  const distance = req.body.distance;

  const results = await server.insertNewWalk(distance);
  res.status(200).json({
    status: "success",
  });
});
const insertNewWalkFile = catchAsync(async (req, res, next) => {
  const activity = req.body;
  // console.log(req.body);
  // console.log(activity);
  server.insertNewWalkFile(activity);

  res.status(200).json({
    status: "success",
    results: activity,
  });
});
module.exports = { getAllUsers, getUser, insertNewWalk, insertNewWalkFile };
