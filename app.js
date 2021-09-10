const express = require("express");
const viewRouter = require("./routes/viewRoutes");
const statisticsRouter = require("./routes/statisticsRoutes");
const distanceRouter = require("./routes/distanceRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const app = express();
const path = require("path");

app.use(express.json());

app.use("/", viewRouter);

// API
app.use("/api/v1/distance", distanceRouter);
app.use("/api/v1/statistics", statisticsRouter);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[LISTENING] on port ${port}`);
});
