const AppError = require("./AppError");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

const catchAsyncQuery = (fn) => {
  return () => {
    fn().catch((err) => {
      console.log(err.message);
      return new AppError(err.message, 404);
    });
  };
};
module.exports = { catchAsync, catchAsyncQuery };
