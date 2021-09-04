const sendErrorApi = (err, req, res) => {
  if (process.env.NODE_ENV === "dev") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};
const sendErrorPage = (err, req, res) => {
  res.status(err.statusCode).render("errorPage", {
    message: err.message,
    statusCode: err.statusCode,
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || "500";
  err.status = "error";
  if (req.originalUrl.startsWith("/api")) {
    sendErrorApi(err, req, res);
  } else {
    sendErrorPage(err, req, res);
  }
};
