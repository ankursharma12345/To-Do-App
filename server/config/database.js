const { Pool } = require("pg");

//DB connection
const pool = new Pool({
  user: "postgres",
  password: "12345",
  host: "localhost",
  port: 5432,
  database: "to_do_app",
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
