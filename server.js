const sql = require("mssql");
const dotenv = require("dotenv");
const catchAsyncQuery = require("./utils/catchAsync");
const formatDate = require("./utils/formatDate");
const AppError = require("./utils/AppError");
dotenv.config({ path: "./config.env" });
require("./utils/dateMethod");

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

    pool.close();
    return event.recordset;
  } catch (error) {
    return new AppError(error.message, 404);
  }
};

const getUser = async (id) => {
  try {
    const pool = await sql.connect(dbconfig);
    const event = await pool
      .request()
      .query(`SELECT * FROM Users WHERE id = ${id}`);

    pool.close();
    return event.recordset;
  } catch (error) {
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

    pool.close();
    return event.recordset;
  } catch (error) {
    return new AppError(error.message, 404);
  }
};

const insertNewWalk = async (distance, id = 1) => {
  try {
    const pool = await sql.connect(dbconfig);
    await pool.request()
      .query(`insert into Activity(idUser,distance, dateOfActivity)
    values(${id},${distance},CURRENT_TIMESTAMP)`);

    pool.close();
  } catch (error) {
    return new AppError(error.message, 404);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  getWeeklyActivity,
  insertNewWalk,
};
