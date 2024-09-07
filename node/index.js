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
  const createDbSql = `create database if not exists nodedb;`;
  const createTableSql = `create table if not exists people (name varchar(255) not null);`;
  const sql = `insert into people (name) values ('Lucas Marinho');`;

  let connection = mysql.createConnection(config);

  connection.query(createDbSql, function (err, rows, fields) {
    if (err) return console.log(`Create DB -> ${err}\nCode:${err.code}\nSQL:${err.sql}\n\n\n`);
    connection.query(createTableSql, function (err, rows, fields) {
      if (err) return console.log(`Create Table -> ${err}\nCode:${err.code}\nSQL:${err.sql}\n\n\n`);
      connection.query(sql, function (err, rows, fields) {
        if (err) return console.log(`Insert -> ${err}\nCode:${err.code}\nSQL:${err.sql}\n\n\n`);
        connection.query("select name from people", function (err, rows, fields) {
          if (err) return console.log(`Select -> ${err}\nCode:${err.code}\nSQL:${err.sql}\n\n\n`);
          res.send(`<h1>Full Cycle Rocks!</h1><br><h2>${rows[0].name}</h2>`);
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running: ${port}`);
});
