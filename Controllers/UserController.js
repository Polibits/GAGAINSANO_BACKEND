var crypto = require('crypto');

/**
 * adiciona o usuário na tabela UserCredentials.
 * @param {string} con conexão com o banco de dados sql.
 * @param {string} email email informado pelo usuário, que deve ser único.
 * @param {string} password senha informada pelo usuário.
 */
function add_user_credentials(con, email, password){
    var sql_query = "INSERT INTO UserCredentials(email, password, salt) VALUES ?";
    var salt = new_salt(64);
    var values = [[sha256(email), sha256(password + salt), salt]];

    con.query(sql_query, [values], (error, result, fields) => {
        if(error) return console.log(error);
        sucess = true;
        console.log('adicionou registros!');
        con.end();
    });
};

/**
 * deleta dados do usuário da base de dados
 * 
 */
function delete_user_credentials(con, email){
    var search_condition = ["WHERE email = '", sha256(email), "'"].join("");
    var sql_query = "DELETE FROM UserCredentials " + search_condition;
    var sucess = false;

    con.query(sql_query, function(error, result, fields) {
        if(error) {
            throw error;
        } else {
            console.log("deleção de credenciais de usuário bem sucedida");
            console.log(result);
        }
        con.end();
    });
}

/**
 * adiciona o usuário na tabela UserCredentials.
 * @param {string} con conexão com o banco de dados sql.
 * @param {string} email email informado pelo usuário.
 * @param {string} password senha enviada pelo usuário.
 * @returns {boolean} true significa que a autenticação foi bem sucedida; false, caso contrário.
 */
function autheticate_credentials(con, email, password){
    var search_condition = ["WHERE email = '", sha256(email), "'"].join("");
    var sql_query = "SELECT email, password, salt FROM UserCredentials " + search_condition;
    var sucess = false;

    con.query(sql_query, function(error, result, fields) {
        if(error) throw error;
        console.log(result);
        if(result.length == 0){
            console.log("não encontrado");
        } else {
            if(result[0].password == sha256(password + result[0].salt)){
                console.log("autenticação bem sucedida!");
                return true;
            } else {
                console.log("autenticação falha");
            }
        }
        con.end();
    });

    return sucess;
}

function sha256(content){
    return crypto.createHash('sha256').update(content).digest('hex')
}

function new_salt(length){
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0,length);
};

module.exports = {add_user_credentials, autheticate_credentials, delete_user_credentials};