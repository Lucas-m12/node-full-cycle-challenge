const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");

app.get("/", (req, res) => {
  let sql = `insert into people (name) values ('Lucas Marinho');`;
  let connection = mysql.createConnection(config);
  connection.query(sql, function (err, rows, fields) {
    if (err) return console.log(`Insert -> ${err}\nCode:${err.code}\nSQL:${err.sql}\n\n\n`);
    connection.query(
      `select id,name from people`,
      function (err, rows, fields) {
        res.send({ title: "<h1>Full Cycle Rocks!</h1>", data: rows });
        if (err) console.log("Connection result error ->" + err.code);
        connection.end();
      }
    );
  });
  
});

app.listen(port, () => {
  console.log(`Server running: ${port}`);
});
