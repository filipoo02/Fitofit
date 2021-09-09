const sql = require("mssql");
const dotenv = require("dotenv");
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

const getWeeklyActivity = async (sort) => {
  try {
    let event;
    const id = 1;
    const pool = await sql.connect(dbconfig);
    if (sort === "sortDay") {
      event = await pool.request().query(`set datefirst 1
      select SUM(distance) as distance,dateOfActivity from FITOFIT.dbo.Activity
      inner join FITOFIT.dbo.Users2 on Activity.idUser = Users2.id where id=${id} and 
      DATEPART(week,dateOfActivity) = DATEPART(week,CURRENT_TIMESTAMP) group by dateOfActivity`);
    } else {
      event = await pool.request().query(`set datefirst 1
      select AVG(distance) as distance from FITOFIT.dbo.Activity
      inner join FITOFIT.dbo.Users2 on Activity.idUser = Users2.id where id=${id} and 
      DATEPART(week,dateOfActivity) = DATEPART(week,CURRENT_TIMESTAMP) group by DATEPART(week,dateOfActivity)`);
    }

    pool.close();
    return event.recordset;
  } catch (error) {
    throw new AppError(error, 404);
  }
};

const insertNewWalk = async (distance, id) => {
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
