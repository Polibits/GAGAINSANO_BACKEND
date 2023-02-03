var express = require('express');
var mysql = require('mysql2');
var app = express();
var crypto = require('crypto');

const UserControler = require("./Controllers/UserController");

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

var email = "henrique_eduardo_souza@hotmail.com";
var password = "gatodebotas";

// UserControler.add_user_credentials(con, email, password);

// UserControler.autheticate_credentials(con, email, password);

var salt = UserControler.get_salt(con, email);

app.listen(3030);