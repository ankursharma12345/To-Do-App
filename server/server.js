const express = require("express");
const cors = require("cors");
const pool = require("./config/database");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

// Login API
app.get("/getData", (req, res) => {
  const getUserEmailFromDatabase = req.query?.["email"];
  const getUserPasswordFromDatabase = req.query?.["password"];
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
  const insertDataIntoTbl = `INSERT INTO login_data(Email,Password) values($1,$2)`;
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
          console.log("Error is : ", err);
          res
            .status(500)
            .send({ Status_Cd: 0, message: "Error inserting data" });
        });
    }
  });
});

// Add data into table API
app.post("/descriptionData", (req, res) => {
  // console.log(reqData);
  // const initialData = req.body?.["initialData"];
  const { workDescription } = req.body["workDescription"];
  const groceryDescription = req.body["groceryDescription"];
  const officeDescription = req.body["officeDescription"];
  // const groceryDescription = req.body?.["groceryDescription"];
  // const officeDescription = req.body?.["officeDescription"];
  // const {
  //   initialData,
  //   workDescription,
  //   groceryDescription,
  //   officeDescription,
  // } = req.body?.["currentId"];
  let insertDataIntoDescTable;
  // if (reqData.length === 0) {
  //   res.send({ Status_Cd: 0, Error: "Add some tasks" });
  // }
  if (req.body?.["workDescription"]) {
    insertDataIntoDescTable = `INSERT INTO all_data(user_id,description,type,status) VALUES($1,$2,$3,$4)`;
    pool
      .query(insertDataIntoDescTable, [
        req.body?.["id"],
        req.body?.["workDescription"],
        "WK",
        "Pending",
      ])
      .then(() => {
        res.send({ Status_Cd: 1 });
      })
      .catch((err) => {
        console.log("Error is : ", err);
        res.status(500).send({ Status_Cd: 0, message: "Error inserting data" });
      });
  } else if (req.body?.["groceryDescription"]) {
    insertDataIntoDescTable = `INSERT INTO all_data(user_id,description,type,status) VALUES($1,$2,$3,$4)`;
    pool
      .query(insertDataIntoDescTable, [
        req.body?.["id"],
        req.body?.["groceryDescription"],
        "GY",
        "Pending",
      ])
      .then(() => {
        res.send({ Status_Cd: 1 });
      })
      .catch((err) => {
        console.log("Error is : ", err);
        res.status(500).send({ Status_Cd: 0, message: "Error inserting data" });
      });
  } else if (req.body?.["officeDescription"]) {
    insertDataIntoDescTable = `INSERT INTO all_data(user_id,description,type,status) VALUES($1,$2,$3,$4)`;
    pool
      .query(insertDataIntoDescTable, [
        req.body?.["id"],
        req.body?.["officeDescription"],
        "OFC",
        "Pending",
      ])
      .then(() => {
        res.send({ Status_Cd: 1 });
      })
      .catch((err) => {
        console.log("Error is : ", err);
        res.status(500).send({ Status_Cd: 0, message: "Error inserting data" });
      });
  }

  // if (workDescription) {
  //   pool
  //     .query(
  //       `INSERT INTO all_data(description,type,status) VALUES(${workDescription},'WK','Pending')`
  //     )
  //     .then(() => {
  //       res.send({ Status_Cd: 1 });
  //     })
  //     .catch((err) => {
  //       console.log("Error is : ", err);
  //       res.status(500).send({ Status_Cd: 0, message: "Error inserting data" });
  //     });
  // } else if (groceryDescription) {
  //   pool
  //     .query(
  //       `INSERT INTO all_data(description,type,status) VALUES(${groceryDescription},'GY','Pending')`
  //     )
  //     .then(() => {
  //       res.send({ Status_Cd: 1 });
  //     })
  //     .catch((err) => {
  //       console.log("Error is : ", err);
  //       res.status(500).send({ Status_Cd: 0, message: "Error inserting data" });
  //     });
  // } else {
  //   pool
  //     .query(
  //       `INSERT INTO all_data(description,type,status) VALUES(${officeDescription},'OFC','Pending')`
  //     )
  //     .then(() => {
  //       res.send({ Status_Cd: 1 });
  //     })
  //     .catch((err) => {
  //       console.log("Error is : ", err);
  //       res.status(500).send({ Status_Cd: 0, message: "Error inserting data" });
  //     });
  // }
});

app.get("/getAllData", (req, res) => {
  const getId = req.query["id"];
  console.log(getId);
  pool
    .query(`SELECT * FROM all_data WHERE user_id=$1`, [getId])
    .then((result) => {
      console.log(result);
      res.send({ Status_Cd: 1, result });
    })
    .catch((err) => {
      console.log("Error is :", err);
    });
});

app.listen(4000, () => {
  console.log("Server running on localhost : 4000");
});
