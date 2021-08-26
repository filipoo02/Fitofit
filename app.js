const express = require("express");
const homePageRouter = require("./routes/homePageRoutes");
const statisticsRouter = require("./routes/statisticsRoutes");
const userRouter = require("./routes/userRoutes");
const calcDistanceRouter = require("./routes/calcDistanceRoutes");
const AppError = require("./utils/AppError");
const app = express();
const path = require("path");

app.use(express.json());

app.use("/", homePageRouter);
app.use("/statistics", statisticsRouter);

// API
app.use("/api/v1/users", userRouter);
app.use("/api/v1/distance", calcDistanceRouter);
app.use("/api/v1/statistics", statisticsRouter);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// global error handling middleware
app.use((err, req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.render("errorPage", {
      status: err.statusCode,
      message: err.message,
    });
  }
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[LISTENING] on port ${port}`);
});
