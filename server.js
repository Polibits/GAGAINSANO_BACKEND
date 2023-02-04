var express = require('express');
var mysql = require('mysql2');
var app = express();
var crypto = require('crypto');

const UserController = require("./Controllers/UserController");
const LogController = require("./Controllers/LogController");
const PaymentControllr = require("./Controllers/PaymentController");

/**
 * realiza a conexão com o banco de dados
 * @param {string} database_name nome do banco de dados.
 * @param {string} password  senha.
 */
function connect_to_database(database_name, password){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: password,
        database: database_name
    });
    con.connect(function (err) {
        if (err){
            throw err;
        } else {
            console.log("Conexão com banco de dados SQL bem sucedida!");
            LogController.register_log(con,
                get_actual_date(),
                LogController.activity_types.system_administration.sql_connection,
                "conexão bem sucedida com o banco de dados"
            );
        }
    });
}

connect_to_database("gagainsano", "#gominho123");

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