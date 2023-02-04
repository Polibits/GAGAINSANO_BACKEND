var express = require('express');
var mysql = require('mysql2');
var app = express();
var crypto = require('crypto');

const UserController = require("./Controllers/UserController");
const LogController = require("./Controllers/LogController");
const PaymentControlelr = require("./Controllers/PaymentController");

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

/**
 * obtém o tempo atual
 * @returns {string} data no formato YYYY-MM-DD HH:MM:SS
 */
function get_actual_date() {
    var time_stamp = "";

    var date_ob = new Date(),
        date = ("0" + date_ob.getDate()).slice(-2),
        month = ("0" + (date_ob.getMonth() + 1)).slice(-2),
        year = date_ob.getFullYear(),
        hours = date_ob.getHours(),
        minutes = date_ob.getMinutes(),
        seconds = date_ob.getSeconds();

    time_stamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    
    return time_stamp;
}

app.listen(3030);