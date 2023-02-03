var express = require('express');
var mysql = require('mysql2');
var app = express();
var crypto = require('crypto');

const UserController = require("./Controllers/UserController");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#gominho123",
    database: "gagainsano"
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Conexão com banco de dados SQL bem sucedida!");
});

app.listen(3030);