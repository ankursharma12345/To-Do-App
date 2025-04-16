const express = require("express");
const cors = require("cors");
const pool = require("./config/database");
// const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT || 4000;

const app = express();

// Required Middlewares
app.use(express.json());
// app.use(cors());
// app.use(cors({ origin: "https://ankursharma12345.github.io/To-Do-App" }));

const allowedOrigins = [
  // "http://localhost:3000", // Local development
  // "https://ankursharma12345.github.io", // Production (GitHub Pages)
  "http://localhost:3000",
  "https://ankursharma12345.github.io",
];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow if no origin (e.g. mobile app, curl) or in the allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS: ", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use(cors());

// Login API
app.get("/getData", (req, res) => {
  const getUserEmailFromDatabase = req.query?.["email"];
  const getUserPasswordFromDatabase = req.query?.["password"];
  console.log("Request Data is : ", req);
  console.log("Email Data : ", getUserEmailFromDatabase);
  console.log("Password Data : ", getUserPasswordFromDatabase);
  pool
    .query("select * from login_data where email=$1 and password=$2", [
      getUserEmailFromDatabase,
      getUserPasswordFromDatabase,
    ])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log("Error is :", err));
});

// SignUp API
app.post("/addUser", (req, res) => {
  const email = req.body["email"];
  const password = req.body["password"];
  const insertDataIntoTbl = `INSERT INTO login_data(email,password) values($1,$2)`;
  const checkUserExistsOrNot = `SELECT email FROM login_data WHERE email=$1`;

  pool.query(checkUserExistsOrNot, [email]).then((response) => {
    if (response.rows.length > 0) {
      res.send({ Status_Cd: 0, Error: "Duplicate Data Found" });
    } else {
      pool
        .query(insertDataIntoTbl, [email, password])
        .then(() => {
          res.send({ Status_Cd: 1, email, password });
        })
        .catch((err) => {
          res
            .status(500)
            .send({ Status_Cd: 0, message: "Error inserting data" });
        });
    }
  });
});

// Add data into table API
app.post("/descriptionData", (req, res) => {
  const { workDescription } = req.body["workDescription"];
  const groceryDescription = req.body["groceryDescription"];
  const officeDescription = req.body["officeDescription"];
  let insertDataIntoDescTable;
  if (req.body?.["workDescription"]) {
    insertDataIntoDescTable = `INSERT INTO all_data(user_id,description,type,status) VALUES($1,$2,$3,$4)`;
    pool
      .query(insertDataIntoDescTable, [
        req.body?.["dbId"],
        req.body?.["workDescription"],
        "WK",
        "Pending",
      ])
      .then(() => {
        res.send({ Status_Cd: 1 });
      })
      .catch((err) => {
        res.status(500).send({ Status_Cd: 0, message: "Error inserting data" });
      });
  } else if (req.body?.["groceryDescription"]) {
    insertDataIntoDescTable = `INSERT INTO all_data(user_id,description,type,status) VALUES($1,$2,$3,$4)`;
    pool
      .query(insertDataIntoDescTable, [
        req.body["dbId"],
        req.body?.["groceryDescription"],
        "GY",
        "Pending",
      ])
      .then(() => {
        res.send({ Status_Cd: 1 });
      })
      .catch((err) => {
        res.status(500).send({ Status_Cd: 0, message: "Error inserting data" });
      });
  } else if (req.body?.["officeDescription"]) {
    insertDataIntoDescTable = `INSERT INTO all_data(user_id,description,type,status) VALUES($1,$2,$3,$4)`;
    pool
      .query(insertDataIntoDescTable, [
        req.body["dbId"],
        req.body?.["officeDescription"],
        "OFC",
        "Pending",
      ])
      .then(() => {
        res.send({ Status_Cd: 1 });
      })
      .catch((err) => {
        res.status(500).send({ Status_Cd: 0, message: "Error inserting data" });
      });
  }
});

app.get("/getAllData", (req, res) => {
  const getId = req.query["id"];
  pool
    .query(`SELECT * FROM all_data WHERE user_id=$1`, [getId])
    .then((result) => {
      res.send({ Status_Cd: 1, result });
    })
    .catch((err) => {
      console.log("Error is on getAllData API :", err);
    });
});

app.put("/updateData", (req, res) => {
  const getText = req.query["description"];
  const getDbid = req.query["dbId"];

  pool
    .query(
      `UPDATE all_data SET status = $1 WHERE description = $2 AND user_id=$3`,
      ["Completed", getText, getDbid] // Use parameterized values here
    )
    .then((result) => {
      if (result.rowCount > 0) {
        res.send({ Status_Cd: 1, message: "Data updated successfully" });
      } else {
        res
          .status(404)
          .send({ Status_Cd: 0, message: "No matching record found" });
      }
    })
    .catch((err) => {
      console.error("Updation error: ", err);
      res.status(500).send({ Status_Cd: 0, message: "Internal server error" });
    });
});

// const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
