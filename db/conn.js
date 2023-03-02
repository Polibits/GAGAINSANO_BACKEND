var con;

/**
 * realiza a conexão com o banco de dados
 * @param {string} database_name nome do banco de dados.
 * @param {string} password  senha.
 */
const connect_to_database = (database_name, password) => {
    con = mysql.createConnection({
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

module.exports = connect_to_database