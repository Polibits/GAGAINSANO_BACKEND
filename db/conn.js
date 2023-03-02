var con;
const sequelize = require("sequelize");
const mysql = require('mysql2')
/**
 * realiza a conexão com o banco de dados
 * @param {string} database_name nome do banco de dados.
 * @param {string} password  senha.
 */
const db = (gagadb, gaga123) => {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: 123,
        database: gagadb
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

module.exports = db