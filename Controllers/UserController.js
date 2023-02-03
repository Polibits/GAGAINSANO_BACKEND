/**
 * adiciona o usuário na tabela UserCredentials.
 * @param {string} con conexão com o banco de dados sql.
 * @param {string} email email informado pelo usuário, que deve ser único.
 * @param {string} password senha informada pelo usuário.
 */
export function add_user(con, email, password){
    var sql_query = "INSERT INTO UserCredentials(email, password, salt) VALUES ?";
    var values = [[email, password, "fdboinjg894"]];

    con.query(sql_query, [values], (error, result, fields) => {
        if(error) return console.log(error);
        sucess = true;
        console.log('adicionou registros!');
        con.end();
    });
};

/**
 * adiciona o usuário na tabela UserCredentials.
 * @param {string} con conexão com o banco de dados sql.
 * @param {string} email email informado pelo usuário.
 * @param {string} password senha enviada pelo usuário.
 * @returns {boolean} true significa que a autenticação foi bem sucedida; false, caso contrário.
 */
export function autheticate_user(con, email, password){
    var search_condition = ["WHERE email = '", email].join("");
    var sql_query = "SELECT email, password, salt FROM UserCredentials " + search_condition;

    con.query(sql_query, function(error, result, fields) {
        if(error) throw error;
        console.log(result);
        if(result.length == 0){
            console.log("não encontrado");
        } else {
            console.log("autenticação bem sucedida!");
            return true;
            
        }
        con.end();
    });

    return false;
}

export {add_user, autheticate_user}