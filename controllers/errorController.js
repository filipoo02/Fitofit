const AppError = require("../utils/AppError");

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).render("errorPage", {
      message: err.message,
      statusCode: err.statusCode,
    });
  }
};
const handleInternetConnError = () =>
  new AppError("Check your internet connection.", 408);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || "500";
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "dev") {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err };

    if (error.code === "ENOTFOUND") error = handleInternetConnError();
    sendErrorProd(error, req, res);
  }
};
