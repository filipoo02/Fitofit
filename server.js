const sql = require("mssql");
const dotenv = require("dotenv");
const catchAsyncQuery = require("./utils/catchAsync");
const formatDate = require("./utils/formatDate");
const { distanceByDay, distanceWeekMonth } = require("./utils/distanceCalc");
const AppError = require("./utils/AppError");
const fs = require("fs");
dotenv.config({ path: "./config.env" });
require("./utils/dateMethod");

const dataFilePath = `${__dirname}/data/activities.json`;
const activities = JSON.parse(
  fs.readFileSync(`${__dirname}/data/activities.json`)
);

const dbconfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_SERVER,
  port: process.env.DB_PORT * 1,
  options: {
    encrypt: false,
  },
};

// ---------------- MSSQL ----------------
const getAllUsers = async () => {
  try {
    const pool = await sql.connect(dbconfig);
    const event = await pool.request().query("SELECT * FROM Users");

    return event.recordset;
  } catch (error) {
    console.log(error.message);
    return new AppError(error.message, 404);
  }
};

const getUser = async (id) => {
  try {
    const pool = await sql.connect(dbconfig);
    const event = await pool
      .request()
      .query(`SELECT * FROM Users WHERE id = ${id}`);

    return event.recordset;
  } catch (error) {
    console.log(error.message);
    return new AppError(error.message, 404);
  }
};

const getWeeklyActivity = async (id = 1) => {
  try {
    const pool = await sql.connect(dbconfig);
    const event = await pool.request().query(`set datefirst 1
    select distance,dateOfActivity from FITOFIT.dbo.Activity
    inner join FITOFIT.dbo.Users on Activity.idUser = Users.id where id=${id} and 
    DATEPART(week,dateOfActivity) = DATEPART(week,CURRENT_TIMESTAMP)`);

    return event.recordset;
  } catch (error) {
    console.log(error.message);
    return new AppError(error.message, 404);
  }
};

const insertNewWalk = async (distance, id = 1) => {
  try {
    const pool = await sql.connect(dbconfig);
    await pool.request()
      .query(`insert into Activity(idUser,distance, dateOfActivity)
    values(${id},${distance},CURRENT_TIMESTAMP)`);
  } catch (error) {
    console.log(error.message);
    return new AppError(error.message, 404);
  }
};

// ---------------- DANE Z PLIKU ----------------
const getActivityFile = (type, option) => {
  let results = [];
  if (type === "week") {
    activities.forEach((val, _) => {
      if (
        new Date().getWeekNumber() ==
        new Date(val.dateOfActivity).getWeekNumber()
      ) {
        results.push(val);
      }
    });
  } else if (type === "all") {
    results = [...activities];
  } else if (type === "month") {
    activities.forEach((val, _) => {
      if (new Date().getMonth() == new Date(val.dateOfActivity).getMonth()) {
        results.push(val);
      }
    });
  } else {
    return new AppError("Bad optional paramter!", 404);
  }
  if (option.sum === "sum" && !option.byday) {
    results =
      type === "month"
        ? distanceWeekMonth(results, true)
        : distanceWeekMonth(results);
  } else if (option.byday === "byday") {
    results = distanceByDay(results);
  } else {
    return new AppError("Bad optional paramter!", 404);
  }
  return results;
};
const insertNewWalkFile = (activity) => {
  activities.push(activity);
  fs.writeFileSync(dataFilePath, JSON.stringify(activities));
};
module.exports = {
  getAllUsers,
  getUser,
  getWeeklyActivity,
  insertNewWalk,
  getActivityFile,
  insertNewWalkFile,
};
