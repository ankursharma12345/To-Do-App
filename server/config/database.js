require("dotenv").config();
const Pool = require("pg").Pool;

// Connection to DB
// const pool = new Pool({
//   user: "postgres",
//   password: "12345",
//   host: "localhost",
//   port: 5432,
//   database: "to_do_app",
// });

// const pool = new Pool({
//   user: "to_do_app_onrc_user",
//   password: "UFMefyfQK6oT0YtmhBI9tY2nJk6CkjaK",
//   host: "dpg - cu3n8ljtq21c73aop3u0 - a",
//   port: 5432,
//   database: "to_do_app_onrc",
// });

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false },
// });

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false },
});

// pool
//   .query(
//     `CREATE TABLE login_data(
//   user_id SERIAL PRIMARY KEY,
//   email VARCHAR(50),
//   password VARCHAR(20)
//   )`
//   )
//   .then(() => {
//     console.log("Done");
//   })
//   .catch((err) => console.log("Error : ", err));

// pool
//   .query(
//     `CREATE TABLE all_data (
//       user_id INTEGER,
//       todo_id SERIAL PRIMARY KEY,
//       description VARCHAR(100),
// type VARCHAR(10),
//       status VARCHAR(20),
//       CONSTRAINT fk_work FOREIGN KEY (user_id)
//       REFERENCES login_data(user_id)
// ON DELETE CASCADE
//     )`
//   )
//   .then(() => {
//     console.log("Done!!");
//   })
//   .catch((err) => console.log("Error is : ", err));

module.exports = pool;
