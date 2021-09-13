const dotenv = require("dotenv");
const sql = require("mssql");
dotenv.config({ path: "./config.env" });

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

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

const formatDate = (dataInput) => {
  let milisec = dataInput.getTime();

  let data = new Date(milisec);
  let month = addZero(data.getMonth() + 1);
  let year = data.getFullYear();
  let day = addZero(data.getDate());
  let date = `${year}-${month}-${day}`;

  return date;
};

testingData = () => {
  const now = new Date();
  const currYear = now.getFullYear();
  const currMonth = now.getMonth();
  const currDay = now.getDate();

  let query = `INSERT INTO Activity(idUser, distance,dateOfActivity)values`;

  for (let i = 0; i < currDay; i++) {
    const randomDistance = Math.floor(Math.random() * 15 + 1);
    const date = formatDate(new Date(currYear, currMonth, i + 1));
    if (currDay - 1 === i) {
      query += `\n(1,${randomDistance},CONVERT(SMALLDATETIME,'${date}'))`;
    } else {
      query += `\n(1,${randomDistance},CONVERT(SMALLDATETIME,'${date}')),`;
    }
  }

  return query;
};

const insertTestingData = async () => {
  try {
    const query = testingData();
    // console.log(query);
    const pool = await sql.connect(dbconfig);
    const event = await pool.request().query(`${query}`);

    pool.close();

    console.log(
      `${event.rowsAffected[0]} rows was added with random distance!\n`
    );

    return event.recordset;
  } catch (error) {
    console.log(error);
    return error;
  }
};

insertTestingData();
